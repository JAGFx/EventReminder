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
			
			return $cordovaGeolocation
				.getCurrentPosition( posOptions )
				.then( function ( position ) {
					console.log( 'Init', position );
					event.geoloc = {
						lat:  position.coords.latitude,
						long: position.coords.longitude
					};
					
					return event;
				}, function ( err ) {
					console.error( err.message );
				} );
			
			// TODO Update in DB
		};
		
		$this.findAllEvents = function () {
			
		};
		
		$this.findEvent = function ( idEvent ) {
			
		};
		
		return $this;
	} );