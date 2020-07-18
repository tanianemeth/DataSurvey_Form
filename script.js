
$( document ).ready(function() {
  const results_container = $('#results_container');
  const form_container = $('#form_container');

  const survey_form = $('#survey_form');
  survey_form.submit(function(event) {
    event.preventDefault();
    const data_array = $( this ).serializeArray();
    const form_data = {};
    for (let input of data_array) {
      form_data[input.name] = input.value;
    }
  
    $('#name_display').text(form_data['first_name'] + ' ' + form_data['last_name']);
    $('#dob_display').text(form_data['dob']);
    $('#phone_display').text(form_data['telephone']);
    $('#education_display').text("Education Level:" + ' ' + form_data['education_level']);
    $('#height_display').text("Height:" + ' ' + form_data['height']);
    console.log(form_data);
    $('#email_display').text(form_data['confirm_email']);

    const geocode_address = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(form_data['address']) + "&key=AIzaSyC-P74cfRDQYyGpjE7t7n-T8pTHJR-bEhc";

    $.get(geocode_address, function( data ) {
      const location = data.results[0].geometry.location;
      console.log(location);
      const formatted_address = data.results[0].formatted_address;
      $('#address_display').text(formatted_address);
      map = new google.maps.Map(document.getElementById("map"), {
        center: location, zoom: 15
      });
      var marker = new google.maps.Marker({
    position: location,
    map: map,

  });
    });

    results_container.removeClass('d-none');
    form_container.addClass('d-none');
  });
});
