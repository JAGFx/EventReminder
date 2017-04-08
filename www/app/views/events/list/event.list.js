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
			templateUrl:  'views/events/list/event.list.html',
			controller:   EventListCtrl,
			controllerAs: 'eventListCtrl'
		} );
	} );

function EventListCtrl( CONSTANTS, EventFactory ) {
	var $this = this;
	
	$this.events  = [];
	$this.picSize = CONSTANTS.PICTURES;
	
	$this.init = function () {
		EventFactory
			.findAll()
			.then( function ( events ) {
				$this.events = events;
				
			}, function ( err ) {
				console.error( err.message );
				// TODO Dialog
			} );
	};
	
	$this.init();
}