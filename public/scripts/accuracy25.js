
// after 16 minutes the user is redirected home, so they can proceed to the next scenario


setTimeout(function(){
  noLoop();
  modal.style.display = "block";
  repeatingModal.style.display = "none";
  sessionStorage.setItem("scenario3", "true");
 
},960000);



  var repeatingQuizInterval = setInterval(() => {
    noLoop();
    repeatingModal.style.display = "block";
    // repeatingFinishButton.style.display = 'none';

  },240000);



//  GETS all of the elements defined in scenario2 

// Get the modal
var modal = document.getElementById("myModal");

// Get the modal
var repeatingModal = document.getElementById("repeatingMyModal");

var repeatingFinishButton = document.getElementById("repeatingFinishButton");

var repeatingQuizIntervalCounter = 1;

repeatingFinishButton.onclick = function(){
  repeatingModal.style.display = "none";

  repeatingQuizOne.style.display = 'block';
  repeatingQuizOneFinished.style.backgroundColor = "ff3c3c";

  repeatingQuizTwo.style.display = 'block';
  repeatingQuizTwoFinished.style.backgroundColor = "ff3c3c";

  repeatingQuizThree.style.display = 'block';
  repeatingQuizThreeFinished.style.backgroundColor = "ff3c3c";

  repeatingFinishButton.style.display = "none"

  repeatingQuizIntervalCounter++;
  console.log(repeatingQuizIntervalCounter)
  
  loop();

  clearInterval(repeatingQuizInterval)

  repeatingQuizInterval = setInterval(() => {
    console.log(repeatingQuizIntervalCounter)
    noLoop();
    repeatingModal.style.display = "block";

    //start timer
  },240000);


  if(repeatingQuizIntervalCounter==3){
    clearInterval(repeatingQuizInterval)
    console.log("no more quizzes")
  }
}

// finished quizzes and scenario button
var finishedQuizesBtn = document.getElementById("finishedQuizesBtn");

// When the user clicks the button, open the modal 
finishedQuizesBtn.onclick = function () {
  
  axios.post("/scenario3", dataToPostScenario3)
  
  (window.location.href = '/home')
    console.log("redirecting");
  
}


var participantID = UserID

var dataToPostScenario3 = [];

accuracy75 = getTime() 

dataToPostScenario3.push( {participantID, accuracy75});




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





// interval to display screen freeze
intervalId = 0;
setTimeout(() => {

  blackCoverBox.style.display = 'block';

  InterferenceLog = getTime();

  dataToPostScenario3.push({participantID, InterferenceLog});
  setTimeout(() => {
    blackCoverBox.style.display = 'none';
    
  }, 800)
},300000);




//create button that will display after three minutes that redirects to the next trial

//setup function is part of p5 and creates a canvas and allows to define a framerate
function setup() {
    bg = loadImage('../assets/radarLines.png');

  randomSeed(9);
  createCanvas(800, 800);
  frameRate(30);
  // creates 10 instances of uncertain drones
  //background(0);


  for (let i = 0; i < 20 ; i++){
    
    
    //5 badly classified
    if( i <= 5){
      drones[i] = new missclassifiedNonHostileDrone();
      drones.id = String(i);
    }


    //two well classified
    if( i> 5 && i<=7 ){
      drones[i] = new nonHostileDrone();
      drones.id = String(i);
      
    }
   //one well sclassified
    if( i> 7 && i<=9 ){
      drones[i] = new uncertainDrone();
      drones.id = String(i);
     
    }

    //5 missclassified
    if( i> 9 && i<=14 ){
      drones[i] = new missclassifiedHostileDrone();
     
    }

    //5 missclassified
    if( i> 14 && i<=19 ){
      drones[i] = new missclassifiedUncertainDrone();
     
    }

    //one
    if(i> 19 && i<=20){
      

      drones[i] = new HostileDrone();
    }
  }
  



 
  bg = loadImage('../assets/radarLines.png');  
  
}




