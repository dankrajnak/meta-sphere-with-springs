//Author: Daniel Krajnak
function Springpoint(x, y, d, m, k_in) {
 
  // Screen values 
  var xpos;
  var ypos;
  var tempxpos;
  var tempypos; 
  
  //Mouse forcefield variables
  var forcef;
  var forcefy;
  var forcefx;
  var counter = 1;
  Springpoint.prototype.timer = 400;
  Springpoint.pressed = false;
  Springpoint.prototype.mouseSpeeds = new Array();

  // Spring simulation constants 
  var mass;       // Mass 
  var k;    // Spring constant 
  var damp;       // Damping 

  // Spring simulation variables 
  var velx = 0.0;   // X Velocity 
  var vely = 0.0;   // Y Velocity 
  var accel = 0;    // Acceleration 
  var force = 0;    // Force 

  //Initialization
  xpos = tempxpos = x; 
  ypos = tempypos = y;
  damp = d; 
  mass = m; 
  k = k_in;
  
  var distance = function(){
    var dis = sqrt(sq(tempxpos-mouseX)+sq(tempypos-mouseY));
    if(dis != 0){
    return dis
    }
    else{
      return 0.00001;
    }
  }
  
  this.display = function() {
    ellipse(tempxpos, tempypos, 50, 50);
  }
  

  Springpoint.prototype.mouseSpeed = function(){
    Springpoint.prototype.mouseSpeeds[frameCount%4]= sqrt(sq(mouseX-pmouseX)+
    sq(mouseY-pmouseY)); 
    //Calculate sum of array
    var mouseSum= Springpoint.prototype.mouseSpeeds.reduce(function(sum, a) {
      return sum + a },0);
    return mouseSum;
  }
  
  
  this.update = function(){
  var mouseSum = Springpoint.prototype.mouseSpeed();
  
  if(Springpoint.prototype.pressed){
  	counter *= 1.4;
    //Mouse exerts force outward which inversely varies by distance.
    //counter added to eliminate the shapes snapping back into place too quickly
    forcef=Math.min(counter,2000)/distance();
    
    //points are held in place by "springs" so f=-ky
    forcefy = (mouseY-tempypos)*forcef/distance(); //force in y direction
    accel = -forcefy/mass;
    vely = damp * (vely + accel);
    tempypos = tempypos + vely;
    //tempypos = -forcefy/k +ypos; //Update position f=-k(y1-y2) == y1=-f/k+y2 
    
    forcefx = (mouseX-tempxpos)*forcef/distance(); //force in x direction
    accel = -forcefx/mass;
    velx = damp * (velx + accel);
    tempxpos = tempxpos + velx;
    //tempxpos = -forcefx/k+xpos  //Update position f=-k(x1-x2) == x1=-f/k+x2
  }
  else{
    counter=10;
    force = -k * (tempypos - ypos);  // f=-ky 
    accel = (force)/mass;            // Set the acceleration, f=ma == a=f/m 
    vely = damp * (vely + accel);    // Set the velocity 
    tempypos = tempypos + vely;      // Updated position 
    
    
    force = -k * (tempxpos - xpos);  // f=-ky 
    accel = (force) / mass;          // Set the acceleration, f=ma == a=f/m 
    velx = damp * (velx + accel);    // Set the velocity 
    tempxpos = tempxpos + velx;      // Update position


  }
  }
 
  Springpoint.prototype.press = function(){
    Springpoint.prototype.pressed = true;
  
  } 
  
  Springpoint.prototype.release = function(){
    Springpoint.prototype.pressed = false;
  }
  
  this.getXvalue = function(){
    return tempxpos;
  }
  
  this.getYvalue = function(){
    return tempypos;
  }
  
  this.setXValue = function(x){
  	tempxpos = x;
  }
  
  this.setYvalue = function(y){
  	tempypos = y;
  }
  
  this.setXAnchor = function(x){
  	xpos = x;
  }
  
  this.setYAnchor = function(y){
  	ypos = y;
  }
  
  this.getXAnchor = function(){
  	return xpos;
  }
  
  this.getYAnchor = function(){
  	return ypos;
  }

}

function mousePressed(){
  Springpoint.prototype.press();
  return false;

}

function mouseReleased(){
  Springpoint.prototype.release();
  return false;
}

function mouseOut(){
  Springpoint.prototype.press();
  return false;
}

function mouseOver(){
  Springpoint.prototype.release();
  return false;
}