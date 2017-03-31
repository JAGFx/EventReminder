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
			event: '<',
			full:  '<'
		}
	} );

function EventCardController( CONSTANTS, EventFactory ) {
	var $this = this;
	
	$this.full    = $this.full || false;
	$this.picSize = CONSTANTS.PICTURES;
	
	$this.locateEvent = function () {
		console.debug( 'LOCATE EVENT' );
		// TODO Test on mobile
		
		EventFactory
			.locateEvent( $this.event )
			.then( function ( event ) {
				$this.event = event;
			} );
	};
}