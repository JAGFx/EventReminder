/**
 *
 * Create: 21/03/2017 22:16
 * Project: EventReminder
 * Package:
 * @author: SMITH Emmanuel <emmanuel.smith@jagfx.fr>
 *
 */

function iContact( lastname, firstname, email ) {
	this.id = null;
	this.lastname  = lastname;
	this.firstname = firstname;
	this.email  = email;
	this.mobile = null;
	
	this.toString = function () {
		var str = this.firstname + ' ' + this.lastname;
		if ( this.email )
			str += ' <' + this.email + '>';
		
		return str;
	};
	
	this.generateID = function () {
		this.id = Math.random().toString( 16 ).substring( 2, 15 ) + Math.random().toString( 16 ).substring( 2, 15 );
	};
	
	this.setMobile = function ( mobile ) {
		this.mobile = mobile;
	};
}