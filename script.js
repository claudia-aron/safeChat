const safeChat = {};

safeChat.initEventListeners = function() {
	///=====================================///
	// Event listener for collapsing sidebar
	///=====================================///
	$('.container').on('click', '.toggle', function() {
		$('.sideBar').toggle();
	});

	///=========================================///
	// Event listener for closing opened sidebar
	///=========================================///
	$('.container').on('click', '.closeMenu', function() {
		$('.sideBar').toggle();
	});

	///================================///
	// Event listener for submit button
	///================================///
	$('.container').on('click', '.send', function(e) {
		e.preventDefault();
		const message = $('.inputMessage').val();
		console.log(message);

		safeChat.classifyMessage(message);

		$('.inputMessage').val('');
	});

	///=========================================///
	// Event listener for enter key in text area
	///=========================================///
	$('.container').on('keypress', '.inputMessage', function(e) {
		if (e.key === 'Enter' || e.keyCode === '13') {
			e.preventDefault();
			const message = $('.inputMessage').val();
			console.log(message);

			safeChat.classifyMessage(message);

			$('.inputMessage').val('');
		}
	});

	///==================================///
	// Event listener for generate button
	///==================================///

	$('.container').on('click', '.generate', function(e) {
		e.preventDefault();

		// Call getRandomSentence()
		getRandomSentence();
	});
};

///=======================///
// Initialize landing page
///=======================///

safeChat.initLanding = function() {
	$('.container').empty();

	const landingHTML = `
		<div class="top">
				<div class="landingHeader">
					<div class="name">
						<img
							class="logo"
							src="images/safechat-avatar.png"
							alt="SafeChat avatar"
						/>
						<h1>SafeChat + Slack</h1>
					</div>
					<h2 class="slogan">
						Enjoy a safe and comfortable messaging environment
					</h2>
					<div class="toDemoContainer">
						<a class="toDemo" href="/#/demo">Try SafeChat</a>
					</div>
				</div>
				<!-- Main -->
				<main class="landingMain">
					<div class="examples">
						<img
							class="screenShot"
							src="images/chat.jpg"
							alt="SafeChat screenshot"
						/>
						<img
							class="botMessage"
							src="images/safechat-bot-message.jpg"
							alt="SafeChat Bot message to users for toxic comments"
						/>
					</div>
					<div class="avatarContainer">
						<img
							class="landingAvatar"
							src="images/avatar-1.png"
							alt="red-haired woman smiling"
						/>
						<img
							class="landingAvatar"
							src="images/avatar-2.png"
							alt="brown-haired man in a suit smiling"
						/>
						<img
							class="landingAvatar"
							src="images/avatar-3.png"
							alt="brown-haired man with glasses smiling"
						/>
						<img
							class="landingAvatar"
							src="images/avatar-4.png"
							alt="blonde woman smiling"
						/>
					</div>
				</main>
			</div>
			<!-- Footer -->
			<footer>
				<p>© 2020 Aron Tolentino, Claudia Ahn</p>
			</footer>
	`;

	$('.container').css('display', 'block');
	$('.container').append(landingHTML);
};

///====================///
// Initialize demo page
///====================///

safeChat.initDemo = function() {
	$('.container').empty();

	const demoHTML = `
			<!-- <a href="#maincontent" class="visuallyHidden">Skip to main content</a> -->
			<!-- Side bar -->
			<aside class="sideBar">
				<i class="fas fa-times closeMenu"></i>
				<h1>Juno College</h1>
				<!-- Channel List -->
				<div class="channels">
					<h3>Channel</h3>
					<ul>
						<li><p># general</p></li>
						<li><p># memes</p></li>
					</ul>
				</div>
				<!-- Friends List -->
				<div class="friends">
					<h3>Friends</h3>
					<ul>
						<li>
							<img
								src="https://randomuser.me/api/portraits/thumb/men/88.jpg"
								alt="User portrait photo"
								class="avatar"
							/>
							<p>Clifford Kelly</p>
						</li>
						<li>
							<img
								src="https://randomuser.me/api/portraits/thumb/men/90.jpg"
								alt="User portrait photo"
								class="avatar"
							/>
							<p>Holger Noack</p>
						</li>
						<li>
							<img
								src="https://randomuser.me/api/portraits/thumb/men/53.jpg"
								alt="User portrait photo"
								class="avatar"
							/>
							<p>Wilko Bernhard</p>
						</li>
						<li>
							<img
								src="https://randomuser.me/api/portraits/thumb/women/1.jpg"
								alt="User portrait photo"
								class="avatar"
							/>
							<p>Lia Nicolas</p>
						</li>
						<li>
							<img
								src="https://randomuser.me/api/portraits/thumb/women/3.jpg"
								alt="User portrait photo"
								class="avatar"
							/>
							<p>Noora Rosvoll</p>
						</li>
					</ul>
				</div>
				<!-- Bots List -->
				<div class="bots">
					<h3>Bots</h3>
					<ul>
						<li>
							<img
								src="images/safechat-avatar.png"
								alt="Safechat icon"
								class="avatar"
							/>
							<p>SafeChat</p>
						</li>
					</ul>
				</div>
			</aside>

			<!-- Main -->
			<main class="chat">
				<!-- Chat Information: Channel Name, Search, etc. -->
				<div class="chatInfo">
					<i class="fas fa-arrows-alt-h toggle"></i>
					<h2>#general</h2>
				</div>
				<div class="chatThread"></div>
				<div class="chatInput">
					<form class="chatWrapper">
						<textarea
							name="inputMessage"
							class="inputMessage"
							placeholder="What do you want to say?"
							id=""
							cols="30"
							rows="2"
						></textarea>
						<!-- <input
						type="text"
						class="inputMessage"
						placeholder="What do you want to say?"
					/> -->
						<div class="buttonContainer">
							<button class="generate">Generate Message</button>
							<button class="send">Send</button>
						</div>
					</form>
					<div class="messageSpinner">
						<div class="loader"></div> 
					</div>
				</div>
			</main>
	`;

	$('.container').css('display', 'flex');
	$('.container').append(demoHTML);

	safeChat.initMessages();
};

