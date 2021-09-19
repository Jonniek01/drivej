const startScreen=document.querySelector(".startScreen");
const score=document.querySelector(".score");
const gameArea=document.querySelector(".gameArea");


let player={speed:10,
            score:0 
}

let keys={
    ArroRight:false,
    ArrowLeft:false,
    ArrowDown:false,
    ArrowUp:false
}


document.addEventListener("keydown",pressOn)
document.addEventListener("keyup",pressOff)

startScreen.addEventListener("click",start);



function moveLines(){
    let linez=document.querySelectorAll(".line")
    linez.forEach(function(item){
        if (item.y>1500){item.y-=1500}
        item.y+=5;
    item.style.top=item.y+"px";
    }
    )
}


function isCollide(a,b){
    let aRect=a.getBoundingClientRect();
    let bRect=b.getBoundingClientRect();
    return !(
        (aRect.bottom<bRect.top)||
        (aRect.top>bRect.bottom)||
        (aRect.left>bRect.right)||
        (aRect.right<bRect.left)
    )
}


function moveEnemy(car){
    let enemi=document.querySelectorAll(".enemy")
    enemi.forEach(function(item){
        if(isCollide(car,item)){endGame();}

        if (item.y>=1000){item.y-=1500}
        item.y+=6;
    item.style.top=item.y+"px";
    }
    )
}


function playGame(){
    let car=document.querySelector(".car")
    let road=gameArea.getBoundingClientRect();
    
    moveLines();
    moveEnemy(car);



    if(player.start){
        if(keys.ArrowUp&&player.y>road.top-700){ player.y-=player.speed;}
        if(keys.ArrowDown &&player.y<road.bottom-200){ player.y+=player.speed;}
        if(keys.ArrowRight&&player.x<145){ player.x+=player.speed;}
        if(keys.ArrowLeft&&player.x>5){ player.x-=player.speed;}

        car.style.left=player.x+"px"
        car.style.top=player.y+"px"



  window.requestAnimationFrame(playGame);
}
   player.score++;
   score.innerText="Score: "+player.score;
}

function endGame(){
    player.start=false;
    score.classList.add("hidescore")
    startScreen.classList.remove("hide")
    startScreen.classList.add("restart")
    startScreen.innerHTML="GAME OVER!<br> YOUR SCORE WAS: "+player.score+" <br>CLICK TO RESTART"
}


function start(){
    startScreen.classList.add("hide");
    gameArea.classList.remove("hide");
    score.classList.remove("hidescore")
    score.classList.add("scores")
    gameArea.innerHTML=""

    
    player.score=0
    player.start=true
       for(x=0;x<=10; x++){ 
        let lines=document.createElement("div")
        lines.classList.add("line");
        lines.y=x*150
        lines.style.top=(x*150)+"px";
        gameArea.appendChild(lines)
       
       }
    window.requestAnimationFrame(playGame);
    let car=document.createElement("div")
    car.setAttribute("class","car")
    car.innerText="KyMo1"
    
    gameArea.appendChild(car)
    player.x=car.offsetLeft;
    player.y=car.offsetTop;

    for(x=0;x<3; x++){ 
        let enemy=document.createElement("div")
        enemy.classList.add("enemy");
        enemy.innerHTML=(x+1)
        enemy.y=((x+1)*500)*-1
        enemy.style.left=Math.floor(Math.random()*180)+"px";


        enemy.style.top=enemy.y+"px";
        enemy.style.backgroundColor=randomColor();
        gameArea.appendChild(enemy)


       
       }



    }


function pressOn(e){
    e.preventDefault();
    keys[e.key]=true;
   
}
function pressOff(f){
    f.preventDefault();
    keys[f.key]=false;
   
}

function randomColor(){
    function c(){
        let hex=Math.floor(Math.random()*256).toString(16);
        return("0"+String(hex)).substr(-2)
    }
    return"#"+c()+c()+c();
}




