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
			.state( 'contactNewPin', {
				url:          '/contacts/new/pinTo/{id:string}/',
				templateUrl:  'views/contacts/form/contact.form.html',
				controller:   ContactNewCtrl,
				controllerAs: 'contactFormCtrl',
				resolve:      {
					event: function ( $stateParams ) {
						console.log( $stateParams.id );
						
						// TODO Fetch from DB
						var e = new iEvent( 'Plop', '2017-04-24', 'un jolie petit texte' );
						e.generateID();
						
						return e;
					}
				}
			} )
			
			.state( 'contactEdit', {
				url:          '/contacts/{id:string}/edit',
				templateUrl:  'views/contacts/form/contact.form.html',
				controller:   ContactEdtiCtrl,
				controllerAs: 'contactFormCtrl',
				resolve:      {
					contact: function ( $stateParams ) {
						console.log( $stateParams.id );
						
						// TODO Fetch from DB
						var c = new Contact( 'lstname', 'fstname', 'mail' );
						c.generateID();
						
						return c;
					}
				}
			} );
	} );

function ContactNewCtrl( event ) {
	var $this = this;
	
	$this.validate = function ( valid ) {
		if ( valid ) {
			// TODO Set in DB
			event.contacts.push( $this.contact );
			console.log( event.contacts );
		}
	};
	
	$this.init = function () {
		$this.type = 'Pin';
		
		$this.contact = new Contact( '', '', '' );
		$this.contact.generateID();
	};
	
	$this.init();
}

function ContactEdtiCtrl( contact ) {
	var $this = this;
	
	$this.validate = function ( valid ) {
		if ( valid ) {
			// TODO Update in DB
			console.log( $this.contact );
		}
	};
	
	$this.init = function () {
		$this.type    = 'Edit';
		$this.contact = contact;
	};
	
	$this.init();
}