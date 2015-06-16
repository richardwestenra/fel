'use strict';

console.log('\'Allo \'Allo! Popup');

$('.radio').on('click change', function(){
	console.log( $(this).attr('name'), $(this).val() );
});