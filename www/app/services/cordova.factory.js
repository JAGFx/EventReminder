/**
 *
 * Create: 08/04/2017 11:57
 * Project: EventReminder
 * Package:
 * @author: SMITH Emmanuel <emmanuel.smith@jagfx.fr>
 *
 */

'use strict';

angular
	.module( 'eventReminderApp' )
	.factory( 'CordovaFactory', function ( CONSTANTS,
										   $cordovaCamera,
										   $cordovaContacts,
										   $cordovaGeolocation,
										   $cordovaToast,
										   $cordovaDialogs,
										   $cordovaDatePicker ) {
		var $this = this;
		
		/**
		 *
		 * @returns {*}
		 */
		$this.takePicture = function () {
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
			
			return $cordovaCamera
				.getPicture( options )
				.then( function ( imageData ) {
					return "data:image/jpeg;base64," + imageData;
					
				}, function ( err ) {
					return err;
				} );
		};
		
		/**
		 *
		 * @returns {*}
		 */
		$this.pickContact = function () {
			return $cordovaContacts
				.pickContact();
		};
		
		$this.getCurrentPosition = function () {
			var posOptions = { timeout: 10000, enableHighAccuracy: false };
			
			return $cordovaGeolocation
				.getCurrentPosition( posOptions )
				.then( function ( position ) {
					console.log( 'Init', position );
					return position;
					
				}, function ( err ) {
					return err;
				} );
		};
		
		$this.toast = function ( message ) {
			$cordovaToast.showLongBottom( message );
		};
		
		$this.alertDialog = function ( title, message ) {
			$cordovaDialogs.alert( message, title, 'OK' );
		};
		
		$this.datePicker = function () {
			var options = {
				date:          new Date(),
				mode:          'date',
				minDate:       new Date(),
				allowOldDates: false
			};
			
			return $cordovaDatePicker.show( options );
		};
		
		return $this;
	} );