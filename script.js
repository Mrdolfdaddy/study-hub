* {
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}


body {
    margin: 0;
    background: #f2f5ff;
    color: #222;
}


/* LOGIN */

#loginScreen {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}


.loginBox {
    background: white;
    padding: 40px;
    border-radius: 15px;
    width: 350px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}


.loginBox h1 {
    margin-bottom: 10px;
}


.loginBox input {
    width: 100%;
    padding: 12px;
    margin: 8px 0;
    border-radius: 8px;
    border: 1px solid #ccc;
}


button {
    background: #4b6cff;
    color: white;
    border: none;
    padding: 12px 18px;
    margin: 5px;
    border-radius: 8px;
    cursor: pointer;
}


button:hover {
    opacity: 0.85;
}



/* APP LAYOUT */


#app {
    display: flex;
    min-height: 100vh;
}


.sidebar {
    width: 240px;
    background: #1f2937;
    color: white;
    padding: 20px;
}


.sidebar h1 {
    font-size: 24px;
    margin-bottom: 25px;
}


.sidebar button {
    width: 100%;
    background: #374151;
    text-align: left;
    margin-bottom: 8px;
}


.sidebar button:hover {
    background: #4b6cff;
}



.main {
    flex: 1;
    padding: 30px;
}



.page {
    animation: fade 0.3s ease;
}



.card {
    background: white;
    padding: 25px;
    border-radius: 15px;
    margin-bottom: 20px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
}



input,
textarea {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
}



textarea {
    height: 200px;
    resize: none;
}



.progress {
    height: 20px;
    background: #ddd;
    border-radius: 20px;
    overflow: hidden;
}


#progressBar {
    height: 100%;
    width: 0%;
    background: #4b6cff;
}



ul {
    padding-left: 20px;
}


li {
    margin: 10px;
}



.gameBox {
    background: white;
    padding: 20px;
    border-radius: 15px;
}



canvas {
    background: black;
    border-radius: 10px;
}



.hidden {
    display: none;
}



@keyframes fade {

from {
    opacity:0;
}

to {
    opacity:1;
}

}