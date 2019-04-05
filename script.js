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
				playerArray[0].amountOfMoney = 1000000;
				break;
			case 1:
				playerArray[1].economicClass = 'MiddleClass';
				playerArray[1].amountOfMoney = 20000;
				break;
			case 2:
				playerArray[2].economicClass = 'MiddleClass';
				playerArray[2].amountOfMoney = 20000;
				break;
			case 3:
				playerArray[3].economicClass = 'LowerClass';
				playerArray[3].amountOfMoney = 10000;
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

let eventMLArray = [
// event, bad, good, percentage, money lost from bad, money gained from good, steps back from bad, steps forward from good
	['While jogging, you notice a shady looking grandmother', 'She mugs you', 'You help her mug someone else', 60, 40, -1000, 1000, 0, 0],
	['While walking around your work place, someone coughs on you', 'Your coworker does not apologize and you get sick', 'You get paid time off', 70, 30, -1000, 1000, -1, 1],
	['You worked hard this year and your boss takes notice', 'Just kidding', 'Your boss is feeling generous', 5, 95, 0, 3000, 0, 1],
	['Someone hit your car while they were backing up', 'Your car continues to play Ice Ice Baby on repeat', 'It turns out Elon Musk hit you and he gives you a Tesla', 30, 70, -3000, 3000, -1, 2],
	['Your neighbor forgets to turn off the oven while making cereal', 'The flames engulf your apartment', 'The flames killed the ninja trying to assassinate you that was hiding in your closet', 40, 60, -2000, 0, -1, 0],
	['While at the bus you tied your shoes', 'The bus driver leaves without you', 'Walking is good for you', 30, 70, 0, 0, -1, 2],
	['Your mother tells you about a company you can invest in', 'It\'s a ponzi scheme', 'It\'s a ponzi scheme but you find other suckers', 80, 20, -10000, 10000, 0, 0],
	['Your bus driver is 3/4-blind so you step over on the street to get his attention', 'You get hit by the bus', 'You get hit by the bus but you get a settlement', 10, 90, -80000, 5000, -2, 2],
	['While walking, you notice a friendly looking grandfather', 'He\'s a ghost here to steal your soul', 'He\'s actually your grandfather', 30, 70, 0, 1000, -1, 0],
	['You find a 100 dollar bill on the floor', 'It\'s actually a fake 100', 'It\'s actually a 1000 dollars', 10, 90, 0, 1000, 0, 0],
	['You start a band in your friend\'s uncle\'s grandmother\'s garage', 'She has dementia and calls the cops on you', 'You rock hard', 10, 90, -2000, 5000, 0, 0],
	['A cult is after you after they find out you look like their new leader', 'They destroy your house', 'They treat you like a king', 10, 90, -3000, 5000, 0, 0],
	['You go to college until you realize you had to study', 'You fail everything and have massive debt', 'You graduate', 40, 60, -10000, 0, 0, 3],
	['You buy a lottery ticket because your life sucks', 'Life continues to suck', 'You have enough to pay your student loans', 99, 1, 0, 100000, 0, 0],
	['You are chosen to shot a half court short when attending a basketball game', 'You fail miserably', 'You made it', 40, 60, 0, 1000, 0, 0],
	['Pablo Escobar asks you if you want to be a drug mule', 'You receive jail time in a mexican prison', 'You successfully fueled the drug epidemic', 60, 40, -1000, 5000, -4, 0],
	['You get an email from a Nigerian prince asking if you want to be rich', 'It\'s a scam', 'He\'s actually real', 1, 90, -200, 10000, 0, 0],
	['You apply for General Assembly', 'You don\'t have what it takes', 'You got in', 30, 70, 0, -1500, 0, 2],
	['You meet Peter Thiel and try to pitch your idea to him', 'You get too excited and pass out', 'You get series A funding', 1, 99, -500, 100000, 0, 0],
	['David Goggins wants to train you', 'You\'re the only person to ever disappoint him', 'You become the next David Goggins', 40, 60, -1000, 2000, -5, 3]


];

