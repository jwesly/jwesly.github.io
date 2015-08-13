var px = function(num){
	return String(num)+"px";
}
var unpx = function(str){
	return Number(str.split("px")[0]);
}

var colors = ["#3498db","#2ecc71","#1abc9c","#f1c40f","#ecf0f1"];

var Dot = function(diameter,dynamic,color,slide,id){
	this.diameter = diameter;
	this.dynamic = dynamic;
	this.slide = slide;
	this.id = id;

	this.speed = 1.5;//more likely to have spped of 1 than speed of 2
	var buffer = 25;
	this.minX = buffer;
	this.maxX = $(window).width()-buffer;
	this.minY = $(window).height()*.12 + buffer;//accounts for nav bar
	this.maxY = $(window).height()-buffer;
	var startX = Math.floor(Math.random()*(this.maxX-this.minX))+this.minX;
	var startY = Math.floor(Math.random()*(this.maxY-this.minY))+this.minY;
	this.domElement = $("<div></div>").css({
		'background-color':'yellow',
		'border-radius':'50%',
		'height':diameter,
		'width':diameter,
		'position':'fixed',
		'left':px(startX),
		'top':px(startY),
		'z-index':'0',
		'background-color':color
	}).attr("id",this.id).addClass("magicDot");
	this.directionX = 0;
	this.directionY = 0;
	this.newDirection();
	this.buffer = buffer;//sets ten pixel buffer for dots
	//alert(this.domElement.css("left"));
	slide.append(this.domElement);
}

Dot.prototype.newDirection = function(){
	if(this.dynamic){
		this.directionX = Math.floor(Math.random()*(this.speed*2+1))-this.speed;//this.speed = maxSpeed
		this.directionY = Math.floor(Math.random()*(this.speed*2+1))-this.speed;
	}
};

Dot.prototype.animate = function() {
	var that = this;
	var eachFrame = function(){
		if(Math.floor(Math.random()*100)==9){//  1% chance of direction change 
			that.newDirection();
		}
		var left = that.domElement.css("left");
		var top = that.domElement.css("top");
		left = unpx(left);
		top = unpx(top);
		var invalid = false;
		do{
			if(left+that.directionX<that.minX||left+that.directionX>that.maxX){
				that.directionX = -that.directionX;
			}
			if(top+that.directionY<that.minY||top+that.directionY>that.maxY){
				that.directionY = -that.directionY;
			}
			if(left+that.directionX<that.minX||left+that.directionX>that.maxX||top+that.directionY<that.minY||top+that.directionY>that.maxY){
				console.log("It's possible");
				invalid = true;
			}
		}
		while(invalid==true);
		that.domElement.css("left",px(left+that.directionX)).css("top",px(top+that.directionY));
		$("#"+that.id).remove();
		that.slide.append(that.domElement);
		var left = that.domElement.css("left");
		var top = that.domElement.css("top");
		that.animate();

	};//new motion


	window.requestAnimationFrame(eachFrame);
};

var dotWorld = function(slide){
	this.dots = 0;
	this.slide = slide
}

dotWorld.prototype.addDot = function(){
	var id = "magicDot"+String(this.dots);
	this.dots++;
	var diameter = Math.floor(Math.random()*35)+25;//20-44 pixels in radius
	var dynamic = true;
	var color = colors[Math.floor(Math.random()*colors.length)];
	var dot = new Dot(diameter,dynamic,color,this.slide,id);
	dot.animate();
}