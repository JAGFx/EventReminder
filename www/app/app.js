'use strict';

// Declare app level module which depends on views, and components
angular
	.module( 'eventReminderApp', [
		'ui.router',
		'ngRoute',
		'ngCordova',
		'myApp.view1',
		
		// Services
		'SQLiteFactory',
		'PictureFactory',
		'EventFactory',
		'ContactFactory'
	] )
	.config( function ( $locationProvider ) {
		$locationProvider.hashPrefix( '!' );
	} );