/* globals $ */
'use strict';

console.log('\'Allo \'Allo! Popup');

$('.radio').on('click change', function(){
	var name = $(this).attr('name');
	var val = $(this).val();
	console.log( name, val );
});

$('.range').on('input change', function(){
	var name = $(this).attr('name');
	var val = $(this).val();
	$('#refreshRateVal').text(val);
	console.log( name, val );
});