//getter methods that allow to access the ID and the classes of drones last interacted with 
function setDroneID(droneIndex){

  droneID = droneIndex;
  return droneID

}


function getButton(buttonPressed){

  // var button= document.createTextNode(buttonPressed+" button pressed by ID " + " on : ");
  // logFile.append(button);

  var buttonLog = (buttonPressed);
  
  return buttonLog
}


function getTime() {

  const time = new Date();

  return time; 
}


// current drone ID set to null initially
currentDroneID = null;

// a function that will constantly update currentDroneID so that it can be accesed globally using the variable current drone ID

function updateSelectedDroneID(droneIndex){

  currentDroneID = droneIndex
  return currentDroneID;
}



// making a fucntion that returns the active button

function updateSelectedButton(buttonType){
  currentButtonPressed = buttonType;
  // console.log(currentButtonPressed)
  return currentButtonPressed;
}



//updates the class of the drones currently selected, called in cb function and then is used in confirm to confirm if the classification is correct or not
function updateSelectedDroneClass(currentDroneClass){

  droneClass = currentDroneClass;
 
  return droneClass;


}

function updateHostilityLeveAutoclassifier(HostilityLeveAutoclassifier){
  AutoclassifierHostilityLeveL = HostilityLeveAutoclassifier
  return AutoclassifierHostilityLeveL

}




function logDroneID(droneIndex){
  // var ID = document.createTextNode("ID of drone selected: " + String(droneIndex)+ "\n");
  // logFile.append(ID);
  
  
  // var droneIDLog = " drone pressed by user ID " + UserID +  ", ID of drone selected: " + String(droneIndex) + ", drone selected on  "+ getTime();

  var droneIDLog = String(droneIndex);

  return droneIDLog;

}



function getTimeDroneClicked(timeClicked){
  timeClickedDrone = timeClicked;
  return timeClickedDrone;

  
}


dronesToClassify = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]

var dronesClassifiedCorrectly = 0;
var dronesClassifiedIncorrectly = 0;

var totalDronesClassified = 0;

var totalNumberOfClassifactions = 0;

var trialNumber = 1;

const date = new Date();

var BurstTimersStart = date.getMinutes()*60 + date.getSeconds()+ date.getMilliseconds()/1000

setInterval(() => {

  dronesToClassify = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
  dronesClassifiedCorrectly = 0;
  totalNumberOfClassifactions = 0;
  dronesClassifiedIncorrectly = 0;
  totalDronesClassified = 0;
  trialNumber++;
  BurstTimerStart = getTime();
  
}, 240000);








//                        __   _                        _               _     _                   
//                          / _| (_)                      | |             | |   | |                  
//    ___    ___    _ __   | |_   _   _ __   _ __ ___     | |__    _   _  | |_  | |_    ___    _ __  
//   / __|  / _ \  | '_ \  |  _| | | | '__| | '_ ` _ \    | '_ \  | | | | | __| | __|  / _ \  | '_ \ 
//  | (__  | (_) | | | | | | |   | | | |    | | | | | |   | |_) | | |_| | | |_  | |_  | (_) | | | | |
//   \___|  \___/  |_| |_| |_|   |_| |_|    |_| |_| |_|   |_.__/   \__,_|  \__|  \__|  \___/  |_| |_|
                                                                                                



