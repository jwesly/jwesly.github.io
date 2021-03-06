/*********************************************************************************************
Created by Jabez Wesly

Created 8/12/15
Last Updated 12/25/15
*********************************************************************************************/

/*********************************************************************************************
TODO
	Match screen size, not pixels

************************************************************************************************/
var getCMPerPix = function(){
	$("body").append('<div id="meter" style="width:1cm; height:1cm"></div>');
	//console.log($("#meter").width());
	var CMPerPix = 1 / $('#meter').width();
	$("#meter").remove();
	//console.log("Your screen is ",screen.width * CMPerPix,screen.height * CMPerPix);
	return CMPerPix;
};
var RUNTIME = {};//carries global variables that change at runtime

RUNTIME.liveDots;
//all variables dependent on screen recalced here

var ENV = {};//contains (mostly) static global variables that affect the Dot ecosystem

var calcENV = function(){
	ENV.screenHeight = $(window).height();
	ENV.screenWidth = $(window).width();
	ENV.CMPerPix = getCMPerPix();
	ENV.screenArea = ENV.screenHeight*ENV.screenWidth*ENV.CMPerPix*ENV.CMPerPix;

	ENV.initialDots = Math.min(7,ENV.screenArea/300);//no more than 7
	//console.log(ENV.screenArea,ENV.initialDots," initial dots");
	ENV.maxDots = 15;//impacts performance. stops new spawns
	//idt it's implemented
	//Needs to be function of screen size

	ENV.buffer = 25;
	ENV.minX = ENV.buffer;
	ENV.maxX = ENV.screenWidth-ENV.buffer;
	ENV.minY = ENV.screenHeight*.12 + ENV.buffer;//accounts for nav bar
	ENV.maxY = ENV.screenHeight-ENV.buffer;
	ENV.speed = 1.5;

	ENV.minRandDot = Math.min(ENV.screenHeight,ENV.screenWidth)*.03;
	ENV.maxRandDot = ENV.minRandDot*2.5;
	//function of screen size

	ENV.spawnConstant = 100;//higher constant, less spawns
	ENV.liveDotExponent = 1.2;//as more dots appear on screen, spawn rate decreases exppnentially
	//Needs to be a function of dots on screen

	ENV.eatableRatio = .75;//
	ENV.directionChangeProb = .01;
	ENV.freakExplosionDiameter = 100;//min diameter for random explosions
	ENV.explosionConstant = 6000;//higher constant less explosions
	ENV.maxDiameter = Math.min(ENV.screenHeight,ENV.screenWidth)*.5;//if you get this high, you die
	//Needs to be a function of screen size

	ENV.eatDiameterMultiplier = .9;//how much of the dinner's diameter is added to the diner

	ENV.explosionSpawnChildren = 3;//how many children spawn when you explode
	ENV.explosionSpawnChildRatio = .35;//ratio of new diameter to original diameter
}
calcENV();

var DEBUG = {};
DEBUG.watchNextDot;
DEBUG.watch;
DEBUG.watch2;
DEBUG.pause;

var px = function(num){
	return String(num)+"px";
}
var unpx = function(str){
	return Number(str.split("px")[0]);
}



var colors = ["#3498db","#2ecc71","#1abc9c","#f1c40f","#ff0066","#93E617","#00EE00","#00E5EE","#1464F4","#32CD32","#33FF33","#912CEE","#37FDFC","#5DFC0A","#660198","#76EE00"];

var Dot = function(diameter,color,id,world,startX,startY){
	this.diameter = diameter;
	this.id = id;
	this.world = world;
	this.domElement = $("<div></div>").css({
		"background-color":"yellow",
		"border-radius":"50%",
		"height":diameter,
		"width":diameter,
		"position":"fixed",
		"left":px(startX),
		"top":px(startY),
		"z-index":"0",
		"background-color":color,
		"color":"yellow",
		"font-size":"2em"
	}).attr("id",this.id).addClass("magicDot");//.html(Number(id.split("magicDot")[1]));
	this.directionX = 0;
	this.directionY = 0;
	this.newDirection();
	this.cleft;
	this.ctop;
	this.radius;

	this.updatePosition = function(cleft,ctop,radius){
		this.cleft  = cleft;
		this.ctop   = ctop;
		this.radius = radius;
	}


	world.slide.append(this.domElement);
}

