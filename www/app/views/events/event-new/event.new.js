/**
 *
 * Create: 28/03/2017 22:03
 * Project: EventReminder
 * Package:
 * @author: SMITH Emmanuel <emmanuel.smith@jagfx.fr>
 *
 */

'use strict';

angular
	.module( 'er.event.new', [ 'ui.router', 'ngCordova' ] )
	
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'eventNew', {
			url:          '/events/new',
			templateUrl:  'views/events/event.form.html',
			controller:   EventFormCtrl,
			controllerAs: 'eventFormCtrl'
		} );
	} );

function EventFormCtrl() {
	var $this = this;
	
	$this.validate = function ( valid ) {
		if ( valid ) {
			// TODO Set in DB
		}
	};
	
	$this.init = function () {
		$this.type = 'Create';
		
		$this.event = new iEvent( '', '', '' );
		$this.event.generateID();
	};
	
	$this.init();
}