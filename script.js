class Player {
	constructor() {
		this.name= '';
		this.position = 0;
		this.economicClass = '';
		this.amountOfMoney = 0;
		this.order = 0;
		this.finished = false;
		this.dead = false;

	}
}

let deadPlayerArray = [];
let playerArray = [];
const setNameOfPlayer = (playerName) => {
	let player = new Player();
	player.name = playerName;
	playerArray.push(player);
}

// fisher-yates shuffle
const fYatesShuffle = (playerArray) => {
	let incrementedI = 1;
	for (let i = playerArray.length - 1; i > 0; i--) {
		let randomIndex = Math.floor(Math.random() * (playerArray.length - incrementedI));
		incrementedI++;
		let temp = playerArray[randomIndex];
		playerArray[randomIndex] = playerArray[i];
		playerArray[i] = temp;
	}
}

const setRandomEconomicClass = (playerArray) => {
	fYatesShuffle(playerArray);
	for (let i = 0; i < playerArray.length; i++) {

		switch(i) {
			case 0:
				playerArray[0].economicClass = 'UpperClass';
				playerArray[0].amountOfMoney = 10000000;
				break;
			case 1:
				playerArray[1].economicClass = 'MiddleClass';
				playerArray[1].amountOfMoney = 80000;
				break;
			case 2:
				playerArray[2].economicClass = 'MiddleClass';
				playerArray[2].amountOfMoney = 80000;
				break;
			case 3:
				playerArray[3].economicClass = 'LowerClass';
				playerArray[3].amountOfMoney = 30000;
				break;
			default:
			break;
		}
	}
}

// since I already randomized the players position in the array just order them from array order
const pickOrder = (playerArray) => {
	for (let i = 0; i < playerArray.length; i++) {
		playerArray[i].order = i;
	}
}

let nicknameButton = document.getElementById('nickname-button');
nicknameButton.addEventListener('click', function() {
	document.querySelector('h1').style.display = 'none';
	for (let i = 0; i < 4; i++) {
		if (document.querySelectorAll('input')[i].value === '') {
			setNameOfPlayer('Player ' + (i + 1));
		} else {
			setNameOfPlayer(document.querySelectorAll('input')[i].value);
		}
		document.querySelectorAll('.input-wrapper')[i].style.display = 'none';
	}
	setRandomEconomicClass(playerArray);
	pickOrder(playerArray);
	nicknameButton.style.display = 'none';
	showCharacters(playerArray);
	createGrid();
	document.getElementById('roll-div').style.display = 'block';

	playGame();
});

const showCharacters = (playerArray) => {
	let charactersContainer = document.getElementById('characters-top-container');
	let containerDiv = document.createElement('div');
	containerDiv.classList.add('only-character-container');
	charactersContainer.appendChild(containerDiv);
	charactersContainer.style.display = 'block';
	for (let i = 0; i < 4; i++) {
		let characterBlock = document.createElement('div');
		characterBlock.classList.add('character-value');
		containerDiv.appendChild(characterBlock);
		let nameH3 = document.createElement('h3');
		nameH3.classList.add('name-h3');
		nameH3.innerHTML = playerArray[i].name;
		characterBlock.appendChild(nameH3);
		let economicClassH3 = document.createElement('h3');
		economicClassH3.classList.add('economic-class-name');
		economicClassH3.innerHTML = playerArray[i].economicClass;
		characterBlock.appendChild(economicClassH3);
		let moneyAmtH3 = document.createElement('h3');
		moneyAmtH3.classList.add('money-amt-class');
		moneyAmtH3.innerHTML = '$' + playerArray[i].amountOfMoney;
		characterBlock.appendChild(moneyAmtH3);
	}
}

const createGrid = () => {
	let gridContainer = document.createElement('div');
	gridContainer.classList.add('grid');
	document.querySelector('main').appendChild(gridContainer);
	for (let i = 0; i < 4; i++) {
		let characterBlock = document.createElement('div');
		gridContainer.appendChild(characterBlock);
		let stepDivContainer = document.createElement('div');
		stepDivContainer.classList.add('step-div-container');
		stepDivContainer.classList.add('step-div-container' + i);
		characterBlock.appendChild(stepDivContainer);
		let playerDiv = document.createElement('div');
		playerDiv.setAttribute('id', 'player-div' + i)
		for (let i = 0; i < 100; i++) {
			let stepDiv = document.createElement('div');
			if (i === 0) {
				stepDiv.appendChild(playerDiv);
			}
			stepDiv.classList.add('step-div');
			stepDiv.classList.add('step-one' + i);
			stepDivContainer.appendChild(stepDiv);
		}
		
	}
}