Dot.prototype.newDirection = function(){
	this.directionX = Math.floor(Math.random()*(ENV.speed*2+1))-ENV.speed;
	this.directionY = Math.floor(Math.random()*(ENV.speed*2+1))-ENV.speed;
};

Dot.prototype.animate = function() {
	var that = this;
	var eachFrame = function(){
		if(DEBUG.pause){
			setTimeout(that.animate,200);
			return;
		}

		var nID = Number(that.id.split("magicDot")[1]);
		if(!that.world.isAlive(that.id)){
			that.world.removeDot(that.id);
			return;//self-destruct
		}		
		if(that.world.worldCount != worldCounter-1){
			console.log("We have leakage!!!!");
		}
		if(Math.floor(Math.random()/ENV.directionChangeProb)==0){
			that.newDirection();
		}

		var left = that.domElement.css("left");
		var top = that.domElement.css("top");
		left = unpx(left);
		top = unpx(top);
		var radius = that.diameter/2;
		var cleft = left + radius;
		var ctop =  top + radius;
		var explode = function(){
				//console.log(that.id+" boom",that.diameter);
				var nD = that.diameter*ENV.explosionSpawnChildRatio;
				var nR = nD/2;
				//spawn 3 new dots
				for(var i=0;i<ENV.explosionSpawnChildren;i++){
					var nX,nY;
					var iterj = 0;
					var bool;
					do{
						nX = Math.floor(Math.random()*nR*2+left);
						nY = Math.floor(Math.random()*nR*2+top);
						iterj++;
						bool = that.world.inBounds(nX+nR,nY+nR,nR);//pass centers and radius
						if(iterj>100)
							break;
					}
					while(bool==false);
					if(bool){
						//console.log(i,nX,nY,nD);
						that.world.addDot(nX+nR,nY+nR,nD);
					}
				}
				//destroy old dot
				var x = Number(that.id.split("magicDot")[1]);
				that.world.removeDot(x);
				return true;//self-destruct
			};
		if(that.diameter>ENV.freakExplosionDiameter && Math.floor(Math.random()*(ENV.explosionConstant/that.diameter))==0 || that.diameter > ENV.maxDiameter){
			if(explode()){
				return;
			}
		}

		var inv;
		var iteri = 0;
		do{
			if(cleft+that.directionX-radius<ENV.minX||cleft+that.directionX+radius>ENV.maxX){
				that.directionX = -that.directionX;
			}
			if(ctop+that.directionY-radius<ENV.minY||ctop+that.directionY+radius>ENV.maxY){
				that.directionY = -that.directionY;
			}
			if(!that.world.inBounds(cleft+that.directionX,ctop+that.directionY,radius)){
				that.newDirection();
			}
			if(iteri>1000){
				if(ENV.maxX-cleft>cleft-ENV.minX)
					cleft+=75;//if closer to min
				else
					cleft-=75;//if closer to max
				if(ENV.maxY-ctop>ctop-ENV.minX)
					ctop+=75;
				else
					ctop-=75;
				//console.log(that.id+" iter>1000 "+String(cleft)+" "+String(ctop)+" "+String(radius));
				if(iteri==1005)
					if(explode()){
						return;
					}
				//return;
			}
			iteri++;
			//console.log(that.world.inBounds(left+that.directionX,top+that.directionY,that.diameter));
		}
		while(!that.world.inBounds(cleft+that.directionX,ctop+that.directionY,radius));


		left += that.directionX;
		top += that.directionY;
		cleft += that.directionX;
		ctop += that.directionY;


		var eat = that.world.getEatableDot(that.id,cleft,ctop,radius);
		if(eat != false){//nom nom nom
			//console.log("nom nom")
			that.diameter = that.diameter+(eat.radius*2)*ENV.eatDiameterMultiplier;//Math.floor(Math.sqrt(Math.pow(that.diameter,2),Math.pow(eat.diameter,2)));
			radius = that.diameter/2;
			that.domElement.css("height",that.diameter).css("width",that.diameter);
			if(cleft-radius<ENV.minX)
				cleft = ENV.minX+radius;
			if(cleft+radius>ENV.maxX)
				cleft = ENV.maxX-radius;
			if(ctop-radius<ENV.minY)
				ctop = ENV.minY+radius;
			if(ctop+radius>ENV.maxY)
				ctop = ENV.maxY-radius;
			//console.log(eat.id);
			that.world.removeDot(Number(eat.id.split("magicDot")[1]));
			left = cleft-radius;
			top = ctop-radius;
		}
		that.updatePosition(cleft,ctop,radius)
		/*if(!that.world.updatePosition(that.id,cleft,ctop,radius)){
			//window.cancelAnimationFrame(that.requestID);
			return;//self-destruct
		};//if they couldn't find you, you're dead
		*/

		that.domElement.css("left",px(left)).css("top",px(top));
		$("#"+that.id).remove();
		
		that.world.slide.append(that.domElement);
		//that.animate();

	};//new motion

	eachFrame();//just for a little bit

	//this.requestID = window.requestAnimationFrame(eachFrame);
};

