// after 16 minutes the user is redirected home, so they can proceed to the next scenario
setTimeout(function(){
  noLoop();
  modal.style.display = "block";
  repeatingModal.style.display = "none";
  sessionStorage.setItem("scenario2", "true");
  
},30000);



  var repeatingQuizInterval = setInterval(() => {

    noLoop();
    repeatingModal.style.display = "block";
  
    repeatingFinishButton.style.display = 'none';

    // repeatingQuizCounter= repeatingQuizCounter+1;
   
  
    
    
  },240000);




//  GETS all of the elements defined in scenario2 

// Get the modal
var modal = document.getElementById("myModal");

// Get the modal
var repeatingModal = document.getElementById("repeatingMyModal");

var repeatingFinishButton = document.getElementById("repeatingFinishButton");

repeatingFinishButton.onclick = function(){
  repeatingModal.style.display = "none";

  repeatingQuizOne.style.display = 'block';
  repeatingQuizOneFinished.style.backgroundColor = "ff3c3c";

  repeatingQuizTwo.style.display = 'block';
  repeatingQuizTwoFinished.style.backgroundColor = "ff3c3c";

  repeatingQuizThree.style.display = 'block';
  repeatingQuizThreeFinished.style.backgroundColor = "ff3c3c";
  
  loop();
  
    
}

// finished quizzes and scenario button
var finishedQuizesBtn = document.getElementById("finishedQuizesBtn");

// When the user clicks the button, open the modal 
finishedQuizesBtn.onclick = function () {
  
  axios.post("/scenario2", dataToPostScenario2)
  

  (window.location.href = '/home')
    console.log("redirecting");
  
    
}






dataToPostScenario2 = [];

dataToPostScenario2.push( {accuracy75 :"starting scenario of accuracy 75"});


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
setInterval(() => {
  blackCoverBox.style.display = 'block';
  setTimeout(() => {
    blackCoverBox.style.display = 'none'
  }, 800);
},180000);






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
      
    }
    if( i>=17){

      drones[i] = new HostileDrone();

     
    }
  }
    

  
  
}


// making a fucntion that returns the active button

function updateSelectedButton(buttonType){
  currentButtonPressed = buttonType;
  // console.log(currentButtonPressed)
  return currentButtonPressed;
}

//getter methods that allow to access the ID and the classes of drones last interacted with 
function setDroneID(droneIndex){

  droneID = droneIndex;
  return droneID

}


//updates the class of the drones currently selected, called in cb function and then is used in confirm to confirm if the classification is correct or not
function updateSelectedDroneClass(currentDroneClass){

  droneClass = currentDroneClass;
 
  return droneClass;


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

function getTimeDroneClicked(timeClicked){
  timeClickedDrone = timeClicked;
  return timeClickedDrone;

  
}

dronesToClassify = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]

var dronesClassifiedCorrectly = 0;
dronesClassifiedIncorrectly = 0;

var totalDronesClassified = 0;

var totalNumberOfClassifactions = 0;

var trialNumber = 1;

setInterval(() => {

  dronesToClassify = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
  dronesClassifiedCorrectly = 0;

  dronesClassifiedIncorrectly = 0;
  totalNumberOfClassifactions = 0;
  totalDronesClassified = 0;
  trialNumber++;
  
}, 240000);


