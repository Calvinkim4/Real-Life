let startButton = document.getElementById('start-button');
startButton.addEventListener('click', function() {
	document.querySelector('header').style.display = 'none';
	document.querySelector('section').style.display = 'block';
});

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

let nicknameButton = document.getElementById('nickname-button');
nicknameButton.addEventListener('click', function() {
	for (let i = 0; i < 4; i++) {
		setNameOfPlayer(document.querySelectorAll('input')[i].value);
	}
	setRandomEconomicClass(playerArray);
	pickOrder(playerArray);
});





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
		let rollNumber = Math.floor(Math.random() * 6) + 1;
		player.position += rollNumber;
	}
	if (player.economicClass === 'UpperClass') {
		let rollNumber = Math.floor(Math.random() * 10) + 1;
		player.position += rollNumber;
	}
}

const movePlayer = () => {
	// move player certain amount graphically
}

const pickRandomEvent = (eventArray, player) => {
	let randomIndex = Math.floor(Math.random() * eventArray.length);

	if (player.economicClass === 'MiddleClass' || player.economicClass === 'LowerClass') {
		let event = eventArray[randomIndex];
		//let eventObj = new Event(event[0], event[1], event[2], event[3], event[4], event[5], event[6], event[7], event[8]);

	}

}

const playMiniEvent = () => {

}

const playGame = () => {
	//setPlayerData(playerArray);
	//rollDice(playerArray[1]);
	//pickRandomEvent(eventMLArray, playerArray[1]);
	//console.log(playerArray);

}

//playGame();