btnConfirm.addEventListener('click',() => {  

 

  getButton("confirm");
  
  

    const date = new Date()

    timeStampDroneConfirmed = date.getMinutes()*60 + date.getSeconds()+ date.getMilliseconds()/1000

    timeStampClickConfirm = getTime();

    timeElapsedClassifyingDrone =timeStampDroneConfirmed-timeClickedDrone 

    timeFromStartBurst = timeStampDroneConfirmed-BurstTimersStart;

    
    totalNumberOfClassifactions++;


    
    if(currentButtonPressed == droneClass){

      CorrectOrIncorrect = "correct"
      dronesClassifiedCorrectly++;
    
    }
    else if (currentButtonPressed != droneClass){
      CorrectOrIncorrect = "incorrect"
      dronesClassifiedIncorrectly++;
      
    
    }
  
    if(dronesToClassify.includes(currentDroneID)){

      indexToDelete = dronesToClassify.indexOf(currentDroneID);

      dronesToClassify.splice(indexToDelete, 1)
  

    

    if(currentButtonPressed == droneClass){

      // CorrectOrIncorrect = "correct"
      
      //increase number of drones classified
      totalDronesClassified++;
      console.log(CorrectOrIncorrect)

    }
    else if (currentButtonPressed != droneClass){
      // CorrectOrIncorrect = "incorrect"
      
      totalDronesClassified++;
      console.log(CorrectOrIncorrect)

    }

    
    // dronesClassifiedIncorrectly = (20 - dronesClassifiedCorrectly);
    // this variable has info on the user ID drone id classified and classification
    
    // finalDroneClassification =  currentDroneID+ ", class "+ droneClass+  ", is "+ currentButtonPressed+ ", this classification, is " + classification+ "!";
    //this variable updates every time the confirm button is switched, and will add one if the drone has been correctly classified
    finalNumberOfCorrectlyClassifiedDrones =  dronesClassifiedCorrectly +" /20";

    // finalDroneCoverage = "total drones classified in trial " + trialNumber+ ":  "+ totalDronesClassified+ "/20"

    finalDroneCoverage =  totalDronesClassified+ "/20"

    finalNumberOfIncorrectlyClassifiedDrones = dronesClassifiedIncorrectly + "/20"


    participantGivenHostility = currentButtonPressed;


    if (AutoclassifierHostilityLeveL == participantGivenHostility){
      sameOrDifferentAutoclassifier ="same";
    }
    else {
      sameOrDifferentAutoclassifier ="different";

    }
  }

  const classificationInformation = {participantID, trialNumber, droneID, timeStampClickConfirm,timeElapsedClassifyingDrone, timeFromStartBurst, participantGivenHostility, CorrectOrIncorrect, sameOrDifferentAutoclassifier,  finalDroneCoverage, dronesClassifiedCorrectly, dronesClassifiedIncorrectly};
    
    
    dataToPostScenario3.push(classificationInformation);



 // depending on the value of the current button pressed we change the colour of drones

  if(currentButtonPressed == "nonHostile") {
    drones[currentDroneID].colour = color(0,255,0);
    // console.log(currentButtonPressed)
    // console.log("non hostile working??")

  }
 else if(currentButtonPressed == "Uncertain") {
    drones[currentDroneID].colour = color(255,255,0);
    // console.log(currentButtonPressed)
    // console.log("uncertain working??")
  }

  else if(currentButtonPressed == "Hostile") {
    // console.log(currentButtonPressed)
    // console.log(" hostile working??")
    drones[currentDroneID].colour = color(255,0,0);

  }  
});




btnHostile.addEventListener('click',() => {    
  // var outputHostileButton = (getButton("hostile"));
  // console.log(outputHostileButton);
  // var outputHostileTimeLog = (getTime());
  // console.log(outputHostileTimeLog);

  // const HostileButtonLog = {outputHostileButton};

  btnNonHostile.style.backgroundColor = "#B1ACA3";
  btnHostile.style.backgroundColor = "#ff0000";
  btnUncertain.style.backgroundColor = "B1ACA3";
  
  
  
  // dataToPostScenario3.push(HostileButtonLog)

  updateSelectedButton("Hostile");


});


//Every time that a button or drone is clicked the variables defined below are passed to the server into the logger
// the logger will sequentialy write this information into a .txt file

