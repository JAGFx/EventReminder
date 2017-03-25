/**
 *
 * Create: 21/03/2017 22:05
 * Project: EventReminder
 * Package:
 * @author: SMITH Emmanuel <emmanuel.smith@jagfx.fr>
 *
 */

function iEvent( title, date, text ) {
	this.date     = date;
	this.title    = title;
	this.text     = text;
	this.contacts = [];
	this.pictures = [];
	this.location = {
		lat:  0,
		long: 0
	};
}