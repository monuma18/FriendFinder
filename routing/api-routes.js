// ===============================================================================
// LOAD DATA
// Linking the routes to "data" sources that hold the array friends data
// ===============================================================================

var friends = require('../app/data/friends');

module.exports = function (app) {
  // //api path to get the friends data, responds with a json object (an array of friends). Activated on both html pages with blue API Link
  app.get('/api/friends', function (req, res) {
    res.json(friends);
  });

  // *** Updates an array of friends "database" array and sends back the json form of the most compatible new friend
  app.post('/api/friends', function (req, res) {
    var userInputMessageBodyObject = req.body;
    var currentTable = friends;

    console.log(currentTable)
    //store the total difference
    var totalDifference = 0;

    //store the result for each substraction from the scores
    var result = 0;

    //make a new array to store another array of obects with
    //total difference in the scores
    var newTablewithTotalDifference = []


    //outer for loop to iterate the entire array of object from table
    for (var i = 0; i < currentTable.length; i++) {

      //reset the total difference for the next object person
      totalDifference = 0;

      //inner for loop to calculate the new Person from the user Input off req.body
      for (var j = 0; j < userInputMessageBodyObject.scores.length; j++) {

        //subtract each object score from first element to the last element of the array
        result = parseFloat(currentTable[i].scores[j]) - parseFloat(userInputMessageBodyObject.scores[j])

        //sum up the subtraction and stores in totatdifference
        //and change the values to be positive
        totalDifference += Math.abs(result)
      }

      //inserts into a new array of object for sorting the least total difference
      newTablewithTotalDifference.push({
        name: currentTable[i].name,
        totalDifference: totalDifference,
        photo: currentTable[i].photo
      })
    }

    //add a new person to our table from 
    //userInput that is stored in req.body
    currentTable.push(userInputMessageBodyObject);

    //sorts the new array of object against the total difference
    newTablewithTotalDifference.sort(function (a, b) {
      return a.totalDifference - b.totalDifference
    })

    console.log(newTablewithTotalDifference)

    //returns first element and response back the total least difference to the           //client during the post request 
    res.json(newTablewithTotalDifference[0]);

  });

};