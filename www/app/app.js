'use strict';

// Declare app level module which depends on views, and components
angular
	.module( 'eventReminderApp', [
		'ui.router',
		'ngRoute',
		'ngCordova',
		
		'er.event.list',
		'er.event.detail',
		'er.event.form',
		
		'er.contact.list',
		'er.contact.form'
	] )
	.constant( 'CONSTANTS', {
		DB_NAME:            'eventReminder.db',
		DEFAULT_STATE:      'eventList',
		MOMENT_DATE_FORMAT: 'Y-m-DD HH:mm:ss',
		PICTURES:           {
			HEIGHT: 100,
			WIDTH:  100
		}
	} )
	.config( config )
	.run( run );

function config( $locationProvider, $urlRouterProvider, CONSTANTS ) {
	$locationProvider.hashPrefix( '!' );
	$urlRouterProvider.otherwise( '/' );
	//$state.go( CONSTANTS.DEFAULT_STATE );
}

function run( SQLiteFactory ) {
	document.addEventListener( "deviceready", function () {
		console.log( 'Ready' );
		
		// FIXME Uncomment befor pass in Android device
		SQLiteFactory.initDb();
		//$state.go( CONSTANTS.DEFAULT_STATE );
	} );
}