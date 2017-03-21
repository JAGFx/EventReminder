'use strict';

angular
	.module( 'myApp.view1', [ 'ui.router', 'ngCordova' ] )
	
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'view1', {
			url:          '/view1',
			templateUrl:  'view1/view1.html',
			controller:   View1Ctrl,
			controllerAs: 'viewCtrl'
		} );
	} );

function View1Ctrl( $cordovaCamera, $cordovaContacts, $cordovaGeolocation, $log ) {
	var $this = this;
	
	$this.img     = null;
	$this.contact = null;
	$this.geoloc  = {
		lat: 0,
		lon: 0
	};
	
	/* ================================================= CAMERA PHOTO */
	$this.getPicture = function () {
		var options = {
			quality:            50,
			destinationType:    Camera.DestinationType.DATA_URL,
			sourceType:         Camera.PictureSourceType.CAMERA,
			allowEdit:          true,
			encodingType:       Camera.EncodingType.JPEG,
			targetWidth:        100,
			targetHeight:       100,
			popoverOptions:     CameraPopoverOptions,
			saveToPhotoAlbum:   false,
			correctOrientation: true
		};
		
		$cordovaCamera.getPicture( options ).then( function ( imageData ) {
			/*var image = document.getElementById( 'myImage' );
			 image.src = "data:image/jpeg;base64," + imageData;*/
			
			$this.img = "data:image/jpeg;base64," + imageData;
		}, function ( err ) {
			// error
		} );
	};
	
	/* ================================================= PICK CONTACT */
	$this.pickContactUsingNativeUI = function () {
		$cordovaContacts.pickContact().then( function ( contactPicked ) {
			$this.contact = contactPicked;
			$log.log( $this.contact );
		} );
	};
	
	/* ================================================= GEOLOCATION */
	$this.geolocationDevice = function () {
		var posOptions = { timeout: 10000, enableHighAccuracy: true };
		$cordovaGeolocation
			.getCurrentPosition( posOptions )
			.then( function ( position ) {
				console.log( 'Init', position );
				$this.geoloc = {
					lat:  position.coords.latitude,
					long: position.coords.longitude
				};
			}, function ( err ) {
				console.error( err.message );
			} );
		
		var watchOptions = {
			timeout:            3000,
			enableHighAccuracy: true // may cause errors if true
		};
		
		var watch = $cordovaGeolocation.watchPosition( watchOptions );
		watch.then(
			function ( data ) {
				console.log( 'Watch data', data );
			},
			function ( err ) {
				console.error( err.message );
			},
			function ( position ) {
				console.log( 'Callback', position );
				$this.geoloc = {
					lat:  position.coords.latitude,
					long: position.coords.longitude
				};
			} );
		
		/*watch.clearWatch();*/
	};
	
	document.addEventListener( "deviceready", function () {
		/* ================================================= PICK CONTACT */
		//$this.pickContactUsingNativeUI();
		
		/* ================================================= CAMERA PHOTO */
		//$this.getPicture();
		
		/* ================================================= GEOLOCATION */
		$this.geolocationDevice();
		
	}, false );
}