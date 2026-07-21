// Study Hub 2.0
// Learning Plan System


let plans = loadPlans();




// Load learning page

function loadLearning(){

    const selector = document.getElementById("planSelector");
    const container = document.getElementById("learningContainer");


    if(!selector || !container) return;


    plans = loadPlans();


    selector.innerHTML = "";


    plans.forEach(plan=>{

        const option=document.createElement("option");

        option.value=plan.id;

        option.textContent=plan.name;

        selector.appendChild(option);

    });



    const current=getCurrentPlan();


    if(current){

        selector.value=current.id;

        renderPlan(current);

        updateProgress();

    }

}







// Render plan

function renderPlan(plan){

    const container=document.getElementById("learningContainer");


    if(!container) return;


    container.innerHTML="";



    const wrapper=document.createElement("div");

    wrapper.className="learning-wrapper";



    wrapper.innerHTML=`


<div class="plan-header">

    <h2>${plan.name}</h2>


    <div class="plan-buttons">

        <button onclick="addSubject()">
        ➕ Add Subject
        </button>

        <button onclick="renameSubject()">
        ✏️ Rename
        </button>

        <button onclick="removeSubject()">
        🗑 Remove
        </button>

    </div>


</div>




<table class="learning-table">

<thead>

<tr>

<th>Subject</th>
<th>Monday</th>
<th>Tuesday</th>
<th>Wednesday</th>
<th>Thursday</th>
<th>Friday</th>

</tr>

</thead>



<tbody>


${plan.subjects.map((subject,index)=>`


<tr>


<td class="subject-name">


<div 
class="subject-title"
style="border-left:8px solid ${subject.colour || "#6366f1"};"
>

${subject.title}

</div>


<input 
type="color"
value="${subject.colour || "#6366f1"}"
onchange="changeSubjectColour(${index},this.value)"
>



<textarea

placeholder="Learning goal..."

onchange="updateDescription(${index},this.value)"

>${subject.description || ""}</textarea>




<textarea

placeholder="Notes..."

onchange="updateNotes(${index},this.value)"

>${subject.notes || ""}</textarea>



</td>



<td>${check(index,"Monday",subject.days.Monday)}</td>

<td>${check(index,"Tuesday",subject.days.Tuesday)}</td>

<td>${check(index,"Wednesday",subject.days.Wednesday)}</td>

<td>${check(index,"Thursday",subject.days.Thursday)}</td>

<td>${check(index,"Friday",subject.days.Friday)}</td>


</tr>


`).join("")}



</tbody>


</table>





<div class="notes-area">


<h3>📝 Student Notes</h3>


<textarea

placeholder="Student notes..."

onchange="updateStudentNotes(this.value)"

>${plan.studentNotes || ""}</textarea>



<h3>👨‍🏫 Teacher Notes</h3>


<textarea

placeholder="Teacher notes..."

onchange="updateTeacherNotes(this.value)"

>${plan.teacherNotes || ""}</textarea>


</div>



`;



container.appendChild(wrapper);


}







function check(subject,day,value){

return `

<input

type="checkbox"

${value ? "checked":""}

onchange="toggleDay(${subject},'${day}',this.checked)"

>

`;

}








// Change colour

function changeSubjectColour(index,value){

    const plan=getCurrentPlan();


    plan.subjects[index].colour=value;


    savePlans(plans);


    renderPlan(plan);

}







// Add subject

function addSubject(){

    const name=prompt("Subject name:");

    if(!name)return;


    const plan=getCurrentPlan();


    plan.subjects.push(
        createSubject(name)
    );


    savePlans(plans);


    renderPlan(plan);

}







// Rename

function renameSubject(){

    const plan=getCurrentPlan();


    const index=prompt(
        "Subject number:"
    ) - 1;


    if(plan.subjects[index]){


        const name=prompt(
            "New name:",
            plan.subjects[index].title
        );


        if(name){

            plan.subjects[index].title=name;

        }

    }


    savePlans(plans);


    renderPlan(plan);

}







// Remove

function removeSubject(){

    const plan=getCurrentPlan();


    const index=prompt(
        "Subject number:"
    ) - 1;


    if(plan.subjects[index]){

        plan.subjects.splice(index,1);

    }


    savePlans(plans);


    renderPlan(plan);

}







function updateDescription(index,value){

const plan=getCurrentPlan();

plan.subjects[index].description=value;

savePlans(plans);

}





function updateNotes(index,value){

const plan=getCurrentPlan();

plan.subjects[index].notes=value;

savePlans(plans);

}





function updateStudentNotes(value){

const plan=getCurrentPlan();

plan.studentNotes=value;

savePlans(plans);

}





function updateTeacherNotes(value){

const plan=getCurrentPlan();

plan.teacherNotes=value;

savePlans(plans);

}





function toggleDay(subject,day,value){

const plan=getCurrentPlan();


plan.subjects[subject].days[day]=value;


savePlans(plans);


updateProgress();

}







function updateProgress(){

const plan=getCurrentPlan();


if(!plan)return;


let total=0;

let complete=0;


plan.subjects.forEach(subject=>{

Object.values(subject.days).forEach(day=>{

total++;

if(day) complete++;

});

});



const percent=total===0?0:

Math.round(
complete/total*100
);



const display=document.getElementById(
"overallProgress"
);


if(display){

display.textContent=percent+"%";

}


}