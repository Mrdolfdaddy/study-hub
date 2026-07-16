import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
getFirestore,
doc,
setDoc,
getDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";



const firebaseConfig = {

apiKey: "AIzaSyBZnvUAu7dXoxSMnlvhvsVkmOUswwPDEnc",

authDomain: "study-hub-779af.firebaseapp.com",

projectId: "study-hub-779af",

storageBucket: "study-hub-779af.firebasestorage.app",

messagingSenderId: "1089929857276",

appId: "1:1089929857276:web:3d1feec6214ad22e9fef79",

measurementId: "G-308HJ8VG7G"

};



const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);



let tasks = [];





// LOGIN

window.login = async function(){

let email = document.getElementById("email").value;

let password = document.getElementById("password").value;


try {

await signInWithEmailAndPassword(
auth,
email,
password
);

}

catch(error){

document.getElementById("loginMessage").innerText = error.message;

}

};





// CREATE ACCOUNT

window.signup = async function(){

let email = document.getElementById("email").value;

let password = document.getElementById("password").value;


try {

await createUserWithEmailAndPassword(
auth,
email,
password
);

}

catch(error){

document.getElementById("loginMessage").innerText = error.message;

}

};






// LOGOUT

window.logout = async function(){

await signOut(auth);

};







// USER CHECK


onAuthStateChanged(auth, async(user)=>{


if(user){

document.getElementById("loginScreen")
.classList.add("hidden");


document.getElementById("app")
.classList.remove("hidden");


await loadData();

}


else{

document.getElementById("loginScreen")
.classList.remove("hidden");


document.getElementById("app")
.classList.add("hidden");

}


});








// PAGE SWITCH


window.showPage = function(page){

document.querySelectorAll(".page")
.forEach(p=>{
p.classList.add("hidden");
});


document.getElementById(page)
.classList.remove("hidden");

};








// LEARNING PLAN SWITCH


window.showLearning=function(section){


document.querySelectorAll(".learningPage")
.forEach(p=>{
p.classList.add("hidden");
});


document.getElementById(section)
.classList.remove("hidden");


};








// CLOCK


function clock(){

let now=new Date();


document.getElementById("time").innerText =
now.toLocaleTimeString();


document.getElementById("date").innerText =
now.toDateString();


}


setInterval(clock,1000);

clock();









// TASKS


window.addTask=function(){


let input=document.getElementById("taskInput");


if(input.value.trim()=="")
return;


tasks.push(input.value);


input.value="";


displayTasks();

saveData();


};





function displayTasks(){


let list=document.getElementById("taskList");


list.innerHTML="";


tasks.forEach((task,index)=>{


let li=document.createElement("li");


li.innerHTML =

task +

` <button onclick="removeTask(${index})">
❌
</button>`;


list.appendChild(li);


});


}






window.removeTask=function(index){


tasks.splice(index,1);


displayTasks();

saveData();


};










// NOTES


window.saveNotes=function(){

saveData();

};










// LEARNING SAVE


window.saveLearning=function(){

saveData();

alert("Learning Plan Saved!");

};










function getLearningData(){


let data={};


document.querySelectorAll(".learningPage")
.forEach(page=>{


let name=page.id;


data[name]={};


let desc=document.getElementById(name+"Desc");


if(desc){

data[name].description=desc.value;

}


let checks=page.querySelectorAll("input[type='checkbox']");


data[name].checklist=[];


checks.forEach(c=>{

data[name].checklist.push(c.checked);

});


});


return data;

}









async function saveData(){


let user=auth.currentUser;


if(!user)
return;


await setDoc(

doc(db,"users",user.uid),

{

tasks:tasks,

notes:
document.getElementById("notesArea").value,

learning:
getLearningData()

}

);


}









async function loadData(){


let user=auth.currentUser;


let ref =
doc(db,"users",user.uid);



let snap =
await getDoc(ref);



if(snap.exists()){


let data=snap.data();


tasks=data.tasks || [];


displayTasks();



document.getElementById("notesArea").value =
data.notes || "";



if(data.learning){


Object.keys(data.learning).forEach(section=>{


let info=data.learning[section];


let desc=document.getElementById(section+"Desc");


if(desc){

desc.value=info.description || "";

}



let boxes=document
.getElementById(section)
.querySelectorAll("input[type='checkbox']");



info.checklist.forEach((value,index)=>{

if(boxes[index]){

boxes[index].checked=value;

}

});


});


}



}


}