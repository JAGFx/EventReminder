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
	.module( 'er.event.form', [ 'ui.router', 'ngCordova' ] )
	
	.config( function ( $stateProvider ) {
		$stateProvider
			.state( 'eventNew', {
				url:          '/events/new',
				templateUrl:  'views/events/form/event.form.html',
				controller:   EventNewCtrl,
				controllerAs: 'eventFormCtrl'
			} )
			.state( 'eventEdit', {
				url:          '/events/{id:string}/edit',
				templateUrl:  'views/events/form/event.form.html',
				controller:   EventEditCtrl,
				controllerAs: 'eventFormCtrl',
				resolve:      {
					event: function ( $stateParams ) {
						console.log( $stateParams.id );
						
						// TODO Fetch from DB
						var e = new iEvent( 'Plop', '2017-04-24', 'un jolie petit texte' );
						/*e.location = {
						 lat:  45.255454545454545484845,
						 long: 42.33659851254545215151
						 };*/
						e.generateID();
						console.log( e );
						
						return e;
					}
				}
			} );
	} );

function EventNewCtrl() {
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

function EventEditCtrl( event ) {
	var $this = this;
	
	$this.validate = function ( valid ) {
		if ( valid ) {
			// TODO Update in DB
		}
	};
	
	$this.init = function () {
		$this.type  = 'Edit';
		$this.event = event;
	};
	
	$this.init();
}