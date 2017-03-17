'use strict';

// Declare app level module which depends on views, and components
angular
	.module( 'myApp', [
		'ui.router',
		'ngRoute',
		'ngCordova',
		'myApp.view1'
	] )
	.config( function ( $locationProvider ) {
		$locationProvider.hashPrefix( '!' );
	} );