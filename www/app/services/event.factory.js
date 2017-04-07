/**
 *
 * Create: 21/03/2017 21:45
 * Project: EventReminder
 * Package:
 * @author: SMITH Emmanuel <emmanuel.smith@jagfx.fr>
 *
 */

'use strict';

angular
	.module( 'eventReminderApp' )
	.factory( 'EventFactory', function ( $cordovaGeolocation, SQLiteFactory, ContactFactory, PictureFactory ) {
		var $this = this;
		
		$this.insertEvent = function ( event ) {
			var query  = 'INSERT INTO iEvent VALUES (?, ?, ?, ?, ?, ?)';
			var params = [ event.id, event.date, event.title, event.text, event.lat, event.long ];
			// TODO Dialog + Toast
			
			return SQLiteFactory
				.execute( query, params )
				.then( function ( data ) {
					console.log( data );
				}, function ( err ) {
					console.error( err.message );
				} );
		};
		
		$this.updateEvent = function ( event ) {
			// TODO Update in DB
		};
		
		$this.findAll = function () {
			var query = 'SELECT * FROM iEvent';
			
			// TODO Dialog + Toast
			
			return SQLiteFactory
				.execute( query, [] )
				.then( function ( rows ) {
					console.log( rows.rows.item( 1 ) );
					var events = [];
					
					for ( var i = 0; i < rows.rows.length; i++ )
						events.push( $this.makeObject( rows.rows.item( i ) ) );
					
					return events;
				}, function ( err ) {
					console.error( err.message );
					return [];
				} );
		};
		
		$this.findEvent = function ( idEvent ) {
			var query  = 'SELECT * FROM iEvent WHERE id = ?';
			var params = [ idEvent ];
			
			return SQLiteFactory
				.execute( query, params )
				.then( function ( rows ) {
					console.log( rows );
					return $this.makeObject( rows.rows.item( 0 ) );
					
				}, function ( err ) {
					console.error( err.message );
					return null;
				} );
		};
		
		$this.findAllContactPined = function ( event ) {
			var query  = 'SELECT c.* FROM iContact_iEvent ie JOIN iContact c ON ie.contact_id = c.id WHERE ie.event_id = ?';
			var params = [ event.id ];
			
			//var query = 'SELECT * FROM iContact_iEvent';
			
			// TODO Dialog + Toast
			
			console.log( 'FIND CONTACT PINED' );
			
			return SQLiteFactory
				.execute( query, params )
				.then( function ( rows ) {
					console.log( rows );
					
					for ( var i = 0; i < rows.rows.length; i++ ) {
						console.log( rows.rows.item( i ) );
						event.contacts.push( ContactFactory.makeObject( rows.rows.item( i ) ) );
					}
					
					return event;
				}, function ( err ) {
					console.error( err.message );
					return [];
				} );
		};
		
		$this.findAllPictureTaken = function ( event ) {
			var query  = 'SELECT p.* FROM Picture p WHERE p.eventID = ?';
			var params = [ event.id ];
			
			return SQLiteFactory
				.execute( query, params )
				.then( function ( rows ) {
					console.log( rows );
					
					for ( var i = 0; i < rows.rows.length; i++ ) {
						console.log( rows.rows.item( i ) );
						event.pictures.push( PictureFactory.makeObject( rows.rows.item( i ) ) );
					}
					
					return event;
				}, function ( err ) {
					console.error( err.message );
					return [];
				} );
		};
		
		$this.locateEvent = function ( event ) {
			var posOptions = { timeout: 10000, enableHighAccuracy: false };
			
			$cordovaGeolocation
				.getCurrentPosition( posOptions )
				.then( function ( position ) {
					console.log( 'Init', position );
					event.setLocation( position.coords.latitude, position.coords.longitude );
					
					// TODO Update in DB
					
				}, function ( err ) {
					console.error( err.message );
				} );
		};
		
		$this.makeObject = function ( data ) {
			if ( !data )
				return new iEvent();
			
			var e = new iEvent( data.title, data.date, data.text );
			e.id  = data.id;
			
			if ( data.lat !== undefined && data.long !== undefined )
				e.setLocation( data.lat, data.long );
			
			return e;
		};
		
		return $this;
	} );