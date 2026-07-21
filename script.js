// Study Hub 2.0
// Main Controller



// Start app when page loads

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        loadLearning();


        loadDashboard();


        loadTheme();


    }

);






// Page navigation

function showPage(page){



    document
    .querySelectorAll(".page")
    .forEach(section=>{


        section.classList.remove(
            "active"
        );


    });




    const selected =
        document.getElementById(page);



    if(selected){

        selected.classList.add(
            "active"
        );

    }



}







// Dark mode toggle

function toggleTheme(){



    document.body.classList.toggle(
        "dark"
    );



    const dark =
        document.body.classList.contains(
            "dark"
        );



    localStorage.setItem(

        "theme",

        dark ? "dark" : "light"

    );



}







// Load saved theme

function loadTheme(){



    const theme =
        localStorage.getItem(
            "theme"
        );



    if(theme==="dark"){


        document.body.classList.add(
            "dark"
        );


    }


}