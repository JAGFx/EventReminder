/**
 *
 * Create: 02/04/2017 16:26
 * Project: EventReminder
 * Package:
 * @author: SMITH Emmanuel <emmanuel.smith@jagfx.fr>
 *
 */

'use strict';

angular
	.module( 'er.contact.form', [ 'ui.router', 'ngCordova' ] )
	
	.config( function ( $stateProvider ) {
		$stateProvider
			.state( 'contactNew', {
				url:          '/contacts/new',
				templateUrl:  'views/contacts/form/contact.form.html',
				controller:   ContactNewCtrl,
				controllerAs: 'contactFormCtrl',
				resolve:      {
					contact: function () {
						var c = new iContact( '', '', '' );
						c.generateID();
						
						return c;
					}
				}
			} )
			
			.state( 'contactNewPin', {
				url:          '/contacts/new/pinTo/{id:string}/',
				templateUrl:  'views/contacts/form/contact.form.html',
				controller:   ContactNewPinCtrl,
				controllerAs: 'contactFormCtrl',
				resolve:      {
					event:   function ( $stateParams ) {
						console.log( $stateParams.id );
						
						// TODO Fetch from DB
						var e = new iEvent( 'Plop', '2017-04-24 17:24:32', 'un jolie petit texte' );
						e.generateID();
						
						return e;
					},
					contact: function () {
						var c = new iContact();
						c.generateID();
						
						return c;
					}
				}
			} )
			
			.state( 'contactEdit', {
				url:          '/contacts/{id:string}/edit',
				templateUrl:  'views/contacts/form/contact.form.html',
				controller:   ContactEdtiCtrl,
				controllerAs: 'contactFormCtrl',
				resolve:      {
					contact: function ( $stateParams, ContactFactory ) {
						console.log( $stateParams.id );
						
						return ContactFactory
							.findOneById( $stateParams.id );
						/*// TODO Fetch from DB
						 var c = new iContact( 'lstname', 'fstname', 'mail' );
						 c.generateID();
						 
						 return c;*/
					}
				}
			} );
	} );

function ContactNewPinCtrl( event, contact, ContactFactory ) {
	var $this = this;
	
	$this.validate = function ( valid ) {
		if ( valid ) {
			// TODO Set in DB
			/*event.contacts.push( $this.contact );*/
			ContactFactory
				.pinNewContact( event, $this.contact )
				.then( function ( data ) {
					console.log( 'Inserted' );
				}, function ( err ) {
					console.error( err.message );
				} );
			console.log( event.contacts );
		}
	};
	
	$this.init = function () {
		$this.type = 'Pin';
		
		$this.contact = contact;
	};
	
	$this.init();
}

function ContactNewCtrl( contact, ContactFactory ) {
	var $this     = this;
	$this.contact = {};
	
	$this.validate = function ( valid ) {
		if ( valid ) {
			// TODO Set in DB
			// TODO TOAST
			ContactFactory
				.insertContact( $this.contact )
				.then( function ( data ) {
					console.log( 'Inserted' );
				}, function ( err ) {
					console.error( err.message );
				} );
		}
	};
	
	$this.init = function () {
		console.log( 'iContact' );
		$this.type = 'Create';
		
		/*var c = new iContact();
		 c.generateID();*/
		$this.contact = contact;
	};
	
	$this.init();
}

function ContactEdtiCtrl( contact, ContactFactory ) {
	var $this = this;
	
	$this.validate = function ( valid ) {
		if ( valid ) {
			// TODO Update in DB
			ContactFactory.updateContact( $this.contact );
		}
	};
	
	$this.init = function () {
		$this.type    = 'Edit';
		$this.contact = contact;
	};
	
	$this.init();
}