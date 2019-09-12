$( document ).ready(function() {
	var swiper = new Swiper('.swiper-container.carousel', {
		autoplay:3000,
        pagination: '.carousel-pagination',
        paginationClickable: true,
        spaceBetween: 30,
		effect: 'fade',
		loop: true,
    });
	var swiper2 = new Swiper('.swiper-container.carousel_gioithieu', {
        autoplay:3000,
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
		//effect: 'fade',
		loop: true,
    });
	var swiper3 = new Swiper('.swiper-container.carousel_thethao', {
        autoplay:5000,
		effect: 'fade',
		loop: true,
    });
	var swiper4 = new Swiper('.swiper-container.carousel_truyenhinh', {
        autoplay:5000,
		effect: 'fade',
		loop: true,
    });
	var swiper5 = new Swiper('.swiper-container.carousel_game_show', {
        autoplay:5000,
		effect: 'fade',
		loop: true,
    });
	var swiper6 = new Swiper('.swiper-container.carousel_sukien', {
        autoplay:5000,
		effect: 'fade',
		loop: true,
    });
	var swiper7 = new Swiper('.swiper-container.carousel_phimtruyen', {
        autoplay:5000,
		effect: 'fade',
		loop: true,
    });
});
