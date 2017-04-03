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
			var query = 'INSERT INTO iContact VALUES (?, ?, ?, ?, ?)';
			
			return SQLiteFactory
				.execute( query, [ contact.id, contact.lastname, contact.firstname, contact.email, contact.mobile ] )
				.then( function ( data ) {
					console.log( data );
				}, function ( err ) {
					console.error( err.message );
				} );
			// TODO Insert in DB
		};
		
		$this.updateContact = function ( contact ) {
			// TODO Update in DB;
		};
		
		$this.findAll = function () {
			var query = 'SELECT * FROM iContact';
			
			return SQLiteFactory
				.execute( query, [] )
				.then( function ( contacts ) {
					console.log( contacts.rows.item( 1 ) );
					return contacts.rows;
				}, function ( err ) {
					console.error( err.message );
					return [];
				} );
		};
		
		
		$this.pinContactFromMobile = function ( event ) {
			$cordovaContacts
				.pickContact()
				.then( function ( contactPicked ) {
					console.log( contactPicked );
					var contact = new iContact( 'last', 'first', 'mail' );
					contact.setMobile( 0 );
					
					event.contacts.push( contact );
					// TODO Update Event
				} );
		};
		
		return $this;
	} );