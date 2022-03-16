// after 16 minutes the user is redirected home, so they can proceed to the next scenario
setTimeout(function(){
  sessionStorage.setItem("scenario2", "true");
  modal.style.display = "block";
  // window.location.href = '/home';
  noLoop();
}, 120000);





// SENDS ALL VARIABLES THAT HAVE TO BE DISPLAYED IN THE HTML
let selectedDroneXPos_p = document.getElementById("selected-drone-xPos");
let selectedDroneYPos_p = document.getElementById("selected-drone-yPos");
//declaring how the altitude can be accesed by string Altitude
let selectedDroneID_p = document.getElementById("ID");
let selectedDroneCountryOfOrigin_p= document.getElementById("countryOrigin");

let selectedDroneAltitude_p = document.getElementById("Altitude");
let selectedDroneIFU_p = document.getElementById("IFF");
let selectedDroneWeapons_p = document.getElementById("Weapons");
let selectedDroneEmissions_p = document.getElementById("Emissions");
//Passing variables for drone tracker
////ID of clicked drone for tracking on the right side
let selectedDroneIdTrack_p = document.getElementById("IdAndClassTrack");

let selectedDroneTrackingInterval = null;
let selectedDroneIndex = null;
let drones = [];

//buttons to change color of
let btnHostile = document.querySelector("#hostile");
let btnNonHostile = document.querySelector("#nonHostile");
let btnUncertain = document.querySelector("#uncertain");
let btnConfirm = document.querySelector("#confirmButton");


//declare a box and how it an be queried
const box = document.querySelector('.box');
const blackCoverBox = document.getElementById('black-cover-box');
const quiz= document.getElementById('responsiveQuizContainer');


// //TESTING HOW TO OUTPUT THE USER ID on screen
// const user = import('../../server.js'); 

// console.log(`User: ${user.getID()}`);

//TESTNG URL PARAMETERS
// The idea is to use to redirect the participant to a URL that contains parameters corresponding to their given ID
// const queryStr = "  "
// const usp = "   "

parameters = new URLSearchParams(window.location.href);
const paramsString = 'accuracy=100 &randomSeed=1';

let searchParams = new URLSearchParams(paramsString);


// console.log(searchParams.get('accuracy'));
// console.log(searchParams.get('randomSeed'));

// interval to display screen freeze
intervalId = 0;
setInterval(() => {
  blackCoverBox.style.display = 'block';
  setTimeout(() => {
    blackCoverBox.style.display = 'none';
  }, 800)
},60000);




// // interval to display quiz
// setInterval(() => {
//   quiz.style.display = 'block';
//   setTimeout(() => {
//     quiz.style.display = 'none';
//   }, 60000)
// },6000);

//create button that will display after three minutes that redirects to the next trial


//setup function is part of p5 and creates a canvas and allows to define a framerate
function setup() {
  bg = loadImage('../assets/radarLines.png');

  
    randomSeed(3);
    createCanvas(800, 800);
    frameRate(30);
  // creates 10 instances of uncertain drones
  //background(0);
 

  for (let i = 0; i < 20 ; i++){
    
    if( i <= 8){
      drones[i] = new nonHostileDrone();
    }


    //two missclassified
    if( i> 8 && i<=10 ){
      drones[i] = new missclassifiedNonHostileDrone();
      //console.log(drones[i]);
    }
   //two missclassified
    if( i> 10 && i<=12 ){
      drones[i] = new missclassifiedUncertainDrone();
      //console.log(drones[i]);
    }



    if( i> 12 && i<17 ){
      
      drones[i] = new uncertainDrone();
      //console.log(drones[i]);
    }
    if( i>=17){

      drones[i] = new HostileDrone();

      console.log("hostile drone created")
    }
  }
    

  
  
}


// making a fucntion that returns the active button

function updateSelectedButton(buttonType){
  currentButtonPressed = buttonType;
  console.log(currentButtonPressed)
  return currentButtonPressed;
}

//getter methods that allow to access the ID and the classes of drones last interacted with 
function setDroneID(droneIndex){

  droneID = droneIndex;
  return droneID

}



// var logFile = document.getElementById("logFile");
//when confirm is pressed it creates a timestamp of the time the button confirmw, hostile non hostile or uncertain was pressed

function getButton(buttonPressed){

  // var button= document.createTextNode(buttonPressed+" button pressed by ID " + " on : ");
  // logFile.append(button);

  var buttonLog = (buttonPressed +" button pressed by user ID " + UserID +" on : ");
  // console.log(UserID)
  return buttonLog
}


function getTime() {

  const date = new Date()
  // console.log(date);

  var timeLog = String(date)
  
  // var dateString = document.createTextNode(String(date)+ "\n");
  // logFile.append(dateString);

  return timeLog;

  
}

