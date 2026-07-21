// Study Hub 2.0
// Local Storage Database


const STORAGE_KEY = "studyHubPlans";



const defaultPlan = {

    id: Date.now(),

    name: "Term 2 Weeks 8-9",

    weekStart:"",

    weekEnd:"",

    studentNotes:"",

    teacherNotes:"",

    subjects:[

        createSubject("Reading","#3b82f6"),
        createSubject("Writing","#f97316"),
        createSubject("Numeracy","#22c55e"),
        createSubject("Careers Education","#a855f7"),
        createSubject("Respectful Relationships","#ec4899"),
        createSubject("Brain Warm Up","#eab308"),
        createSubject("Brain Break","#06b6d4")

    ]

};





function createSubject(title, colour="#6366f1"){

    return {

        title:title,

        colour:colour,

        description:"",

        notes:"",

        days:{

            Monday:false,
            Tuesday:false,
            Wednesday:false,
            Thursday:false,
            Friday:false

        }

    };

}






function loadPlans(){

    const saved = localStorage.getItem(STORAGE_KEY);


    if(saved){

        let loaded = JSON.parse(saved);


        loaded.forEach(plan=>{

            plan.subjects.forEach(subject=>{


                if(!subject.colour){

                    subject.colour="#6366f1";

                }


            });


        });


        return loaded;

    }



    const plans=[defaultPlan];


    savePlans(plans);


    return plans;


}







function savePlans(plans){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(plans)

    );

}








function getCurrentPlanID(){

    return localStorage.getItem("currentPlan");

}





function setCurrentPlanID(id){

    localStorage.setItem(

        "currentPlan",

        id

    );

}







function getCurrentPlan(){

    let allPlans = loadPlans();


    let id=getCurrentPlanID();



    if(!id){

        setCurrentPlanID(allPlans[0].id);

        return allPlans[0];

    }



    let found = allPlans.find(

        p => p.id == id

    );



    if(found){

        return found;

    }



    setCurrentPlanID(allPlans[0].id);


    return allPlans[0];

}