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
					event: function ( $stateParams, EventFactory ) {
						console.log( $stateParams.id );
						
						return EventFactory
							.findEvent( $stateParams.id );
						
						/*// TODO Fetch from DB
						 var e = new iEvent( 'Plop', '2017-04-24', 'un jolie petit texte' );
						 /!*e.location = {
						 lat:  45.255454545454545484845,
						 long: 42.33659851254545215151
						 };*!/
						 e.generateID();
						 console.log( e );
						 
						 return e;*/
					}
				}
			} );
	} );

function EventNewCtrl( EventFactory ) {
	var $this = this;
	
	$this.validate = function ( valid ) {
		if ( valid ) {
			// TODO Set in DB
			EventFactory
				.insertEvent( $this.event )
				.then( function ( data ) {
					console.log( 'Inserted' );
				}, function ( err ) {
					console.error( err.message );
				} );
		}
	};
	
	$this.init = function () {
		$this.type = 'Create';
		
		$this.event = new iEvent();
		$this.event.generateID();
	};
	
	$this.locateEvent = function () {
		console.log( 'LOCATE EVENT' );
		// TODO Test on mobile
		
		EventFactory
			.locateEvent( $this.event )
			.then( function () {
				EventFactory.updateEvent( $this.event );
			} )
	};
	
	$this.init();
}

function EventEditCtrl( event, EventFactory ) {
	var $this = this;
	
	$this.validate = function ( valid ) {
		console.log( valid );
		console.log( $this.event );
		
		if ( valid ) {
			EventFactory.updateEvent( $this.event );
		}
	};
	
	$this.init = function () {
		$this.type  = 'Edit';
		$this.event = event;
	};
	
	$this.locateEvent = function () {
		console.log( 'LOCATE EVENT' );
		// TODO Test on mobile
		
		EventFactory
			.locateEvent( $this.event )
			.then( function () {
				EventFactory.updateEvent( $this.event );
			} )
	};
	
	$this.init();
}