let eventUArray = [
	['A local politician is asking for donation', 'He\'ll remember that', 'Smart choice', 60, 40, 0, -1000, 0, 1],
	['Someone drives into your car', 'He runs away', 'You sue him for all he\'s worth', 40, 60, -2000, 2000, -1, 0],
	['Your nephew tries to hug you but you fall and hurt your hand', 'You unsuccessfully sue him', 'You sue him and can finally hold you Hors d\'oeuvre', 80, 20, -4000, 6000, 0, 0],
	['Your boat is caught in a rough sea storm', 'It become\'s broken', 'It breaks but your father buys you a better one', 30, 70, -6000, 6000, 0, 0],
	['You\'re company is losing money', 'You must take a pay cut', 'You fire half your staff', 40, 60, -3000, 2000, 0, 0],
	['The pills your company makes is contaminated', 'You have to throw them out', 'You sell them overseas', 70, 30, -4000, 4000, 0, 0],
	['While at your country club you drink too much', 'You wake up naked in your office', 'You have a great time with fellow rich people', 30, 70, 0, 0, -3, 3],
	['You become really sick', 'Money can\t solve everything', 'Money solves everything', 30, 70, 0, 0, -2, 3],
	['You can\'t find anything new to wear', 'You have to stay home to hide you shame', 'You buy something overseas', 50, 50, -3000, 3000, 0, 0],
	['Everything is boring so you decide to become an andrenaline junkie', 'You jump out from space and live', 'You die eating a jalapeno', 50, 50, 0, 0, -4, 4],
	['Lobby for lower taxes for the rich and higher taxes for the poor', 'Not enough persuasion', 'You successfully hurt the economy', 30, 70, -2000, 10000, 0, 0],
	['Invest in a company using insider trader knowledge', 'Fined but no jail time', 'You enjoy the money you made by buying rich people stuff', 20, 80, -2000, 6000, -2, 0],
	['You are given the reins of the new series of Game Of Thrones', 'It\'s the worst season ever and you receive death threats', 'It\'s the best season ever', 60, 40, -100000, 100000, 0, 0],
	['You create a coding bootcamp in NYC', 'No one attends', 'It becomes General Assemby', 30, 70, -5000, 5000, 0, 0],
	['You steal an idea from a fellow student', 'It becomes Myspace', 'It becomes Facebook', 40, 60, -5000, 10000, 0, 0],
	['You meet the president of the United States', 'He thinks your stupid', 'You can buy his influence', 20, 80, -3000, 10000, 0, 3],
	['You find the cure for cancer', 'The goverment is making you give it for free', 'You can monetize it to your liking', 40, 60, -3000, 5000, 0, 0],
	['You control the electricity in California', 'You are fined', 'You take billions from Californians', 50, 50, 4000, 4000, 0, 0],
	['Your design a way for energy efficient plane', 'People steal your idea', 'You fly anywhere for no cost', 50, 50, 0, 0, -5, 5],
	['You find a way to warp speed', 'You end up in a weird area with evil aliens', 'You travel without exerting energy', 50, 50, 0, 0, -4, 4]

];

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
		playerDiv.setAttribute('id', 'player-div' + i);
		for (let i = 0; i < 50; i++) {
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

let previousPosition;
const rollDice = (player) => {
	if (player.economicClass === 'MiddleClass' || player.economicClass === 'LowerClass') {
		let rollNumber = Math.floor(Math.random() * 3) + 1;
		previousPosition = player.position;
		player.position += rollNumber;
		document.querySelector('#roll-div > h4').innerHTML = rollNumber;
	}
	if (player.economicClass === 'UpperClass') {
		let rollNumber = Math.floor(Math.random() * 5) + 1;
		previousPosition = player.position;
		player.position += rollNumber;
		document.querySelector('#roll-div > h4').innerHTML = rollNumber;
	}
}

let interval = 1000;
const movePlayer = (player) => {
	let setDivContainer = document.querySelector('.step-div-container' + player.order);
	let containerDivs = setDivContainer.children;
	let playerDiv = document.getElementById('player-div' + player.order);
	if (player.position >= containerDivs.length - 1) {
		containerDivs[containerDivs.length - 1].appendChild(playerDiv);
		player.finished = true;
	} else if (player.position < 0) {
		containerDivs[0].appendChild(playerDiv);
		player.position = 0;
	} else {
		containerDivs[player.position].appendChild(playerDiv);
		
	}
}

const pickRandomEvent = (player) => {
	let eventArray;
	let randomEvent;
	if (player.economicClass === 'MiddleClass' || player.economicClass === 'LowerClass') {
		eventArray = eventMLArray;
		let randomIndex = Math.floor(Math.random() * eventArray.length);
		randomEvent = eventArray[randomIndex];
	} else {
		eventArray = eventUArray;
		let randomIndex = Math.floor(Math.random() * eventArray.length);
		randomEvent = eventArray[randomIndex];
	}

	return randomEvent;
}

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

const collectForFinished = (player) => {
	if (player.finished) {
		player.amountOfMoney += 100;
	}
}

const ifAllFinishedCondition = (player) => {
	return player.finished;
}

let gameFinished = false;
const checkWinner = () => {
	if (playerArray.every(ifAllFinishedCondition)) {
		if (playerArray.length === 1) {
	 	gameFinished = true;
	 	let nameH3 = document.getElementsByClassName('name-h3');
		nameH3[playerArray[0].order].style.color = '#31CB00';
		let economicClassH3 = document.getElementsByClassName('economic-class-name');
		economicClassH3[playerArray[0].order].style.color = '#31CB00';
		let moneyAmtH3 = document.getElementsByClassName('money-amt-class');
		moneyAmtH3[playerArray[0].order].style.color = '#31CB00';
		document.querySelectorAll('.name-h3')[playerArray[0].order].style.fontSize = '50px';
	 	document.getElementById('roll-button').innerHTML = 'RESET';
	 } else {
	 	let playerWithMostMoney;
	 	let mostMoneyAmount = 0;
	 	for (let i = 0; i < playerArray.length; i++) {
	 		if (playerArray[i].amountOfMoney > mostMoneyAmount) {
	 			playerWithMostMoney = playerArray[i];
	 			mostMoneyAmount = playerArray[i].amountOfMoney;
	 		}
	 	}
	 	gameFinished = true;
	 	let nameH3 = document.getElementsByClassName('name-h3');
		nameH3[playerWithMostMoney.order].style.color = '#31CB00';
		let economicClassH3 = document.getElementsByClassName('economic-class-name');
		economicClassH3[playerWithMostMoney.order].style.color = '#31CB00';
		let moneyAmtH3 = document.getElementsByClassName('money-amt-class');
		moneyAmtH3[playerWithMostMoney.order].style.color = '#31CB00';
		document.querySelectorAll('.name-h3')[playerArray[0].order].style.fontSize = '50px';
	 	document.getElementById('roll-button').innerHTML = 'RESET';
	 }
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
	for (let i = 0; i < 4; i++) {
		let nameH3 = document.getElementsByClassName('name-h3');
		if (i === 0) {
			nameH3[i].style.color = '#8622b5';

		} else {
			nameH3[i].style.color = '#1E441E';
		}
		nameH3[i].innerHTML = playerArray[i].name;
		let economicClassH3 = document.getElementsByClassName('economic-class-name');
		economicClassH3[i].innerHTML = playerArray[i].economicClass;
		economicClassH3[i].style.color = '#1E441E';
		let moneyAmtH3 = document.getElementsByClassName('money-amt-class');
		moneyAmtH3[i].innerHTML = '$' + playerArray[i].amountOfMoney;
		moneyAmtH3[i].style.color = '#1E441E';
		document.querySelector('.step-div-container' + i).children[0].appendChild(document.getElementById('player-div' + i));
	}

	document.querySelector('main').removeChild(document.querySelector('.grid'));
	createGrid();
	document.getElementById('roll-button').innerHTML = 'ROLL';

}

const choseButtonFunc = () => {
	for (let i = 0; i < playerArray.length; i++) {
			document.querySelectorAll('.money-amt-class')[playerArray[i].order].innerHTML = '$' + playerArray[i].amountOfMoney;
		}
		checkForEconChange(playerArray[0]);
		document.querySelector('.modal-background').style.display = 'none';
		document.querySelectorAll('.name-h3')[playerArray[0].order].style.color = '#1E441E';
		playerArray.push(playerArray[0]);
		playerArray.splice(0, 1);
		for (let i = 0; i < playerArray.length; i++) {
			if (playerArray[i].amountOfMoney <= 0) {
			playerArray[i].dead = true;
			deadPlayerArray.push(playerArray[i]);
			playerArray.splice(i, 1);
			} 
		}

		if (playerArray[0].finished) {
			document.getElementById('roll-button').innerHTML = 'COLLECT';
		} else {
			document.getElementById('roll-button').innerHTML = 'ROLL';
		}

		document.querySelectorAll('.name-h3')[playerArray[0].order].style.color = '#8622b5';
		document.querySelectorAll('.name-h3')[playerArray[0].order].style.fontSize = '50px';

		checkWinner();
}

const playGame = () => {
	document.querySelectorAll('.name-h3')[playerArray[0].order].style.color = '#8622b5';
	document.querySelectorAll('.name-h3')[playerArray[0].order].style.fontSize = '50px';
	document.querySelectorAll('.name-h3')[playerArray[0].order].setAttribute('class', 'name-h3 popup-text');

	let chosenEvent;
	let rollButton = document.getElementById('roll-button');
	rollButton.addEventListener('click', function () {
		rollButton.disabled = true;
		document.querySelectorAll('.name-h3')[playerArray[0].order].classList.remove('popup-text');
		if (!gameFinished) {
			if (playerArray[0].finished) {
				collectForFinished(playerArray[0]);
				choseButtonFunc();
			} else {
				chosenEvent = pickRandomEvent(playerArray[0]);
				window.setTimeout(nextTurn, 500);
				window.setTimeout(function () {
					showEvent(chosenEvent)}, 1200);
			}
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
		document.querySelectorAll('.name-h3')[playerArray[0].order].style.color = '#1E441E';

		document.querySelectorAll('.name-h3')[playerArray[0].order].style.fontSize = '25px';
		playerArray.push(playerArray[0]);
		playerArray.splice(0, 1);
		for (let i = 0; i < playerArray.length; i++) {
			if (playerArray[i].amountOfMoney <= 0) {
			playerArray[i].dead = true;
			deadPlayerArray.push(playerArray[i]);
			playerArray.splice(i, 1);
			} 
		}

		if (playerArray[0].finished) {
			document.getElementById('roll-button').innerHTML = 'COLLECT';
		} else {
			document.getElementById('roll-button').innerHTML = 'ROLL';
		}

		document.querySelectorAll('.name-h3')[playerArray[0].order].style.color = '#8622b5';
		document.querySelectorAll('.name-h3')[playerArray[0].order].style.fontSize = '50px';
		document.querySelectorAll('.name-h3')[playerArray[0].order].setAttribute('class', 'name-h3 popup-text');

		checkWinner();

		rollButton.disabled = false;
	});
}