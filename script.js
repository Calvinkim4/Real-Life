// let startButton = document.getElementById('start-button');
// startButton.addEventListener('click', function() {
// 	document.querySelector('header').style.display = 'none';
// 	document.querySelector('section').style.display = 'block';
// });

class Player {
	constructor() {
		this.name= '';
		this.position = 0;
		this.economicClass = '';
		this.amountOfMoney = 0;
		this.order = 0;
		this.skipturnAmount = 0;

	}
}

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
				playerArray[i].economicClass = 'UpperClass';
				playerArray[i].amountOfMoney = 1000000;
				break;
			case 1:
				playerArray[i].economicClass = 'MiddleClass';
				playerArray[i].amountOfMoney = 10000;
				break;
			case 2:
				playerArray[i].economicClass = 'MiddleClass';
				playerArray[i].amountOfMoney = 10000;
				break;
			case 3:
				playerArray[i].economicClass = 'LowerClass';
				playerArray[i].amountOfMoney = 5000;
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

let day = 1;
let nicknameButton = document.getElementById('nickname-button');
nicknameButton.addEventListener('click', function() {
	document.querySelector('h1').style.display = 'none';
	document.querySelector('section > h3').style.display = 'block';
	for (let i = 0; i < 4; i++) {
		if (document.querySelectorAll('input')[i].value === '') {
			setNameOfPlayer('Player ' + (i + 1));
		} else {
			setNameOfPlayer(document.querySelectorAll('input')[i].value);
		}
		// document.querySelectorAll('input')[i].style.display = 'none';
		document.querySelectorAll('.input-wrapper')[i].style.display = 'none';
	}
	setRandomEconomicClass(playerArray);
	pickOrder(playerArray);
	document.querySelector('section > h3').innerHTML = 'Day: ' + day;
	nicknameButton.style.display = 'none';
	showCharacters(playerArray);
	document.getElementById('roll-div').style.display = 'block';
});

const showCharacters = (playerArray) => {
	let mainEl = document.querySelector('main');
	let createdDiv = document.createElement('div');
	createdDiv.classList.add('wrapper');
	mainEl.appendChild(createdDiv);
	for (let i = 0; i < 4; i++) {
		let characterBlock = document.createElement('div');
		characterBlock.classList.add('character-block');
		createdDiv.appendChild(characterBlock);
		let nameH3 = document.createElement('h3');
		nameH3.classList.add('name-h3');
		nameH3.innerHTML = playerArray[i].name;
		characterBlock.appendChild(nameH3);
		let economicClassH3 = document.createElement('h3');
		economicClassH3.innerHTML = playerArray[i].economicClass;
		characterBlock.appendChild(economicClassH3);
		let moneyAmtH3 = document.createElement('h3');
		moneyAmtH3.innerHTML = '$' + playerArray[i].amountOfMoney;
		characterBlock.appendChild(moneyAmtH3);
		let stepDivContainer = document.createElement('div');
		stepDivContainer.classList.add('step-div-container');
		stepDivContainer.classList.add('step-div-container' + i);
		characterBlock.appendChild(stepDivContainer);
		let playerDiv = document.createElement('div');
		playerDiv.setAttribute('id', 'player-div' + i)
		for (let i = 0; i < 30; i++) {
			let stepDiv = document.createElement('div');
			if (i === 0) {
				stepDiv.appendChild(playerDiv);
			}
			stepDiv.classList.add('step-div');
			stepDiv.classList.add('step-one' + i);
			stepDivContainer.appendChild(stepDiv);
		}
		
	}
	playGame();
}

let eventMLArray = [
['While jogging, you notice a shady looking grandmother', 'She mugs you', 'You help her mug someone else', 60, -100, 100],
['While walking around your work place, someone coughs on you', 'Your coworker does not apologize and you get sick', 'You get paid time off', 70, -100, 100],
['You worked hard this year and your boss takes notice', 'Just kidding', 'Your boss is feeling generous', 5, 0, 1000],
['Someone hit your car while they were backing up', 'Your car continues to play Ice Ice Baby on repeat', 'It turns out Elon Musk hit you and he gives you a Tesla', 30, -300, 300],
['Your neighbor forgets to turn off the oven while making cereal', 'The flames engulf your apartment', '', 40, -200],
['While at the bus you tied your shoes', 'The bus driver leaves without you', 30],
['Your mother tells you about a company you can invest in', 'It\'s a ponzi scheme', 'It\'s a ponzi scheme but you find other suckers', 80, -1000, 1000],
['The drug dealer you buy weed from asks you to drive weed to another state for money', 'You star in COPS', '', 5, -2000],
['You don\'t want to miss the bus so you step over on the street to get his attention', 'You get hit by the bus', 10, -8000],
['You decide to buy a lottery ticket because your life sucks', 'Life continues to suck', 'Gucci everywhere ', 1, -5, 1000000],
['You become internet famous', 'For breaking into the zoo while high', 20, 2000],
];
let eventUArray = [];

const rollDice = (player) => {
	if (player.economicClass === 'MiddleClass' || player.economicClass === 'LowerClass') {
		let rollNumber = Math.floor(Math.random() * 5) + 1;
		player.position += rollNumber;
	}
	if (player.economicClass === 'UpperClass') {
		let rollNumber = Math.floor(Math.random() * 8) + 1;
		player.position += rollNumber;
	}
}

const movePlayer = (player) => {
	let setDivContainer = document.querySelector('.step-div-container0');
	let containerDivs = setDivContainer.children;
	let playerDiv = document.getElementById('player-div' + player.order);
	if (player.position > containerDivs.length - 1) {
		containerDivs[containerDivs.length - 1].appendChild(playerDiv);
	} else {
		containerDivs[player.position].appendChild(playerDiv);
	}
	
	// console.log(containerDivs);
}

const pickRandomEvent = (eventArray, player) => {
	let randomIndex = Math.floor(Math.random() * eventArray.length);

	if (player.economicClass === 'MiddleClass' || player.economicClass === 'LowerClass') {
		let event = eventArray[randomIndex];
		//let eventObj = new Event(event[0], event[1], event[2], event[3], event[4], event[5], event[6], event[7], event[8]);
	} else {
		
	}

}

const playMiniEvent = () => {

}

const playGame = () => {
	let rollButton = document.getElementById('roll-button');
	rollButton.addEventListener('click', function () {
		rollDice(playerArray[0]);
		movePlayer(playerArray[0]);
	});

}
