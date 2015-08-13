var px = function(num){
	return String(num)+"px";
}

var colors = ["#3498db","#2ecc71","#1abc9c","#f1c40f","#ecf0f1"];

var Dot = function(diameter,dynamic,speed,startX,startY,color,slide,id){
	this.diameter = diameter;
	this.dynamic = dynamic;
	this.speed = speed;
	this.slide = slide;
	this.id = id;
	this.domElement = $("<div></div>").css({
		'background-color':'yellow',
		'border-radius':'50%',
		'height':diameter,
		'width':diameter,
		'position':'fixed',
		'left':px(startX),
		'top':px(startY),
		'z-index':'10000',
		'background-color':color
	}).attr("id",this.id).addClass("magicDot");
	//alert(this.domElement.css("left"));
}

Dot.prototype.animate = function() {
	var that = this;
	var onFrame = function(){
		//debugger;
		
		var invalid = true;
		var left = that.domElement.css("left");
		var top = that.domElement.css("top");
		left = Number(left.split("px")[0]);
		top = Number(top.split("px")[0]);
		var deltaX,deltaY;
		//console.log(left,top);
		do{
			deltaX = that.speed*(Math.floor(Math.random()*11)-5);
			deltaY = that.speed*(Math.floor(Math.random()*11)-5);
			if(deltaX+left<0&&deltaY+top<0&&deltaX+left>$(window).width()&&deltaY+top>$(window).height())
				invalid = false;
			//console.log(deltaX,deltaY);
		}
		while(invalid==false);
		//console.log(px(left+deltaX),px(top+deltaY))
		//console.log(that.id);
		that.domElement.css("left",px(left+deltaX)).css("top",px(top+deltaY));
		//console.log($("#"+that.id).html());
		$("#"+that.id).remove();
		that.slide.append(that.domElement);
		var left = that.domElement.css("left");
		var top = that.domElement.css("top");
		that.animate();
	};
	window.requestAnimationFrame(onFrame);
	//setInterval(onFrame,100)
	//onFrame();
};

var randomDot = function(slide,id){
	var diameter = Math.floor(Math.random()*35)+25;//20-44 pixels in radius
	var dynamic = true;
	var speed = 1;
	var startX = Math.floor(Math.random()*($(window).width()-50))+25;
	var startY = Math.floor(Math.random()*($(window).height()-50))+25;
	var color = colors[Math.floor(Math.random()*colors.length)];
	var dot = new Dot(diameter,dynamic,speed,startX,startY,color,slide,id);
	slide.append(dot.domElement);
	dot.animate();
}


$(document).ready(function(){

var Message = function(statics,dynamics,times){
	this.statics = statics;
	this.dynamics = dynamics;
	this.times = times;
}

var messages = [];
messages.push(new Message("I am a",[" student"," thinker"," dreamer"," coder","n innovator"],750));
messages.push(new Message("I ",["imagine","design","program","create"],750));
messages.push(new Message("",["Take a Look"],750))

var animateSection = function(target){
	var sel = "#"+String(target);
	var dynsel = sel+" .dynamic";
	$(sel+" .static").text(messages[target].statics);
	$(dynsel).text(messages[target].dynamics[0]);
	
	for(i=0;i<25;i++){
		randomDot($(sel),"magicdot"+String(i));
	}


	var fade = function(iter){
		if(iter==messages[target].dynamics.length)
			return;
		if($(sel).css("display")=="none"){//if user has moved to next slide
			$(dynsel).text(messages[target].dynamics[0]);
			return;
		}
		$(dynsel).fadeToggle(messages[target].times,"swing",function(){
			if($(sel).css("display")=="none"){//if user has moved to next slide
				$(dynsel).text(messages[target].dynamics[0]);
				return;
			}
			$(dynsel).text(messages[target].dynamics[iter]);
			$(dynsel).fadeToggle(messages[target].times,"swing",function(){
				fade(iter+1);
			});
		});
	}
	fade(1);

}




var sections = $(".section-container section").size();

for(i=0;i<sections;i++){
	var item = $("<li></li>").data("position",i).click(function(){
		changeSection($(this).data("position"));
	}).append($("<span></span>"));
	$("ul.nav").append(item);
}

var changeSection = function(target){
	$(".magicDot").remove();
	for(var i=0;i<sections;i++){
		if(i==target){
			$(".section-container section").eq(i).css("display","block");
			$("ul.nav li").eq(i).addClass("active");
		}
		else{
			$(".section-container section").eq(i).css("display","none");
			$("ul.nav li").eq(i).removeClass("active");
		}
	}
	animateSection(target);
}

changeSection(0);

document.body.addEventListener("wheel",function(event){
	if(event.deltaY>0||event.deltaX>0){
		var target = ($("ul.nav li.active").data("position")+1)%sections;
		changeSection(target);
	}
	else if(event.deltaY<0||event.deltaX<0){
		var target = (($("ul.nav li.active").data("position")-1)%sections+sections)%sections;
		changeSection(target);
	}
});


});//end document ready