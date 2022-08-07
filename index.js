// TicTacToe Example
/**
 * Generic board game types
 * @type Player: json object, in the format of
 * {
 *  id: string, unique player id
 *  username: string, the player's display name
 * }
 * @type BoardGame: json object, in the format of
 * {
 *  // creator read write fields
 *  state: json object, which represents any board game state
 *  joinable: boolean (default=true), whether or not the room can have new players added to it
 *  finished: boolean (default=false), when true there will be no new board game state changes
 *
 *  // creator read only
 *  players: [Player], array of player objects
 *  version: Number, an integer value that increases by 1 with each state change
 * }
 * @type BoardGameResult: json object, in the format of
 * {
 *  // fields that creator wants to overwrite
 *  state?: json object, which represents any board game state
 *  joinable?: boolean, whether or not the room can have new players added to it
 *  finished?: boolean, when true there will be no new board game state changes
 * }
 */

/**
 * onRoomStart
 * @returns {BoardGameResult}
 */
function onRoomStart() {
  console.log("onRoomStart")
  return {
    state: {
      board: [
        null, null, null, null, null
      ],
      hands: [
        [null, null],
        [null, null],
      ],
      blinds: 10,
      players_bets: [
        5, 10,
      ],
      current_action: 0,
      actions_this_turn: [],
      cards_on_board: 0,
    },
    winner:  null,
  };
}

/**
 * onPlayerJoin
 * @param {Player} player, represents the player that is attempting to join this game
 * @param {BoardGame} currentGame
 * @returns {BoardGameResult}
 */
function onPlayerJoin(player, boardGame) {
  console.log("onPlayerJoin", player, boardGame)
  const { players } = boardGame;

  if (players.length == 2) {
    return { joinable: false }
  }
  return {};
}


function index_of_player (plr, plrs) {
  if (plr.id == plrs[0].id){
    return 0;
  }
  return 1;
}


function max_bet(bets) {
  if (bets[0] > bets[1]) return bets[0];
  return bets[1];
}

/**
 * onPlayerMove
 * @param {Player} player, the player that is attempting to make a move
 * @param {*} move json object, controlled the creator that represents the player's move
 * @param {BoardGame} currentGame
 * @returns {BoardGameResult}
 */
function onPlayerMove(player, move, boardGame) {
  console.log("onPlayerJoin", player, move, boardGame)
  const {state, players} = boardGame;
  const {
    board, 
    hands, 
    players_bets, 
    current_action, 
    actions_this_turn, 
    cards_on_board
  } = state; // uhhhh
  const index = index_of_player(player, players);

  if (index != current_action) {
    return {state};
  }
  
  const {action} = move;
  
  if (action == 'call'){
  }



}

/**
 * onPlayerQuit
 * @param {Player} player, the player that is attempting to quit the game
 * @param {BoardGame} currentGame
 * @returns {BoardGameResult}
 */
function onPlayerQuit(player, boardGame) {
  console.log("onPlayerQuit", player, boardGame)
  return {};
}

module.exports = {
  onRoomStart,
  onPlayerJoin,
  onPlayerMove,
  onPlayerQuit,
};
