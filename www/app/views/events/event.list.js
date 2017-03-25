/**
 *
 * Create: 25/03/2017 18:20
 * Project: EventReminder
 * Package:
 * @author: SMITH Emmanuel <emmanuel.smith@jagfx.fr>
 *
 */

'use strict';

angular
	.module( 'er.event.list', [ 'ui.router', 'ngCordova' ] )
	
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'eventList', {
			url:          '/events',
			templateUrl:  'views/events/event.list.html',
			controller:   EventListCtrl,
			controllerAs: 'eventListCtrl'
		} );
	} );

function EventListCtrl() {
	
}