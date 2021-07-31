var MODE_ROLL_DICE = "roll dice";
var MODE_CHOOSE_ORDER = "choose order";

// Initialise game to start with dice roll game mode
var mode = MODE_ROLL_DICE;

// Keep track of current player, either 1 or 2
// Game starts with player 1
var currPlayer = 1;

// Keep track of dice rolls
var player1Dice = [];
var player2Dice = [];

// Keep track of chosen numbers
var player1Num;
var player2Num;

/** Return random number from 1-6 */

var rollDice = function () {
  return Math.ceil(Math.random() * 6);
};

/** Get dice roll for curr player and populate array
 * Return new dice rolls
 */

var storeDiceRolls = function () {
  // Create array with 2 independent dice roll values
  var newDiceRolls = [rollDice(), rollDice()];

  // Assign newDiceRolls to current player's dice array
  if (currPlayer == 1) {
    player1Dice = newDiceRolls;
  }

  // If currPlayer not 1, assume currPlayer is 2
  else {
    player2Dice = newDiceRolls;
  }
  // Return new dice rolls to parent function
  return newDiceRolls;
};

/** Return number that is concatenation of num 1 and num 2 */
var join2Numbers = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

/** Generate and store player's number based on dice rolls and chosen first index */
var getPlayerNumber = function (firstIndex) {
  //Get curr player dice arrray
  if (currPlayer == 1) {
    diceArray = player1Dice;
  } else {
    diceArray = player2Dice;
  }
  var playerNum;
  if (firstIndex == 1) {
    playerNum = join2Numbers(diceArray[0], diceArray[1]);
  }
  // Otherwise, create player number starting with 2nd dice
  else {
    playerNum = join2Numbers(diceArray[1], diceArray[0]);
  }

  // Store player num in relevant global player num variable
  if (currPlayer == 1) {
    player1Num = playerNum;
  } else {
    player2Num = playerNum;
  }

  // Return generated player num to parent function
  return playerNum;
};

/** Determine winner between Player 1 and 2 \
 * Return either 1 or 2 to rep winner
 * In event of tie, Player 1 wins
 */
var determineWinner = function () {
  if (player1Num > player2Num) {
    return 1;
  }
  return 2;
};

/** Play Beat That */
var main = function (input) {
  if (mode == MODE_ROLL_DICE) {
    // Get dice rolls for curr player and populate dice array
    var newDiceRolls = storeDiceRolls();
    // Switch mode to choose dice order
    mode = MODE_CHOOSE_ORDER;
    // Return dice roll values to player
    return `Welcome Player ${currPlayer}. <br>
    You rolled Dice 1: ${newDiceRolls[0]} and Dice 2: ${newDiceRolls[1]} <br>
    Choose the order of the dice by entering 1 or 2 as the first index.`;
  }

  // Create number based on player's chosen dice order, and show it to the player
  if (mode == MODE_CHOOSE_ORDER) {
    //Validate input. If first index in neither 1 nor 2, tell user
    var firstIndex = Number(input);
    if (firstIndex !== 1 && firstIndex !== 2) {
      return `Please choose 1 or 2 as first index for your dice rolls`;
    }

    // Get player number for curr player
    var playerNum = getPlayerNumber(firstIndex);
    var playerNumResponse = `Player ${currPlayer}, you chose Dice ${firstIndex} first. <br>
    Your number is ${playerNum}.`;

    // If curr player is 1, change curr player to player 2 and switch mode to dice roll
    if (currPlayer == 1) {
      currPlayer = 2;
      mode = MODE_ROLL_DICE;
      // Return player number to Player 1, let Player 2 know it's their turn
      return `${playerNumResponse} <br>
      It is now Player 2's turn. Please Submit to roll Player 2's dice.`;
    }
    // Else if currPlayer is player 2, determine thee winner and let players know who won.
    var winningPlayer = determineWinner();

    // Reset game
    currPlayer = 1;
    mode = MODE_ROLL_DICE;

    // Return game end response
    return `${playerNumResponse} <br>
    Player ${winningPlayer} has won. <br>
    Player 1's number: ${player1Num} | Player 2's number: ${player2Num} <br><br>
    Press submit to play again.`;
  }

  // Return error if game mode not expected
  return `An error occurred. Please refresh to restart.`;
};
