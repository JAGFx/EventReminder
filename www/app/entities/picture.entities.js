/**
 *
 * Create: 28/03/2017 21:20
 * Project: EventReminder
 * Package:
 * @author: SMITH Emmanuel <emmanuel.smith@jagfx.fr>
 *
 */

function Picture( iEventID, value ) {
	this.id = null;
	this.value   = value;
	this.eventID = iEventID;
	
	this.generateID = function () {
		this.id = Math.random().toString( 16 ).substring( 2, 15 ) + Math.random().toString( 16 ).substring( 2, 15 );
	};
}