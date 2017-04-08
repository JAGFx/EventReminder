/**
 *
 * Create: 25/03/2017 20:08
 * Project: EventReminder
 * Package:
 * @author: SMITH Emmanuel <emmanuel.smith@jagfx.fr>
 *
 */

'use strict';

angular
	.module( 'er.event.detail', [ 'ui.router', 'ngCordova' ] )
	
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'eventDetail', {
			url:          '/events/{id:string}/',
			templateUrl:  'views/events/detail/event.detail.html',
			controller:   EventDetailCtrl,
			controllerAs: 'eventDetailCtrl',
			resolve:      {
				event: function ( $stateParams, EventFactory ) {
					console.log( $stateParams.id );
					
					return EventFactory
						.findEvent( $stateParams.id )
						.then( function ( event ) {
							return EventFactory
								.findAllContactPined( event )
								.then( function ( event ) {
									return EventFactory.findAllPictureTaken( event );
								} );
						} );
				}
			}
		} );
	} );

function EventDetailCtrl( event, CordovaFactory, PictureFactory, ContactFactory ) {
	var $this = this;
	
	$this.event = event;
	
	$this.takePicture = function () {
		PictureFactory
			.takePicture( $this.event )
			.then( function ( picture ) {
				PictureFactory
					.insertPicture( picture )
					.then( function () {
						CordovaFactory.toast( 'Picture saved' );
					} );
				
			}, function ( err ) {
				console.error( err.message );
				// TODO Dialog
			} );
	};
	
	$this.pinContactFromMobile = function () {
		ContactFactory
			.pinContactFromMobile( $this.event )
			.then( function () {
				CordovaFactory.toast( 'Contact pined' );
				
			}, function ( err ) {
				console.error( err.message );
				// TODO Dialog
			} );
	};
}