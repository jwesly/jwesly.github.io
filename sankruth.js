var cheerio = require('cheerio'), request = require('request');

var poll = "https://polldaddy.com/poll/9081802";
request(poll,function(err,response,body){
	var $ = cheerio.load(body);
	var A;
    var H;
    if (D.pageX) {
        A = D.pageX;
        H = D.pageY
    } else {
        A = D.clientX;
        H = D.clientY
    }
    log([A, H]);
    if (A == 0 && H == 0) {
        return false
    }
    var F = $(".vote-button").data("vote");
    log(F);
    var G = "41337729";
    var E = "";
    var C = "PDjs_poll_" + F.id + (F.v > 0 ? "_" + F.v : "");
    log(C);
    /*for (i = 0; i < document.formPoll.elements.length; i++) {
        if (document.formPoll.elements[i].type == "checkbox" || document.formPoll.elements[i].type == "radio") {
            if (document.formPoll.elements[i].checked) {
                G += document.formPoll.elements[i].value + ","
            }
        }
    }*/
    var G = "41337729,";//sanka's id
 	var B = 1
    } if (parseInt(F.o) == 1) {
        E = _$("PDI_OtherText").value
    }
    if (typeof document.formPoll.tags != "undefined") {
        tags = "&tags=" + urlEncode(document.formPoll.tags.value)
    } else {
        tags = ""
    }
	url = poll+"/vote.php?va=" + F.at + tags + "&pt=" + F.m + "&r=" + F.b + "&p=" + F.id + "&a=" + urlEncode(G) + "&o=" + urlEncode(E) + "&t=" + F.t + "&token=" + F.n + "&pz=" + B;
	request(url);
});