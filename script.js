// STUDY HUB SCRIPT


// PAGE SWITCHING

function showPage(page){

    document.querySelectorAll(".page").forEach(section => {

        section.classList.add("hidden");

    });


    document.getElementById(page)
    .classList.remove("hidden");

}





// LEARNING PLAN SWITCHING


function showLearning(section){

    document.querySelectorAll(".learningSection").forEach(item => {

        item.classList.add("hidden");

    });


    document.getElementById(section)
    .classList.remove("hidden");

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


    if(input.value.trim() === "")
    return;



    tasks.push(input.value);


    input.value = "";


    displayTasks();


    saveTasks();


}





function displayTasks(){


    let list =
    document.getElementById("taskList");


    list.innerHTML = "";


    tasks.forEach((task,index)=>{


        let li =
        document.createElement("li");


        li.innerHTML = `

        ${task}

        <button onclick="removeTask(${index})">
        ❌
        </button>

        `;


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


    let notes =
    document.getElementById("notesArea").value;



    localStorage.setItem(

        "notes",

        notes

    );


    alert("Notes saved!");

}








function loadNotes(){


    document.getElementById("notesArea").value =

    localStorage.getItem("notes") || "";


}









// LEARNING PLAN SAVE


function saveLearning(){


    let learning = {};



    document.querySelectorAll(".learningSection")
    .forEach(section=>{


        let text =
        section.querySelector("textarea");


        let checks =
        [];


        section.querySelectorAll(
            "input[type='checkbox']"
        )
        .forEach(box=>{

            checks.push(box.checked);

        });



        learning[section.id] = {


            text:
            text.value,


            checks:
            checks


        };


    });




    localStorage.setItem(

        "learning",

        JSON.stringify(learning)

    );



    alert("Learning Plan Saved!");

}









function loadLearning(){


    let data = JSON.parse(

        localStorage.getItem("learning")

    );



    if(!data)
    return;



    Object.keys(data).forEach(section=>{


        let area =
        document.getElementById(section);



        if(!area)
        return;



        area.querySelector("textarea")
        .value =
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









// LOAD EVERYTHING WHEN PAGE OPENS


window.onload = function(){


    displayTasks();


    loadNotes();


    loadLearning();


};