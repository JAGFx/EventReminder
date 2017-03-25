'use strict';

// Declare app level module which depends on views, and components
angular
	.module( 'eventReminderApp', [
		'ui.router',
		'ngRoute',
		'ngCordova',
		
		'er.event.list',
		'er.event.detail'
	] )
	.constant( 'CONSTANTS', {
		DB_NAME:       'eventReminder.db',
		DEFAULT_STATE: 'eventList',
		PICTURES:      {
			HEIGHT: 100,
			WIDTH:  100
		}
	} )
	.config( config )
	.run( run );

function config( $locationProvider ) {
	$locationProvider.hashPrefix( '!' );
}

function run( $state, CONSTANTS, SQLiteFactory ) {
	document.addEventListener( "deviceready", function () {
		console.log( 'Ready' );
		//SQLiteFactory.initDb();
		//$state.go( CONSTANTS.DEFAULT_STATE );
	} );
}