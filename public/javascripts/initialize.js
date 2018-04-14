$( document ).ready(function() {

  $(document).ready(function() {
    $('select').material_select();
  });


  $('.datepicker').pickadate({

    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: false,
    close: 'Ok',
    format: 'yyyy-mm-dd',
    closeOnSelect: false // Close upon selecting a date,
  });

});
