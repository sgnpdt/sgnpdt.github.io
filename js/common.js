$( document ).ready(function() {
	
	
	$(".clearable").each(function() {
  
	  var $inp = $(this).find("input"),
		  $cle = $(this).find(".clearable__clear");

	  $inp.on("input", function(){
		$cle.toggle(!!this.value);
	  });

	  $cle.on("touchstart click", function(e) {
		e.preventDefault();
		$inp.val("").trigger("input");
	  });

	});
	
	//Show pass
	$(".show_pass").click(function() {
		if ($(this).hasClass("hidden") === false){
			$(this).parents('.group_form_null ').find(".input_mk").attr("type","text");
	  		$(this).addClass("hidden");
		}
		else{
			$(this).parents('.group_form_null ').find(".input_mk").attr("type","password");
	  		$(this).removeClass("hidden");
		}
	});
	
	
//	$( ".show_pass" )
//	  .mouseup(function() {
//		$(this).parents('.group_form_null ').find(".input_mk").attr("type","password");
//	  })
//	  .mousedown(function() {
//		$(this).parents('.group_form_null ').find(".input_mk").attr("type","text");
//    });

	//OTP input
	//function processInput(holder){
//		var elements = holder.children(), //taking the "kids" of the parent
//				str = ""; //unnecesary || added for some future mods
//
//		elements.each(function(e){ //iterates through each element
//			var val = $(this).val().replace(/\D/,""), //taking the value and parsing it. Returns string without changing the value.
//					focused = $(this).is(":focus"), //checks if the current element in the iteration is focused
//					
//					parseGate = false;
//			
//			var clear = $("#inputs input");
//			val.length==1?parseGate=false:parseGate=true; 
//				/*a fix that doesn't allow the cursor to jump 
//				to another field even if input was parsed 
//				and nothing was added to the input*/
//
//			$(this).val(val); //applying parsed value.
//			
//			if(parseGate&&val.length>1){ //Takes you to another input
//				var	exist = elements[e+1]?true:false; //checks if there is input ahead
//				
//				exist&&val[1]?( //if so then
//					elements[e+1].disabled=false,
//					elements[e+1].value=val[1], //sends the last character to the next input
//					elements[e].value=val[0], //clears the last character of this input
//					
//					elements[e+1].focus(), //sends the focus to the next input
//					elements[e+1].classList.add("focused")
//				):void 0;
//			} else if(parseGate&&focused&&val.length==0){ //if the input was REMOVING the character, then
//				
//				var exist = elements[e-1]?true:false; //checks if there is an input before
//				if(exist) elements[e-1].focus(); //sends the focus back to the previous input
//				elements[e].classList.remove("focused");
//				if(e==0){
//					elements[0].classList.add("focused");
//				}
//			}
//
//			val==""?str+=" ":str+=val;
//		});
//	}
//
//	$("#inputs").on('input', function(){processInput($(this))}); //still wonder how it worked out. But we are adding input listener to the parent... (omg, jquery is so smart...);
//
//	$("#inputs").on('click', function(e) { //making so that if human focuses on the wrong input (not first) it will move the focus to a first empty one.
//		var els = $(this).children(),
//				str = "";
//		els.each(function(e){
//			var focus = $(this).is(":focus");
//			$this = $(this);
//			while($this.prev().val()==""){
//				$this.prev().focus();
//				$this = $this.prev();
//			}
//		})
//	});
    
	//
	$(".btn_edit_profile").click(function() {
		$("body").addClass('editmode');
	});
	
	$(".btn_un_editmode").click(function() {
		$("body").removeClass('editmode');
	});
	
	//Hidden backgroud when show keyboard
	var _originalSize = $(window).width() + $(window).height();
	$(window).resize(function(){
		if($(window).width() + $(window).height() != _originalSize){
		  $("body").css("background-size","0");  
		}else{
		  $("body").css("background-size","contain");  
		}
		
	});
	
	//disable jump ios
	$( "#inputs input" ).focus(function() {
		$('body').addClass('fixfixed');
	});
	
	//
	//$( "#inputs input" ).focus(function(evt) {
//		var i;
//		let prev = $( "#pin-0").val();
//		//console.log("prev ", prev);
//		for(i = 5; i >= 0; i--) {	
//			prev = $( "#" + "pin-" + i).val();
//			console.log("prev ", prev);
//			break;
//			
//			//if(!(prev === "" || typeof(prev) === "undefined")) {
////				//console.log("focus ", i + 1, prev);				
////
////				$( "#" + "pin-" + i + 1).focus();
////				break;
////			}
//			//if(prev === 0){
////				
////				$( "#pin-0").focus();
////				break;
////			}
//		}
//		//console.log("check prev ", i);
//		//evt.preventDefault();
////		return false;
//		
//	  $('body').addClass('fixfixed');
//	});
	
	//$( "#inputs input" ).on('backFocus', function (evt) {		
//		console.log("focus on " + evt.target.id, evt);
//		let curr = parseInt(evt.target.id.substr('pin-'.length));
//		$('#pin-' + curr).val("");
//		$('#pin-' + curr).trigger('focus', $.Event('focus'));
//	});
//	
//	
//       
//	$( "#inputs input" ).focus(function (evt,) {
//		let curr = parseInt(evt.target.id.substr('pin-'.length));
//		let found = false;
//		for (let i = 5; i >= 0; i--) {
//			let digit = $('#pin-' + i).val().trim();
//			//console.log(i + " = " + digit);
//			if(digit !== '') {
//				found = i + 1;
//				break;
//			}
//		}
//		
//		if(found !== false && found !== curr) {
//			//console.log("found to focus " + found);
//			$(evt.target).blur();
//			evt.stopPropagation();
//			$('#pin-' + found).trigger('focus', $.Event('focus'));
//		}
//		
//	});
    $('#pin-0').focus();
	
    //set height  html 
    $('html').css("height",$(window).height());
	$('body').css("height",($(window).height() - 56)); 
	
	//auto close popup
	//setTimeout(function() {$('#ShowThanhCong').modal('hide');}, 2000);
	
	
	
	//Pin
	if($("#inputs input").length > 0){
		$("#inputs input").jqueryPincodeAutotab();
	}

	//auto focus OTP
	//setTimeout(function() {$('.focused').focus();}, 1000);
	
	

	
});
