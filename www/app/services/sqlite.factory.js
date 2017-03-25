/**
 *
 * Create: 21/03/2017 21:50
 * Project: EventReminder
 * Package:
 * @author: SMITH Emmanuel <emmanuel.smith@jagfx.fr>
 *
 */

'use strict';

angular
	.module( 'eventReminderApp' )
	.factory( 'SQLiteFactory', function ( $cordovaSQLite, CONSTANTS ) {
		var $this = this;
		
		//$this.db = $cordovaSQLite.openDB( { name: CONSTANTS.DB_NAME, iosDatabaseLocation: 'default' } );
		
		$this.initDb = function () {
			var queryContact = "CREATE TABLE IF NOT EXISTS Contact (lastname, firstname, tel)";
			var queryEvent   = "CREATE TABLE IF NOT EXISTS Event (date, title, text, lat, long)";
			var queryPicture = "CREATE TABLE IF NOT EXISTS Picture (lastname, firstname, tel)";
			
			$this.execute( queryEvent, [] )
				.then( function ( res ) {
					console.log( 'SUCCESS - Event', res );
				}, function ( err ) {
					console.error( 'ERROR - Event', err.message );
				} );
			
			$this.execute( queryContact, [] )
				.then( function ( res ) {
					console.log( 'SUCCESS - Contact', res );
				}, function ( err ) {
					console.error( 'ERROR - Contact', err.message );
				} );
			
			$this.execute( queryPicture, [] )
				.then( function ( res ) {
					console.log( 'SUCCESS - Picture', res );
				}, function ( err ) {
					console.error( 'ERROR - Picture', err.message );
				} );
		};
		
		$this.execute = function ( query, params ) {
			return $cordovaSQLite.execute( $this.db, query, params );
		};
		
		return $this;
	} );