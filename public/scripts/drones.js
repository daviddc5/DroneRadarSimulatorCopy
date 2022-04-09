

class Drone {
    //defines a drone with random seed,  white color a random x and y position inside of canvas
    constructor() {

      this.randomSeed = random(0.5, 1);

    //this variable will randomly determine where the drones will spawn
      this.spawnDirection = Math.round(random(1,5));
      this.id = Math.round(random(1000,9999));
      
        

      

   

      
      /*random direction*/
      this.xBallDir = random(-1, 1);
      this.yBallDir = random(-1, 1);
      /* random speed at which it will go in that direction*/
      this.xSpeed = random(0.4, 0.6);
      this.ySpeed = random(0.4, 0.6);
      this.selected = false;
      this.Altitude();
      
    
     
      // Checks for distance in relation to the center
      //this.Distance = Math.abs(Math.round((this.xPos/2 -250   + this.yPos/2 )));
      // checks if altitude is high, mid or low
    //   this.droneAltitude = this.yPos > 250 ? 'Low' : 'High';
     

    //drone spawns north
    if (this.spawnDirection == 1){
        this.xPos = (width+50)

        this.yPos = random(-75,0);
        
    }

    //drone spawns and comes from the south
        if (this.spawnDirection == 2){
        this.xPos = (width+50)
        this.yPos = random(height, height+75);
          
        
    }

    //drone spawns and comes from the east
      if (this.spawnDirection == 3){
        this.xPos = random(width,width+75);
        this.yPos = random(height+50);
        
    }

    //drone spawns and comes from the west
      if (this.spawnDirection == 4){
        this.xPos = random(-75,0);
        this.yPos = random(height+50);
        
    }

    
    //drone spawns on grid
    if (this.spawnDirection == 5){
        this.xPos = random(width+50);
        this.yPos = random(height+50);
        
    }


      
    }
    //should be working as everything is internal
    Altitude() {
        
            if(this.yPos > 250) {
  
                this.droneAltitude = "Low";
            }
            else if(this.yPos < 250) {
        
              
                this.droneAltitude = "High";
            }
            
        
    }
   
    show() {
      fill(this.colour);
      stroke(0);


    

      ellipse(this.xPos, this.yPos, 14, 14);
    //   console.log(this.id);

    // text("im quirky", this.xPos, this.yPos);

    // textSize(20)

      if (this.selected) {
        
        noFill();
    
        stroke(255)
        rect(this.xPos-12.5, this.yPos-12.5, 25, 25)
      }
     
    }
    
    //checks if click is inside drone by calculating distance and click and checking if in radiuss
    droneClicked(droneIndex, cb) {
      /*calculates the distance between the mouse position and the position of a given drone instance*/
      var distance = dist(mouseX, mouseY, this.xPos, this.yPos);
      /* if distance is less than the radius, then it will do the following, in this case change the direction of the ball*/
      if (distance < 10) {
        /*displaying distance somewhere*/
  
        cb(droneIndex);
      }
      return droneIndex;
    }

    
  }

class nonHostileDrone extends Drone{
constructor(){
    super();
  
    this.yPos = random(height)/2;
    this.colour = color(0, 255, 0);
    //weapons and emissions which are binary or alternatively hardcoded
    //Checks for distance in relation to the center
    this.Distance = Math.abs(Math.round((this.xPos/2 -250   + this.yPos/2 )));
    this.countryOfOrigin= "WYMB";
    this.identificationFriendOrUknown = "Friendly";
    this.weapons = "No";
    this.emissions = "No";
    // Altitude parameter imported from drone JS
    this.randomDroneMovement();
    this.move();
    
   
     //miscclasified colour generator for accuracy
     this.misclassifiedColourGenerator = Math.round(Math.floor(random() * (1 - 0 + 1)) + 0);

    //   this.missclassify();
    //   this.classifyAccurately();
}

randomDroneMovement() {
    //for a random interval(between 3.5 and 7 seconds the direction of the ball will change)
    setInterval(() => {
    /*random direction*/
    this.xBallDir = random(-1, 1);
    this.yBallDir = random(-1, 1);
    this.xSpeed = random(0.4, 0.6);
    this.ySpeed = random(0.4, 0.6);
    
    }, this.randomSeed * 15000);

}

move() {
    //updates position of x and y with a direction and speeds
    // added 100 to height and width so that it can move out of radar
    this.xPos = (this.xPos + this.xBallDir * this.xSpeed)%(width+100);
    this.yPos = (this.yPos +this.yBallDir * this.ySpeed)%(410);

    // between width and height -10
    if (this.xPos > width + 85 ) {
    this.xSpeed = -this.xSpeed;
    } 

    if (this.yPos > 400) {
    this.ySpeed = -this.ySpeed;
        }
    }         
   
}


