// Initialize canvas element
const canvas = document.getElementById('game_canvas');
const ctx = canvas.getContext('2d');
const jspeedInput = document.getElementById('jspeed');
const fspeedInput = document.getElementById('fspeed');

var screenWidth = window.screen.width;
var screenHeight = window.screen.height;
canvas.width = 800;
canvas.height = 600;

var cloudArray = [];
var cactusArray = [];
let alive = true;

var smallY = 504;
var bigY = 482;

var fps = document.getElementById("fps");
var startTime = Date.now();
var frame = 0;

function tick() {
  var time = Date.now();
  frame++;
  if (time - startTime > 1000) {
      fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
      startTime = time;
      frame = 0;
	}
  window.requestAnimationFrame(tick);
}
tick();


class Cloud {
    constructor(x, y) {

        this.x = x;
        this.y = y;
        cloudArray.push(this);
    }

    render() {
        ctx.drawImage(img, 166, 2, 92, 27, this.x, this.y, 92, 27);
    }

}

class Cactus {
    constructor(x, y, varient) {
        this.x = x;
        this.y = y;
        //1 small
        if (varient == 0) {
            this.sx = 446;
            this.sizeX = 34;
            this.sizeY = 72;

        }
        //1st 2 small
        if (varient == 1) {
            this.sx = 480;
            this.sizeX = 34;
            this.sizeY = 72;

        }
        //2nd 2 small
        if (varient == 2) {
            this.sx = 514;
            this.sizeX = 34;
            this.sizeY = 72;
        }
        //1st 3 small
        if (varient == 3) {
            this.sx = 548;
            this.sizeX = 34;
            this.sizeY = 72;

        }
        //2nd 3 small
        if (varient == 4) {
            this.sx = 548 + 34;
            this.sizeX = 34;
            this.sizeY = 72;
        }
        //3rd 3 small
        if (varient == 5) {
            this.sx = 548 + 68;
            this.sizeX = 34;
            this.sizeY = 72;
        }
        //1 big
        if (varient == 6) {
            this.sx = 652;
            this.sizeX = 50;
            this.sizeY = 102;

        }
        //1st 2 big
        if (varient == 7) {
            this.sx = 750;
            this.sizeX = 52;
            this.sizeY = 102;

        }
        //2nd 2 big
        if (varient == 8) {
            this.sx = 702;
            this.sizeX = 50;
            this.sizeY = 102;
        }
        //group p1
        if (varient == 9) {
            this.sx = 802;
            this.sizeX = 48;
            this.sizeY = 102;
        }
        //group p2
        if (varient == 10) {
            this.sx = 850;
            this.sizeX = 52;
            this.sizeY = 102;
        }
        //group p3
        if (varient == 11) {
            this.sx = 902;
            this.sizeX = 50;
            this.sizeY = 102;
        }
        this.cx = this.x + (this.sizeX / 2);
        this.cy = this.y + (this.sizeY / 2);
        //
        this.varient = varient;
        cactusArray.push(this);
    }

    tick() {
        if (alive) {
            this.x -= speed;
            this.cx = this.x + (this.sizeX / 2);
            this.cy = this.y + (this.sizeY / 2);

        }
        this.render();
    }

    render() {
        ctx.drawImage(img, this.sx, 0, this.sizeX, this.sizeY, this.x, this.y, this.sizeX, this.sizeY);
        if (hitboxes) {
            ctx.fillRect(this.cx, this.cy, 5, 5);
        }


    }

}

class BigCactus extends Cactus {
    constructor(varient) {
        super();
        if (varient == 0) {
            let c = new Cactus(canvas.width + 120,bigY,6);
        }
        if (varient == 1) {
            let c = new Cactus(canvas.width + 120,bigY,7);
            let c1 = new Cactus(canvas.width + 120 + c.sizeX,bigY,8);
        }
        if (varient == 2) {
            let c = new Cactus(canvas.width + 120,bigY,9);
            let c1 = new Cactus(canvas.width + 120 + c.sizeX,bigY,10);
            let c2 = new Cactus(canvas.width + 120 + c1.sizeX + c.sizeX,bigY,11);
        }
    }
}

class SmallCactus extends Cactus {
    constructor(varient) {
        super();
        if (varient == 0) {
            let c = new Cactus(canvas.width + 120,smallY,0);
        }
        if (varient == 1) {
            let c = new Cactus(canvas.width + 120,smallY,1);
            let c1 = new Cactus(canvas.width + 120 + c.sizeX,smallY,2);
        }
        if (varient == 2) {
            let c = new Cactus(canvas.width + 120,smallY,3);
            let c1 = new Cactus(canvas.width + 120 + c.sizeX,smallY,4);
            let c2 = new Cactus(canvas.width + 120 + c1.sizeX + c.sizeX,smallY,5);
        }
    }

}

