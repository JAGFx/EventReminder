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

function ContactListCtrl( ContactFactory ) {
	var $this = this;
	
	// TODO Fetch from DB
	$this.contacts = [];
	
	$this.init = function () {
		ContactFactory
			.findAll()
			.then( function ( contacts ) {
				console.log( contacts );
				$this.contacts = contacts;
			}, function ( err ) {
				console.error( err.message );
			} );
	};
	
	$this.init();
}