///===================///
// Initialize messages
///===================///

safeChat.initMessages = function() {
	db.collection('channels')
		.doc('Q1rCOpoYwfhqdZXNrhSx')
		.get()
		.then(function(doc) {
			const messages = doc.data().messages;

			for (const message of messages) {
				db.collection('messages')
					.doc(message)
					.get()
					.then(function(doc) {
						const { author, content, date, avatarImg } = doc.data();
						const newDate = date.toDate();

						$('.chatThread').append(
							`
								<div class="messageContainer">
									<img
										src="${avatarImg}"
										alt="Photo of a blonde woman with a black hat"
										class="avatar"
									/>
									<div class="message">
										<div class="messageInfo">
											<p class="user">${author}</p>
											<p class="time">${moment(newDate).format('llll')}</p>
										</div>
										<div class="messageContent">
											<p>
												${content}
											</p>
										</div>
									</div>
								</div>
							`
						);

						safeChat.scrollDownChat();
					})
					.catch(function(error) {
						const errorCode = error.code;
						const errorMessage = error.message;
					});
			}
		})
		.catch(function(error) {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
};

///=====================================================///
// Takes in a random number and makes the right API call
///=====================================================///

safeChat.getRandomSentence = function() {
	const randomNumber = Math.floor(Math.random() * 2) + 1;

	if (randomNumber === 1) {
		$.ajax({
			url: 'https://complimentr.com/api',
			method: 'GET',
			dataType: 'json'
		}).then(function(res) {
			const randomCompliment = res.compliment;
			$('.inputMessage').val(randomCompliment);
		});
	} else {
		$.ajax({
			url: 'https://amused.api.stdlib.com/insult@1.0.0/',
			method: 'GET',
			dataType: 'json'
		}).then(function(res) {
			const randomInsult = res;
			$('.inputMessage').val(randomInsult);
		});
	}
};

///====================================================///
// API request to Tensorflow.js for classifying message
///====================================================///

function getRandomSentence() {
	const randomNumber = Math.floor(Math.random() * 2) + 1;

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

safeChat.classifyMessage = function(message) {
	$('.messageSpinner').toggle();
	$('.messageSpinner').css('display', 'flex');

	const threshold = 0.2;

	toxicity.load(threshold).then(model => {
		const messages = [message];

		model
			.classify(messages)
			.then(predictions => {
				return safeChat.findToxicity(predictions);
			})
			.then(toxicityFound => {
				$('.messageSpinner').toggle();
				safeChat.appendMessage(toxicityFound, message);
			});
	});
};

safeChat.scrollDownChat = function() {
	$('.chatThread').scrollTop($('.chatThread').height() + 1000);
};

safeChat.findToxicity = function(predictions) {
	const toxicityFound = [];
	for (const prediction of predictions) {
		const toxicityType = prediction.label;
		const toxicityProbability = prediction.results[0].probabilities[1] * 100;

		if (toxicityProbability > 15) {
			toxicityFound.push(toxicityType);
			console.log(`${toxicityType}: ${toxicityProbability}%`);
		}
	}
	return toxicityFound;
};

safeChat.appendToxicityMessage = function(message) {
	$('.chatThread .messageContainer .messageContent')
		.last()
		.append(message);
};

safeChat.filterToxcity = function(toxicityFound) {
	for (const toxicity of toxicityFound) {
		if (toxicity === 'identity_attack') {
			safeChat.appendToxicityMessage(`<p>
						<strong>Identity Attack</strong> - You're discriminating against somebody based on one's gender, race, religion, and etc. Example: "Christianity is stupid." My recommendation: "I want some explanation on this.""
					</p>`);
		} else if (toxicity === 'insult') {
			safeChat.appendToxicityMessage(`<p>
						<strong>Insult</strong> - You're making an inflammatory comment towards somebody.
						Example: "You are an idiot." My recommendation: "Let's figure it out together."
					</p>`);
		} else if (toxicity === 'obscene') {
			safeChat.appendToxicityMessage(`<p>
						<strong>Obscene</strong> - Your message includes swear or curse words.
						Example: "That's fucking bad." My recommendation: "That's horrible."
					</p>`);
		} else if (toxicity === 'severe_toxicity') {
			safeChat.appendToxicityMessage(`<p>
						<strong>Severe Toxicity</strong> - Your message sounds hateful, aggressive or disrespectful, and you're likely to cause somebody to leave the discussion.
						Example: "I'll flay you alive, you fucking faggot." My recommendation: "Let's take a moment to cool down, then we can calmly sort things out."
					</p>`);
		} else if (toxicity === 'sexual_explicit') {
			safeChat.appendToxicityMessage(`<p>
						<strong>Sexual Explicit</strong> - You're referring to sexual acts or mentioning body parts in a sexual way.
						Example: "Your legs are so sexy." My recommendation: "You look great today."
					</p>`);
		} else if (toxicity === 'threat') {
			safeChat.appendToxicityMessage(`<p>
						<strong>Threat</strong> - Your message shows a wish or intention for pain, injury or violence against somebody.
						Example: "I'll destroy your life." My recommendation: "Let's discuss how we can solve the issue."
					</p>`);
		} else if (toxicity === 'toxicity') {
			safeChat.appendToxicityMessage(`<p>
						<strong>Toxicity</strong> - Your message sounds rude, disrespectful or unreasonable, and you may cause somebody to leave the discussion.
						Example: "You're short-tempered and stupid." My recommendation: "It's okay. We all make mistakes."
					</p>`);
		}
	}
	safeChat.appendToxicityMessage(
		`<p>Please keep these in mind and try again!</p>`
	);

	safeChat.scrollDownChat();
};

safeChat.appendMessage = function(toxicityFound, message) {
	if (toxicityFound.length === 0) {
		$.ajax({
			url: 'https://randomuser.me/api/',
			dataType: 'json',
			success: function(data) {
				return data;
			}
		}).then(function(data) {
			console.log(data.results[0]);

			const name = `${data.results[0].name.first} ${data.results[0].name.last}`;

			const avatarImg = data.results[0].picture.thumbnail;

			db.collection('messages')
				.add({
					author: name,
					date: new Date(),
					content: message,
					avatarImg: avatarImg
				})
				.then(function(docRef) {
					db.collection('channels')
						.doc('Q1rCOpoYwfhqdZXNrhSx')
						.update({
							messages: firebase.firestore.FieldValue.arrayUnion(docRef.id)
						})
						.then(function() {
							console.log('Messages array is updated!');
						})
						.catch(function(error) {
							const errorCode = error.code;
							const errorMessage = error.message;
						});
				})
				.catch(function(error) {
					console.error('Error writing document: ', error);
				});

			$('.chatThread').append(
				`
				<div class="messageContainer">
					<img
						src="${avatarImg}"
						alt="Photo of a blonde woman with a black hat"
						class="avatar"
					/>
					<div class="message">
						<div class="messageInfo">
							<p class="user">${name}</p>
							<p class="time">${moment(new Date()).format('llll')}</p>
						</div>
						<div class="messageContent">
							<p>
								${message}
							</p>
						</div>
					</div>
				</div>
			`
			);

			safeChat.scrollDownChat();
		});
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
							<p class="time">${moment(new Date()).format('llll')}</p>
						</div>
						<div class="messageContent">
							<p>
								Oh no! It looks like you're about to say something that would make other people uncomfortable...
							</p>
							<p>
							<em>"${message}"</em> contains the following:
							</p>
						</div>
					</div>
				</div>
			`
		);
	}
	safeChat.filterToxcity(toxicityFound);
};

///================================///
// Initializing function
///================================///
safeChat.init = function() {
	var firebaseConfig = {
		apiKey: 'AIzaSyDF46s9F6cXATUwKrFrZ9CnNIoC5J2aHuo',
		authDomain: 'safe-chat-slack-bot.firebaseapp.com',
		databaseURL: 'https://safe-chat-slack-bot.firebaseio.com',
		projectId: 'safe-chat-slack-bot',
		storageBucket: 'safe-chat-slack-bot.appspot.com',
		messagingSenderId: '862536808731',
		appId: '1:862536808731:web:c1e278684c424cfcfefbbe'
	};

	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

	db = firebase.firestore();

	// Routing

	const landing = function() {
		safeChat.initLanding();
	};

	const demo = function() {
		safeChat.initDemo();
	};

	const routes = {
		'/welcome': landing,
		'/demo': demo
	};

	const router = Router(routes);

	router.init('/welcome');

	safeChat.initEventListeners();
};

$(function() {
	safeChat.init();
});
