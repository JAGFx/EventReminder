/**
 *
 * Create: 25/03/2017 20:46
 * Project: EventReminder
 * Package:
 * @author: SMITH Emmanuel <emmanuel.smith@jagfx.fr>
 *
 */

'use strict';

angular
	.module( 'eventReminderApp' )
	.component( 'eventcard', {
		templateUrl: 'components/event-card/event-card.component.html',
		controller:  EventCardController,
		bindings:    {
			event: '=',
			full:  '<'
		}
	} );

function EventCardController( CONSTANTS ) {
	var $this = this;
	
	$this.full    = $this.full || false;
	$this.picSize = CONSTANTS.PICTURES;
}