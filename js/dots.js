/*********************************************************************************************
Created by Jabez Wesly

Created 8/12/15
Last Updated 8/15/15
*********************************************************************************************/

var ENV = {};//
ENV.initialDots = 8;

ENV.buffer = 25;
ENV.minX = ENV.buffer;
ENV.maxX = $(window).width()-ENV.buffer;
ENV.minY = $(window).height()*.12 + ENV.buffer;//accounts for nav bar
ENV.maxY = $(window).height()-ENV.buffer;
ENV.speed = 1.5;
ENV.minRandDot = 10;
ENV.maxRandDot = 30;
ENV.spawnConstant = 750;//higher constant, less spawns
ENV.eatableRatio = .75;//
ENV.directionChangeProb = .01;
ENV.freakExplosionDiameter = 75;//min diameter for random explosions
ENV.explosionConstant = 3000;//higher constant less explosions
ENV.maxDiameter = 400;//if you get this high, you die

ENV.eatDiameterMultiplier = .9;//how much of the dinner's diameter is added to the diner

ENV.explosionSpawnChildren = 3;//how many children spawn when you explode
ENV.explosionSpawnChildRatio = .25;//ratio of new diameter to original diameter

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



var colors = ["#3498db","#2ecc71","#1abc9c","#f1c40f","#ff0066","#93E617"];

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
		"z-index":"11",
		"background-color":color,
		"color":"yellow",
		"font-size":"2em"
	}).attr("id",this.id).addClass("magicDot");//.html(Number(id.split("magicDot")[1]));
	this.directionX = 0;
	this.directionY = 0;
	this.newDirection();

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
			window.cancelAnimationFrame(that.requestID);
			return;//self-destruct
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
				window.cancelAnimationFrame(that.requestID);
				return true;//self-destruct
			};
		if(that.diameter>ENV.freakExplosionDiameter && Math.floor(Math.random()*(ENV.explosionConstant/that.diameter))==0 || that.diameter > ENV.maxDiameter){
			if(explode()){
				window.cancelAnimationFrame(that.requestID);
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
				console.log(that.id+" iter>1000 "+String(cleft)+" "+String(ctop)+" "+String(radius));
				if(iteri==1005)
					if(explode()){
						window.cancelAnimationFrame(that.requestID);
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
			that.world.removeDot(eat.id);
			left = cleft-radius;
			top = ctop-radius;
		}
		if(!that.world.updatePosition(that.id,cleft,ctop,radius)){
			window.cancelAnimationFrame(that.requestID);
			return;//self-destruct
		};//if they couldn't find you, you're dead


		that.domElement.css("left",px(left)).css("top",px(top));
		$("#"+that.id).remove();
		
		that.world.slide.append(that.domElement);
		that.animate();

	};//new motion


	this.requestID = window.requestAnimationFrame(eachFrame);
};

var dotWorld = function(slide){
	this.dotNum = 0;//used solely for creating new ID's. not necessarily # of dots
	this.slide = slide;
	this.dots = [];
	for(var i=0;i<ENV.initialDots;i++){
		this.addDot();
	}
	var that = this;
	var randSpawn = function(){
		if(DEBUG.pause)
			return;
		if(Math.floor(Math.random()*ENV.spawnConstant)==0){
			//console.log("new spawn");
			that.addDot();
		}
		window.requestAnimationFrame(randSpawn);
	}
	window.requestAnimationFrame(randSpawn);
};

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
	this.dots.push(JSON.parse(JSON.stringify({
		"id":this.dotNum
		,"top":0
		,"left":0
		,"radius":0
	})));
	if(this.updatePosition(id,startX,startY,radius)){
		if(dynamic)
			dot.animate();
	}
	this.dotNum++;
	return;
};

dotWorld.prototype.isAlive = function(id){
	id = Number(id.split("magicDot")[1]);

	for(var i =0; i < this.dots.length;i++){
		if(this.dots[i].id==id)
			return true;
	}
	if(id==DEBUG.watch){
		console.log("cause of death",this.dots);
		//DEBUG.pause = true;
	}
	return false;
}


dotWorld.prototype.updatePosition = function(id,cleft,ctop,radius){
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
	for(var i=0;i<this.dots.length;i++){
		if(this.dots[i].id!=id&&this.dots[i].left>cleft-radius&&this.dots[i].left<cleft+radius&&this.dots[i].top>ctop-radius&&this.dots[i].top<ctop+radius){
			var distance = Math.sqrt(Math.pow(this.dots[i].left-cleft,2)+Math.pow(this.dots[i].top-ctop,2));
			//console.log(distance,radius,radius*.75,this.dots[i].radius);
			if((distance)<radius && this.dots[i].radius<radius*ENV.eatableRatio){
				eatables.push(this.dots[i]);//return dot to be eaten
			}
		}
	}
	var sd = 999999999;
	var si;
	for(var i=0;i<eatables.length;i++){
		var distance = Math.sqrt(Math.pow(eatables[i].left-cleft,2)+Math.pow(eatables[i].top-ctop,2));
		if(distance<sd){
			sd = distance;
			si = i;
		}
	}
	if(sd == 999999999)
		return false;
	return eatables[si];
}

dotWorld.prototype.removeDot = function(id){
	for(var i=0;i<this.dots.length;i++){
		if(this.dots[i].id==id){
			this.dots.splice(i,1);
			$("#magicDot"+String(id)).remove();
			console.log(id+" is dead");
			return true;
		}
	}
	return false;
}

dotWorld.prototype.inBounds = function(x,y,radius){
	return !((x-radius)<ENV.minX||(x+radius)>ENV.maxX||(y-radius)<ENV.minY||(y+radius)>ENV.maxY);
}