// Non hostile drone missclasified
class missclassifiedNonHostileDrone extends Drone{
    constructor(){
        super();
      
        this.yPos = random(height)/2;
        this.colour = color(0, 255, 0);
        //weapons and emissions which are binary or alternatively hardcoded
        //Checks for distance in relation to the center
        this.Distance = Math.abs(Math.round((this.xPos/2 -250   + this.yPos/2 )));
        this.countryOfOrigin= "WYMB";
        this.identificationFriendOrUknown = "Friendly";
        this.weapons = "No";
        this.emissions = "No";
        // Altitude parameter imported from drone JS
        this.randomDroneMovement();
        this.move();
        
       
         //miscclasified colour generator for accuracy
         this.misclassifiedColourGenerator = Math.round(Math.floor(random() * (1 - 0 + 1)) + 0);
        this.missclassify();
        this.classifyAccurately();
    
          
    }
    
    randomDroneMovement() {
        //for a random interval(between 3.5 and 7 seconds the direction of the ball will change)
        setInterval(() => {
        /*random direction*/
        this.xBallDir = random(-1, 1);
        this.yBallDir = random(-1, 1);
        this.xSpeed = random(0.4, 0.6);
        this.ySpeed = random(0.4, 0.6);
        
        }, this.randomSeed * 15000);
    
    }
    
    move() {
        //updates position of x and y with a direction and speeds
        // added 100 to height and width so that it can move out of radar
        this.xPos = (this.xPos + this.xBallDir * this.xSpeed)%(width+100);
        this.yPos = (this.yPos +this.yBallDir * this.ySpeed)%(410);
    
        // between width and height -10
        if (this.xPos > width + 85 ) {
        this.xSpeed = -this.xSpeed;
        } 
    
        if (this.yPos > 400) {
        this.ySpeed = -this.ySpeed;
            }
        }
    
        missclassify(){
    
              
                
            setTimeout(()=>{
                
    
                console.log(this.misclassifiedColourGenerator)
            // console.log(this.misclassifiedColourGenerator);
                //classify as hostile
            if(this.misclassifiedColourGenerator == 0){
                this.colour = color(255,0,0);
                // console.log("missclasify as red") 
            }
        
            if(this.misclassifiedColourGenerator == 1){
                this.colour = color(255,255,0);
                // console.log("missclasify as green") 
            }
            }, 181000);
    
            
    
          
        }
        //classfy accurately is a fucntion that is run four minutes into a scenario with a 75 or 25 trial, one minute into trial 2 of these scenarios right after the screen freeze
    
        classifyAccurately(){
        
            
    
    
                setTimeout(() => {
                    // console.log("working?")
    
                    this.colour = color(0, 255, 0);
                    console.log( "working?" +this.colour.levels);
                    
                }, 4800000);
        }
    }





class HostileDrone extends Drone{
    constructor(){
        super();
        this.colour = color(255,0,0);
        //weapons and emissions which are binary or alternatively hardcoded
        //Checks for distance in relation to the center
        this.Distance = Math.abs(Math.round((this.xPos/2 -250   + this.yPos/2 )));
        this.countryOfOrigin= "ADRK";
        this.identificationFriendOrUknown = "Uknown";
        this.weapons = "Yes";
        this.emissions = "Yes";
        this.randomDroneMovement();
        this.disguisedMovement();

        //miscclasified colour generator for accuracy
        this.misclassifiedColourGenerator = Math.round(Math.floor(random() * (1 - 0 + 1)) + 0);
        // this.fakeColour = (Math.floor(random() * (1 - 0 + 1)) + 0);
        this.fakeColour = Math.round(random(0,1));
        // this.switchToHostile();

        // this.missclassify();
        // this.classifyAccurately();
        

    }
    randomDroneMovement() {

      
        //for a random interval(between 3.5 and 7 seconds the direction of the ball will change)
        setInterval(() => {
        /*random direction*/
        this.xBallDir = random(-1, 1);
        this.yBallDir = random(-1, 1);
        this.xSpeed = random(0.6, 0.75);
        this.ySpeed = random(0.6, 0.75);
        
        }, this.randomSeed * 15000);
    }

