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
	.factory( 'ContactFactory', function ( $cordovaContacts ) {
		var $this = this;
		
		$this.newContact = function ( lastname, firstname, tel ) {
			var contact = new Contact( lastname, firstname, tel );
			
			// TODO Insert in DB
		};
		
		this.updateContact = function ( contact ) {
			// TODO Update in DB;
		};
		
		
		$this.pinContactFromMobile = function ( event ) {
			return $cordovaContacts
				.pickContact()
				.then( function ( contactPicked ) {
					var contact = new Contact( 'last', 'first', 'mail' );
					
					event.contacts.push( contact );
					// TODO Update Event
					
					console.log( contactPicked );
					return contact;
				} );
		};
		
		return $this;
	} );