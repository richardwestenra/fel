'use strict';

// Default settings
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
	$('.message').html(msg).slideDown(200);
	clearTimeout(timeout);
	timeout = setTimeout(function() {
		$('.message').slideUp(600);
	}, 5000);
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
		message('Setting saved. <a href="#" class="reload">Reload page</a> to see your changes.');
	});
}

function setRangeText(val){
	var text = val / 1000 + ' seconds'; // convert to secs
	if (val === 1000 ) {
		text = '1 second';
	} else if ( val < 1000) {
		text = val + ' ms';
	}
	$('#refreshRateVal').text(text);
}

function updateFormValues(){
	$('.radioRow').each(function(){
		var name = $(this).find('input').first().attr('name');
		var value = options[name];
		$(this).find('input')
			.attr('checked', false)
			.filter('[value="'+value+'"]')
			.attr('checked', true);
	});

	$('.range').each(function(){
		var name = $(this).attr('name');
		var value = options[name];
		setRangeText(value);
		value /= 10;
		$(this).val( value );
	});
}

function getInputEvents(){
	$('input').on('input click change', function(){
		var name = $(this).attr('name');
		var val = convertType( $(this).val() );
		if ($(this).hasClass('range')) {
			val *= 10; // convert to time in ms
			setRangeText(val);
		}
		saveChanges(name, val);
	});
	$('.message').on('click','.reload',function(e){
		e.preventDefault();
		chrome.tabs.reload();
	});
}

function loadChanges() {
	storage.get('fel', function(items) {
		if (items.fel) {
			options = items.fel;
			updateFormValues();
			// message('Loaded saved settings.');
			getInputEvents();
		}
	});
}



loadChanges();



