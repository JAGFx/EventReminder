'use strict';

// Declare app level module which depends on views, and components
angular
	.module( 'eventReminderApp', [
		'ui.router',
		'ngRoute',
		'ngCordova',
		'myApp.view1'
	] )
	.config( function ( $locationProvider ) {
		$locationProvider.hashPrefix( '!' );
	} )
	.constant( 'CONSTANTS', {
		DB_NAME: 'eventReminder.db'
	} )
	.controller( function ( SQLiteFactory ) {
		document.addEventListener( "deviceready", function () {
			console.log( 'Ready' );
			SQLiteFactory.initDb();
			
		} );
	} );