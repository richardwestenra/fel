'use strict';

(function(){

	var options = {};
	var storage = chrome.storage.local;

	var $select = $('#TicketReg').find('select');
	var $button = $('#primary_cta').find('a');
	if (!$button.length) { // backup just in case
		$button = $('#OrderReg').find('a');
	}


	function isCorrectHost(){
		return options.hostname.indexOf(window.location.hostname) > -1;
	}

	function refresh(){
		console.log('Refreshing in '+options.refreshRate+'ms...');
		window.setTimeout(function(){
			console.log('Refreshing!');
			window.location.reload();
		}, options.refreshRate);
	}


	function init(){
		if (!isCorrectHost()) {
			return;
		}

		if ($select.length) {
			console.log('Ordering ' + options.tickets + ' tickets');

			$select.val(options.tickets);

			if (options.autobuy) {
				$button[0].click();
			}

		} else if (options.refresh) {
			refresh();
		}
	}

	function loadChanges() {
		storage.get('fel', function(items) {
			if (items.fel) {
				options = items.fel;
			}
			init();
		});
	}

	loadChanges();


})();