// when drone is pressed this will be called and willl return 
function logDroneID(droneIndex){
  // var ID = document.createTextNode("ID of drone selected: " + String(droneIndex)+ "\n");
  // logFile.append(ID);
  
  var droneIDLog = " button pressed by user ID " + UserID +  ", ID of drone selected: " + String(droneIndex) + ", drone selected on ";
  
  var timeDronePressed =  getTime();
  // console.log(getTime());

  var timeAndIDDronePressed = droneIDLog +  timeDronePressed;

  return timeAndIDDronePressed;

}

btnConfirm.addEventListener('click',() => {    

  console.log(UserID);
  var outputConfirmButton = (getButton("confirm"));

  console.log(outputConfirmButton);
  var outputConfirmTimeLog = (getTime());
  console.log(outputConfirmTimeLog);

  // logger.write(outputConfirmButton) // append string to your file")

  const confirmButtonLog = {outputConfirmButton, outputConfirmTimeLog };

  
  axios.post("/scenario2",confirmButtonLog);

  if(currentButtonPressed == "nonHostile") {
    drones[droneID].colour = color(0,255,0);
    console.log(currentButtonPressed)
    // console.log("non hostile working??")
  
  }
  else if(currentButtonPressed == "Uncertain") {
    drones[droneID].colour = color(255,255,0);
    console.log(currentButtonPressed)
    // console.log("uncertain working??")
  }
  
  else if(currentButtonPressed == "Hostile") {
    console.log(currentButtonPressed)
    // console.log(" hostile working??")
    drones[droneID].colour = color(255,0,0);
  
  }



   // selectedDroneIdTrack_p.innerText = "ID of drone tracked: " + droneID;

 
   const p = document.createElement('p');

    

   p.innerText = "ID of drone tracked: " + droneID + ", classified as " + currentButtonPressed;
   document.getElementById("parametersTrack").appendChild(p);
 

});

btnHostile.addEventListener('click',() => {    
  var outputHostileButton = (getButton("hostile"));
  console.log(outputHostileButton);
  var outputHostileTimeLog = (getTime());
  console.log(outputHostileTimeLog);

  const HostileButtonLog = {outputHostileButton, outputHostileTimeLog };

  
  axios.post("/scenario2",HostileButtonLog);
  btnNonHostile.style.backgroundColor = "#B1ACA3"
  btnHostile.style.backgroundColor = "#ff0000"
  btnUncertain.style.backgroundColor = "B1ACA3"

  updateSelectedButton("Hostile");





});

//Every time that a button or drone is clicked the variables defined below are passed to the server into the logger
// the logger will sequentialy write this information into a .txt file

btnNonHostile.addEventListener('click',() => {    
  var outputNonHostileButton = (getButton("non hostile"));
  console.log(outputNonHostileButton);


  var outputNonHostileTimeLog = (getTime());
  console.log(outputNonHostileTimeLog);

  const nonHostileButton = {outputNonHostileButton, outputNonHostileTimeLog};

  axios.post("/scenario2", nonHostileButton);
  btnNonHostile.style.backgroundColor = "00ff00"
  btnHostile.style.backgroundColor = "B1ACA3"
  btnUncertain.style.backgroundColor = "B1ACA3"
  
  updateSelectedButton("nonHostile");
  

  
});


btnUncertain.addEventListener('click',() => {  
  
  var outputUncertainButton = (getButton("uncertain"));
  console.log(outputUncertainButton);


  var outputUncertainTimeLog = (getTime());
  console.log(outputUncertainTimeLog);

  const UncertainButtonLog = {outputUncertainButton, outputUncertainTimeLog};

  axios.post("/scenario2", UncertainButtonLog)

  btnNonHostile.style.backgroundColor = "#B1ACA3"
  btnHostile.style.backgroundColor = "#B1ACA3"
  btnUncertain.style.backgroundColor = "#ffff00"

  updateSelectedButton("Uncertain");
});


