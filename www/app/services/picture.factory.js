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
		
		$this.takePicture = function ( iEventID ) {
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
				var pic = new Picture( iEventID, "data:image/jpeg;base64," + imageData );
				
				//TODO: Save on DB
				return pic;
				
			}, function ( err ) {
				return err;
			} );
		};
		
		return $this;
	} );