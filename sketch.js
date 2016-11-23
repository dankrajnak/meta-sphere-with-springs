//Author: Daniel Krajnak

var dots;

var p=.0008;
var numberOfRows=30;
var numberOfCollumns=30;

function setup() {
  colorMode(HSB, windowWidth, 100, 100);
  createCanvas(windowWidth, windowHeight);
 
  //Initialize grid of dots
  dots= new Array(numberOfRows*numberOfCollumns);
  
  var currentRow=0;
  var currentCollumn =0;
  var x;
  var y;
  for(var i=0; i<(numberOfRows*numberOfCollumns); i++) {
  	
    x= currentCollumn*(windowWidth/numberOfCollumns);
    y= currentRow*windowHeight/numberOfRows;
    dots[i] = new Springpoint(x, y, Math.random()*.05+.92, Math.random()*100+50, Math.random()*.5+.5);
    currentRow++;
    if (currentRow==numberOfRows) {
      currentRow=0;
      currentCollumn++;
    }
  }
}

function draw() {
	//Make background black.
  background(0, 0, 0);
  noStroke();
  for (var i=0; i< (numberOfRows*numberOfCollumns); i++) {
   
    //format: fill(hue, saturation, brightness);
    //the code: fill(distance from center, max saturation, max brightness);
    fill(sqrt(pow(windowWidth/2-dots[i].getXvalue(), 2)+pow(windowHeight/2-dots[i].getYvalue(), 2)),100,100);
    //fill(255, 0, 100, 100);
    
    //Ok, I'm going to be honest with you, this was one of the first programs
    //I made, and I coded it poorly and as a result.  I could fix most of it, but
    //I have no idea how this part actually works.
    ellipse(constrain(dots[i].getXvalue()+(constrain(mouseX, 100, windowWidth-100)-dots[i].getXvalue())*sqrt(pow(constrain(mouseX, 300, 900)-dots[i].getXvalue(), 2)+pow(mouseY-dots[i].getYvalue(), 2))*p, dots[i].getXvalue()-200, dots[i].getXvalue()+200), dots[i].getYvalue()+(mouseY-dots[i].getYvalue())*sqrt(pow(mouseX-dots[i].getXvalue(), 2)+pow(mouseY-dots[i].getYvalue(), 2))*p, 2, 2);
    
    dots[i].update();
    //Move the dots across the page
    if (mouseX<=windowWidth/2) {
      dots[i].setXAnchor(dots[i].getXAnchor()+1);
      if(dots[i].getXAnchor()>windowWidth){
      	dots[i].setXAnchor(0);
      	dots[i].setXValue(0);
      }
    } else {
      dots[i].setXAnchor(dots[i].getXAnchor()-1);
      if (dots[i].getXAnchor()<=0) {
        dots[i].setXAnchor(windowWidth);
        dots[i].setXValue(windowWidth);
      }
    }
  }
  for(var i=0; i<(numberOfRows*numberOfCollumns); i++){
  	
  }

}