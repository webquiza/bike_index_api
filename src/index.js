import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { searchBike } from './js/bike.js';

function displayData(response) {
  console.log(response.bikes[0].manufacturer_name);
  $('#stolen-locale').text(`The last known location: ${response.bikes[0].stolen_location}`);
  $('#manufac').text(`Manufacturer: ${response.bikes[0].manufacturer_name}`);
  if (response.bikes[0].year === null) {
    $('#bikemodelyear').text('The model year was not provided');
  }else {
    $('#bikemodelyear').text(`Bikes model year: ${response.bikes[0].year}`);
  }
}

function clearFields() {
  $('#zipcode').val("");
  $('#distance').val("");
}

$(document).ready(function() {
  $('#find').click(function(event) {
    event.preventDefault();
    let zipCode = $('#zipcode').val();
    let distance = $('#distance').val();
    clearFields();
    searchBike.findBike(zipCode, distance)
      .then(function(response) {
        displayData(response);
        $('#map').append(`<iframe
        width="600"
        height="450"
        style="border:0"
        loading="lazy"
        allowfullscreen
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAjCRHRQqmp9LmSoK4HNXjvWESoxtgBOKs&q=${response.bikes[0].stolen_location}">
      </iframe>`);
      });
  });
});