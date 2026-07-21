// Study Hub 2.0
// Dashboard System



function loadDashboard(){


    updateDate();

    updateClock();

    updateCurrentPlan();

    updateProgress();


}





// Date display

function updateDate(){


    const date = document.getElementById("date");


    if(!date) return;



    const today = new Date();



    date.textContent = today.toLocaleDateString(

        "en-AU",

        {

            weekday:"long",

            year:"numeric",

            month:"long",

            day:"numeric"

        }

    );


}







// Clock

function updateClock(){


    const clock = document.getElementById("clock");


    if(!clock) return;



    setInterval(()=>{


        const now = new Date();



        clock.textContent =
            now.toLocaleTimeString();



    },1000);



}







// Current plan name

function updateCurrentPlan(){


    const display = document.getElementById(
        "currentPlan"
    );


    if(!display) return;



    const plan = getCurrentPlan();



    display.textContent = plan.name;



}