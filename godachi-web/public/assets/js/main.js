(function ($) {
	"use strict";

	// Sticky menu
	var $window = $(window);
	$window.on('scroll', function () {
		var scroll = $window.scrollTop();
		if (scroll < 300) {
			$(".sticky").removeClass("is-sticky");
		} else {
			$(".sticky").addClass("is-sticky");
		}
	});


	// tooltip active js
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})


	// Background Image JS start
	var bgSelector = $(".bg-img");
	bgSelector.each(function (index, elem) {
		var element = $(elem),
			bgSource = element.data('bg');
		element.css('background-image', 'url(' + bgSource + ')');
	});


	// Off Canvas Open close
	$(".mobile-menu-btn").on('click', function () {
		$("body").addClass('fix');
		$(".off-canvas-wrapper").addClass('open');
	});

	$(".btn-close-off-canvas,.off-canvas-overlay").on('click', function () {
		$("body").removeClass('fix');
		$(".off-canvas-wrapper").removeClass('open');
	});

	// offcanvas mobile menu
    var $offCanvasNav = $('.mobile-menu'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.dropdown');
    
    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i></i></span>');
    
    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();
    
    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .menu-expand', function(e) {
        var $this = $(this);
        if ( ($this?.parent()?.attr('class')?.match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand')) ) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length){
                $this.parent('li').removeClass('active');
                $this.siblings('ul').slideUp();
            } else {
                $this.parent('li').addClass('active');
                $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                $this.closest('li').siblings('li').find('ul:visible').slideUp();
                $this.siblings('ul').slideDown();
            }
        }
		else{
			//close nav
			$(".btn-close-off-canvas,.off-canvas-overlay").trigger("click")
		}
	});
	console.log("hello")
	console.log( document.getElementsByClassName('hero-slider-active'));
	
	// hero slider active js
	$('.hero-slider-active').slick({
		fade: true,
		speed: 1000,
		dots: false,
		autoplay: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="pe-7s-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="pe-7s-angle-right"></i></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
				arrows: false,
				dots: true
			}
		}]
	});
	
	// Hero main slider active js
    $('.hero-slider-active-4').slick({
		autoplay: true,
		speed: 1000,
        arrows: false,
        slidesToShow: 4,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
            }
        },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
					slidesToShow: 1,
					dots: true
                }
            }
        ]
    });


	// product carousel active js
	$('.product-carousel-4').slick({
		speed: 1000,
		autoplay: true,
		slidesToShow: 4,
		adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="pe-7s-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="pe-7s-angle-right"></i></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 3
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				arrows: false
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				arrows: false
			}
		}]
	});


	// product carousel active
	$('.product-carousel-4_2').slick({
		speed: 1000,
		slidesToShow: 4,
		autoplay: true,
		rows: 2,
		adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="pe-7s-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="pe-7s-angle-right"></i></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 3
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				arrows: false,
				rows: 1
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				arrows: false,
				rows: 1
			}
		}]
	});


	// product banner active js
	$('.product-banner-carousel').slick({
		autoplay: true,
		speed: 500,
		arrows: false,
		slidesToShow: 4,
		adaptiveHeight: true,
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 3
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1
			}
		}]
	});


	// group product carousel active
	$('.group-list-carousel').each(function () {
		var $this = $(this);
		var $arrowContainer = $(this).parent().siblings('.section-title-append').find('.slick-append');
		$this.slick({
			infinite: true,
			rows: 4,
			prevArrow: '<button type="button" class="slick-prev"><i class="pe-7s-angle-left"></i></button>',
			nextArrow: '<button type="button" class="slick-next"><i class="pe-7s-angle-right"></i></button>',
			appendArrows: $arrowContainer,
			responsive: [{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				}
			}]
		});
	});


	// blog carousel active start
	$('.group-list-carousel--3').slick({
		autoplay: true,
		speed: 1000,
		rows: 3,
		slidesToShow: 3,
		adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="pe-7s-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="pe-7s-angle-right"></i></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 768,
			settings: {
				arrows: false,
				slidesToShow: 1
			}
		}]
	});

	// blog carousel active start
	$('.blog-carousel-2').slick({
		speed: 1000,
		dots: true,
		arrows: false,
		autoplay: true,
	});


	// testimonial cariusel active js
	$('.testimonial-content-carousel').slick({
        arrows: false,
        asNavFor: '.testimonial-thumb-carousel'
    });


    // product details slider nav active
    $('.testimonial-thumb-carousel').slick({
        slidesToShow: 3,
        asNavFor: '.testimonial-content-carousel',
		centerMode: true,
		arrows: false,
        centerPadding: 0,
		focusOnSelect: true
	});


	// blog carousel active
	$('.blog-carousel-active').slick({
		autoplay: true,
		speed: 1000,
		slidesToShow: 3,
		adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="pe-7s-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="pe-7s-angle-right"></i></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 768,
			settings: {
				arrows: false,
				slidesToShow: 1
			}
		}]
	});


	//  Hot deals carousel active start
	$('.deals-carousel-active').slick({
		autoplay: true,
		speed: 1000,
		slidesToShow: 3,
		adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="pe-7s-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="pe-7s-angle-right"></i></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 768,
			settings: {
				arrows: false,
				slidesToShow: 2
			}
		},
		{
			breakpoint: 576,
			settings: {
				arrows: false,
				slidesToShow: 1
			}
		}]
	});

	//  Hot deals carousel active start
	$('.deals-carousel-active--two').slick({
		autoplay: true,
		speed: 1000,
		slidesToShow: 4,
		adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="pe-7s-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="pe-7s-angle-right"></i></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 768,
			settings: {
				arrows: false,
				slidesToShow: 2
			}
		},
		{
			breakpoint: 576,
			settings: {
				arrows: false,
				slidesToShow: 1
			}
		}]
	});


	// brand logo carousel active js
	$('.brand-logo-carousel').slick({
		speed: 1000,
		slidesToShow: 5,
		adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="pe-7s-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="pe-7s-angle-right"></i></button>',
		responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: 4
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 3,
				arrows: false
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				arrows: false
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				arrows: false
			}
		}]
	});

	// product details slider active
    $('.product-large-slider').slick({
        fade: true,
		arrows: false,
		speed: 1000,
        asNavFor: '.pro-nav'
    });


    // product details slider nav active
    $('.pro-nav').slick({
        slidesToShow: 4,
        asNavFor: '.product-large-slider',
		centerMode: true,
		speed: 1000,
        centerPadding: 0,
		focusOnSelect: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="lnr lnr-chevron-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="lnr lnr-chevron-right"></i></button>',
		responsive: [{
			breakpoint: 576,
			settings: {
				slidesToShow: 3,
			}
		}]
	});


	//nice select active start
	$('.nice-select').niceSelect();


	// Image zoom effect
	//$('.img-zoom').zoom();


	// offcanvas minicart button js
	$(".minicart-btn").on('click', function(){
		$("body").addClass('fix');
		$(".minicart-inner").addClass('show')
	})

	$(".offcanvas-close, .minicart-close,.offcanvas-overlay").on('click', function(){
		$("body").removeClass('fix');
		$(".minicart-inner").removeClass('show')
	})


	// Data countdown active js
	$('[data-countdown]').each(function () {
		var $this = $(this),
			finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function (event) {
			$this.html(event.strftime('<div class="single-countdown"><span class="single-countdown__time">%D</span><span class="single-countdown__text">Days</span></div><div class="single-countdown"><span class="single-countdown__time">%H</span><span class="single-countdown__text">Hours</span></div><div class="single-countdown"><span class="single-countdown__time">%M</span><span class="single-countdown__text">Mins</span></div><div class="single-countdown"><span class="single-countdown__time">%S</span><span class="single-countdown__text">Secs</span></div>'));
		});
	});

	// quantity change js
    $('.pro-qty').prepend('<span class="dec qtybtn">-</span>');
    $('.pro-qty').append('<span class="inc qtybtn">+</span>');
    $('.qtybtn').on('click', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
	});


	// product view mode change js
    $('.product-view-mode a').on('click', function (e) {
        e.preventDefault();
        var shopProductWrap = $('.shop-product-wrap');
        var viewMode = $(this).data('target');
        $('.product-view-mode a').removeClass('active');
        $(this).addClass('active');
        shopProductWrap.removeClass('grid-view list-view').addClass(viewMode);
	})
	
	
	// pricing filter
	var rangeSlider = $(".price-range"),
		amount = $("#amount"),
		minPrice = rangeSlider.data('min'),
		maxPrice = rangeSlider.data('max');
	rangeSlider.slider({
		range: true,
		min: minPrice,
		max: maxPrice,
		values: [minPrice, maxPrice],
		slide: function (event, ui) {
			amount.val("$" + ui.values[0] + " - $" + ui.values[1]);
		}
	});
	amount.val(" $" + rangeSlider.slider("values", 0) +
		" - $" + rangeSlider.slider("values", 1)
	);


	// Checkout Page accordion
    $("#create_pwd").on("change", function () {
        $(".account-create").slideToggle("100");
    });

    $("#ship_to_different").on("change", function () {
        $(".ship-to-different").slideToggle("100");
	});
	

    // Payment Method Accordion
    $('input[name="paymentmethod"]').on('click', function () {
		console.log("hiiiiiiiii")
        var $value = $(this).attr('value');
        $('.payment-method-details').slideUp();
        $('[data-method="' + $value + '"]').slideDown();
	});


	// Scroll to top active js
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 600) {
			$('.scroll-top').removeClass('not-visible');
		} else {
			$('.scroll-top').addClass('not-visible');
		}
	});
	$('.scroll-top').on('click', function (event) {
		$('html,body').animate({
			scrollTop: 0
		}, 1000);
	});
	

	// Search trigger js
	$(".search-trigger").on('click', function(){
		$(".header-search-box").toggleClass('search-box-open');
	})


	// Mail-chimp for dynamic newsletter
    $('#mc-form').ajaxChimp({
        language: 'en',
        callback: mailChimpResponse,
        // ADD YOUR MAILCHIMP URL BELOW HERE!
        url: 'https://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef'

    });

    // mail-chimp active js
    function mailChimpResponse(resp) {
        if (resp.result === 'success') {
            $('.mailchimp-success').html('' + resp.msg).fadeIn(900);
            $('.mailchimp-error').fadeOut(400);

        } else if (resp.result === 'error') {
            $('.mailchimp-error').html('' + resp.msg).fadeIn(900);
        }
	}

	// Instagram feed carousel active
	$('.instagram-carousel').slick({
		slidesToShow: 5,
		slidesToScroll: 2,
		autoplay: true,
		speed: 500,
		dots: false,
		arrows: false,
		responsive: [{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 4,
				}
			}
		]
	})


	/* init vertical carousel if thumb image length greater that 4 */
    if ($("#gallery_pdp a").length > 4) {
        $("#gallery_pdp a").css("margin", "0");
        $("#gallery_pdp").rcarousel({
            orientation: "horizontal",
            visible: 4,
            width: 105,
            height: 70,
            margin: 5,
            step: 1,
            speed: 500,
        });
        $("#ui-carousel-prev").show();
        $("#ui-carousel-next").show();
    }
    /* Init Product zoom */
    initZoom(500, 475);

    $("#ui-carousel-prev").click(function() {
        initZoom(500, 475);
    });

    $("#ui-carousel-next").click(function() {
        initZoom(500, 475);
    });

	var docWidth = $(document).width();
    if (docWidth > 769) {
        initZoom(500, 475);
    } else {
        $.removeData('#zoom_10', 'elevateZoom');
        $('.zoomContainer').remove();
        $('.zoomWindowContainer').remove();
        $("#zoom_10").elevateZoom({
            responsive: true,
            tint: false,
            tintColour: '#3c3c3c',
            tintOpacity: 0.5,
            easing: true,
            borderSize: 0,
            loadingIcon: "https://icodefy.com/Tools/iZoom/images/loading.GIF",
            zoomWindowPosition: "productInfoContainer",
            zoomWindowWidth: 330,
            gallery: 'gallery_pdp',
            galleryActiveClass: "active",
            zoomWindowFadeIn: 500,
            zoomWindowFadeOut: 500,
            lensFadeIn: 500,
            lensFadeOut: 500,
            cursor: "https://icodefy.com/Tools/iZoom/images/zoom-out.png",
        });
        
    }
	$("#zoom_10").fancybox();
})(jQuery);

