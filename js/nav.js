/*****************************************************
NONE OF THE DOT WORLDS DIE!!!!!!

TODO List
	Pictures/Information about my Projects
	Better Mobile Site
	Better JS organization

*****************************************************/

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
 
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

//my code starts

var projectsFadeIn = function(){
	var ftime = 750;
	$(".proj2").animate({opacity: 1},ftime,function(){
		$(".proj0").animate({opacity: 1},ftime,function(){
			$(".proj1").animate({opacity: 1},ftime)
		})
	})
	//$(".projects > div").css("opacity","1");
}

var currentDotWorld = {};
var worldCounter = 0;
$(document).ready(function(){


$(window).resize(function(){
	var thisSlide = $("ul.nav li.active").data("position");
	if(thisSlide == 0 || thisSlide == 1){
		currentDotWorld.selfDestruct();
		calcENV();
		var sel = "#"+String(thisSlide);
		currentDotWorld = new dotWorld($(sel),worldCounter);
		worldCounter++;
	}
});

var wordFrame = function(statics,dynamics,times){
	this.statics = statics;
	this.dynamics = dynamics;
	this.times = times;//array of 3- fadeIn, stay, fadeOut
}
var dTimez = [700,300,700];
var startTimez = [0,1000,700]
var endTimez = [700,-1,0];
var messagez = [];
messagez.push([new wordFrame("","Who Am I?",startTimez)
	,new wordFrame("I am a"," student",dTimez)
	,new wordFrame("I am a"," thinker",dTimez)
	,new wordFrame("I am a"," dreamer",dTimez)
	,new wordFrame("I am a"," coder",dTimez)
	,new wordFrame("I am a","n innovator",endTimez)
]);

messagez.push([new wordFrame("","What Do I Do?",startTimez)
	,new wordFrame("I ","imagine",dTimez)
	,new wordFrame("I ","design",dTimez)
	,new wordFrame("I ","program",dTimez)
	,new wordFrame("I ","create",endTimez)
]);

messagez.push([new wordFrame("","What Have I Done?",[0,600,600])
	,new wordFrame("","Take a Look",[600,600,500])
	,new wordFrame(""," ",endTimez)
]);
/**
Called EACH time when slide is changed
**/

var animateSection = function(target){

	var sel = "#"+String(target);
	var dynsel = $(sel+" .dynamic");
	var statsel = $(sel+" .static");
	var frames = messagez[target];
	var newFade = function(iter){
		statsel.html(frames[iter].statics);
		if($(sel).css("display")=="none"){//if user has moved to next slide
			dynsel.html(frames[0].dynamics);
			return true;
		}
		dynsel.html(frames[iter].dynamics);
		dynsel.fadeIn(frames[iter].times[0],"swing",function(){
			if(frames[iter].times[1]==-1){
				if(target==2)
					projectsFadeIn();
				return true;
			}
			if($(sel).css("display")=="none"){//if user has moved to next slide
				dynsel.html(frames[0].dynamics);
				return true;
			}
			setTimeout(function(){
				dynsel.fadeOut(frames[iter].times[2],"swing",function(){
					if($(sel).css("display")=="none"){//if user has moved to next slide
						dynsel.html(frames[0].dynamics);
						return true;
					}
					return newFade(iter+1);
				})
			},frames[iter].times[1]);
		})
	};
	var xz = ($(".proj1").css("opacity"));
	console.log(xz);
	if(!(target==2&& $(".proj1").css("opacity") == 1))
		newFade(0);
	console.log(currentDotWorld.hasOwnProperty("slide"));
	if(currentDotWorld.hasOwnProperty("slide")){
		currentDotWorld.selfDestruct();
	}
	if(target==0||target==1){
		currentDotWorld = new dotWorld($(sel),worldCounter);
		worldCounter++;
	}
}




var sections = $("#section-container section").size();

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
			$("#section-container section").eq(i).css("display","block");
			$("ul.nav li").eq(i).addClass("active");
		}
		else{
			$("#section-container section").eq(i).css("display","none");
			$("ul.nav li").eq(i).removeClass("active");
		}
	}
	animateSection(target);
}

	var scontain = document.getElementById("section-container");

	Hammer(scontain).on("swipeleft",function(){
		nextSlide();
	});

	Hammer(scontain).on("swiperight",function(){
		prevSlide();
	});

	Hammer(scontain).on("swipedown",function(){
		nextSlide();
	});

	Hammer(scontain).on("swipeup",function(){
		prevSlide();
	});

changeSection(0);

var nextSlide = function(){
	var thisSlide = $("ul.nav li.active").data("position");
	if(thisSlide+1>=sections)//don't change if last slide
		return;
	changeSection(thisSlide+1);
}
var prevSlide = function(){
	var thisSlide = $("ul.nav li.active").data("position");
	if(thisSlide-1<0)
		return;
	changeSection(thisSlide-1);
}
document.body.addEventListener("wheel",function(event){
	if(event.deltaY>0||event.deltaX>0)
		nextSlide();
	else if(event.deltaY<0||event.deltaX<0)
		prevSlide();
});




var checkKey = function(e){
	e = e || window.event;
	e = e.keyCode;
	if(e==37||e==38){
		prevSlide();
	}
	else if(e==39||e==40){
		nextSlide();
	}
}

document.onkeydown = checkKey;


});//end document ready