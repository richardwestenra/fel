'use strict';

var options = {
	hostname: ['www.eventbrite.com','www.eventbrite.co.uk'],
	tickets: 2,
	autobuy: false,
	refresh: false,
	refreshRate: 10
};

var storage = chrome.storage.local;

var timeout;
function message(msg) {
	$('.message').text(msg).slideDown(200);
	clearTimeout(timeout);
	timeout = setTimeout(function() {
		$('.message').slideUp(600);
	}, 3000);
}

// Convert strings to Boolean/number values
function convertType(val) {
	if (val === 'true') {
		return true;
	} else if (val === 'false') {
		return false;
	} else if ( typeof +val === 'number') {
		return +val;
	}
	return val;
}

function saveChanges(key, value) {
	options[key] = value;
	// Save it using the Chrome extension storage API.
	storage.set({'fel': options}, function() {
		// Notify that we saved.
		message('Setting saved: '+key+' = '+value+'. Reload page to see changes.');
	});
}

function loadChanges() {
	storage.get('fel', function(items) {
		if (items.fel) {
			options = items.fel;
			message('Loaded saved settings.');
		}
	});
}



loadChanges();


$('input').on('input click change', function(){
	var name = $(this).attr('name');
	var val = convertType( $(this).val() );
	if ($(this).hasClass('range')) {
		val *= 10; // convert to time in ms
		var text = val / 1000 + ' seconds'; // convert to secs
		if (val === 1000 ) {
			text = '1 second';
		} else if ( val < 1000) {
			text = val + ' ms';
		}
		$('#refreshRateVal').text(text);
	}
	saveChanges(name, val);
});

