$(document).ready(function () {

  //Initialize Firebase

  var config = {
    apiKey: "AIzaSyCANdEMcWBpaZcDNjtwaIkTj5JAjGAGlRg",
    authDomain: "gt-lol-test.firebaseapp.com",
    databaseURL: "https://gt-lol-test.firebaseio.com",
    projectId: "gt-lol-test",
    storageBucket: "gt-lol-test.appspot.com",
    messagingSenderId: "321790988998"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $(".btn").on("click", function (event) {
    event.preventDefault();
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    $("#trainName").empty();/////////////////////need this to work

    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      firstTrain: firstTrain,/////again, may not be needed in firebase
      //dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  })

  database.ref().on("child_added", function (snapshot) {
    var trainRow = $("<tr>");
    var $tdTrainName = $("<td>").text(snapshot.val().trainName);
    var $tdDestination = $("<td>").text(snapshot.val().destination);
    var $tdFrequency = $("<td>").text(snapshot.val().frequency);

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTrain, "HH:mm");
    
        // Current Time
        var currentTime = moment();
    
        // Difference between the times
      
        var diffTime = firstTimeConverted.diff(moment(), "minutes")
    
        // Time apart (remainder)
        var tRemainder = Math.abs(diffTime % frequency);
    
        // Minute Until Train
        var tMinutesTillTrain = frequency - tRemainder;
    
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    
        if ( firstTimeConverted > currentTime){
          var $tdMinutesTillTrain = $("<td>").text(diffTime);
          var $tdNextTrain = $("<td>").text(moment(firstTimeConverted).format("HH:mm"));
        } else {
          var $tdMinutesTillTrain = $("<td>").text(tMinutesTillTrain);
          var $tdNextTrain = $("<td>").text(moment(nextTrain).format("HH:mm"));
        }

    trainRow.append($tdTrainName);
    trainRow.append($tdDestination);
    trainRow.append($tdFrequency);
    trainRow.append($tdNextTrain);
    trainRow.append($tdMinutesTillTrain);
    $(".table").append(trainRow);
  })

  //database.ref().orderByChild(dataAdded)

  
});