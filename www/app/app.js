'use strict';

// Declare app level module which depends on views, and components
angular
	.module( 'eventReminderApp', [
		'ui.router',
		'ngRoute',
		'ngCordova',
		'er.event.list'
	] )
	.constant( 'CONSTANTS', {
		DB_NAME:       'eventReminder.db',
		DEFAULT_STATE: 'eventList'
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
		$state.go( CONSTANTS.DEFAULT_STATE );
	} );
}