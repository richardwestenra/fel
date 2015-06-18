'use strict';

(function(){

	var options = {
		hostname: ['www.eventbrite.com','www.eventbrite.co.uk'],
		tickets: 2,
		autobuy: false,
		refresh: false,
		refreshRate: 10
	};
	// options.autobuy = true;
	// options.refresh = true;


	// Don't refresh on different hostnames
	function isCorrectHost(){
		return options.hostname.indexOf(window.location.hostname) > -1;
	}
	if (!isCorrectHost()) {
		return;
	}

	var $select = $('#TicketReg').find('select');
	var $button = $('#primary_cta').find('a');
	if (!$button.length) { // backup just in case
		$button = $('#OrderReg').find('a');
	}

	if ($select.length) {
		console.log('Ordering ' + options.tickets + ' tickets');

		$select.val(options.tickets);

		if (options.autobuy) {
			$button[0].click();
		}

	} else if (options.refresh) {
		console.log('Refreshing in 1 second...');

		window.setTimeout(function(){
			console.log('Refreshing!');
			window.location.reload();
		}, options.refreshRate);

	}

})();