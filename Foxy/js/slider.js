$( document ).ready(function() {

	var swiper1 = new Swiper('.swiper-container.swiper_phanmem_sp', {
		pagination: '.swiper-pagination-phanmem_sp',
        paginationClickable: true,
        slidesPerView: 1,
		nextButton: '.swiper-button-next-phanmem_sp',
        prevButton: '.swiper-button-prev-phanmem_sp',
	
        
		
        breakpoints: {
            1024: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 8
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        }
    });
	var swiper2 = new Swiper('.swiper-container.swiper_canhan', {
		pagination: '.swiper-pagination-canhan',
        paginationClickable: true,
        slidesPerView: 1,
		nextButton: '.swiper-button-next-canhan',
        prevButton: '.swiper-button-prev-canhan',
		effect: 'fade',
        autoplay:4000,
		loop: true,
        breakpoints: {
            1024: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 8
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        }
    });
});
