$(document).ready(function() {
	///================================///
	// Event listener for collapsing sidebar
	///================================///

	$('.toggle').on('click', function() {
		$('.sideBar').toggle();
	});

	///================================///
	// Event listener for closing opened sidebar
	///================================///

	$('.closeMenu').on('click', function() {
		$('.sideBar').toggle();
	});

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
		const threshold = 0.2;

		toxicity.load(threshold).then(model => {
			const messages = [message];

			model
				.classify(messages)
				.then(predictions => {
					const toxicityFound = [];

					for (const prediction of predictions) {
						// console.log(prediction.results[0].probabilities[1]);
						const toxicityType = prediction.label;
						const toxicityProbability =
							prediction.results[0].probabilities[1] * 100;

						if (toxicityProbability > 20) {
							toxicityFound.push(toxicityType);
						}
						console.log(`${toxicityType}: ${toxicityProbability}%`);
					}

					return toxicityFound;
				})
				.then(toxicityFound => {
					console.log(toxicityFound);

					if (toxicityFound.length === 0) {
						$('.chatThread').append(
							`
								<div class="messageContainer">
									<img
										src="images/orlando-diggs.png"
										alt="Photo of a blonde woman with a black hat"
										class="avatar"
									/>
									<div class="message">
										<div class="messageInfo">
											<p class="user">Aron Tolentino</p>
											<p class="time">11:45PM</p>
										</div>
										<div class="messageContent">
											<p>
												${messages[0]}
											</p>
										</div>
									</div>
								</div>
							`
						);

						$('.chatThread').scrollTop($('.chatThread').height() + 500);
					} else {
						$('.chatThread').append(
							`
								<div class="messageContainer">
									<img
										src="images/safechat-avatar.png"
										alt="Photo of a blonde woman with a black hat"
										class="avatar"
									/>
									<div class="message">
										<div class="messageInfo">
											<p class="user">SafeChat Bot</p>
											<p class="time">11:45PM</p>
										</div>
										<div class="messageContent">
											<p>
												Oh no! It looks like you're about to say something that would make other people uncomfortable...
											</p>
											<p>
											<em>"${messages[0]}"</em> contains the following:
											</p>
										</div>
									</div>
								</div>
							`
						);

						for (const toxicity of toxicityFound) {
							if (toxicity === 'identity_attack') {
								$('.chatThread .messageContainer .messageContent')
									.last()
									.append(
										`<p>
												<strong>Identity Attack</strong> - You're discriminating against somebody based on one's gender, race, religion, and etc. Example: "Chritianity is stupid." My recommendation: "I want some explanation on this."
											</p>
										`
									);
							} else if (toxicity === 'insult') {
								$('.chatThread .messageContainer .messageContent')
									.last()
									.append(
										`<p>
											<strong>Insult</strong> - You're making a inflammatory comment towards somebody. Example: "You are an idiot." My recommendation: "Let's figure it out together."
										</p>
									`
									);
							} else if (toxicity === 'obscene') {
								$('.chatThread .messageContainer .messageContent')
									.last()
									.append(
										`<p>
											<strong>Obscene</strong> - You're making a inflammatory comment towards somebody. Example: "You are an idiot." My recommendation: "Let's figure it out together."
										</p>
									`
									);
							} else if (toxicity === 'severe_toxicity') {
								$('.chatThread .messageContainer .messageContent')
									.last()
									.append(
										`<p>
											<strong>Severe Toxicity</strong> - You're making a inflammatory comment towards somebody. Example: "You are an idiot." My recommendation: "Let's figure it out together."
										</p>
									`
									);
							} else if (toxicity === 'sexual_explicit') {
								$('.chatThread .messageContainer .messageContent')
									.last()
									.append(
										`<p>
											<strong>Sexual Explicit</strong> - You're making a inflammatory comment towards somebody. Example: "You are an idiot." My recommendation: "Let's figure it out together."
										</p>
									`
									);
							} else if (toxicity === 'threat') {
								$('.chatThread .messageContainer .messageContent')
									.last()
									.append(
										`<p>
											<strong>Threat</strong> - You're making a inflammatory comment towards somebody. Example: "You are an idiot." My recommendation: "Let's figure it out together."
										</p>
									`
									);
							} else if (toxicity === 'toxicity') {
								$('.chatThread .messageContainer .messageContent')
									.last()
									.append(
										`<p>
											<strong>Toxicity</strong> - You're making a inflammatory comment towards somebody. Example: "You are an idiot." My recommendation: "Let's figure it out together."
										</p>
									`
									);
							}
						}

						$('.chatThread .messageContainer .messageContent')
							.last()
							.append(`<p>Please keep these in mind and try again!</p>`);

						$('.chatThread').scrollTop($('.chatThread').height() + 500);
					}
				});
		});
	}
});
