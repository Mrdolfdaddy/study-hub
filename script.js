// PAGE SWITCHING

function showPage(page){

    document.querySelectorAll(".page").forEach(p=>{
        p.classList.add("hidden");
    });

    document.getElementById(page).classList.remove("hidden");

}







// CLOCK

function updateClock(){

    let now = new Date();

    document.getElementById("date").innerHTML =
    now.toDateString();

    document.getElementById("time").innerHTML =
    now.toLocaleTimeString();

}


setInterval(updateClock,1000);

updateClock();







// TASKS

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];



function addTask(){

    let input =
    document.getElementById("taskInput");


    if(input.value==="") return;


    tasks.push({

        text:input.value,

        done:false

    });


    input.value="";

    saveTasks();

}




function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    displayTasks();

}




function displayTasks(){

    let list =
    document.getElementById("taskList");


    list.innerHTML="";


    tasks.forEach((task,index)=>{


        let li=document.createElement("li");


        li.innerHTML=

        `
        <span onclick="completeTask(${index})">
        ${task.done ? "✅":"⬜"} ${task.text}
        </span>

        <button onclick="deleteTask(${index})">
        ❌
        </button>
        `;


        list.appendChild(li);


    });


    updateProgress();

}



function completeTask(index){

    tasks[index].done =
    !tasks[index].done;


    saveTasks();

}



function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

}


displayTasks();









// HOMEWORK

let homework =
JSON.parse(localStorage.getItem("homework")) || [];



function addHomework(){

    let input =
    document.getElementById("homeworkInput");


    if(input.value==="") return;


    homework.push(input.value);


    input.value="";


    localStorage.setItem(
        "homework",
        JSON.stringify(homework)
    );


    displayHomework();

}




function displayHomework(){

    let list =
    document.getElementById("homeworkList");


    list.innerHTML="";


    homework.forEach(item=>{


        let li=document.createElement("li");


        li.innerHTML=item;


        list.appendChild(li);


    });


}


displayHomework();








// NOTES


document.getElementById("notesArea").value =
localStorage.getItem("notes") || "";



function saveNotes(){

    localStorage.setItem(
        "notes",
        document.getElementById("notesArea").value
    );

}









// LINKS

let websites =
JSON.parse(localStorage.getItem("websites")) || [];



function addWebsite(){

    let name =
    document.getElementById("siteName").value;


    let url =
    document.getElementById("siteURL").value;


    if(name==="" || url==="") return;


    websites.push({

        name:name,

        url:url

    });


    localStorage.setItem(
        "websites",
        JSON.stringify(websites)
    );


    displayWebsites();

}




function displayWebsites(){

    let box =
    document.getElementById("websiteList");


    box.innerHTML="";


    websites.forEach(site=>{


        let button=document.createElement("button");


        button.innerHTML=site.name;


        button.onclick=()=>{

            window.open(site.url,"_blank");

        };


        box.appendChild(button);


    });


}


displayWebsites();









// CALENDAR

let events =
JSON.parse(localStorage.getItem("events")) || [];



function addEvent(){

    let input =
    document.getElementById("eventInput");


    if(input.value==="") return;


    events.push(input.value);


    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );


    displayEvents();

}




function displayEvents(){

    let list =
    document.getElementById("eventList");


    list.innerHTML="";


    events.forEach(event=>{


        let li=document.createElement("li");


        li.innerHTML=event;


        list.appendChild(li);


    });


}


displayEvents();








// PROGRESS

function updateProgress(){

    let total=tasks.length;


    let complete =
    tasks.filter(t=>t.done).length;


    let percent=0;


    if(total>0){

        percent =
        Math.round((complete/total)*100);

    }


    document.getElementById("progressBar").style.width =
    percent+"%";


    document.getElementById("progressText").innerHTML =
    percent+"% Complete";

}









// TIMER

let seconds=1500;

let timer;



function startTimer(){

    timer=setInterval(()=>{

        seconds--;

        updateTimer();


        if(seconds<=0){

            clearInterval(timer);

            alert("Study complete!");

        }


    },1000);

}



function pauseTimer(){

    clearInterval(timer);

}




function resetTimer(){

    clearInterval(timer);

    seconds=1500;

    updateTimer();

}




function updateTimer(){

    let min=Math.floor(seconds/60);

    let sec=seconds%60;


    document.getElementById("timerDisplay").innerHTML=

    `${min}:${sec<10?"0":""}${sec}`;

}


updateTimer();









// THEMES

function theme(name){

    document.body.className=name;

    localStorage.setItem(
        "theme",
        name
    );

}


let savedTheme =
localStorage.getItem("theme");


if(savedTheme){

    document.body.className=savedTheme;

}










// SETTINGS

function clearData(){

    localStorage.clear();

    location.reload();

}









// GAMES MENU

function showGame(game){

    document.getElementById("snakeGame")
    .classList.add("hidden");


    document.getElementById("slopeGame")
    .classList.add("hidden");


    document.getElementById(game+"Game")
    .classList.remove("hidden");


    if(game==="snake"){
        startSnake();
    }


    if(game==="slope"){
        startSlope();
    }

}









// SNAKE GAME

function startSnake(){

let canvas=document.getElementById("snakeCanvas");

let ctx=canvas.getContext("2d");


let snake=[

{x:200,y:200}

];


let food={

x:100,

y:100

};


let dx=20;

let dy=0;



document.onkeydown=function(e){


if(e.key==="ArrowUp"){

dx=0;

dy=-20;

}


if(e.key==="ArrowDown"){

dx=0;

dy=20;

}


if(e.key==="ArrowLeft"){

dx=-20;

dy=0;

}


if(e.key==="ArrowRight"){

dx=20;

dy=0;

}


};



function loop(){


ctx.clearRect(0,0,400,400);



let head={

x:snake[0].x+dx,

y:snake[0].y+dy

};


snake.unshift(head);



if(head.x===food.x && head.y===food.y){


food={

x:Math.floor(Math.random()*20)*20,

y:Math.floor(Math.random()*20)*20

};


}else{

snake.pop();

}



ctx.fillStyle="lime";


snake.forEach(p=>{

ctx.fillRect(
p.x,
p.y,
20,
20
);

});



ctx.fillStyle="red";


ctx.fillRect(
food.x,
food.y,
20,
20
);



if(

head.x<0 ||
head.y<0 ||
head.x>=400 ||
head.y>=400

){

snake=[{x:200,y:200}];

}


setTimeout(loop,100);


}


loop();


}









// SLOPE GAME

function startSlope(){

let canvas=document.getElementById("slopeCanvas");

let ctx=canvas.getContext("2d");


let ball={

x:250,

y:50

};


let direction=0;



document.onkeydown=function(e){


if(e.key==="ArrowLeft")
direction=-1;


if(e.key==="ArrowRight")
direction=1;


};



function loop(){


ctx.clearRect(0,0,500,400);



ball.x+=direction*5;

ball.y+=3;



ctx.fillStyle="cyan";

ctx.beginPath();

ctx.arc(
ball.x,
ball.y,
15,
0,
Math.PI*2
);

ctx.fill();



if(ball.y>400){

ball.y=0;

}



requestAnimationFrame(loop);


}


loop();


}