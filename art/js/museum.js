/***************************
A museum has a:
title
description
background
	the uri of the image

TODO
	Figure out if image dimension code makes you reload the image

***************************/

var screenRatio;
var getScreenSize = function(){

	console.log("resizing",$(document).width(),$(document).height());
	screenRatio = $(document).width()/$(document).height();
}

getScreenSize();
$(window).resize(function(){
	
	getScreenSize();
	displayEx(Number($("html").data("slide")),Number($("html").data("down")));
});

var museum;

function Exhibit(title,description,background_image){
	this.title = title;
	this.description = description;
	this.background = background_image;
}

function loadExhibits(array){
	museum = array;
}

var leftMove = function(){
	var target = Number($("html").data("slide"))-1;
	displayEx(((target%museum.length)+museum.length)%museum.length,0);
}
var rightMove = function(){
	var target = Number($("html").data("slide"))+1;
	displayEx(target%museum.length,0)
}
var downMove = function(){
	var dTarget = Number($("html").data("down"))+1;
	var slide = Number($("html").data("slide"));
	//don't wrap around or go out of bounds
	if(dTarget>=(museum[slide].length-1))
		dTarget = museum[slide].length - 1;

	displayEx(slide,dTarget);
}
var upMove = function(){
	var dTarget = Number($("html").data("down"))-1;
	var slide = Number($("html").data("slide"));
	if(dTarget<0)
		dTarget = 0;
	displayEx(slide,dTarget);
}

$("html").keydown(function(e){
	switch(e.keyCode){
		case 37://left
			leftMove();
			break;
		case 38:
			upMove();
			break;
		case 39:
			rightMove();
			break;
		case 40:
			downMove();
	}

});
$("#right").click(rightMove);
$("#left").click(leftMove);
$("#down").click(downMove);


var displayEx = function(i,j){
	if(j===undefined)//default j to 0
		j = 0;
	var thisSlide = museum[i][j];
	$("html").data("slide",i);
	$("html").data("down",j);
	$("#exInfo").hide();
	$("title").html(thisSlide.title);
	$("#exTitle").html(thisSlide.title);
	$("#exInfo").html(thisSlide.description);

	$("html").css("background-image","url(" + thisSlide.background + ")");

	//sketchy code from stackoverflow
	var image_url = $('html').css('background-image').match(/^url\("?(.+?)"?\)$/);
	if (image_url[1]) {
		image_url = image_url[1];
		var image = new Image();
		// just in case it is not already loaded
		$(image).load(function () {
			//console.log(image.width, image.height);
			console.log(image.width/image.height,screenRatio)
			if(image.width/image.height  < screenRatio)
				$("html").css("background-size", "auto 100%");
			else
				$("html").css("background-size", "100% auto");
		});
		image.src = image_url;
	}

	
}

function initialize(){
	$(function(){
		displayEx(0);
		$(".toggleInfo").click(function(){
			$("#exInfo").toggle();
		});
	});
}
