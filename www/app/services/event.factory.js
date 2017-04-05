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
	.factory( 'EventFactory', function ( $cordovaGeolocation, SQLiteFactory ) {
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
					var contacts = [];
					
					for ( var i = 0; i < rows.rows.length; i++ )
						contacts.push( $this.makeObject( rows.rows.item( i ) ) );
					
					return contacts;
				}, function ( err ) {
					console.error( err.message );
					return [];
				} );
		};
		
		$this.findEvent = function ( idEvent ) {
			
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
			var e = new iEvent( data.title, data.date, data.text );
			e.id  = data.id;
			
			if ( data.lat !== undefined && data.long !== undefined )
				e.setLocation( data.lat, data.long );
			
			return e;
		};
		
		return $this;
	} );