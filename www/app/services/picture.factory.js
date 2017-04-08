/**
 *
 * Create: 21/03/2017 21:45
 * Project: EventReminder
 * Package:
 * @author: SMITH Emmanuel <emmanuel.smith@jagfx.fr>
 *
 */

'use strict';

angular
	.module( 'eventReminderApp' )
	.factory( 'PictureFactory', function ( CordovaFactory, SQLiteFactory ) {
		var $this = this;
		
		$this.insertPicture = function ( picture ) {
			var query  = 'INSERT INTO Picture VALUES ( ?, ?, ? )';
			var params = [ picture.id, picture.value, picture.eventID ];
			
			return SQLiteFactory
				.execute( query, params )
				.then( function ( data ) {
					//console.log( data );
					
				}, function ( err ) {
					console.error( err.message );
					CordovaFactory.alertDialog( CONSTANTS.CORDOVA.DIALOG_ERROR_TITLE, err.message );
				} );
		};
		
		$this.takePicture = function ( event ) {
			return CordovaFactory
				.takePicture()
				.then( function ( dataPicture ) {
					var pic = new Picture( event.id, dataPicture );
					pic.generateID();
					
					event.pictures.push( pic );
					
					return pic;
				} )
		};
		
		$this.makeObject = function ( data ) {
			if ( !data )
				return new Picture();
			
			var p = new Picture( data.eventID, data.value );
			p.id  = data.id;
			
			return p;
		};
		
		return $this;
	} );