btnConfirm.addEventListener('click',() => {  
  const confirmButtonLog = {outputConfirmButton:(getButton("confirm"))+ (getTime())};
  // console.log(confirmButtonLog);

  dataToPostScenario2.push(confirmButtonLog)
    
    // document.getElementById("parametersTrackClass").prependChild(pClass);
    //timeStampDroneConfirmed, gets second at which the user has confirmed drone

    const date = new Date()

    timeStampDroneConfirmed = date.getMinutes()*60 + date.getSeconds()+ date.getMilliseconds()/1000;
    // console.log("timestamp drone confirmed at "+ timeStampDroneConfirmed);

    timeElapsedClassifyingDrone =timeStampDroneConfirmed-timeClickedDrone 


    
    
    

var accuracyTrial = dronesClassifiedCorrectly/totalNumberOfClassifactions*100+5
console.log(accuracyTrial)



    // console.log("time between clicking drone and confirming "+timeElapsedClassifyingDrone +" seconds");

    
    timeElapsed = "time between clicking drone and confirming "+timeElapsedClassifyingDrone +" seconds"

    console.log(timeElapsed)

    const timeElapsedBetweenClickingAndConfirming = {timeElapsed};

    // axios.post("/scenario1",timeElapsedBetweenClickingAndConfirming, {timeout:2000});

    dataToPostScenario2.push(timeElapsedBetweenClickingAndConfirming)



  totalNumberOfClassifactions++;

  

   
  if(dronesToClassify.includes(droneID)){

    indexToDelete = dronesToClassify.indexOf(droneID);

    dronesToClassify.splice(indexToDelete, 1)
  // we create a variable that works as a counter for how many drones the user has got right (initially 0)
  if(currentButtonPressed == droneClass){
    var classification = "correct"
    dronesClassifiedCorrectly++;
    //increase number of drones classified
    totalDronesClassified++;

    

  }
  else{
    var classification = "incorrect"
    dronesClassifiedIncorrectly++;

  }

  
  // dronesClassifiedIncorrectly = (20 - dronesClassifiedCorrectly);
  // this variable has info on the user ID drone id classified and classification
  finalDroneClassification = "The final drone classification of user "+ UserID+" of drone ID "+ droneID+ ", class "+ droneClass+  ", is "+ currentButtonPressed+ ", this classification, is " + classification+ "!";
  //this variable updates every time the confirm button is switched, and will add one if the drone has been correctly classified
  finalNumberOfCorrectlyClassifiedDrones = "System accuracy 75" + ", Trial number: "+ trialNumber+ ", Drones classified correctly in this trial: " + dronesClassifiedCorrectly +" /20 drone/s"+ ", Accuracy of trial/burst: "+ accuracyTrial+ "%";

  finalDroneCoverage = "total drones classified in trial " + trialNumber+ ":  "+ totalDronesClassified+ "/20 drones"

  finalNumberOfIncorrectlyClassifiedDrones = "System accuracy: 75" + ", Trial number: "+ trialNumber+ ", Drones classified incorrectly in this trial:" + dronesClassifiedIncorrectly;

  console.log(finalDroneCoverage)

  console.log(finalNumberOfCorrectlyClassifiedDrones);

  console.log(finalNumberOfIncorrectlyClassifiedDrones);
  
  
  const classificationInformation = {finalDroneClassification, finalNumberOfCorrectlyClassifiedDrones, finalDroneCoverage, finalNumberOfIncorrectlyClassifiedDrones};
  // console.log(classificationInformation);


  // axios.post("/scenario1",classificationInformation);
  dataToPostScenario2.push(classificationInformation);

}

else{
  console.log("already classified")
}




 // depending on the value of the current button pressed we change the colour of drones

  if(currentButtonPressed == "nonHostile") {
    drones[droneID].colour = color(0,255,0);
    // console.log(currentButtonPressed)
    // console.log("non hostile working??")

  }
 else if(currentButtonPressed == "Uncertain") {
    drones[droneID].colour = color(255,255,0);
    // console.log(currentButtonPressed)
    // console.log("uncertain working??")

    
  }

  else if(currentButtonPressed == "Hostile") {
    // console.log(currentButtonPressed)
    // console.log(" hostile working??")
    drones[droneID].colour = color(255,0,0);

  }  
});


btnHostile.addEventListener('click',() => {    
  var outputHostileButton = (getButton("hostile"));
  // console.log(outputHostileButton);
  var outputHostileTimeLog = (getTime());
  // console.log(outputHostileTimeLog);

  const HostileButtonLog = {outputHostileButton, outputHostileTimeLog };

  
  // axios.post("/scenario2",HostileButtonLog);

  dataToPostScenario2.push(HostileButtonLog);

  btnNonHostile.style.backgroundColor = "#B1ACA3"
  btnHostile.style.backgroundColor = "#ff0000"
  btnUncertain.style.backgroundColor = "B1ACA3"

  updateSelectedButton("Hostile");





});

//Every time that a button or drone is clicked the variables defined below are passed to the server into the logger
// the logger will sequentialy write this information into a .txt file

btnNonHostile.addEventListener('click',() => {    
  var outputNonHostileButton = (getButton("non hostile"));
  // console.log(outputNonHostileButton);


  var outputNonHostileTimeLog = (getTime());
  // console.log(outputNonHostileTimeLog);

  const nonHostileButton = {outputNonHostileButton, outputNonHostileTimeLog};

  // axios.post("/scenario2", nonHostileButton);

  dataToPostScenario2.push(nonHostileButton);
  btnNonHostile.style.backgroundColor = "00ff00"
  btnHostile.style.backgroundColor = "B1ACA3"
  btnUncertain.style.backgroundColor = "B1ACA3"
  
  updateSelectedButton("nonHostile");
  

  
});


