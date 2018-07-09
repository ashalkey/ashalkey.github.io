var config = {
  apiKey: "AIzaSyDchSfg2u3rdf5MR769fjt7jN5SVb68mJM",
  authDomain: "publictransportationscheduler.firebaseapp.com",
  databaseURL: "https://publictransportationscheduler.firebaseio.com",
  projectId: "publictransportationscheduler",
  storageBucket: "publictransportationscheduler.appspot.com",
  messagingSenderId: "210194199920"
};

firebase.initializeApp(config);

var database = firebase.database();

$('#submit-button').click(function (event) {

  event.preventDefault();

  var serviceName = $('#service-name').val().trim();
  var serviceType = $('#service-type').val().trim();
  var destination = $('#destination').val().trim();
  var firstArrival = $('#first-arrival').val().trim();
  var frequency = $('#frequency').val().trim();

  var newService = {
    sName: serviceName,
    sType: serviceType,
    sDestination: destination,
    sFirstArrival: firstArrival,
    sFrequency: frequency
  }
  justPushed = database.ref().push(newService);

  $('#service-name').val('');
  $('#service-type').val('');
  $('#destination').val('');
  $('#first-arrival').val('');
  $('#frequency').val('');

});

database.ref().on('child_added', function (childSnapshot) {

  var serviceName = childSnapshot.val().sName;
  var serviceType = childSnapshot.val().sType;
  var destination = childSnapshot.val().sDestination;
  var firstArrival = childSnapshot.val().sFirstArrival;
  var frequency = childSnapshot.val().sFrequency;

  var convertedFirstArrival = moment(firstArrival, 'H:mm').subtract(1, 'years');


  var timeDifference = moment().diff(moment(convertedFirstArrival), 'minutes');

  timeRemainder = timeDifference % frequency;

  var minutesAway = frequency - timeRemainder;
  var nextArrivalTime = moment().add(minutesAway, 'minutes').format('hh:mm A');

  var removeButton = $('<button>').text('remove')
    .addClass('btn remove-button')
    .attr('id', childSnapshot.key)
    .click(function () {
      database.ref().child($(this).attr('id')).remove();
      $(this).remove();
      $('#row' + $(this).attr('id')).remove();

    });
  var newRow = $('<tr>').attr('id', 'row' + childSnapshot.key).append(
    $('<td>').text(serviceName),
    $('<td>').text(serviceType),
    $('<td>').text(destination),
    $('<td>').text(frequency),
    $('<td>').text(nextArrivalTime),
    $('<td>').text(minutesAway),
    removeButton
  );
  $('#current-schedule').append(newRow);

});
