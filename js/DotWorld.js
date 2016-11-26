/***
CONTAINING BLOCK MUST BE POSITIONED!!!!

Radius is in terms of percentage (height?) of the box you get. Converted to actual pixels before actually rendering
Location is of the center of the dot


TODO - fix increased jitteriness - it's most likely because I'm rewriting instead of just modifying DOM elements
TODO readjust box size on page resize - update: done but a little glitchy



*/


var colors = ["#3498db","#2ecc71","#1abc9c","#f1c40f","#ff0066","#93E617","#00EE00","#00E5EE","#1464F4","#32CD32","#33FF33","#912CEE","#37FDFC","#5DFC0A","#660198","#76EE00"];

function getRandomFromRange(a,b){
	return a+Math.random()*(b-a);
}
function getRandomBool(x){
	return Math.random()*x < 1;
}

var Dot = function(radius,locationX,locationY,velocityX,velocityY,color){
	this.radius = radius;
	this.locationX = locationX;
	this.locationY = locationY;
	this.velocityX = velocityX;
	this.velocityY = velocityY;
	this.color = color;
}

var DotWorld = function(containerID,defaultHTML){
	this.defaultHTML = defaultHTML || "";
	this.containerID = containerID;
	this.env = this.calculateEnvironment();
	this.dots = [];
	for(var i=0;i<this.env.initialDots;i++){
		this.dots.push(this.newRandomDot());
	}
}

DotWorld.prototype.calculateEnvironment = function(){
	var box = document.getElementById(this.containerID);
	var ENV = {};
	ENV.boxHeight = box.clientHeight;
	ENV.boxWidth = box.clientWidth;
	ENV.totalHeight = Math.min(ENV.boxHeight,ENV.boxWidth) == ENV.boxHeight ? 100 : ENV.boxHeight/ENV.boxWidth * 100;
	ENV.totalWidth = ENV.totalHeight==100 ? ENV.boxWidth/ENV.boxHeight * 100: 100;
	console.log(ENV.boxHeight,ENV.boxWidth,ENV.totalHeight,ENV.totalWidth);

	ENV.minSpeed = .1;
	ENV.maxSpeed = .55;//standard units

	ENV.directionChangeConstant = 100;//higher constant, less direction changes

	ENV.initialDots = 4;
	
	ENV.spawnConstant = 100;//higher constant, less spawns
	ENV.liveDotExponent = 1.2;//as more dots appear on screen, spawn rate decreases exponentially

	ENV.minInitRadius = 5;
	ENV.maxInitRadius = 15;
	ENV.maxRadius = 30;

	ENV.eatRadiusMultiplier = .25;//how much of the dinner's diameter is added to the diner
	ENV.eatableRatio = .75;//how much smaller the dinner must be

	ENV.explosionSpawnChildren = 2;//how many children spawn when you explode
	ENV.explosionSpawnChildRatio = .35;//ratio of new diameter to original diameter
	ENV.freakExplosionDiameter = 15;//min diameter for random explosions
	ENV.explosionConstant = 5000;//higher constant less explosions

	return ENV;
}
DotWorld.prototype.getNewSpeed = function(){
	return getRandomFromRange(this.env.minSpeed,this.env.maxSpeed);
}

DotWorld.prototype.newRandomDot= function(){
	var color = colors[Math.floor(getRandomFromRange(0,colors.length))];
	var radius = getRandomFromRange(this.env.minInitRadius,this.env.maxInitRadius);//5-15% of the minimum side
	var locationX = getRandomFromRange(radius,this.env.totalWidth-radius);
	var locationY = getRandomFromRange(radius,this.env.totalHeight-radius);
	return new Dot(radius,locationX,locationY,this.getNewSpeed(),this.getNewSpeed(),color);
}
DotWorld.prototype.getDotDistance = function(dot1,dot2){
	return Math.sqrt(Math.pow(dot1.locationX-dot2.locationX,2)+Math.pow(dot1.locationY-dot2.locationY,2));
}
DotWorld.prototype.inBounds = function(locationX,locationY,radius){
	return !(locationX-radius<0 || locationY-radius <0 || locationX+radius>this.env.totalWidth || this.locationY+radius>this.env.totalHeight);
}
DotWorld.prototype.getEatableDot = function(diner){
	for(var i=0;i<this.dots.length;i++){
		if(this.dots[i]==diner){
			continue;
		}
		if(this.getDotDistance(this.dots[i],diner)<diner.radius && diner.radius*this.env.eatableRatio>this.dots[i].radius){
			return this.dots[i];//return eatable dot
		}
	}
	return false;
}