let eventMLArray = [
// event, bad, good, percentage, money lost from bad, money gained from good, steps back from bad, steps forward from good
// ['While jogging, you notice a shady looking grandmother', 'She mugs you', 'You help her mug someone else', 60, 40, -100, 100, 0, 0],
// ['While walking around your work place, someone coughs on you', 'Your coworker does not apologize and you get sick', 'You get paid time off', 70, 30, -100, 100, -1, 1],
// ['You worked hard this year and your boss takes notice', 'Just kidding', 'Your boss is feeling generous', 5, 95, 0, 1000, 0, 1],
// ['Someone hit your car while they were backing up', 'Your car continues to play Ice Ice Baby on repeat', 'It turns out Elon Musk hit you and he gives you a Tesla', 30, 70, -300, 300, -1, 2],
// ['Your neighbor forgets to turn off the oven while making cereal', 'The flames engulf your apartment', '', 40, 60, -200, 0, -1, 0],
// ['While at the bus you tied your shoes', 'The bus driver leaves without you', 30, 70, -1, 1],
['Your mother tells you about a company you can invest in', 'It\'s a ponzi scheme', 'It\'s a ponzi scheme but you find other suckers', 80, 20, -1000, 1000, 0, 0],
// ['The drug dealer you buy weed from asks you to drive weed to another state for money', 'You star in COPS', '', 5, 95, -2000, -2, 1],
// ['Your bus driver is 3/4-blind so you step over on the street to get his attention', 'You get hit by the bus', 10, 90, -8000, -2, 2],
// ['You decide to buy a lottery ticket because your life sucks', 'Life continues to suck', 'Gucci everywhere ', 1, 99, -5, 1000000, 0, 5],
// ['You become internet famous', 'For breaking into the zoo while high', 'For saving the United States from zombies', 20, 80, 2000, 0, 0],
// ['Your friend wants to start a business with you', 'The business is a failure', 'Business is booming', 1, 90, -200, 10000, 0, 0],
// ['While walking, you notice a friendly looking grandfather', 'He\'s a ghost here to claim your soul', 'He\'s actually your grandfather', 20, 80, 0, 100, -1, 0],
// ['You find a 100 dollar bill on the floor', 'It\'s actually a fake 100', '100 in the bank', 10, 90, 0, 100, 0, 0],
// ['You start a band in your friend\'s uncle\'s grandmother\'s garage', 'She has dementia and calls the cops on you', 'You rock hard', 10, 90, -200, 500, 0, 0],
// ['You apply for General Assembly', 'You don\'t have what it takes', 'You got in', 30, 70, 0, -1500, 0, 2],
// ['You meet Peter Thiel and try to pitch your idea to him', 'You get too excited and pass out', 'You get series A funding', 1, 99, -500, 100000, 0, 0],
// ['Your a shut-in because your too powerful', 'You leave but you accidently freeze your sister Anna', 'You become a queen', 40, 60, 0, 0, 0, 1],
// ['You rule pride rock but your son is being annoying', 'You die', 'Your son grows up to be awesome', 80, 20, 0, 0, -2, 1],
// ['The prince of Canada']
];
let eventUArray = [];

const rollDice = (player) => {
	if (player.economicClass === 'MiddleClass' || player.economicClass === 'LowerClass') {
		let rollNumber = Math.floor(Math.random() * 5) + 1;
		player.position += rollNumber;
		document.querySelector('#roll-div > h4').innerHTML = rollNumber;
	}
	if (player.economicClass === 'UpperClass') {
		let rollNumber = Math.floor(Math.random() * 8) + 1;;
		player.position += rollNumber;
		document.querySelector('#roll-div > h4').innerHTML = rollNumber;
	}
}

const movePlayer = (player) => {
	let setDivContainer = document.querySelector('.step-div-container' + player.order);
	let containerDivs = setDivContainer.children;
	let playerDiv = document.getElementById('player-div' + player.order);
	if (player.position >= containerDivs.length - 1) {
		containerDivs[containerDivs.length - 1].appendChild(playerDiv);
		player.finished = true;
	} else {
		containerDivs[player.position].appendChild(playerDiv);
	}
}

const pickRandomEvent = (eventArray, player) => {
	let randomIndex = Math.floor(Math.random() * eventArray.length);
	let randomEvent;
	if (player.economicClass === 'MiddleClass' || player.economicClass === 'LowerClass') {
		randomEvent = eventArray[randomIndex];
	} else {
		randomEvent = eventArray[randomIndex];
	}

	return randomEvent;
}

// const playMiniEvent = () => {

// }

const nextTurn = () => {
	rollDice(playerArray[0]);
	movePlayer(playerArray[0]);
}

