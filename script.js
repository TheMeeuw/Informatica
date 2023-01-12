var character = document.getElementById("character");
var game = document.getElementById("game");
var scoreBoard = document.getElementById("score");
var interval;
var both = 0;
var counter = 0;
var inputLeft = 0;
var inputRight = 0;
var linearMovement = 0;
var currentBlocks = [];

document.addEventListener("keydown", event => {
        if(event.key==="="){
            console.log("left 1");
            inputLeft = 1;
        }
        if(event.key==="L"){
            console.log("right 1");
            inputRight = 1;
        }
});

document.addEventListener("keyup", event => {
    if(event.key==="="){
        console.log("left 0");
        inputLeft = 0;
    }
    if(event.key==="L"){
        console.log("right 0");
        inputRight = 0;
    }
});

var blocks = setInterval(function(){
    var blockLast = document.getElementById("block"+(counter-1));
    var holeLast = document.getElementById("hole"+(counter-1));
    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
        var holeLastLeft = parseInt(window.getComputedStyle(holeLast).getPropertyValue("left"));
    }
    if(blockLastTop<400||counter==0){
        var block = document.createElement("div");
        var hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block"+counter);
        hole.setAttribute("id", "hole"+counter);
        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";
        var random = Math.floor(Math.random() * 360);
        while(counter > 10 && Math.abs(random - holeLastLeft) < 101) random = Math.floor(Math.random() * 360);
        console.log(random);
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter);
        counter++;
        scoreBoard.innerText = counter-5;
    }
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    if(characterTop <= 0){
        alert("Game over. Score: "+(counter-5));
        clearInterval(blocks);
        location.reload();
    }
    //Vertical Movement
    var thruHole = 0;
    for(var i = 0; i < currentBlocks.length;i++){
        let iblock = document.getElementById("block"+currentBlocks[i]);
        let ihole = document.getElementById("hole"+currentBlocks[i]);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        var scrollSpeed = Math.min(0.3 + counter * 0.005 , 1.5)
        iblock.style.top = iblockTop - scrollSpeed + "px";
        ihole.style.top = iblockTop - scrollSpeed + "px";
        if(iblockTop < -20){
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }
        if(iblockTop-24<characterTop && iblockTop>characterTop){
            drop++;
            if(iholeLeft<=characterLeft && iholeLeft+20>=characterLeft){
                drop = 0;
            }
        }
        if(iholeLeft<=characterLeft && iholeLeft+20>=characterLeft && iblockTop-24<characterTop && iblockTop>characterTop){
            thruHole = 1;
        }
    }
    if(drop==0){
        if(characterTop < 480){
            character.style.top = characterTop + 2 + "px";
        }
    }else{
        character.style.top = characterTop - scrollSpeed + "px";
    }
    //Horizontal Movement
    if (inputLeft || inputRight){
        var left = parseFloat(window.getComputedStyle(character).getPropertyValue("left"));
      linearMovement = inputRight * 2 - inputLeft * 2;
      linearMovement *= 1 + counter * 0.005;
        console.log("move me " + linearMovement)
        if(!thruHole){
            left += linearMovement;
            if (linearMovement > 0) character.style.transform = "scaleX(1)";
            else character.style.transform = "scaleX(-1)";
        }
        if(left < 0) left = 0;
        if(left > 380) left = 380;
        character.style.left = (left) + "px";
    }
},1);
