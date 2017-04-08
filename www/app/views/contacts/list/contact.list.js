/**
 * Created by SMITHE on 03-Apr-17.
 */

'use strict';

angular
	.module( 'er.contact.list', [ 'ui.router', 'ngCordova' ] )
	
	.config( function ( $stateProvider ) {
		$stateProvider
			.state( 'contactList', {
				url:          '/contacts',
				templateUrl:  'views/contacts/list/contact.list.html',
				controller:   ContactListCtrl,
				controllerAs: 'contactListCtrl'
			} )
			
			.state( 'contactListPin', {
				url:          '/contacts/pinTo/{id:string}/',
				templateUrl:  'views/contacts/list/contact.list.html',
				controller:   ContactListPinCtrl,
				controllerAs: 'contactListCtrl',
				resolve:      {
					event: function ( $stateParams, EventFactory ) {
						console.log( $stateParams.id );
						
						return EventFactory
							.findEvent( $stateParams.id );
					}
				}
			} );
	} );

function ContactListCtrl( CordovaFactory, ContactFactory ) {
	var $this = this;
	
	$this.contacts = [];
	
	$this.init = function () {
		ContactFactory
			.findAll()
			.then( function ( contacts ) {
				$this.contacts = contacts;
				
			} );
	};
	
	$this.deleteContact = function ( contact ) {
		ContactFactory
			.deleteContact( contact.id )
			.then( function () {
				$this.contacts = $this.contacts.filter( function ( item ) {
					return item.id !== contact.id;
				} );
				
				CordovaFactory.toast( 'Contact deleted' );
				
			} );
	};
	
	$this.init();
}

function ContactListPinCtrl( event, $state, CordovaFactory, ContactFactory ) {
	var $this = this;
	
	$this.contacts = [];
	$this.event    = event;
	
	$this.init = function () {
		ContactFactory
			.findAll()
			.then( function ( contacts ) {
				$this.contacts = contacts;
				
			} );
	};
	
	$this.deleteContact = function ( contact ) {
		ContactFactory
			.deleteContact( contact.id )
			.then( function () {
				$this.contacts = $this.contacts.filter( function ( item ) {
					return item.id !== contact.id;
				} );
				
				CordovaFactory.toast( 'Contact deleted' );
				
			} );
	};
	
	$this.pinContactToEvent = function ( contact ) {
		ContactFactory
			.assignContactToEvent( contact, $this.event )
			.then( function () {
				$state.go( 'eventDetail', { id: $this.event.id } );
			} );
	};
	
	$this.init();
}