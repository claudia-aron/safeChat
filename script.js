$(document).ready(function() {
	///================================///
	// Event listener for submit button
	///================================///

	$('.send').on('click', function(e) {
		// Store input value to variable called message
		e.preventDefault();
		const message = $('.inputMessage').val();
		console.log(message);

		// Call classifyMessage() with store variable
		classifyMessage(message);
	});

	///================================///
	// Event listener for generate button
	///================================///

	$('.generate').on('click', function(e) {
		e.preventDefault();

		// Call getRandomSentence()
		getRandomSentence();
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

		const randomNumber = Math.floor(Math.random() * 2) + 1;

		console.log(randomNumber);

		if (randomNumber === 1) {
			$.ajax({
				url: 'https://complimentr.com/api',
				method: 'GET',
				dataType: 'json'
			}).then(function(res) {
				const randomCompliment = res.compliment;

				// Replace input value with random compliment
				$('.inputMessage').val(randomCompliment);
			});
		} else {
			$.ajax({
				url: 'https://amused.api.stdlib.com/insult@1.0.0/',
				method: 'GET',
				dataType: 'json'
			}).then(function(res) {
				const randomInsult = res;
				// Replace input value with random compliment
				$('.inputMessage').val(randomInsult);
			});
		}
	}

	///========================================================================///
	// Function for making an API request to Tensorflow.js (classifyComment())
	///========================================================================///

	// WORKING TENSOR FLOW
	function classifyMessage(message) {
		// The minimum prediction confidence.
		const threshold = 0.9;

		// Load the model. Users optionally pass in a threshold and an array of
		// labels to include.
		toxicity.load(threshold).then(model => {
			const sentences = [message];

			model.classify(sentences).then(predictions => {
				console.log(predictions);

				$('.chatThread').append(
					`
						<div class="messageContainer">
							<img
								src="images/aada-laine.png"
								alt="Photo of a blonde woman with a black hat"
								class="avatar"
							/>
							<div class="message">
								<div class="messageInfo">
									<p class="user">Aada Laine</p>
									<p class="time">11:45PM</p>
								</div>
								<div class="messageContent">
									<p>
										@har_adams wow it’s amazing, I want to buy a van and
										travelling next year
									</p>
								</div>
							</div>
						</div>
					`
				);
			});
		});
	}
});

// `You could be ‘cyberbullying’ someone, as it is ${toxicityType}.`

// Explanation of toxicity
// identity attack:
// insult:
// obscene:
// severe toxicity:
// sexual explicit:
// threat:
// toxicity:

// Bad example
// Better recommendation
// Give it another thought and try again.