    disguisedMovement() {

        // console.log("disguised mmovement ongoing!")
        this.xSpeed = random(0.6, 0.75);
        this.ySpeed = random(0.6, 0.75); 
        
        //updates position of x and y with a direction and speeds
        // added 100 to height and width so that it can move out of radar
        this.xPos = (this.xPos + this.xBallDir * this.xSpeed)%(width+100);
        this.yPos = (this.yPos +this.yBallDir *  this.ySpeed)%(height+25);


        // between width and height -10
        if (this.xPos > width + 85 ) {
        this.xSpeed = -this.xSpeed;
        } else if (this.yPos > height + 20) {
        this.ySpeed = -this.ySpeed;
        }
        
}

}

// uncertain drone classified correctly

    class uncertainDrone extends Drone{
        constructor(){
            super();
            this.colour = color(255, 255, 0);
            //weapons and emissions which are binary or alternatively hardcoded
            //Checks for distance in relation to the center
            this.Distance = Math.abs(Math.round((this.xPos/2 -250   + this.yPos/2 )));

            
            this.countryOfOrigin;
            this.identificationFriendOrUknown;
            this.weapons;
            this.emissions;
            this.move();
            this.randomDroneMovement();
            
            //this.uncertainDroneGenerator = Math.round(Math.floor(Math.random() * (3 - 0 + 1)) + 0);
            this.uncertainDroneGenerator = Math.round(Math.floor(random() * (3 - 0 + 1)) + 0);
            //console.log(this.uncertainDroneGenerator);

            //miscclasified colour generator for accuracy
            this.misclassifiedColourGenerator = Math.round(Math.floor(random() * (1 - 0 + 1)) + 0);
            

            this.generateRandomCombinationOfTraits();

            //when called it missclasifies them after an amount of time, and then classifies them accurately again after more time

            // this.missclassify();
            // this.classifyAccurately();
            
            
            // Altitude parameter imported from drone JS
        }

        
        /*An uncertain Drone has 2-3 traits deeemed as hostile, meaning there are 4 combinations for 2 and  */
        generateRandomCombinationOfTraits(){
            
            //console.log(this.uncertainDroneGenerator);
            
            if(this.uncertainDroneGenerator == 0){
                this.countryOfOrigin= "ADRK";
                this.identificationFriendOrUknown = "Unknown";
                this.weapons = "Yes";
                this.emissions = "Yes";
            }
            else if (this.uncertainDroneGenerator ==1){
                this.countryOfOrigin= "ADRK";
                this.identificationFriendOrUknown = "Uknown";
                this.weapons = "Yes";
                this.emissions = "No";
            }

            else if(this.uncertainDroneGenerator ==2){
                this.countryOfOrigin= "WYMB";
                this.identificationFriendOrUknown = "Unknown";
                this.weapons = "No";
                this.emissions = "Yes";
            }

            else if(this.uncertainDroneGenerator == 3){

                this.countryOfOrigin= "WYMB";
                this.identificationFriendOrUknown = "Unknown";
                this.weapons = "No";
                this.emissions = "No";
            }
        }


        randomDroneMovement() {
            //for a random interval(between 3.5 and 7 seconds the direction of the ball will change)
            setInterval(() => {
            /*random direction*/
            this.xBallDir = random(-1, 1);
            this.yBallDir = random(-1, 1);
            this.xSpeed = random(0.5, 0.6);
            this.ySpeed = random(0.5, 0.6);
            
            }, this.randomSeed * 15000);
        }


        move() {
            //updates position of x and y with a direction and speeds
            // added 100 to height and width so that it can move out of radar
            this.xPos = (this.xPos + this.xBallDir * this.xSpeed)%(width+100);
            this.yPos = (this.yPos +this.yBallDir *  this.ySpeed)%(height+25);
        
            // between width and height -10
            
            if (this.xPos > width + 85 ) {
            this.xSpeed = -this.xSpeed;
            } else if (this.yPos > height + 20) {
            this.ySpeed = -this.ySpeed;
            
            }
        }
        
        
    }

    //uncertain drone incorrectly classified

    class missclassifiedUncertainDrone extends Drone{
        constructor(){
            super();
            this.colour = color(255, 255, 0);
            //weapons and emissions which are binary or alternatively hardcoded
            //Checks for distance in relation to the center
            this.Distance = Math.abs(Math.round((this.xPos/2 -250   + this.yPos/2 )));

            
            this.countryOfOrigin;
            this.identificationFriendOrUknown;
            this.weapons;
            this.emissions;
            this.move();
            this.randomDroneMovement();
            
            //this.uncertainDroneGenerator = Math.round(Math.floor(Math.random() * (3 - 0 + 1)) + 0);
            this.uncertainDroneGenerator = Math.round(Math.floor(random() * (3 - 0 + 1)) + 0);
            //console.log(this.uncertainDroneGenerator);

            //miscclasified colour generator for accuracy
            this.misclassifiedColourGenerator = Math.round(Math.floor(random() * (1 - 0 + 1)) + 0);
            

            this.generateRandomCombinationOfTraits();

            //when called it missclasifies them after an amount of time, and then classifies them accurately again after more time

            this.missclassify();
            this.classifyAccurately();
            
            
            // Altitude parameter imported from drone JS
        }

        
        /*An uncertain Drone has 2-3 traits deeemed as hostile, meaning there are 4 combinations for 2 and  */
        generateRandomCombinationOfTraits(){
            
            //console.log(this.uncertainDroneGenerator);
            
            if(this.uncertainDroneGenerator == 0){
                this.countryOfOrigin= "ADRK";
                this.identificationFriendOrUknown = "Unknown";
                this.weapons = "Yes";
                this.emissions = "Yes";
            }
            else if (this.uncertainDroneGenerator ==1){
                this.countryOfOrigin= "ADRK";
                this.identificationFriendOrUknown = "Unknown";
                this.weapons = "Yes";
                this.emissions = "No";
            }

            else if(this.uncertainDroneGenerator ==2){
                this.countryOfOrigin= "WYMB";
                this.identificationFriendOrUknown = "Unknown";
                this.weapons = "No";
                this.emissions = "Yes";
            }

            else if(this.uncertainDroneGenerator == 3){

                this.countryOfOrigin= "WYMB";
                this.identificationFriendOrUknown = "Unknown";
                this.weapons = "No";
                this.emissions = "No";
            }
        }


        randomDroneMovement() {
            //for a random interval(between 3.5 and 7 seconds the direction of the ball will change)
            setInterval(() => {
            /*random direction*/
            this.xBallDir = random(-1, 1);
            this.yBallDir = random(-1, 1);
            this.xSpeed = random(0.5, 0.6);
            this.ySpeed = random(0.5, 0.6);
            
            }, this.randomSeed * 15000);
        }


        move() {
            //updates position of x and y with a direction and speeds
            // added 100 to height and width so that it can move out of radar
            this.xPos = (this.xPos + this.xBallDir * this.xSpeed)%(width+100);
            this.yPos = (this.yPos +this.yBallDir *  this.ySpeed)%(height+25);
        
            // between width and height -10
            
            if (this.xPos > width + 85 ) {
            this.xSpeed = -this.xSpeed;
            } else if (this.yPos > height + 20) {
            this.ySpeed = -this.ySpeed;
            
            }
        }
        
        missclassify(){

          
            
            setTimeout(()=>{
                

                console.log(this.misclassifiedColourGenerator)
            // console.log(this.misclassifiedColourGenerator);
                //classify as hostile
            if(this.misclassifiedColourGenerator == 0){
                this.colour = color(255,0,0);
                // console.log("missclasify uncertain as red") 
            }
        
            if(this.misclassifiedColourGenerator == 1){
                this.colour = color(0,255,0);
                // console.log("missclasify uncertain as green") 
            }
            }, 180000);

            

          
        }
        //classfy accurately is a fucntion that is run four minutes into a scenario with a 75 or 25 trial, one minute into trial 2 of these scenarios right after the screen freeze

        classifyAccurately(){
                setTimeout(() => {
                    // console.log("working?")

                    this.colour = color(255, 255, 0);
                    console.log( "working?"+this.colour.levels);
                    
                }, 480000);
        }
    }
