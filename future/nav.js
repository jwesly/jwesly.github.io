var sections = $(".section-container section").size();
console.log("Sections: ",sections);
for(i=0;i<sections;i++){
	var item = $("<li></li>").data("position",i).click(function(){
		changeSection($(this).data("position"));
	}).append($("<span></span>"));
	$("ul.nav").append(item);
}
var x = "<img src='checkbox32.png'></img>";

var changeSection = function(target){
	//console.log(target);
	for(i=0;i<sections;i++){
		if(i==target){
			$(".section-container section").eq(i).css("display","block");
			$("ul.nav li").eq(i).addClass("active");
		}
		else{
			$(".section-container section").eq(i).css("display","none");
			$("ul.nav li").eq(i).removeClass("active");
		}
	}
}

changeSection(0);

document.body.addEventListener("wheel",function(event){
	if(event.deltaY>0){
		var target = ($("ul.nav li.active").data("position")+1)%sections;
		//alert(target);
		changeSection(target);
	}
	else if(event.deltaY<0){
		var target = ($("ul.nav li.active").data("position")-1)%sections;
		//alert(target);
		changeSection(target);
	}
})