function setup() {
  return {
    // "()" is needed because we are calling a function
    addNewLobby: require("./postlobby")()
  };
}

module.exports = setup;
