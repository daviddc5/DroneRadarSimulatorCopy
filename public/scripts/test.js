

setTimeout(function(){
  

  modal.style.display = "block";
  sessionStorage.setItem("testScenario", "true");
  noLoop();

}, 10000);

testScenarioLog = [];

//number of correctly clasfied drones
let finalNumberOfCorrectlyClassifiedDronesp = document.getElementById("finalNumberOfCorrectlyClassifiedDrones")


  
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
  
  
// // interval to display screen freeze
//   intervalId = 0;
//   setInterval(() => {
//     blackCoverBox.style.display = 'block';
//     setTimeout(() => {
//       blackCoverBox.style.display = 'none';
//     }, 800)
//   },60000);
  
  
  
  
  
  //create button that will display after three minutes that redirects to the next trial
  
  
  //setup function is part of p5 and creates a canvas and allows to define a framerate
  function setup() {
    
    
   
      randomSeed(1);
      createCanvas(800, 800);
      frameRate(30);
    // creates 10 instances of uncertain drones
    //background(0);
   
  
    for (let i = 0; i < 20; i++){
      
      if( i <= 6){
        drones[i] = new nonHostileDrone();
      }
      if( i>6 && i<=16 ){
        drones[i] = new uncertainDrone();
        //console.log(drones[i]);
      }
      if( i>16){
  
        drones[i] = new HostileDrone();
      }
    }
    // }, 2000);
  
    bg = loadImage('../assets/radarLines.png');  
    
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
  
  
  // console.log("working"+ droneClass)
  
  // when drone is pressed this will be called and willl return 
  function logDroneID(droneIndex){
    // var ID = document.createTextNode("ID of drone selected: " + String(droneIndex)+ "\n");
    // logFile.append(ID);
    
    var droneIDLog = " drone pressed by user ID " + UserID +  ", ID of drone selected: " + String(droneIndex) + ", drone selected on ";
    
    var timeDronePressed =  getTime();
    // console.log(getTime());
  
    var timeAndIDDronePressed = droneIDLog +  timeDronePressed;
  
    return timeAndIDDronePressed;
  
  }
  
  
  function getTimeDroneClicked(timeClicked){
    timeClickedDrone = timeClicked;
    return timeClickedDrone;
  
    
  }
  
  
  var dronesClassifiedCorrectly = 0;
  
  //list of drones initially not classified
  //ineficient but simple way to track what drones have been classified, when a drone is classified it gets removed from list
  dronesClassified = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
  dronesClassifiedCorrectly = 0;

 
 
  
  //                        __   _                        _               _     _                   
  //                          / _| (_)                      | |             | |   | |                  
  //    ___    ___    _ __   | |_   _   _ __   _ __ ___     | |__    _   _  | |_  | |_    ___    _ __  
  //   / __|  / _ \  | '_ \  |  _| | | | '__| | '_ ` _ \    | '_ \  | | | | | __| | __|  / _ \  | '_ \ 
  //  | (__  | (_) | | | | | | |   | | | |    | | | | | |   | |_) | | |_| | | |_  | |_  | (_) | | | | |
  //   \___|  \___/  |_| |_| |_|   |_| |_|    |_| |_| |_|   |_.__/   \__,_|  \__|  \__|  \___/  |_| |_|
                                                                                                  
  
  btnConfirm.addEventListener('click',() => {  

    





            
        
    
    var outputConfirmButton = (getButton("confirm"));
  
    // console.log(outputConfirmButton);
    var outputConfirmTimeLog = (getTime());
    // console.log(outputConfirmTimeLog);
    // logger.write(outputConfirmButton) // append string to your file")
    const confirmButtonLog = {outputConfirmButton, outputConfirmTimeLog };
  
    // axios.post("/testScenario",confirmButtonLog);

    testScenarioLog.push(confirmButtonLog);


    const date = new Date()

    //timeStampDroneConfirmed, gets second at which the user has confirmed drone
  
    timeStampDroneConfirmed = date.getSeconds();
    // console.log("timestamp drone confirmed at "+ timeStampDroneConfirmed);
  
    

    timeElapsedClassifyingDrone =timeStampDroneConfirmed-timeClickedDrone 
    
    if(timeElapsedClassifyingDrone<0){
      timeElapsedClassifyingDrone= 60-timeElapsedClassifyingDrone
    }
    
      

      
      timeElapsed = "time between clicking drone and confirming "+timeElapsedClassifyingDrone +" seconds"

      const timeElapsedBetweenClickingAndConfirming = {timeElapsed};
      // axios.post("/testScenario",timeElapsedBetweenClickingAndConfirming);

      testScenarioLog.push(timeElapsedBetweenClickingAndConfirming);



      // we create a variable that works as a counter for how many drones the user has got right (initially 0)
      if(currentButtonPressed == droneClass){
        classification = "correct"
        dronesClassifiedCorrectly++;
        
      }
      else{
        classification = "incorrect"

      }
      dronesClassifiedIncorrectly = (20 - dronesClassifiedCorrectly);
      // this variable has info on the user ID drone id classified and classification
      finalDroneClassification = "The final drone classification of user "+ UserID+" of drone ID "+ currentDroneID+ " is "+ currentButtonPressed+ ", which is " + classification+ "!";
      

          // information to be logged in drone tracker
  const pID = document.createElement('p');
  const pClass = document.createElement('p');
  const separationID = document.createElement('hr');
  const separationClass = document.createElement('hr');
 

  


    pID.innerText = "ID of drone tracked: " + drones[droneID].id;

    // + ", classified as " + currentButtonPressed;

    pClass.innerText = "classification:" + currentButtonPressed+ " is: " +classification;


    randomPrependORAppend= Math.round(random(0,1));
    // console.log(randomPrependORAppend)

    if (randomPrependORAppend == 0){
      document.getElementById("parametersTrackID").prepend(separationID);
      document.getElementById("parametersTrackID").prepend(pID);
      document.getElementById("parametersTrackID").prepend(separationID);
      document.getElementById("parametersTrackClass").prepend(pClass);
      document.getElementById("parametersTrackClass").prepend(separationClass);
      document.getElementById("parametersTrackClass").prepend(separationClass);

    }
    if (randomPrependORAppend== 1){
      document.getElementById("parametersTrackID").append(separationID);
      document.getElementById("parametersTrackID").append(pID);
      document.getElementById("parametersTrackID").append(separationID);

      document.getElementById("parametersTrackClass").append(separationClass);
      document.getElementById("parametersTrackClass").append(pClass);
      document.getElementById("parametersTrackClass").append(separationClass);

    }
      

      //this variable updates every time the confirm button is switched, and will add one if the drone has been correctly classified
      finalNumberOfCorrectlyClassifiedDrones= "the current number of drones classified correctly is " + dronesClassifiedCorrectly +" /20 drones in scenario"
      finalNumberOfIncorrectlyClassifiedDrones = "the current number of drones classified incorrectly is " + dronesClassifiedIncorrectly +" /20 drones in scenario"
      finalNumberOfCorrectlyClassifiedDronesp.innerText = dronesClassifiedCorrectly;

      
      const classificationInformation = {finalDroneClassification, finalNumberOfCorrectlyClassifiedDrones, finalNumberOfIncorrectlyClassifiedDrones };

      
      testScenarioLog.push(classificationInformation);
  
        
  
  
      
    
  
   
  
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
    var outputHostileButton = (getButton("hostile"));
    // console.log(outputHostileButton);
    var outputHostileTimeLog = (getTime());
    // console.log(outputHostileTimeLog);
  
    const HostileButtonLog = {outputHostileButton, outputHostileTimeLog };
  
    btnNonHostile.style.backgroundColor = "#B1ACA3";
    btnHostile.style.backgroundColor = "#ff0000";
    btnUncertain.style.backgroundColor = "B1ACA3";
    
    
    // axios.post("/testScenario",HostileButtonLog);

    testScenarioLog.push(HostileButtonLog);
  
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
  
    // axios.post("/testScenario", nonHostileButton);
    testScenarioLog.push(nonHostileButton);
  
    btnNonHostile.style.backgroundColor = "00ff00";
    btnHostile.style.backgroundColor = "B1ACA3";
    btnUncertain.style.backgroundColor = "B1ACA3";
  
    // drones[currentDroneID].colour = color(0,255,0);
  
    updateSelectedButton("nonHostile");
  
  });
  
  
  btnUncertain.addEventListener('click',() => {  
    
    var outputUncertainButton = (getButton("uncertain"));
    // console.log(outputUncertainButton);
  
  
    var outputUncertainTimeLog = (getTime());
    // console.log(outputUncertainTimeLog);
  
    const UncertainButtonLog = {outputUncertainButton, outputUncertainTimeLog};
  
    btnNonHostile.style.backgroundColor = "#B1ACA3"
    btnHostile.style.backgroundColor = "#B1ACA3"
    btnUncertain.style.backgroundColor = "#ffff00"
  
    // change the drone colour when pressed
    // drones[currentDroneID].colour = color(255,255,0);
  
  
    // axios.post("/testScenario", UncertainButtonLog)

    testScenarioLog.push(UncertainButtonLog);
  
    updateSelectedButton("Uncertain");
  
  
  });
  
  
  // called when a drone is pressed, checks if drone is checked and if it is not set to white if not then it is red
  function cb(droneIndex) {
    const date = new Date()
  
    timestampSecondDroneClicked = date.getSeconds();
    // console.log("timestamp drone clicked at "+ timestampSecondDroneClicked);
  
    getTimeDroneClicked(timestampSecondDroneClicked);
    
  
    var droneIndexLog = logDroneID(droneIndex);
    // console.log(droneIndexLog)
  
    //set drone ID to be current
    setDroneID(droneIndex) 
    
  
    const backEndDroneIndexLog = {droneIndexLog};
  
    // axios.post("/testScenario", backEndDroneIndexLog);

    testScenarioLog.push(backEndDroneIndexLog);
  
    // UPDATES DRONE id
  
    updateSelectedDroneID(droneIndex)
  
  
    // calls get time when drone is pressed
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
      
  
        
        btnNonHostile.style.backgroundColor = "#00ff00"
        btnHostile.style.backgroundColor = "#B1ACA3"
        btnUncertain.style.backgroundColor = "#B1ACA3"
      
      }
  
      if (drones[selectedDroneIndex].colour.levels[0] == 255){
        
  
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
        
        updateSelectedButton("Hostile");
        updateSelectedDroneClass("Hostile")
        // btnHostile.style.backgroundColor = "#ff0000"
        // btnNonHostile.style.backgroundColor = "#B1ACA3"
        // btnUncertain.style.backgroundColor = "#B1ACA3"
      }
    
      if (drones[selectedDroneIndex] instanceof nonHostileDrone){
        
        updateSelectedButton("nonHostile");
        updateSelectedDroneClass("nonHostile");
        
        
        // btnNonHostile.style.backgroundColor = "#00ff00"
        // btnHostile.style.backgroundColor = "#B1ACA3"
        // btnUncertain.style.backgroundColor = "#B1ACA3"
      }
       if (drones[selectedDroneIndex] instanceof uncertainDrone){
  
        
        updateSelectedButton("Uncertain");
        updateSelectedDroneClass("Uncertain");
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
    //ellipse to represent personal drone
    fill("white");
    ellipse(400, 400, 17, 17);
  
  
    //square(30, 20, 55);
    //plots all other drones in array previously created
    for (let i = 0; i< drones.length; i++) {
      if (i<= 6){
        drones[i].move(); 
        drones[i].show();
      }
      if (i>6 && i<=16) {
        drones[i].generateRandomCombinationOfTraits();
        drones[i].move();
        drones[i].show();
      }
  
      if ( i> 16){
        drones[i].show();
  
        
  
         drones[i].disguisedMovement();

      }
      text(drones[i].id, drones[i].xPos, drones[i].yPos);
      textSize(25);
      
    
    }
      
  }

  //  GETS all of the elements defined in scenario2 

// Get the modal
var modal = document.getElementById("myModal");


// confirm button allows the user to click button when finished with all quizzes
var finishedQuizesBtn = document.getElementById("finishedQuizesBtn");


// When the user clicks the button, open the modal 
finishedQuizesBtn.onclick = function () {

  axios.post("/testScenario", testScenarioLog);
  console.log("redirecting");
  (window.location.href = '/home')
}


  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
   
  
  
  
  