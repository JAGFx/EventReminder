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
			url:          '/events/{id:int}',
			templateUrl:  'views/events/detail/event.detail.html',
			controller:   EventDetailCtrl,
			controllerAs: 'eventDetailCtrl',
			resolve:      {
				event: function ( $stateParams ) {
					console.log( $stateParams.id );
					
					var e      = new iEvent( 'Plop', '2017-04-24', 'un jolie petit texte' );
					e.location = {
						lat:  45.255454545454545484845,
						long: 42.33659851254545215151
					};
					
					console.log( e );
					
					return e;
				}
			}
		} );
	} );

function EventDetailCtrl( CONSTANTS, event ) {
	var $this = this;
	
	$this.event = event;
}