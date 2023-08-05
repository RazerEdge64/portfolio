// JavaScript Document

$(window).load(function () {
    "use strict";
    // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });
})

$(document).ready(function () {
    "use strict";

    // scroll menu
    var sections = $('.section'),
        nav = $('.navbar-fixed-top,footer'),
        nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height + 2
        }, 600);

        return false;
    });


    // Menu opacity
    if ($(window).scrollTop() > 80) {
        $(".navbar-fixed-top").addClass("bg-nav");
    } else {
        $(".navbar-fixed-top").removeClass("bg-nav");
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() > 80) {
            $(".navbar-fixed-top").addClass("bg-nav");
        } else {
            $(".navbar-fixed-top").removeClass("bg-nav");
        }
    });



    // Parallax
    var parallax = function () {
        $(window).stellar();
    };

    $(function () {
        parallax();
    });

    // AOS
    AOS.init({
        duration: 1200,
        once: true,
        disable: 'mobile'
    });

    //  isotope
    $('#projects').waitForImages(function () {
        var $container = $('.portfolio_container');
        $container.isotope({
            filter: '*',
        });

        $('.portfolio_filter a').click(function () {
            $('.portfolio_filter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    animationEngine: "jquery"
                }
            });
            return false;
        });

    });

    //animatedModal
    $("#demo01,#demo02,#demo03,#demo04,#demo05,#demo06,#demo07,#demo08,#demo09").animatedModal();

    // Contact Form 	

    // validate contact form
    $('#contact-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true
            },
            phone: {
                required: false
            },
            message: {
                required: true
            }
        },
        messages: {
            name: {
                required: "This field is required",
                minlength: "Your name must consist of at least 2 characters"
            },
            email: {
                required: "This field is required"
            },
            message: {
                required: "This field is required"
            }
        },
        submitHandler: function (form) {
            var templateParams = $(form).serialize();

            var formData = parseFormData(templateParams);


            // Your EmailJS user ID and template ID

            // Your EmailJS service ID, template ID, and public key
            var emailJsServiceId = 'service_4znm4x6';
            var emailJsTemplateId = 'template_r0xfjyk';
            var emailJsPublicKey = 'JPRBW2J3CI51-OiRx'; // Include the public key here

            // Send the email using EmailJS
            emailjs.send(emailJsServiceId, emailJsTemplateId, formData, emailJsPublicKey)
                .then(function(response) {
                    // Email sent successfully
                    $('#contact :input').attr('disabled', 'disabled');
                    $('#contact').fadeTo("slow", 1, function () {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find('label').css('cursor', 'default');
                        $('#success').fadeIn();
                    });
                }, function(error) {
                    // Error sending email
                    $('#contact').fadeTo("slow", 1, function () {
                        $('#error').fadeIn();
                    });
                });

        }
    });

    function parseFormData(template_params) {
        var formData = {};
        var params = template_params.split('&');

        for (var i = 0; i < params.length; i++) {
            var keyValue = params[i].split('=');
            var key = decodeURIComponent(keyValue[0]);
            var value = decodeURIComponent(keyValue[1].replace(/\+/g, ' ')); // Replace + with spaces
            formData[key] = value;
        }

        return formData;
    }



});