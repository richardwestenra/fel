'use strict';

$(function(){

	var options = {
		hostname: ['www.eventbrite.com','www.eventbrite.co.uk'],
		tickets: 2,
		autobuy: false,
		refresh: false,
		refreshRate: 1000
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
	var $button = $('#OrderReg').find('a');

	if ($select.length) {
		console.log('Ordering ' + options.tickets + ' tickets');

		$select.val(options.tickets);

		if (options.autobuy) {
			$button.trigger('click');
		}

	} else if (options.refresh) {
		console.log('Refreshing in 1 second...');

		window.setTimeout(function(){
			console.log('Refreshing!');
			window.location.reload();
		}, options.refreshRate);

	}

})();