function generateCacti() {

    if (waitCactiR > 0) {
        waitCactiR -= speed * 0.15;
    }

    if (waitCactiR <= 0) {
        let z = Math.round(Math.random() * 2);
        if (z == 0) {
            waitCactiR = smallWait;    
        } else if (z == 1) {
            waitCactiR = meduimWait;
        } else {
            waitCactiR = bigWait;
        }
        let a = Math.round(Math.random() * 2);
        if (Math.round(Math.random()) == 0) {
            c = new SmallCactus(a);
            console.log("SMOL" + a)
        } else {
            c = new BigCactus(a);
            console.log("BEEG" + a);
        }
        

    }

}


function hitbox(a) {
    if (a) {
        hitboxes = true;
    } else {
        hitboxes = false;
    }
}

let cacti1 = new BigCactus(Math.random(0.5, 1) * 1700,482,Math.floor(Math.random() * 4));

let cloud1 = new Cloud(Math.random() * canvas.width,Math.random() * canvas.height - 200);
let cloud2 = new Cloud(Math.random() * canvas.width,Math.random() * canvas.height - 200);
let cloud3 = new Cloud(Math.random() * canvas.width,Math.random() * canvas.height - 200);
let cloud4 = new Cloud(Math.random() * canvas.width,Math.random() * canvas.height - 200);
console.log(cloudArray);

let maxWaitCloud = 750;
let minWaitCloud = 0;
let maxWaitCR = maxWaitCloud;
let waitCR = maxWaitCR;

let smallWait = 100;
let meduimWait = 200;
let bigWait = 250;
let waitCactiR = smallWait;

// Define game state
let ball_x = canvas.width / 2;
let ball_y = canvas.height / 2;
let ball_direction = {
    x: 5,
    y: 5
};
var hitboxes = false;
var forwardGround = 1;

var normSize = [88, 96];
var duckSize = [118, 60];
var cSize = normSize;

var ducking = false;
var downKey = false;

var wasDucking = false;

var DinoAnims = ([[1338, 0], //idle       0
[1426, 0], //idle blink 1
[1514, 0], //run1       2
[1602, 0], //run2       3
[1690, 0], //die        4
[1866, 36], //duck1     5
[1984, 36]//duck2      6

]);
var animIndex = 3;

var animTimerMax = 15;
var animTimer = animTimerMax;

var jumping = false;
var jumpSpeed = 0.6;
jspeedInput.value = jumpSpeed;
var jumpSChange = 1;
var MaxJumpTime = 12;
var jumpTime = MaxJumpTime;
var fallSpeed = 0.2;
fspeedInput.value = fallSpeed;

var yVelocity = 0;
let grounded = true;
let speed = 5;
//score
let xPos = 0;
let yPos = canvas.height - (20 + 98);
var groundY = 578;
let groundC = [95 + (normSize[0] / 2), 578]
let centerC = [95 + (normSize[0] / 2), groundC[1] - (normSize[1] / 2)]

let groundX1 = 0;
let groundX2 = 2404;

let img = new Image();
img.src = 'colored-2x.png';
img.onload = function() {
    animate();

}
;

// Add event listeners for player movement
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        if (grounded && alive) {
            jumping = true;
        }

    }
    if (event.code === "ArrowUp") {
        if (grounded && alive) {
            jumping = true;
        }
    }

    if (event.code === "ArrowDown" && alive) {
        downKey = true;
        can = true;
    }
});

document.addEventListener('keyup', function(event) {

    if (event.code === "ArrowDown") {
        downKey = false;

        can = true;
    }

})

var can = true;
function animate() {
    can = false;

    if (animTimer > 0) {
        animTimer--;
    }

    if (animTimer <= 0) {
        can = true;
        animTimer = animTimerMax;
    }

    if (grounded) {

        if (!ducking) {

            if (can && animIndex != 2) {
                animIndex = 2;
                can = false;
            }
            if (can && animIndex != 3) {
                animIndex = 3;
                can = false;
            }

        }

        if (ducking) {
            if (can && animIndex != 5) {
                animIndex = 5;
                can = false;
            }
            if (can && animIndex != 6) {
                animIndex = 6;
                can = false;
            }
        }

    }

    if (!grounded) {
        animIndex = 0;
    }

    if (wasDucking && !ducking) {

        cSize = normSize;
        animIndex = 2;

    }

    if (!wasDucking && ducking) {
        cSize = duckSize;
        animIndex = 5;
    }

    wasDucking = ducking;

}
//