var dotWorld = function(slide,wcount){
	this.dotNum = 0;//used solely for creating new ID's. not necessarily # of dots
	this.slide = slide;
	this.dots = [];//legacy array of just the radius position and id's
	this.dotObj = [];//new array of the actual dot objects
	this.worldCount = wcount;

	for(var i=0;i<ENV.initialDots;i++){
		this.addDot();
	}
	var that = this;
	var randSpawn = function(){
		if(DEBUG.pause)
			return;
		if(RUNTIME.liveDots>=ENV.maxDots)//no new thangs (spawns)
			return;
		//console.log(ENV.spawnConstant*Math.pow(RUNTIME.liveDots,ENV.liveDotExponent));
		if(Math.floor(Math.random()*ENV.spawnConstant*Math.pow(RUNTIME.liveDots,ENV.liveDotExponent))==0){
			//console.log("new spawn");
			//console.log("new spawn on world ",that.worldCount);
			that.addDot();
			
		}
		
	}
	
	//Everything should be called from in this next function
	var mainThread = function(){
		randSpawn();
		for(var i = 0; i < that.dotObj.length; i++){
			that.dotObj[i].animate();
		}
		that.worldAnimation = window.requestAnimationFrame(mainThread);
	}
	this.worldAnimation = window.requestAnimationFrame(mainThread);
};

dotWorld.prototype.selfDestruct = function(){
	window.cancelAnimationFrame(this.worldAnimation);
	this.dots = [];
	for(var i=0;i<this.dotObj.length;i++){
		this.removeDot(Number(this.dotObj[i].id.split("magicDot")[1]));
	}
	$(".magicDot").remove();
	console.log("Destroying world",this.worldCount);
	this.liveDotsUpdate();
}
//console logs how many dots there are
dotWorld.prototype.liveDotsUpdate = function(){
	RUNTIME.liveDots = this.dots.length;
	//console.log(RUNTIME.liveDots," in world ",this.worldCount);
	return this.dots.length;
}

