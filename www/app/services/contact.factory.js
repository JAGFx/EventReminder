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
	.factory( 'ContactFactory', function ( CordovaFactory, SQLiteFactory, CONSTANTS ) {
		var $this = this;
		
		$this.insertContact = function ( contact ) {
			var query  = 'INSERT INTO iContact VALUES (?, ?, ?, ?, ?)';
			var params = [ contact.id, contact.lastname, contact.firstname, contact.email, contact.mobile ];
			
			return SQLiteFactory
				.execute( query, params )
				.then( function ( data ) {
					//console.log( data );
				}, function ( err ) {
					console.error( err.message );
					CordovaFactory.alertDialog( CONSTANTS.CORDOVA.DIALOG_ERROR_TITLE, err.message );
				} );
		};
		
		$this.updateContact = function ( contact ) {
			var query  = 'UPDATE iContact SET lastname = ?, firstname = ?, email = ?, mobile = ? WHERE id = ?';
			var params = [ contact.lastname, contact.firstname, contact.email, contact.mobile, contact.id ];
			
			SQLiteFactory
				.execute( query, params )
				.then( function ( data ) {
					//console.log( data );
				}, function ( err ) {
					console.error( err.message );
					CordovaFactory.alertDialog( CONSTANTS.CORDOVA.DIALOG_ERROR_TITLE, err.message );
				} );
		};
		
		$this.assignContactToEvent = function ( contact, event ) {
			var query  = 'INSERT INTO iContact_iEvent VALUES(?, ?)';
			var params = [ contact.id, event.id ];
			
			return SQLiteFactory
				.execute( query, params )
				.then( function ( data ) {
					//console.log( data );
					CordovaFactory.toast( 'Contact pined' );
					
				}, function ( err ) {
					console.error( err.message );
					CordovaFactory.alertDialog( CONSTANTS.CORDOVA.DIALOG_ERROR_TITLE, err.message );
				} );
		};
		
		$this.deleteContact = function ( id ) {
			var query  = 'DELETE FROM iContact WHERE id = ?';
			var params = [ id ];
			
			return SQLiteFactory
				.execute( query, params )
				.then( function ( data ) {
					//console.log( data );
					
				}, function ( err ) {
					console.error( err.message );
					CordovaFactory.alertDialog( CONSTANTS.CORDOVA.DIALOG_ERROR_TITLE, err.message );
				} );
		};
		
		$this.findAll = function () {
			var query = 'SELECT * FROM iContact';
			
			return SQLiteFactory
				.execute( query, [] )
				.then( function ( rows ) {
					var contacts = [];
					
					for ( var i = 0; i < rows.rows.length; i++ )
						contacts.push( rows.rows.item( i ) );
					
					return contacts;
					
				}, function ( err ) {
					console.error( err.message );
					CordovaFactory.alertDialog( CONSTANTS.CORDOVA.DIALOG_ERROR_TITLE, err.message );
				} );
		};
		
		$this.findOneById = function ( id ) {
			var query  = 'SELECT * FROM iContact WHERE id = ?';
			var params = [ id ];
			
			return SQLiteFactory
				.execute( query, params )
				.then( function ( rows ) {
					//console.log( rows );
					return $this.makeObject( rows.rows.item( 0 ) );
					
				}, function ( err ) {
					console.error( err.message );
					CordovaFactory.alertDialog( CONSTANTS.CORDOVA.DIALOG_ERROR_TITLE, err.message );
				} );
		};
		
		
		$this.pinContactFromMobile = function ( event ) {
			return CordovaFactory
				.pickContact()
				.then( function ( contactPicked ) {
					console.log( contactPicked );
					var email = ( contactPicked.emails !== null )
						? contactPicked.emails[ 0 ].value
						: null;
					
					var mobile = ( contactPicked.phoneNumbers !== null )
						? contactPicked.phoneNumbers[ 0 ].value
						: null;
					
					var lastname = ( contactPicked.name.familyName !== null )
						? contactPicked.name.familyName
						: contactPicked.name.formatted;
					
					var contact = new iContact( lastname, contactPicked.name.formatted, email );
					contact.setMobile( mobile );
					contact.generateID();
					
					$this.insertContact( contact )
						.then( function () {
							$this.assignContactToEvent( contact, event )
								.then( function ( data ) {
									//console.log( data );
									event.contacts.push( contact );
								} );
						} );
					
				} );
		};
		
		$this.pinNewContact = function ( event, contact ) {
			return $this.insertContact( contact )
				.then( function ( data ) {
					$this.assignContactToEvent( contact, event )
						.then( function ( data ) {
							//console.log( data );
							event.contacts.push( contact );
						} );
				} );
		};
		
		$this.makeObject = function ( data ) {
			if ( !data )
				return new iContact();
			
			var c = new iContact( data.lastname, data.firstname, data.email );
			c.setMobile( data.mobile );
			c.id = data.id;
			
			return c;
		};
		
		return $this;
	} );