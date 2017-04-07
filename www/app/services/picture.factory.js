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
	.factory( 'PictureFactory', function ( $cordovaCamera, SQLiteFactory, CONSTANTS ) {
		var $this = this;
		
		$this.insertPicture = function ( picture ) {
			var query  = 'INSERT INTO Picture VALUES ( ?, ?, ? )';
			var params = [ picture.id, picture.value, picture.eventID ];
			
			// TODO Dialog + Toast
			
			return SQLiteFactory
				.execute( query, params )
				.then( function ( data ) {
					console.log( data );
				}, function ( err ) {
					console.error( err.message );
				} );
		};
		
		$this.takePicture = function ( event ) {
			var options = {
				quality:            50,
				destinationType:    Camera.DestinationType.DATA_URL,
				sourceType:         Camera.PictureSourceType.CAMERA,
				allowEdit:          true,
				encodingType:       Camera.EncodingType.JPEG,
				targetWidth:        CONSTANTS.PICTURES.WIDTH,
				targetHeight:       CONSTANTS.PICTURES.HEIGHT,
				popoverOptions:     CameraPopoverOptions,
				saveToPhotoAlbum:   false,
				correctOrientation: true
			};
			
			return $cordovaCamera.getPicture( options ).then( function ( imageData ) {
				var pic = new Picture( event.id, "data:image/jpeg;base64," + imageData );
				pic.generateID();
				event.pictures.push( pic );
				
				//TODO: Save on DB
				return pic;
				
			}, function ( err ) {
				return err;
			} );
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