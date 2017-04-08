/**
 * Created by SMITHE on 03-Apr-17.
 */

'use strict';

angular
	.module( 'er.contact.list', [ 'ui.router', 'ngCordova' ] )
	
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'contactList', {
			url:          '/contacts',
			templateUrl:  'views/contacts/list/contact.list.html',
			controller:   ContactListCtrl,
			controllerAs: 'contactListCtrl'
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
				
			}, function ( err ) {
				console.error( err.message );
				// TODO Dialog
				
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
				
			}, function ( err ) {
				// TODO Dialog
			} )
	};
	
	$this.init();
}