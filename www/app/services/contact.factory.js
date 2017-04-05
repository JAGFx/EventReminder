/**
 *
 * Create: 21/03/2017 21:46
 * Project: EventReminder
 * Package:
 * @author: SMITH Emmanuel <emmanuel.smith@jagfx.fr>
 *
 */

'use strict';

angular
	.module( 'eventReminderApp' )
	.factory( 'ContactFactory', function ( $cordovaContacts, SQLiteFactory ) {
		var $this = this;
		
		$this.insertContact = function ( contact ) {
			var query  = 'INSERT INTO iContact VALUES (?, ?, ?, ?, ?)';
			var params = [ contact.id, contact.lastname, contact.firstname, contact.email, contact.mobile ];
			// TODO Dialog + Toast
			
			return SQLiteFactory
				.execute( query, params )
				.then( function ( data ) {
					console.log( data );
				}, function ( err ) {
					console.error( err.message );
				} );
		};
		
		$this.updateContact = function ( contact ) {
			var query  = 'UPDATE iContact SET lastname = ?, firstname = ?, email = ?, mobile = ? WHERE id = ?'
			var params = [ contact.lastname, contact.firstname, contact.email, contact.mobile, contact.id ];
			
			// TODO Dialog + Toast
			
			SQLiteFactory
				.execute( query, params )
				.then( function ( data ) {
					console.log( data );
				}, function ( err ) {
					console.error( err.message );
				} );
		};
		
		$this.deleteContact = function ( id ) {
			var query  = 'DELETE FROM iContact WHERE id = ?';
			var params = [ id ];
			
			// TODO Dialog + Toast
			
			return SQLiteFactory
				.execute( query, params )
				.then( function ( data ) {
					console.log( data );
				}, function ( err ) {
					console.error( err.message );
				} );
		};
		
		$this.findAll = function () {
			var query = 'SELECT * FROM iContact';
			
			// TODO Dialog + Toast
			
			return SQLiteFactory
				.execute( query, [] )
				.then( function ( rows ) {
					console.log( rows.rows.item( 1 ) );
					var contacts = [];
					
					for ( var i = 0; i < rows.rows.length; i++ )
						contacts.push( rows.rows.item( i ) );
					
					return contacts;
				}, function ( err ) {
					console.error( err.message );
					return [];
				} );
		};
		
		$this.findOneById = function ( id ) {
			var query  = 'SELECT * FROM iContact WHERE id = ?';
			var params = [ id ];
			
			// TODO Dialog + Toast
			
			return SQLiteFactory
				.execute( query, params )
				.then( function ( rows ) {
					console.log( rows );
					return $this.makeObject( rows.rows.item( 0 ) );
				}, function ( err ) {
					console.error( err.message );
					return [];
				} );
		};
		
		
		$this.pinContactFromMobile = function ( event ) {
			
			// TODO Dialog + Toast
			return $cordovaContacts
				.pickContact()
				.then( function ( contactPicked ) {
					console.log( contactPicked );
					var email = ( contactPicked.emails !== null )
						? contactPicked.emails[ 0 ]
						: null;
					
					var mobile = ( contactPicked.phoneNumbers !== null )
						? contactPicked.phoneNumbers[ 0 ].value
						: null;
					
					var contact = new iContact( contactPicked.name.familyName, contactPicked.name.formatted, email );
					contact.setMobile( mobile );
					contact.generateID();
					
					$this.insertContact( contact )
						.then( function () {
							console.log( 'Pined' );
							event.contacts.push( contact );
						}, function ( err ) {
							console.error( err.message );
						} );
				}, function ( err ) {
					console.error( err.message );
				} );
		};
		
		$this.makeObject = function ( data ) {
			var c = new iContact( data.lastname, data.firstname, data.email );
			c.setMobile( data.mobile );
			c.id = data.id;
			
			return c;
		};
		
		return $this;
	} );