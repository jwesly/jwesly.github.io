
var museum;

function Exhibit(title,description,background_image){
	this.title = title;
	this.description = description;
	this.background = background_image;
	this.check = function(){return "exhibit_confirmed";}
}

function loadExhibits(array){
	for(var ex in array){
		if(array[ex].check()!="exhibit_confirmed")
		{
			console.log("Invalid Exhibit");
			return;
		}
	}
	museum = array;
}


function displayEx(i){
	$(function(){
		$("#exInfo").hide();
		$("html").css("background","url(" + museum[i].background + ") #2a2a2a no-repeat center center fixed");
		$("title").html(museum[i].title);
		$("#exTitle").html(museum[i].title);
		$("#exInfo").html(museum[i].description);
		$("#right").click(function(){
			displayEx((i+1)%museum.length);
		});
		$("#left").click(function(){
			console.log((i-1)%museum.length);
			displayEx((((i-1)%museum.length)+museum.length)%museum.length);
		});
		console.log("rendered!");
	});
}

function initialize(){
	displayEx(0);
	$(function(){
		$("#toggleInfo").click(function(){
			$("#exInfo").toggle();
		});
	});
}