dotWorld.prototype.addDot = function(startX,startY,diameter,dynamic){
	if(DEBUG.watchNextDot){
		DEBUG.watch = this.dotNum;
		DEBUG.watchNextDot = false;
	}
	var id = "magicDot"+String(this.dotNum);
	var diameter = diameter || Math.floor(Math.random()*ENV.maxRandDot)+ENV.minRandDot;//20-44 pixels in radius
	if(typeof dynamic === 'undefined')
		dynamic = true;
	var color = colors[Math.floor(Math.random()*colors.length)];
	var radius = diameter/2;
	var startX =  startX || (Math.floor(Math.random()*(ENV.maxX-ENV.minX-2*radius))+ENV.minX+radius);
	var startY =  startY || (Math.floor(Math.random()*(ENV.maxY-ENV.minY-2*radius))+ENV.minY+radius);
	
	var dot = new Dot(diameter,color,id,this,startX-radius,startY-radius,diameter);
	this.dotObj.push(dot);//keep a table of all the dots within the dotWorld object

	this.dots.push(JSON.parse(JSON.stringify({
		"id":this.dotNum
		,"top":0
		,"left":0
		,"radius":0
	})));
	dot.updatePosition();
	this.dotNum++;
	this.liveDotsUpdate();
	return dot;
};

dotWorld.prototype.isAlive = function(id){
	id = Number(id.split("magicDot")[1]);

	for(var i =0; i < this.dots.length;i++){
		if(this.dots[i].id==id)
			return true;
	}
	if(id==DEBUG.watch){
		//console.log("cause of death",this.dots);
		//DEBUG.pause = true;
	}
	return false;
}


dotWorld.prototype.updatePosition = function(id,cleft,ctop,radius){
	console.log("still getting stuff here");
	return false;
	id = Number(id.split("magicDot")[1]);
	for(var i=0;i<this.dots.length;i++){
		if(this.dots[i].id == id){
			this.dots[i].left = cleft;
			this.dots[i].top = ctop;
			this.dots[i].radius = radius;
			if(id == DEBUG.watch){
				console.log("updating",this.dots[i]);
			}
			return true;
		}
	}

	return false;//if we couldn't find you, you're dead
};

dotWorld.prototype.getEatableDot = function(id,cleft,ctop,radius){//change to radius
	id = Number(id.split("magicDot")[1]);
	var eatables = [];
	for(var i=0;i<this.dotObj.length;i++){
		var tdot = this.dotObj[i];
		if(tdot.id!=id&&tdot.cleft>cleft-radius&&tdot.cleft<cleft+radius&&tdot.ctop>ctop-radius&&tdot.ctop<ctop+radius){
			var distance = Math.sqrt(Math.pow(tdot.cleft-cleft,2)+Math.pow(tdot.ctop-ctop,2));
			//console.log(distance,radius,radius*.75,this.dots[i].radius);
			if((distance)<radius && tdot.radius<radius*ENV.eatableRatio){
				eatables.push(tdot);//return dot to be eaten
			}
		}
	}
	if(eatables.length < 1)
		return false;
	//console.log(eatables);
	var sd = 999999999999999999;
	var sd, si;
	for(var i=0;i<eatables.length;i++){
		var distance = Math.sqrt(Math.pow(eatables[i].cleft-cleft,2)+Math.pow(eatables[i].ctop-ctop,2));
		//console.log("this is ",distance,sd);
		if(distance<sd){
			sd = distance;
			si = i;
		}
	}
	if(typeof eatables[si] === 'undefined')
		return false;
	return eatables[si];
}

dotWorld.prototype.removeDot = function(id){
	for(var i =0; i < this.dotObj.length; i++){
		if(Number(this.dotObj[i].id.split("magicDot")[1]) == id)
			this.dotObj.splice(i,1);
	}
	for(var i=0;i<this.dots.length;i++){
		if(this.dots[i].id==id){
			this.dots.splice(i,1);
			$("#magicDot"+String(id)).remove();
			//console.log(id+" is dead");
			this.liveDotsUpdate();
			return true;
		}
	}
	return false;
}
/**
	*Tells you if your dot is inside the screen
	*@param {number} x coordinate of dot
	*@param {number} y coord of dot
	*@param {number} radius of dot
	*@return {bool}  true if dot is in bounds
*/
dotWorld.prototype.inBounds = function(x,y,radius){
	return !((x-radius)<ENV.minX||(x+radius)>ENV.maxX||(y-radius)<ENV.minY||(y+radius)>ENV.maxY);
}