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
	.factory( 'ContactFactory', function () {
		var $this = this;
		
		$this.newContact = function ( lastname, firstname, tel ) {
			var contact = new Contact( lastname, firstname, tel );
			
			// TODO Insert in DB
		};
		
		this.updateContact = function ( contact ) {
			// TODO Update in DB;
		};
		
		return $this;
	} );