btnNonHostile.addEventListener('click',() => {    

  // var outputNonHostileButton = (getButton("non hostile"));
  // console.log(outputNonHostileButton);


  // var outputNonHostileTimeLog = (getTime());
  // console.log(outputNonHostileTimeLog);

  // const nonHostileButton = {outputNonHostileButton};


  // dataToPostScenario3.push(nonHostileButton);


  btnNonHostile.style.backgroundColor = "00ff00";
  btnHostile.style.backgroundColor = "B1ACA3";
  btnUncertain.style.backgroundColor = "B1ACA3";

  // drones[currentDroneID].colour = color(0,255,0);

  updateSelectedButton("nonHostile");

});


btnUncertain.addEventListener('click',() => {  
  
  // var outputUncertainButton = (getButton("uncertain"));
  // console.log(outputUncertainButton);


  // var outputUncertainTimeLog = (getTime());
  // console.log(outputUncertainTimeLog);

  // const UncertainButtonLog = {outputUncertainButton};

  btnNonHostile.style.backgroundColor = "#B1ACA3"
  btnHostile.style.backgroundColor = "#B1ACA3"
  btnUncertain.style.backgroundColor = "#ffff00"

  
  // dataToPostScenario3.push(UncertainButtonLog)
  

  updateSelectedButton("Uncertain");


});


// called when a drone is pressed, checks if drone is checked and if it is not set to white if not then it is red
function cb(droneIndex) {

  const date = new Date()
  //set drone ID to be current
  setDroneID(droneIndex) 

  // const date = new Date()
  timestampDroneClicked =  date.getMinutes()*60 + date.getSeconds()+ date.getMilliseconds()/1000


  // console.log("timestamp drone clicked at "+ timestampSecondDroneClicked);

  getTimeDroneClicked(timestampDroneClicked);

  var timestampDroneClicked = getTime();
  
  var droneID = logDroneID(droneIndex);
  

  // UPDATES DRONE id
  updateSelectedDroneID(droneIndex)


  // calls get time when drone is pressed
  // selectedDroneIndex != null ? drones[selectedDroneIndex].colour = color(255,255,255) : '';
  // selectedDroneIndex used as a reference for the previously selected drone
  
  // initialDroneColour = drones[droneIndex].colour
  // console.log(selectedDroneIndex);
  if (selectedDroneIndex != null) {
    //drones[selectedDroneIndex].colour = initialDroneColour;
    drones[selectedDroneIndex].selected = false;
  }
    // sselectedDroneIndex is set to new drone index, reference for the new one
    // console.log(droneIndex)
    // selectedDroneIndex = droneIndex;

    selectedDroneIndex = droneIndex;
    // console.log(selectedDroneIndex)

    // console.log(" id is" + drones[selectedDroneIndex])

    drones[selectedDroneIndex].selected = true;
  //sets the index to variable to be displayed
  // selectedDroneID_p.innerText = "ID: " + droneIndex;

  // selectedDroneID_p.innerText = "ID: " + droneIndex;

  selectedDroneID_p.innerText = "ID: " + drones[droneIndex].id;

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
    "Intention: " + drones[droneIndex].identificationFriendOrUknown;
  //Weapons
  selectedDroneWeapons_p.innerText = "Weapons: " + drones[droneIndex].weapons;
  //Emmisions
  selectedDroneEmissions_p.innerText =
    "Emissions: " + drones[droneIndex].emissions;


    // CHANGING THE COLOURS OF THE BUTTONS WHEN DRONES ARE PRESSED

    
    // console.log((drones[selectedDroneIndex].colour.levels));

    if (drones[selectedDroneIndex].colour.levels[1] == 255){
      // console.log("working")
      btnNonHostile.style.backgroundColor = "#00ff00"
      btnHostile.style.backgroundColor = "#B1ACA3"
      btnUncertain.style.backgroundColor = "#B1ACA3"
      updateSelectedButton("nonHostile");

      // HostilityLeveAutoclassifier = "nonHostile"
      updateHostilityLeveAutoclassifier("nonHostile");


    }

    if (drones[selectedDroneIndex].colour.levels[0] == 255){
      // console.log("working")

      if (drones[selectedDroneIndex].colour.levels[1] == 255){
        btnNonHostile.style.backgroundColor = "#B1ACA3"
        btnHostile.style.backgroundColor = "#B1ACA3"
        btnUncertain.style.backgroundColor = "#ffff00"
        updateSelectedButton("Uncertain");
        // HostilityLeveAutoclassifier = "Uncertain";

        updateHostilityLeveAutoclassifier("Uncertain");

      }

      else{
        btnNonHostile.style.backgroundColor = "#B1ACA3"
        btnHostile.style.backgroundColor = "#ff0000"
        btnUncertain.style.backgroundColor = "B1ACA3"
        updateSelectedButton("Hostile");
        // HostilityLeveAutoclassifier = "Hostile";
        updateHostilityLeveAutoclassifier("Hostile");
      }

    }


    if (drones[selectedDroneIndex] instanceof HostileDrone){
      // console.log("hostile drone")

      updateSelectedDroneClass("Hostile")
      

    }
  
    if (drones[selectedDroneIndex] instanceof nonHostileDrone){
      // console.log("non hostile drone")
      
      updateSelectedDroneClass("nonHostile");
      
      
     
    }
     if (drones[selectedDroneIndex] instanceof uncertainDrone){

      // console.log("uncertain drone")
      
      updateSelectedDroneClass("Uncertain");
      
    }

    if (drones[selectedDroneIndex] instanceof missclassifiedUncertainDrone){

      // console.log("uncertain drone")
      
      updateSelectedDroneClass("Uncertain");
      
    }

    if (drones[selectedDroneIndex] instanceof missclassifiedNonHostileDrone){

      // console.log("uncertain drone")
      
      updateSelectedDroneClass("nonHostile");
      
    }

    if (drones[selectedDroneIndex] instanceof missclassifiedHostileDrone){

      // console.log("uncertain drone")
      
      updateSelectedDroneClass("Hostile");
      
    }



    


    dataToPostScenario3.push({participantID, droneID, timestampDroneClicked, AutoclassifierHostilityLeveL, droneClass });

}

