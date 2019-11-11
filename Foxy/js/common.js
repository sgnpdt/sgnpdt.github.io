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
	
	
	
	
	$('.navbar-toggle').click(function() {
		$('.div_login_signup').removeClass("Show");
	});
	
	$('.modal').on('shown.bs.modal', function (e) {
	    $('.navbar-toggler').addClass("collapsed");
		$('.navbar-collapse').removeClass("show");
		
	});
	
	$('#Showregister').on('shown.bs.modal', function (e) {
		$(this).modal({backdrop: 'static', keyboard: false});
	});
	
	var promise = document.querySelector('video').play();

	if (promise !== undefined) {
	  promise.then(_ => {
		// Autoplay started!
	  }).catch(error => {
		// Autoplay was prevented.
		// Show a "Play" button so that user can start playback.
	  });
	}
	$('.icon_play').click(function() {
		//$('.clip_tvc').get(0).play();
		//$('.icon_play').hide();
		
		var video = $(".clip_tvc").get(0);

		if ( video.paused ) {
			video.play();
			$(".icon_play").hide();
			
		} else {
			video.pause();
			$(".icon_play").show();
			
		}

		return false;
	});
	
	$(".clip_tvc").on('pause', function() {
	  $(".icon_play").show();
	});
	
});