btnUncertain.addEventListener('click',() => {  
  
  var outputUncertainButton = (getButton("uncertain"));
  // console.log(outputUncertainButton);


  var outputUncertainTimeLog = (getTime());
  // console.log(outputUncertainTimeLog);

  const UncertainButtonLog = {outputUncertainButton, outputUncertainTimeLog};

  // axios.post("/scenario2", UncertainButtonLog)

  dataToPostScenario2.push(UncertainButtonLog);

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

  const date = new Date()

  timestampSecondDroneClicked = date.getMinutes()*60 + date.getSeconds()+ date.getMilliseconds()/1000;

  getTimeDroneClicked(timestampSecondDroneClicked);
  

  const backEndDroneIndexLog = {droneIndexLog};

  // axios.post("/scenario2", backEndDroneIndexLog);

  dataToPostScenario2.push(backEndDroneIndexLog);


  // selectedDroneIndex != null ? drones[selectedDroneIndex].colour = color(255,255,255) : '';
  // selectedDroneIndex used as a reference for the previously selected drone
  
  if (selectedDroneIndex != null) {
    drones[selectedDroneIndex].selected = false;
  }
    // sselectedDroneIndex is set to new drone index, reference for the new one
    selectedDroneIndex = droneIndex;
    drones[selectedDroneIndex].selected = true;
  //sets the index to variable to be displayed
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
    "IFU: " + drones[droneIndex].identificationFriendOrUknown;
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

  
    
    }

    if (drones[selectedDroneIndex].colour.levels[0] == 255){
      // console.log("working")

      if (drones[selectedDroneIndex].colour.levels[1] == 255){
        btnNonHostile.style.backgroundColor = "#B1ACA3"
        btnHostile.style.backgroundColor = "#B1ACA3"
        btnUncertain.style.backgroundColor = "#ffff00"
        updateSelectedButton("Uncertain");

        

      }

      else{
        
        
        btnNonHostile.style.backgroundColor = "#B1ACA3"
        btnHostile.style.backgroundColor = "#ff0000"
        btnUncertain.style.backgroundColor = "B1ACA3"
        updateSelectedButton("Hostile");

        
      }
    
    }

    if (drones[selectedDroneIndex] instanceof HostileDrone){
      // console.log("hostile drone")
    
      // updateSelectedButton("Hostile");
      updateSelectedDroneClass("Hostile");

      
  
    }
  
    if (drones[selectedDroneIndex] instanceof nonHostileDrone){
      // console.log("non hostile drone")
      // updateSelectedButton("nonHostile");
      updateSelectedDroneClass("nonHostile");
      
     
      
      
    }
     if (drones[selectedDroneIndex] instanceof uncertainDrone){
      console.log("uncertain drone")

      // updateSelectedButton("Uncertain");
      updateSelectedDroneClass("Uncertain");
      
     
  
    }

    if (drones[selectedDroneIndex] instanceof missclassifiedUncertainDrone){
      console.log("uncertain drone")

      // updateSelectedButton("Uncertain");
      updateSelectedDroneClass("Uncertain");
      
     
  
    }

    if (drones[selectedDroneIndex] instanceof missclassifiedNonHostileDrone){
      console.log("uncertain drone")

      // updateSelectedButton("nonHostile");
      updateSelectedDroneClass("nonHostile");
      
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

    
  

    //nonHostile
    if ( i<=8){
      drones[i].move();
      drones[i].show();

    }

    //two missclassified nonHostile
  if( i> 8 && i<=10 ){
    drones[i].move();
    drones[i].show();
   
  }
  //two missclassified uncertain

    if( i> 10 && i<=12 ){
      drones[i].move();
      drones[i].show();
     
    }

//uncertain
    if( i> 12 && i<17 ){
    
      drones[i].move();
      drones[i].show();
      
    }
    
//hostile
    if ( i>= 17){
      
      drones[i].show();

      
      drones[i].disguisedMovement();

      
    
     
    }
    text(drones[i].id, drones[i].xPos, drones[i].yPos);
    textSize(25);
    fill("red");
  }  
}


// //  GETS all of the elements defined in scenario2 

// // Get the modal
// var modal = document.getElementById("myModal");


// // confirm button allows the user to click button when finished with all quizzes
// var finishedQuizesBtn = document.getElementById("finishedQuizesBtn");


// // When the user clicks the button, open the modal 
// finishedQuizesBtn.onclick = function () {

//   axios.post("/scenario2", dataToPostScenario2);
//   (window.location.href = '/home')
// }