//when mose is pressed it calles drone clicked for that instance
function mousePressed() {
  // for (let i = 0; i < drones.length; i++) {
  //   drones[i].droneClicked(, cb);,
    
  // }

 

  for (let i = 0; i < drones.length; i++) {
  
    // droneID = (drones[i].id)
    // console.log(droneID)


      drones[i].droneClicked(i, cb);
  }
}
// //repeats this process constantly in this case showing them move
function draw() {
  background(bg);
  // ellipse to represent personal drone
  fill("white");
  ellipse(400, 400, 17, 17);
  

  //square(30, 20, 55);
  //plots all other drones in array previously created
  // 15 drones missclasified 5 correctly classified
  for (let i = 0; i< drones.length; i++) {

    


    

    if (i<= 7){
      drones[i].move(); 
      drones[i].show();
      
    }


    //5
    if (i>7 && i<=9){
      drones[i].move(); 
      drones[i].show();
      drones[i].generateRandomCombinationOfTraits();

      
    }
      

    
    if (i>9 && i<=10) {
      // drones[i].generateRandomCombinationOfTraits();
      drones[i].move();
      drones[i].show();
    }

//6
    if (i>10 && i<=18) {
      // drones[i].generateRandomCombinationOfTraits();
      drones[i].move();
      drones[i].show();

      // drones[i].missclasify();
      // drones[i].classifyAccurately();

      
    }
    
//3
    if ( i> 18){
      // console.log("working?")
      drones[i].move();
      drones[i].show();

      
      // drones[i].disguisedMovement();

      
    
     
    }

    text(drones[i].id, drones[i].xPos, drones[i].yPos);
    textSize(25);
    
  
  }

}
















 




















 



