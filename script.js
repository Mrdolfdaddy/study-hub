// STUDY HUB SCRIPT



// PAGE SWITCHING

function showPage(page){

    document.querySelectorAll(".page").forEach(section => {

        section.classList.add("hidden");

    });


    document.getElementById(page).classList.remove("hidden");

}





// LEARNING PLAN


function showLearning(section){

    document.querySelectorAll(".learningSection").forEach(item=>{

        item.classList.add("hidden");

    });


    document.getElementById(section).classList.remove("hidden");

}







// CLOCK


function updateClock(){

    let now = new Date();


    document.getElementById("time").innerText =
    now.toLocaleTimeString();


    document.getElementById("date").innerText =
    now.toDateString();

}


setInterval(updateClock,1000);

updateClock();







// TASKS


let tasks = JSON.parse(
localStorage.getItem("tasks")
) || [];



function addTask(){

    let input =
    document.getElementById("taskInput");


    if(input.value.trim()=="")
    return;


    tasks.push(input.value);


    input.value="";


    displayTasks();

    saveTasks();

}




function displayTasks(){

    let list =
    document.getElementById("taskList");


    list.innerHTML="";


    tasks.forEach((task,index)=>{


        let li=document.createElement("li");


        li.innerHTML =
        task +
        ` <button onclick="removeTask(${index})">❌</button>`;


        list.appendChild(li);


    });


}



function removeTask(index){

    tasks.splice(index,1);

    displayTasks();

    saveTasks();

}



function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}








// NOTES


function saveNotes(){

    localStorage.setItem(

        "notes",

        document.getElementById("notesArea").value

    );


    alert("Notes saved!");

}





function loadNotes(){

    document.getElementById("notesArea").value =
    localStorage.getItem("notes") || "";

}









// LEARNING PLAN SAVE


function saveLearning(){


let data={};



document.querySelectorAll(".learningSection")
.forEach(section=>{


    let checks=[];


    section.querySelectorAll(
        "input[type='checkbox']"
    )
    .forEach(box=>{

        checks.push(box.checked);

    });



    data[section.id]={


        text:
        section.querySelector("textarea").value,


        checks:checks


    };


});



localStorage.setItem(

"learning",

JSON.stringify(data)

);


alert("Learning Plan Saved!");

}







function loadLearning(){


let data =
JSON.parse(
localStorage.getItem("learning")
);



if(!data)
return;



Object.keys(data).forEach(section=>{


let area =
document.getElementById(section);



if(!area)
return;



area.querySelector("textarea").value =
data[section].text;



let boxes =
area.querySelectorAll(
"input[type='checkbox']"
);



boxes.forEach((box,index)=>{

box.checked =
data[section].checks[index];

});


});


}









// UNO SCORE SYSTEM


let unoPlayers =
JSON.parse(
localStorage.getItem("unoPlayers")
) || [];



let unoRound = 1;



let challenges=[

"Play your next turn with your non-dominant hand 🤚",

"Say UNO like a robot 🤖",

"Give another player 10 points 😂",

"Pick up 2 extra cards next round 😈",

"Compliment the player who beats you 😇",

"Make a dramatic UNO victory speech 🎤"

];







function addUnoPlayer(){


let name =
document.getElementById("unoPlayerName").value;



if(name.trim()=="")
return;



unoPlayers.push({

name:name,

score:0,

roundScore:0

});



document.getElementById("unoPlayerName").value="";


saveUno();


displayUno();


}








function displayUno(){


let table =
document.getElementById("unoPlayers");


if(!table)
return;


table.innerHTML="";



unoPlayers.forEach((player,index)=>{


let row =
document.createElement("tr");



row.innerHTML=`

<td>${player.name}</td>

<td>
<input type="number"
value="${player.roundScore}"
onchange="updateUnoScore(${index},this.value)">
</td>


<td>${player.score}</td>


<td>
<button onclick="removeUnoPlayer(${index})">
❌
</button>
</td>

`;



table.appendChild(row);


});



updateUnoStats();


}








function updateUnoScore(index,value){


unoPlayers[index].roundScore =
Number(value);



saveUno();



}





function nextUnoRound(){


unoPlayers.forEach(player=>{


player.score += player.roundScore;


player.roundScore=0;


});



unoRound++;


saveUno();


displayUno();


document.getElementById("unoRound").innerText =
"🎲 Round: " + unoRound;


}








function removeUnoPlayer(index){


unoPlayers.splice(index,1);


saveUno();


displayUno();


}







function updateUnoStats(){


if(unoPlayers.length==0)
return;



let winner =
[...unoPlayers]
.sort((a,b)=>b.score-a.score)[0];



document.getElementById("unoWinner").innerText =
"🏆 Winner: " + winner.name;



let highest =
Math.max(
...unoPlayers.map(p=>p.score)
);



document.getElementById("unoHighScore").innerText =
"🔥 Highest Score: " + highest;



let average =
Math.round(
unoPlayers.reduce((a,b)=>a+b.score,0)
/ unoPlayers.length
);



document.getElementById("unoAverage").innerText =
"📊 Average Score: " + average;


}








function randomUnoPlayer(){


if(unoPlayers.length==0)
return;



let player =
unoPlayers[
Math.floor(
Math.random()*unoPlayers.length
)
];



document.getElementById("unoFun").innerText =

"🎲 Selected: " + player.name;


}







function unoChallenge(){


let challenge =
challenges[
Math.floor(
Math.random()*challenges.length
)
];



document.getElementById("unoFun").innerText =
"😂 Challenge: " + challenge;


}








function resetUno(){


unoPlayers=[];


unoRound=1;


localStorage.removeItem("unoPlayers");


displayUno();


alert("New UNO game started!");

}



function saveUno(){


localStorage.setItem(

"unoPlayers",

JSON.stringify(unoPlayers)

);


}









// LOAD EVERYTHING


window.onload=function(){


displayTasks();


loadNotes();


loadLearning();


displayUno();


};