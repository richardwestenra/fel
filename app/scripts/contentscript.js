'use strict';

(function(){

	var options = {
		hostname: 'www.eventbrite.com',
		tickets: 2,
		autobuy: false,
		refresh: false,
		refreshRate: 1000
	};

	var select = document.querySelectorAll('#TicketReg select');

	// Don't refresh on different hostnames
	if (options.hostname !== window.location.hostname) {
		return;
	}

	if (select.length) {
		console.log('Ordering ' + options.tickets + ' tickets');

		for (var i = 0; i < select.length; ++i) {
			select[i].value = options.tickets;
		}

		var button = document.querySelectorAll('#OrderReg .cta_container a')[0];
		console.log(button);
		if (options.autobuy) {
			button.click();
		}
		button.textContent = 'foo'; //nbed

	} else if (options.refresh) {
		console.log('Refreshing in 1 second...');

		window.setTimeout(function(){
			console.log('Refreshing!');
			window.location.reload();
		}, options.refreshRate);

	}

})();