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
	.factory( 'EventFactory', function ( $cordovaGeolocation ) {
		var $this = this;
		
		$this.newEvent = function ( title, text ) {
			// TODO Class object
			
			var event = new iEvent( new Date(), title, text );
			
			// TODO Insert in DB
		};
		
		$this.updateEvent = function ( event ) {
			// TODO Update in DB
		};
		
		$this.locateEvent = function ( event ) {
			var posOptions = { timeout: 10000, enableHighAccuracy: true };
			
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
		
		$this.findAllEvents = function () {
			
		};
		
		$this.findEvent = function ( idEvent ) {
			
		};
		
		return $this;
	} );