function isDevice() {
    return ((/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())))
}

function initZoom(width, height) {
    $.removeData('#zoom_10', 'elevateZoom');
    $('.zoomContainer').remove();
    $('.zoomWindowContainer').remove();
    $("#zoom_10").elevateZoom({
        responsive: true,
        tint: true,
        tintColour: '#E84C3C',
        tintOpacity: 0.5,
        easing: true,
        borderSize: 0,
        lensSize: 100,
        constrainType: "height",
        loadingIcon: "https://icodefy.com/Tools/iZoom/images/loading.GIF",
        containLensZoom: false,
        zoomWindowPosition: 1,
        zoomWindowOffetx: 20,
        zoomWindowWidth: width,
        zoomWindowHeight: height,
        gallery: 'gallery_pdp',
        galleryActiveClass: "active",
        zoomWindowFadeIn: 500,
        zoomWindowFadeOut: 500,
        lensFadeIn: 500,
        lensFadeOut: 500,
        cursor: "https://icodefy.com/Tools/iZoom/images/zoom-out.png",
    });
}

$(document).ready(function() {
    
});

$(window).resize(function() {
    
})

$(document).ready(function() {
 
});

$('.priceBreakupSpan').on('click',function(){ 
	$(this).find('i').toggleClass('fa-plus fa-minus');
})
/* function googleTranslateElementInit() {
	new google.translate.TranslateElement(
		{
			pageLanguage: 'en',
			includedLanguages: 'en,hi',
		}
		, 'google_translate_element');
} */
