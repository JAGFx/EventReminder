/**
 *
 * Create: 21/03/2017 22:16
 * Project: EventReminder
 * Package:
 * @author: SMITH Emmanuel <emmanuel.smith@jagfx.fr>
 *
 */

function Contact( lastname, firstname, email ) {
	this.lastname  = lastname;
	this.firstname = firstname;
	this.email = email;
	
	this.toString = function () {
		return this.firstname + ' ' + this.lastname + ' <' + this.email + '>';
	}
}