// called when a drone is pressed, checks if drone is checked and if it is not set to white if not then it is red
function cb(droneIndex) {

  var droneIndexLog = logDroneID(droneIndex);
  //set drone ID to be current

  setDroneID(droneIndex)
  

  const backEndDroneIndexLog = {droneIndexLog};

  axios.post("/scenario2", backEndDroneIndexLog);

  

  

  // selectedDroneIndex != null ? drones[selectedDroneIndex].colour = color(255,255,255) : '';
  // selectedDroneIndex used as a reference for the previously selected drone
  
  // initialDroneColour = drones[droneIndex].colour
  //console.log("drone index: " + droneIndex);
  if (selectedDroneIndex != null) {
    //drones[selectedDroneIndex].colour = initialDroneColour;
    drones[selectedDroneIndex].selected = false;
  }
    // sselectedDroneIndex is set to new drone index, reference for the new one
    selectedDroneIndex = droneIndex;
    drones[selectedDroneIndex].selected = true;
  //sets the index to variable to be displayed
  selectedDroneID_p.innerText = "ID: " + droneIndex;
  // clears second iteration onwards of the tracking interval
  clearInterval(selectedDroneTrackingInterval);
  //for every interval of 5 seconds it creates a variable that will be sent and output in index.ejs
  selectedDroneTrackingInterval = setInterval(() => {
    //create an if statement that checks if altitude is either high or low
    selectedDroneAltitude_p.innerText =
    "Altitude: " + drones[droneIndex].droneAltitude;
    //console.log(selectedDroneXPos_p)
    selectedDroneXPos_p.innerText =
      "x pos: " + Math.round(drones[droneIndex].xPos);
    selectedDroneYPos_p.innerText =
      "y pos: " + Math.round(drones[droneIndex].yPos);
    Math.round(drones[droneIndex].yPos);
  }, 100);

  // country of Origin
  selectedDroneCountryOfOrigin_p.innerText = 
    "Country: " + drones[droneIndex].countryOfOrigin;
  // IFF
  selectedDroneIFU_p.innerText =
    "IFU: " + drones[droneIndex].identificationFriendOrUknown;
  //Weapons
  selectedDroneWeapons_p.innerText = "Weapons: " + drones[droneIndex].weapons;
  //Emmisions
  selectedDroneEmissions_p.innerText =
    "Emissions: " + drones[droneIndex].emissions;

    // CHANGING THE COLOURS OF THE BUTTONS WHEN DRONES ARE PRESSED

    
    console.log((drones[selectedDroneIndex].colour.levels));

    if (drones[selectedDroneIndex].colour.levels[1] == 255){
      // console.log("working")

      
      btnNonHostile.style.backgroundColor = "#00ff00"
      btnHostile.style.backgroundColor = "#B1ACA3"
      btnUncertain.style.backgroundColor = "#B1ACA3"

  
    
    }

    if (drones[selectedDroneIndex].colour.levels[0] == 255){
      // console.log("working")

      if (drones[selectedDroneIndex].colour.levels[1] == 255){
        btnNonHostile.style.backgroundColor = "#B1ACA3"
        btnHostile.style.backgroundColor = "#B1ACA3"
        btnUncertain.style.backgroundColor = "#ffff00"

        

      }

      else{
        
        
        btnNonHostile.style.backgroundColor = "#B1ACA3"
        btnHostile.style.backgroundColor = "#ff0000"
        btnUncertain.style.backgroundColor = "B1ACA3"

        
      }
    
    }

    if (drones[selectedDroneIndex] instanceof HostileDrone){
      console.log("hostile drone")
    
      updateSelectedButton("Hostile");
      // btnHostile.style.backgroundColor = "#ff0000"
      // btnNonHostile.style.backgroundColor = "#B1ACA3"
      
      // btnUncertain.style.backgroundColor = "#B1ACA3"
  
    }
  
    if (drones[selectedDroneIndex] instanceof nonHostileDrone){
      console.log("non hostile drone")
      updateSelectedButton("nonHostile");
      
      // btnNonHostile.style.backgroundColor = "#00ff00"
      // btnHostile.style.backgroundColor = "#B1ACA3"
      // btnUncertain.style.backgroundColor = "#B1ACA3"
      
      
    }
     if (drones[selectedDroneIndex] instanceof uncertainDrone){
      console.log("uncertain drone")

      updateSelectedButton("Uncertain");
      
      // btnUncertain.style.backgroundColor = "#ffff00"
      // btnHostile.style.backgroundColor = "#B1ACA3"
      // btnNonHostile.style.backgroundColor = "#B1ACA3"
  
    }
    
    
   
}

//when mose is pressed it calles drone clicked for that instance
function mousePressed() {
  for (let i = 0; i < drones.length; i++) {
    drones[i].droneClicked(i, cb);

    

    
  }
}




//repeats this process constantly in this case showing them move
function draw() {
  background(bg);
  //ellipse to represent personal dronec
  fill("white");
  ellipse(400, 400, 17, 17);
  //square(30, 20, 55);
  //plots all other drones in array previously created
  // 5 drones missclasified 15 correctly classified
  for (let i = 0; i< drones.length; i++) {
  

    //5
    if ( i<17){
      drones[i].move(); 
      drones[i].show();

      
    }
    
//3
    if ( i>= 17){
      // console.log("working?")
      drones[i].show();

      
      drones[i].disguisedMovement();

      // timeForHostility = Math.round(random(15000, 20000));

      // setTimeout(() => {
      //     drones[i].switchToHostile();
      //   }, timeForHostility)
    
     
    }
    text(i, drones[i].xPos, drones[i].yPos);
    textSize(25);
    fill("red");
  }  
}


//  GETS all of the elements defined in scenario2 

// Get the modal
var modal = document.getElementById("myModal");


// confirm button allows the user to click button when finished with all quizzes
var finishedQuizesBtn = document.getElementById("finishedQuizesBtn");


// When the user clicks the button, open the modal 
finishedQuizesBtn.onclick = function () {
  (window.location.href = '/home')
}

