/*
 * Initialize socket connection
 * Don't forget to update the server address here too
 */
var socket = io.connect("http://localhost:8888");

  /*
   * Abstracted interface for the nodebot
   */
  var nodeBot = {
    /*
     * Turn left
     */
    left: function () {
      logAction('TURN LEFT');
      socket.emit("move", "left");
    },
    /*
     * Turn right
     */
    right: function () {
      logAction('TURN RIGHT');
      socket.emit("move", "right");
    },
    /*
     * Move forward
     */
    fwd: function () {
      logAction('MOVE FWD');
      socket.emit("move", "fwd");
    },
    /*
     * Move back
     */
    reverse: function () {
      logAction('MOVE BACK');
      socket.emit("move", "reverse");
    },
    /*
     * Stop
     */
    stop: function () {
      logAction('STOP MOTION');
      socket.emit("stop");
    }
  };

  // convenience function to log to UI
  function logAction(action) {
    var output = document.querySelector('.commandLog textarea');
    var curVal = output.value;
    
    output.value = curVal + '\n' + action;
    // if(curVal.length < 1) {
    //   output.value = action;
    // } else {
    //   output.value = curVal + '\n' + action;
    // }
  }//function logAction

  /*
   * Mapping of keyboard keys to bot movements
   */
  function keyEventListener(event) {
    //Space key: 32, Q (Stop): 113 or 81 (caps)
    //Arrow keys: 37 left, 38 up, 39 right, 40 down
    //Keyboard: 65 left, 87 up, 68 right, 83 down
    switch(event.keyCode) {
      //using fall-throughs!!
      case 37:
      case 65:
        // left key pressed
        nodeBot.left();
        break;
      case 87:
      case 38:
        // up key pressed
        nodeBot.fwd();
        break;
      case 68:
      case 39:
        // right key pressed
        nodeBot.right();
        break;
      case 83:
      case 40:
        // down key pressed
        nodeBot.reverse();
        break;
      case 81:
      case 113:
        // q or Q pressed
        nodeBot.stop();
        break;
      //case 32:
        // Space key pressed
        //    handleAction('CIRCLE');
        //    break;  
    }
  }//function keyEventListener

  function init () {
    //setup listeners for key events. use keydown because of the arrow keys. they
    //don't send keypress.  
    window.addEventListener('keydown', keyEventListener, false);

    //try initialize leap motion
  }//function init

  window.addEventListener('load', init);