const showEvent = (randomEvent) => {
	let modal = document.querySelector('.modal-background');
	modal.style.display = 'block';
	document.querySelector('.modal-content > h3').innerHTML = randomEvent[0];
	document.querySelector('#good-event > h4').innerHTML = randomEvent[1];
	document.querySelector('#bad-event > h4').innerHTML = randomEvent[2];
	document.querySelector('#good-event > h5').innerHTML = randomEvent[3];
	document.querySelector('#bad-event > h5').innerHTML = randomEvent[4];
}

const setEventEffect = (randomEvent, player) => {
	if (Math.floor(Math.random() * 100) <= randomEvent[3]) {
		player.position += randomEvent[7];
		player.amountOfMoney += randomEvent[5];
	} else {
		player.position += randomEvent[8];
		player.amountOfMoney += randomEvent[6];
	}
}

const checkForEconChange = (player) => {
	let economicClassH3 = document.getElementsByClassName('economic-class-name');
	if (player.amountOfMoney <= 30000) {
		player.economicClass = 'LowerClass';
	} else if (player.amountOfMoney <= 80000) {
		player.economicClass = 'MiddleClass';
	} else {
		player.economicClass = 'UpperClass';
	}
	economicClassH3[player.order].innerHTML = player.economicClass;
}

let gameFinished = false;
const checkWinner = () => {
	 if (playerArray.length === 1 && playerArray[0].finished) {
	 	gameFinished = true;
	 	console.log('winner');
	 	document.getElementById('roll-button').innerHTML = 'RESET';
	 }
}

const resetGame = () => {
	for (let i = 0; i < deadPlayerArray.length; i++) {
		playerArray.push(deadPlayerArray[i]);
	}
	deadPlayerArray.splice(0);

	for (let i = 0; i < playerArray.length; i++) {
		playerArray[i].position = 0;
		playerArray[i].economicClass = '';
		playerArray[i].amountOfMoney = 0;
		playerArray[i].order = 0;
		playerArray[i].finished = false;
		playerArray[i].dead = false;
	}

	setRandomEconomicClass(playerArray);
	pickOrder(playerArray);

	gameFinished = false;

	// document.querySelector('h1').style.display = 'block';
	// for (let i = 0; i < 4; i++) {
	// 	document.querySelectorAll('.input-wrapper')[i].style.display = 'block';
	// }
	// nicknameButton.style.display = 'inline-block';
	// document.getElementById('roll-div').style.display = 'none';
	// document.getElementById('characters-top-container').removeChild(document.querySelector('.only-character-container'));
	// document.querySelector('.grid').style.display = 'none';
	for (let i = 0; i < 4; i++) {
		let nameH3 = document.getElementsByClassName('name-h3');
		nameH3[i].innerHTML = playerArray[i].name;
		let economicClassH3 = document.getElementsByClassName('economic-class-name');
		economicClassH3[i].innerHTML = playerArray[i].economicClass;
		let moneyAmtH3 = document.getElementsByClassName('money-amt-class');
		moneyAmtH3[i].innerHTML = '$' + playerArray[i].amountOfMoney;
		document.querySelector('.step-div-container' + i).children[0].appendChild(document.getElementById('player-div' + i));
	}
}

const playGame = () => {
	document.querySelectorAll('.name-h3')[playerArray[0].order].style.color = '#054A29';
	let chosenEvent;
	let rollButton = document.getElementById('roll-button');
	rollButton.addEventListener('click', function () {
		if (!gameFinished) {
			chosenEvent = pickRandomEvent(eventMLArray, playerArray[0]);
			//window.setTimeout(nextTurn, 1000);
			nextTurn();
			//window.setTimeout(showEvent(chosenEvent), 2000);
			//nextTurn();
			showEvent(chosenEvent);	
		} else {
			resetGame();
		}
		
	});
	let chooseButton = document.getElementById('event-roll-button');
		chooseButton.addEventListener('click', function() {
		setEventEffect(chosenEvent, playerArray[0]);
		movePlayer(playerArray[0]);
		for (let i = 0; i < playerArray.length; i++) {
			document.querySelectorAll('.money-amt-class')[playerArray[i].order].innerHTML = '$' + playerArray[i].amountOfMoney;
		}
		checkForEconChange(playerArray[0]);
		document.querySelector('.modal-background').style.display = 'none';
		document.querySelectorAll('.name-h3')[playerArray[0].order].style.color = '#E8FCCF';
		playerArray.push(playerArray[0]);
		playerArray.splice(0, 1);
		for (let i = 0; i < playerArray.length; i++) {
			if (playerArray[i].amountOfMoney <= 0) {
			playerArray[i].dead = true;
			deadPlayerArray.push(playerArray[i]);
			playerArray.splice(i, 1);
			} 
		}
		console.log(playerArray);

		document.querySelectorAll('.name-h3')[playerArray[0].order].style.color = '#054A29';

		checkWinner();
	});
}
