/**
 *
 * Create: 02/04/2017 16:26
 * Project: EventReminder
 * Package:
 * @author: SMITH Emmanuel <emmanuel.smith@jagfx.fr>
 *
 */

'use strict';

angular
	.module( 'er.contact.form', [ 'ui.router', 'ngCordova' ] )
	
	.config( function ( $stateProvider ) {
		$stateProvider
			.state( 'contactNew', {
				url:          '/contacts/new',
				templateUrl:  'views/contacts/form/contact.form.html',
				controller:   ContactNewCtrl,
				controllerAs: 'contactFormCtrl',
				resolve:      {
					contact: function () {
						var c = new iContact( '', '', '' );
						c.generateID();
						
						return c;
					}
				}
			} )
			
			.state( 'contactNewPin', {
				url:          '/contacts/new/pinTo/{id:string}/',
				templateUrl:  'views/contacts/form/contact.form.html',
				controller:   ContactNewPinCtrl,
				controllerAs: 'contactFormCtrl',
				resolve:      {
					event:   function ( $stateParams, EventFactory ) {
						console.log( $stateParams.id );
						
						return EventFactory
							.findEvent( $stateParams.id );
					},
					contact: function () {
						var c = new iContact();
						c.generateID();
						
						return c;
					}
				}
			} )
			
			.state( 'contactEdit', {
				url:          '/contacts/{id:string}/edit',
				templateUrl:  'views/contacts/form/contact.form.html',
				controller:   ContactEdtiCtrl,
				controllerAs: 'contactFormCtrl',
				resolve:      {
					contact: function ( $stateParams, ContactFactory ) {
						console.log( $stateParams.id );
						
						return ContactFactory
							.findOneById( $stateParams.id );
					}
				}
			} );
	} );

function ContactNewPinCtrl( event, contact, $state, CordovaFactory, ContactFactory ) {
	var $this = this;
	
	$this.validate = function ( valid ) {
		if ( valid ) {
			ContactFactory
				.pinNewContact( event, $this.contact )
				.then( function ( data ) {
					CordovaFactory.toast( 'Contact pined' );
					$state.go( 'eventDetail', { id: event.id } );
					
				} );
		}
	};
	
	$this.init = function () {
		$this.type = 'Pin';
		
		$this.contact = contact;
	};
	
	$this.init();
}

function ContactNewCtrl( contact, $state, CordovaFactory, ContactFactory ) {
	var $this = this;
	
	$this.validate = function ( valid ) {
		if ( valid ) {
			ContactFactory
				.insertContact( $this.contact )
				.then( function ( data ) {
					CordovaFactory.toast( 'Contact created' );
					$state.go( 'contactList' );
					
				} );
		}
	};
	
	$this.init = function () {
		$this.type    = 'Create';
		$this.contact = contact;
	};
	
	$this.init();
}

function ContactEdtiCtrl( contact, $state, CordovaFactory, ContactFactory ) {
	var $this = this;
	
	$this.validate = function ( valid ) {
		if ( valid ) {
			ContactFactory
				.updateContact( $this.contact )
				.then( function ( data ) {
					CordovaFactory.toast( 'Contact updated' );
					$state.go( 'contactList' );
				} );
		}
	};
	
	$this.init = function () {
		$this.type    = 'Edit';
		$this.contact = contact;
	};
	
	$this.init();
}