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

function ContactListCtrl( CONSTANTS ) {
	var $this = this;
	
	// TODO Fetch from DB
	$this.contacts = [];
	
	var c = new Contact( 'lstname', 'fstname', 'mobile' );
	c.generateID();
	$this.contacts.push( c );
}