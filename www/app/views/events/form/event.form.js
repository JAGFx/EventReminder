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
					}
				}
			} );
	} );

function EventNewCtrl( $state, CordovaFactory, EventFactory ) {
	var $this = this;
	
	$this.validate = function ( valid ) {
		if ( valid ) {
			EventFactory
				.insertEvent( $this.event )
				.then( function ( data ) {
					CordovaFactory.toast( 'Event created' );
					$state.go( 'eventDetail', { id: $this.event.id } );
				} );
		}
	};
	
	$this.init = function () {
		$this.type = 'Create';
		
		$this.event = new iEvent();
		$this.event.generateID();
	};
	
	$this.locateEvent = function () {
		EventFactory
			.locateEvent( $this.event )
			.then( function () {
				EventFactory.updateEvent( $this.event );
			} );
	};
	
	$this.init();
}

function EventEditCtrl( event, $state, CordovaFactory, EventFactory ) {
	var $this = this;
	
	$this.validate = function ( valid ) {
		if ( valid )
			EventFactory
				.updateEvent( $this.event )
				.then( function () {
					CordovaFactory.toast( 'Event updated' );
					$state.go( 'eventDetail', { id: $this.event.id } );
				} );
		
	};
	
	$this.init = function () {
		$this.type  = 'Edit';
		$this.event = event;
	};
	
	$this.locateEvent = function () {
		EventFactory
			.locateEvent( $this.event )
			.then( function () {
				EventFactory
					.updateEvent( $this.event );
			} );
	};
	
	$this.init();
}