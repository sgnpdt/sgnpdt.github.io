$( document ).ready(function() {
	var navMain = $(".navbar-collapse"); // avoid dependency on #id
     // "a:not([data-toggle])" - to avoid issues caused
     // when you have dropdown inside navbar
     navMain.on("click", "a:not([data-toggle])", null, function () {
         navMain.collapse('hide');
     });
	
	$('#submit-info').on('submit', function(e){
	  $('#Showregister').modal('hide');
      $('#Showthank').modal('show');
      e.preventDefault();
  	});
	
	function randomString(length) {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = length; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }

        return result;
    }
	
	var myFullpage = new fullpage('#fullpage', {
		menu: '#menu',
		anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage'],
        normalScrollElements: '.scrollable-element',
		// Section navigation and indicator
		navigation: true,
		navigationPosition: 'left',
		licenseKey: 'P9722JYT-' + randomString(8) + '-M11QX8RJ-' + randomString(8)
    });
	
	if($(".btn-top").length){
		$(window).scroll(function () {
			var e = $(window).scrollTop();
			if (e > 300) {
				$(".btn-top").fadeIn(400);
			} else {
				$(".btn-top").fadeOut(400);
			}
		});
		$(".btn-top").click(function () {
			$('body,html').animate({
				scrollTop: 0
			});
		});
	}		
	
	
	if($('.show_search').length){
		$(".show_search").click(function() {
            $('.div_cart_gr').removeClass("Show");
            $('.div_login_signup').removeClass("Show");
			if($('.div_input_search').hasClass("Show")){
				$('.div_input_search').removeClass("Show");
				
			}
			else{
			    $('.div_input_search').addClass("Show");
			    $('#searchKeyword').focus();
				
			}
		});
		$(".close_search").click(function() {
			$('.div_input_search').removeClass("Show");
			
		});
	}
	
	if($('.ico_cart').length){
		$(".ico_cart").click(function() {
            $('.div_input_search').removeClass("Show");
            $('.div_login_signup').removeClass("Show");
			if($('.div_cart_gr').hasClass("Show")){
				$('.div_cart_gr').removeClass("Show");
			}
			else{
				$('.div_cart_gr').addClass("Show");				
			}
			
		});
	}
	
    if($('.ico_avatar').length){
		$('.div_login_signup').removeClass("Show");
		$(".ico_avatar").click(function() {
            $('.div_input_search').removeClass("Show");
            $('.div_cart_gr').removeClass("Show");
			if($('.div_login_signup').hasClass("Show")){

				$('.div_login_signup').removeClass("Show");
				
			}
			else{
				$('.div_login_signup').addClass("Show");
				
			}
			
		});
	}
	
	$('.navbar-toggle').click(function() {
		$('.div_login_signup').removeClass("Show");
	});
	
	
	var scroll = $(window).scrollTop();
	if (scroll >= 24) {
		$(".HeaderNav").addClass("scaleheader");
	}
	$(window).scroll(function() {    
		var scroll = $(window).scrollTop();
		if (scroll >= 24) {
			$(".HeaderNav").addClass("scaleheader");
		}
		else{$(".HeaderNav").removeClass("scaleheader");}
	});
	
	
});
