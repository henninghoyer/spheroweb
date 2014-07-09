//http://www.kirupa.com/html5/keyboard_events_in_javascript.htm
//var spheron = require('spheron');
//var sphero = spheron.sphero();
//var spheroPort = '/dev/cu.Sphero-RGB';
//var COLORS = spheron.toolbelt.COLORS;

function logAction(action) {
	var output = document.querySelector('.controls textarea');
    var curVal = output.value;
    
	output.value = curVal + '\n' + action;
}

function stopSphero() {
	sphero.roll(0,sphero.heading||0,0);
}
function handleAction(action) {
	// This is where we set things in motion as far as the sphero is concerned
	// State 0 might be the better option but need to understand the docs a bit
	// better.
	switch(action) {
		case 'FORWARD':
			sphero.setHeading(0);
			sphero.roll(128, 0, 1);
        	if (safeMode) {
          		setTimeout(function() {
            		stopSphero(sphero);
          		}, 2000);
        	}
        	logAction('Move FORWARD');
			break;
		case 'RIGHT':
			sphero.setHeading(90);
			sphero.roll(128, 90, 1);
        	if (safeMode) {
          		setTimeout(function() {
            		stopSphero(sphero);
          		}, 2000);
        	}
        	logAction('Move RIGHT');
			break;
		case 'BACKWARD':
			sphero.setHeading(180);
			sphero.roll(128, 180, 1);
        	if (safeMode) {
          		setTimeout(function() {
            		stopSphero(sphero);
          		}, 2000);
        	}
        	logAction('Move BACKWARD');
			break;
		case 'LEFT':
			sphero.setHeading(270);
			sphero.roll(128, 270, 1);
        	if (safeMode) {
          		setTimeout(function() {
            		stopSphero(sphero);
          		}, 2000);
        	}
        	logAction('Move LEFT');
			break;
		//case 'CIRCLE': //may want to rename to TURN for clarity
		//	logAction('Circle');
		//  break;
		// case 'REVERSE': //quick reverse of direction as opposed to slower turning
		// break;
		// case 'STOP': //stop sphero dead where it is
		// break;		
	}
}

function keyEventListener(event) {
    //Space key: 32
	//Arrow keys: 37 left, 38 up, 39 right, 40 down
	//Keyboard: 65 left, 87 up, 68 right, 83 down
	switch(event.keyCode) {
		//using fall-throughs!!
        case 37:
        case 65:
        	// left key pressed
        	handleAction('LEFT');
            break;
        case 87:
        case 38:
            // up key pressed
            handleAction('FORWARD');
            break;
        case 68:
        case 39:
            // right key pressed
            handleAction('RIGHT');
            break;
        case 83:
        case 40:
            // down key pressed
            handleAction('BACKWARD');
            break;  
        //case 32:
            // Space key pressed
        //    handleAction('CIRCLE');
        //    break;  
    }  
}

function init () {
	//init sphero

	//setup listeners for key events. use keydown because of the arrow keys. they
	//don't send keypress.
	window.addEventListener('keydown', keyEventListener, false);

	//initialize leap motion
}
window.addEventListener('load', init);