function ground() {
    //ground
    if (alive) {
        groundX1 -= speed;
        groundX2 -= speed;
    }

    var nStart = 2350;

    if (groundX1 > -2404) {} else {
        groundX1 = nStart;
    }
    if (groundX2 <= -2404) {
        groundX2 = nStart;
    }

    ctx.drawImage(img, 0, 104, 2404, 26, groundX1, canvas.height - 50, 2404, 26);

    ctx.drawImage(img, 0, 104, 2404, 26, groundX2, canvas.height - 50, 2404, 26);

}

function gameLoop() {
    speed += 0.005;

    //center
    //canvas.style.margin = (screenWidth - canvas.width) / 2;

    groundC[0] = 95 + (cSize[0] / 2)

    centerC = [95 + (cSize[0] / 2), groundC[1] - (cSize[1] / 2)]

    if (groundC[1] >= groundY - 15) {

        if (!jumping) {

            grounded = true;
        } else {
            grounded = false;
        }

    }
	
	if (fspeed.value != null) {
		try {
			fallSpeed = parseFloat(fpseed.value);
		} catch (error) {
			
		}
	}
	
	
	if (jspeed.value != null) {
		try {
			jumpSpeed = parseFloat(jspeed.value);
		} catch (error) {
			
		}
	}

    // Clear canvas before each frame
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Update ball position and direction
    ball_x += ball_direction.x;
    ball_y += ball_direction.y;
    if (ball_x < 0 || ball_x > canvas.width) {
        ball_direction.x = -ball_direction.x;
    }
    if (ball_y < 0 || ball_y > canvas.height) {
        ball_direction.y = -ball_direction.y;
    }
    // Draw ball
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(ball_x, ball_y, 10, 0, 2 * Math.PI);
    ctx.fill();
    //ctx.drawImage(img,848,0,44,49,canvas.height-(20+98),88,98);
    if (alive) {
        xPos -= speed;
    }

    ground();
    animate();
    //dino

    if (waitCR > 0) {
        waitCR -= speed * 0.15;
    }

    if (waitCR <= 0) {
        waitCR = Math.floor(Math.random(minWaitCloud, maxWaitCloud) * maxWaitCR);
        const c = new Cloud(canvas.width + 100,Math.random() * 400);
    }

    generateCacti();

    for (var i = 0; i < cloudArray.length; i++) {
        cloudArray[i].x -= speed * 0.2;
        cloudArray[i].render();
        if (cloudArray[i].x < -100) {
            cloudArray.splice(i, 1);
        }

    }

    for (var j = 0; j < cactusArray.length; j++) {
        try {
            cactusArray[j].tick();
            if (cactusArray[j].x < -100) {
                cactusArray.splice(j, 1);
            }

            if (Math.hypot(Math.abs(cactusArray[j].x - 95), Math.abs(cactusArray[j].y - yPos)) <= 75) {
                alive = false;
                animIndex = 4;
           //     throw console.warn("YOU DIE NOW!");

            }
        } catch (error) {
        }

    }

    if (jumping) {
        jumpTime--;
        if (jumpTime >= 0) {

            yVelocity -= jumpSpeed;

        } else {
            jumpTime = MaxJumpTime;
            jumping = false;

        }

    }

    if (grounded && downKey) {
        ducking = true;
    } else {
        ducking = false;
    }

    if (ducking) {
        cSize = duckSize;
    } else {
        cSize = normSize;
    }

    if (!grounded && groundC[1] <= groundY && !jumping) {

        if (!downKey) {
            yVelocity += fallSpeed;
        }
        if (downKey) {
            yVelocity += fallSpeed * 2;
        }

    }

    if (groundC[1] > groundY) {
        yVelocity = 0;
        groundC[1] = 578;
    }

    groundC[1] += yVelocity;

    yPos = groundC[1] - cSize[1];

   // console.log(grounded + " v" + yVelocity + " y" + yPos + " j" + jumping + " jt" + jumpTime + " d" + ducking);
    ctx.drawImage(img, DinoAnims[animIndex][0], DinoAnims[animIndex][1], cSize[0], cSize[1], 95, yPos, cSize[0], cSize[1]);
    ctx.fillStyle = 'red';
    if (hitboxes) {
        ctx.fillRect(95, yPos, 5, 5);
        ctx.fillRect(groundC[0], groundC[1], 5, 5)
        ctx.fillRect(centerC[0], centerC[1], 5, 5);
    }


    // Call the next frame
    window.requestAnimationFrame(gameLoop);
}
// Start the game loop
gameLoop();
