const createBoard = () => {
	// for (let i = 0; i < 9; i++) {
	// 	let createdDiv = document.createElement('div');
	// 	createdDiv.classList.add('row3');
	// 	document.querySelector('#left-board').appendChild(createdDiv);
	// }
	// for (let i = 0; i < 9; i++) {
	// 	let createdDiv = document.createElement('div');
	// 	createdDiv.classList.add('row1');
	// 	document.querySelector('#top-board').appendChild(createdDiv);
	// }

	// for (let i = 0; i < 9; i++) {
	// 	let createdDiv = document.createElement('div');
	// 	createdDiv.classList.add('row4');
	// 	document.querySelector('#right-board').appendChild(createdDiv);
	// }

	// for (let i = 0; i < 9; i++) {
	// 	let createdDiv = document.createElement('div');
	// 	createdDiv.classList.add('row4');
	// 	document.querySelector('#right-board').appendChild(createdDiv);
	// }

}

createBoard();

class Event {
	constructor(name, choice1, choice2, gains, movePosition, choice1Chance, choice2Chance, skipTurn) {
		this.name = name;
		this.choice1 = choice1;
		this.choice2 = choice2;
		this.gains = gains;
		this.movePosition = movePosition;
		this.choice1Chance = choice1Chance;
		this.choice2Chance = choice2Chance;
		this.skipTurn = skipTurn;
	}
}
// let eventMLArray = [
// ['YOU GOT MUGGED', '', '', -100, 0, 0, 0, 0],
// ['YOU BECAME SICK', '', '', 0, 0, 0, 0, -1],
// ['YOU EARNED A BONUS', '', '', 200, 0, 0, 0],
// ['YOUR CAR BROKE DOWN', '', '', -300, 0, 0, 0],
// ['YOUR APARTMENT CAUGHT ON FIRE', '', '', -200, 0, 0, 0],
// ['YOU MISS THE BUS', '', '', 0, -1, 0, 0, 0],
// ['YOU GOT SCAMMED', '', '', -500, 0, 0, 0, 0],
// ['OPTION TO SELL DRUGS', 'SELL DRUGS', 'DON\'T SELL DRUGS', 5000, 0, 10, 0, -1],
// ['YOU GOT HIT BY A BUS', 'WANT TO GO TO A HOSPITAL', 'DON\'T WANT TO PAY HOSPITAL BILLS', -20000, 0, 0, 0, -2],
// ['BUY A LOTTERY TICKET', '', '', 1000000, 5, 1, 0, 0]
// ];
let eventMLArray = [
['YOU GOT MUGGED'],
['YOU BECAME SICK'],
['YOU EARNED A BONUS'],
['YOUR CAR BROKE DOWN'],
['YOUR APARTMENT CAUGHT ON FIRE'],
['YOU MISS THE BUS'],
['YOU GOT SCAMMED'],
['OPTION TO SELL DRUGS'],
['YOU GOT HIT BY A BUS']
];
let eventUArray = [];


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
const setAmountOfPlayer = (/*amt*/) => {
	// the amount of players must be 4 or higher
	for (let i = 0; i < 4; i++) {
		// create amt number of lines to get names
		let player = new Player();
		player.name = 'player' + i;
		playerArray.push(player);
	}
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

const setPlayerData = (playerArray) => {
	setAmountOfPlayer();
	setRandomEconomicClass(playerArray);
	pickOrder(playerArray);
}

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
		let eventObj = new Event(event[0], event[1], event[2], event[3], event[4], event[5], event[6], event[7], event[8]);
		console.log(eventObj);
	}

}

const playMiniEvent = () => {

}

const playGame = () => {
	setPlayerData(playerArray);
	rollDice(playerArray[1]);
	pickRandomEvent(eventMLArray, playerArray[1]);
	//console.log(playerArray);

}

playGame();
