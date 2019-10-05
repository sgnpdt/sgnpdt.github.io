$( document ).ready(function() {

	var swiper1 = new Swiper('.swiper-container.swiper_phanmem_sp', {

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
	var swiper3 = new Swiper('.swiper-container.swiper_logo_cty', {
		
        paginationClickable: true,
        slidesPerView: 5,
		nextButton: '.swiper-button-next-logo_cty',
        prevButton: '.swiper-button-prev-logo_cty',
		autoplay:400000,
        spaceBetween: 0,
		loop: true,
        breakpoints: {
            1024: {
                slidesPerView: 5,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 8
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 0
            },
            320: {
                slidesPerView: 2,
                spaceBetween: 0
            }
        }
    });
	var swiper4 = new Swiper('.swiper-container.swiper_comment_cty', {
		pagination: '.swiper-pagination-comment_cty',
        paginationClickable: true,
        slidesPerView: 1,

		autoplay:400000,
        spaceBetween: 0,
		loop: true,
        breakpoints: {
            1024: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 0
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
