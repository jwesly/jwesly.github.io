/***************************
A museum has a:
title
description
background
	the uri of the image

***************************/
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
	displayEx(((target%museum.length)+museum.length)%museum.length);
}
var rightMove = function(){
	var target = Number($("html").data("slide"))+1;
	displayEx(target%museum.length)
}

$("html").keydown(function(e){
		if(e.keyCode==37)
			leftMove();
		else if(e.keyCode==39)
			rightMove();
});
$("#right").click(rightMove);
$("#left").click(leftMove);



var displayEx = function(i){
	$("html").data("slide",i)
	$("#exInfo").hide();
	$("html").css("background-image","url(" + museum[i].background + ")");
	$("title").html(museum[i].title);
	$("#exTitle").html(museum[i].title);
	$("#exInfo").html(museum[i].description);
}

function initialize(){
	$(function(){
		displayEx(0);
		$(".toggleInfo").click(function(){
			$("#exInfo").toggle();
		});
	});
}
