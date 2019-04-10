$(document).ready(function(){

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
  
    $(".btn").on("click", function(event){
        event.preventDefault();
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#firstTrain").val().trim();///////this doesnt need to be stored in firebase
        frequency = $("#frequency").val().trim();
        $("#trainName").empty();/////////////////////need this to work
  
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency, 
            //dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    })
  
    database.ref().on("child_added", function(snapshot){
      console.log(snapshot.val().trainName)
      var trainRow = $("<tr>");
      var $tdTrainName = $("<td>").text(snapshot.val().trainName);
      var $tdDestination = $("<td>").text(snapshot.val().destination);
      var $tdFirstTrain = $("<td>").text(snapshot.val().firstTrain);
      var $tdFrequency = $("<td>").text(snapshot.val().frequency);
      trainRow.append($tdTrainName);
      trainRow.append($tdDestination);
      trainRow.append($tdFirstTrain);
      trainRow.append($tdFrequency);
      $(".table").append(trainRow);
    })
    
    
    //database.ref().orderByChild(dataAdded)
  
  
  });


  var date = moment();
console.log(date.format('MM/DD/YYYY'));
console.log(date.format('DD/MM/YYYY'));
console.log(date.format('x'));
console.log(date.diff(today, 'days'));