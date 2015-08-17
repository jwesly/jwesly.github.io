/*****************************************************
TODO List
	Pictures/Information about my Projects
	Better Mobile Site
	Better JS organization

*****************************************************/
$(document).ready(function(){

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

messagez.push([new wordFrame("","What Have I Done?",[0,750,750])
	,new wordFrame("","Take a Look",endTimez)
]);


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
			if(frames[iter].times[1]==-1)
				return true;
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
	newFade(0);
	if(target==0||target==1)
		var world = new dotWorld($(sel));
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
	var target = ($("ul.nav li.active").data("position")+1)%sections;
	changeSection(target);
}
var prevSlide = function(){
	var target = (($("ul.nav li.active").data("position")-1)%sections+sections)%sections;
	changeSection(target);
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