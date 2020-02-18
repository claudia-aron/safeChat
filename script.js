$(document).ready(function() {
	console.log('ready!');
	///================================///
	// Event listener for submit button
	///================================///

	$('.send').on('click', function() {
		// Store input value to variable called comment
		// Call classifyComment(comment)
	});

	///================================///
	// Event listener for generate button
	///================================///

	$('.send').on('click', function() {
		// Call getRandomSentence()
	});

	///=========================================================================================///
	// Function that takes in a random number and makes the right API call (getRandomSentence())
	///=========================================================================================///

	function getRandomSentence() {
		// Generate a random number from 1 to 2
		// If random number is 1 then call getCompliment()
		//// Store returned value to a variable called randomSentence
		// If random number is 2 then call get Insulty()
		//// Store returned value to a variable called randomSentence
		// Replace the input value to the value of randomSentence
	}

	///========================================================================///
	// Function for making an API request to Complementr API (getCompliment())
	///========================================================================///

	function getCompliment() {
		// AJAX request to https://complimentr.com/api
		// Wait for response
		// Return response
	}

	///===============================================================///
	// Function for making an API request to Insult API (getInsult())
	///===============================================================///

	function getInsult() {
		// AJAX request to https://evilinsult.com/generate_insult.php?lang=en&type=json
		// Wait for response
		// Return response
	}

	///========================================================================///
	// Function for making an API request to Tensorflow.js (classifyComment())
	///========================================================================///

	function classifyComment() {
		// Set prediction threshold
		// Load tensorflow model
		// Pass on parameter to model
		// Wait for response
		// Loop through response
		//// if probabilty is higher than 40
		////// Notify user of type of toxcity
		////// Notify user to try again
		//// if probabilty is lower than 40
		////// Add comment to the comment board
	}
});