DotWorld.prototype.generateNewState = function(){
	//randomly spawn new dot maybe
	if(getRandomBool(this.env.spawnConstant*Math.pow(this.dots.length,this.env.liveDotExponent))){
		this.dots.push(this.newRandomDot());
	}
	var dotsToRemove = [];
	//runs in O(n^2)
	for(var i=0;i<this.dots.length;i++){
		var dinner = this.getEatableDot(this.dots[i]);
		if(dinner){
			this.dots[i].radius += dinner.radius*this.env.eatRadiusMultiplier;
			//what if this pushes you out of bounds?
			//just bounce off a further wall
			//glitchy but should work in most cases
			dotsToRemove.push(dinner);
		}
	}
	//check if dot should explode, multitask by removing dead dots and moving dots
	for(var i=0;i<this.dots.length;i++){
		if(this.dots[i].radius*2>=this.env.freakExplosionDiameter && getRandomBool(this.env.explosionConstant/this.dots[i].radius)){
			console.log("boom");
			for(var j=0;j<this.env.explosionSpawnChildren;j++){

				var newDot = this.newRandomDot();
				newDot.radius = this.env.explosionSpawnChildRatio * this.dots[i].radius;
				var tryY,tryX;
				var tries = 0;
				do{
					tryX = getRandomFromRange(this.dots[i].locationX-this.dots[i].radius,this.dots[i].locationX+this.dots[i].radius);
					tryY = getRandomFromRange(this.dots[i].locationY-this.dots[i].radius,this.dots[i].locationY+this.dots[i].radius);
					tries++;
				}while(!this.inBounds(tryX,tryY,newDot.radius)&&tries<100);
				if(tries>=100){
					break;//stop trying to spawn more children
				}
				
				newDot.locationX = tryX;
				newDot.locationY = tryY;
				this.dots.push(newDot);
			}

			this.dots.splice(i,1);//remove exploded dot
			i--;

			continue;
		}
		var wasRemoved = false;
		for(var j=0;j<dotsToRemove.length;j++){
			if(this.dots[i]==dotsToRemove[j]){
				this.dots.splice(i,1);
				i--;
				wasRemoved = true;
				break;
			}
		}
		if(wasRemoved)
			continue;

		//random velocity changes
		if(getRandomBool(this.env.directionChangeConstant)){
			this.dots[i].velocityX = this.getNewSpeed();
			this.dots[i].velocityY = this.getNewSpeed();
		}

		//bounce things off walls
		if(this.dots[i].locationX-this.dots[i].radius<=0&&this.dots[i].velocityX<0||this.dots[i].locationX+this.dots[i].radius>=this.env.totalWidth&&this.dots[i].velocityX>0)
			this.dots[i].velocityX = -this.dots[i].velocityX;
		if(this.dots[i].locationY-this.dots[i].radius<=0&&this.dots[i].velocityY<0||this.dots[i].locationY+this.dots[i].radius>=this.env.totalHeight&&this.dots[i].velocityY>0)
			this.dots[i].velocityY = -this.dots[i].velocityY;

		this.dots[i].locationX += this.dots[i].velocityX;
		this.dots[i].locationY += this.dots[i].velocityY;

	}
	//check if DotWorld container was resized
	var box = document.getElementById(this.containerID);
	if(box.clientHeight != this.env.boxHeight || box.clientWidth != this.env.boxWidth){//kind of glitchy but mostly works
		console.log("must resize");
		this.env = this.calculateEnvironment();
	}

}

DotWorld.prototype.toPx = function(x){
	return this.env.boxHeight*x/this.env.totalHeight + "px";
}

DotWorld.prototype.draw = function(){
	var html = this.defaultHTML;
	for(var i=0;i<this.dots.length;i++){
		var domElement = document.createElement("div");
		var diameter = this.toPx(this.dots[i].radius*2);
		var css = "background-color:"+this.dots[i].color+";border-radius:50%;height:"+diameter+";width:"+diameter+";position:absolute;left:"+this.toPx(this.dots[i].locationX-this.dots[i].radius)+";top:"+this.toPx(this.dots[i].locationY-this.dots[i].radius)+";";
		domElement.setAttribute("style",css);
		html+=domElement.outerHTML;
	}
	document.getElementById(this.containerID).innerHTML = html;
}

DotWorld.prototype.run = function(frame){

	this.generateNewState();
	this.draw();
	window.requestAnimationFrame(this.run.bind(this));
}