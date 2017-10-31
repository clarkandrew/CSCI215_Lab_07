// JavaScript for creating interactive animations on a canvas 
////////////////////////////////////////////////////////////////////
// Create a Mario object which contains all the info about Mario
// Objects are nice because they allow up to keep all the relevant
// info about an item in one place.

var Mario;
////////////////////////////////////////////////////////////////////


window.onload = init; // calls the function named "init"
// declare the background image
var bgImage = new Image();

// Is called when the window loads;
function init() {

    // Initialize Mario Object

    Mario = {
        x: 100,
        y: 618,
        w: 50,
        h: 80,
        JumpSound: new Audio('jump.wav'),
        Image: (function () {
            var temp = new Image();
            temp.src = "mario1.png";
            return temp;
        })(),
        moving: "no",
        timer: "",
        timerInterval: 10
    };

    bgImage.src = "marioBG.jpg";
    draw();



    var bgMusic = new Audio('mario_08.wav');
    bgMusic.play();
}

////////////////////////////////////////////////////////////////////

function draw() {

    // Get Drawing Area
    var ctx = document.getElementById("mario_canvas").getContext("2d");

    // If you want to display images on the canvas when it is initially
    // loaded, you must do it this way
    bgImage.onload = function () {
        ctx.drawImage(bgImage, 0, 0);
        ctx.drawImage(Mario.Image, 100, 618, 50, 80);

    }




    /////////////////////////////////////////////////////////////////
    var render = function () {

        ctx.drawImage(bgImage, 0, 0);


        renderMario();

    }


    function renderMario() {
        if (Mario.y > 475 && Mario.moving == "up") {

            Mario.Image.src = "mario2.png";
            ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
            // Change the y value each time 
            Mario.y -= 5; // move 5 px up


        } else if (Mario.y <= 475 && Mario.moving == "up") {
            Mario.moving = "down";


        } else if (Mario.y < 618 && Mario.moving == "down") {
            Mario.Image.src = "mario2.png";
            ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
            Mario.y += 5; // move 5 px back down after a jump


        } else if (Mario.y == 618 && Mario.moving == "no") {
            Mario.moving = "up";
            Mario.JumpSound.play();


        } else {
            Mario.moving = "no";
            Mario.Image.src = "mario1.png";
            ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
            clearInterval(Mario.timer); // kills the timer
        }
    }
    ///////////////////////////////////////////////////////////////////


    document.body.onkeydown = function (e) { // listen for a key

        e = event || window.event; // any kind of event
        var keycode = e.charCode || e.keyCode; // any kind of key

        // The user wants Mario to jump:
        if (keycode === 13 && Mario.moving == "no") {
            Mario.timer = setInterval(render, Mario.timerInterval);
        }

        if (keycode === 82 && Mario.x < 1150 && Mario.moving == "no") {
            moveRight();

        } else if (keycode === 76 && Mario.x > 0 && Mario.moving == "no") {
            moveLeft();

        }

    }


 
    document.body.onkeyup = function (e) { // listen for a key
        e = event || window.event;
        var keycode = e.charCode || e.keyCode;

        if (keycode === 82 && Mario.x < 1150 && Mario.moving == "no") {
            setTimeout(function () {
                faceForward();
            }, 200);

        } else if (keycode === 76 && Mario.x > 0 && Mario.moving == "no") {
            setTimeout(function () {
                faceForward();
            }, 200);

        }
    }

    function moveLeft() {
        Mario.x -= 20;
        Mario.Image.src = "marioturnsleft.png";

        ctx.drawImage(bgImage, 0, 0);
        ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);

    }

    function moveRight() {
        Mario.x += 20;
        Mario.Image.src = "marioturnsright.png";

        ctx.drawImage(bgImage, 0, 0);
        ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);

    }



    function faceForward() {
        Mario.Image.src = "mario1.png";
        
        ctx.drawImage(bgImage, 0, 0);
        ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
    }



} // close draw()