var app       = require('http').createServer(),
    io        = require('socket.io').listen(app),
    fs        = require('fs'),
    port      = 8888,
    spheron   = require("spheron"),
    hwDevice  = '/dev/cu.Sphero-GRP-AMP-SPP',
    COLORS    = spheron.toolbelt.COLORS,
    safeMode  = true,
    ball, nodeSphere;

  /*
   * Abstracted interface for the sphero
   */
  function Sphere(ball) {
    var self = this;
    /*
     * Turn left
     */
    this.left = function() {
      console.log("move left");
      ball.setHeading(270);
      ball.roll(128, 270, 1);
      if (safeMode) {
        setTimeout(function() {
          self.stop();
        }, 2000);
      }
    };
    /*
     * Turn right
     */
    this.right = function() {
      console.log("move right");
      ball.setHeading(90);
      ball.roll(128, 90, 1);
      if (safeMode) {
        setTimeout(function() {
          self.stop();
        }, 2000);
      }
    };
    /*
     * Move forward
     */
    this.fwd = function() {
      console.log("move fwd");
      ball.setHeading(0);
      ball.roll(128, 0, 1);
      if (safeMode) {
        setTimeout(function() {
          self.stop();
        }, 2000);
      }
    };
    /*
     * Move back
     */
    this.rev = function() {
      console.log("move back");
      ball.setHeading(180);
      ball.roll(128, 180, 1);
      if (safeMode) {
        setTimeout(function() {
          self.stop();
        }, 2000);
      }
    };
    // pivot: function() {
    //   console.log("pivoting...");
    //   if (safeMode) {
    //     setTimeout(function() {
    //       this.stop();
    //     }, 2000);
    //   }
    // },
    // reverse: function() {
    //   //quick reverse vs. slower turning
    //   console.log("reverse gear");
    //   if (safeMode) {
    //     setTimeout(function() {
    //       this.stop();
    //     }, 2000);
    //   }
    // },
    /*
     * Stop
     */
    this.stop = function() {
      console.log("stopping");
      ball.roll(0,ball.heading||0,0);
    };
  }

  /*
   * Let's do a quick check of the sphero by 
   * simply stopping it.
   */
  // nodeSphere.stop();

  /*
   * Start listening for commands
   */
  io.sockets.on('connection', function (socket) {
    /*
     * Stores current direction of the bot to 
     * calculate the pivoting motion
     */
    var currentDirection = null;

    console.log("socket connected", socket.id);
    
    /*
     * Custom Events to handle motion and stop     
     */
    socket.on('stop', function () {
      console.log("sphero:stop");
      nodeSphere.stop();
    });

    socket.on('move', function (direction) {

      console.log("sphero:move:" + direction);

      switch (direction) {
        /*
         * Pivot left if there's an existing direction
         */
        case 'left':
          // if (currentDirection) {
            // nodeSphere.pivot(currentDirection + "-left");
            nodeSphere.left();
          // }
          break;
        /*
         * Pivot right if there's an existing direction
         */
        case 'right':
          // if (currentDirection) {
            // nodeSphere.pivot(currentDirection + "-right");
            nodeSphere.right();
          // }
          break;
        /*
         * Move forward
         */
        case 'fwd':
          currentDirection = "forward";
          nodeSphere.fwd();
          break;
        /*
         * Move back
         */
        case 'reverse':
          currentDirection = "reverse";
          nodeSphere.rev();
          break;
      }
    });
  });

/*
 * Initialize the Sphero
 */
console.log("Initializing Sphero");
ball = spheron.sphero().resetTimeout(true);
ball.open(hwDevice);

console.log("waiting for Sphero connection...");
ball.on('open', function() {
  console.log('connected to Sphero');
  ball.setRGB(spheron.toolbelt.COLORS.PURPLE).setBackLED(255);
  nodeSphere = new Sphere(ball);
});

console.log("listening on port ", port);
app.listen(port);