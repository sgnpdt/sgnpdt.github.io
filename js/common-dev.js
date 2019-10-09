$(document).ready(function () {

    // Save previous URL to cookie
    const guidePage = 'v2_huong_dan_v2.html';
    const linkPage = 'v2_tv_link_code.html';

    let previousUrl = '';
    if (window.location.href.indexOf(linkPage) !== -1 || window.location.href.indexOf(guidePage) !== -1) {
        // Get previous URL
        previousUrl = $.cookie('previousUrl') || '';
        $.cookie('previousUrl', window.location.pathname);
    }

    function randomString(length) {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = length; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }

        return result;
    }

    // Fullpage init
    if ($('#fullpage').length > 0) {
        const fp = new fullpage('#fullpage', {
            menu: '#menu',
            anchors: ['page-1', 'page-2', 'page-3', 'page-4', 'page-5'],
            // Whether to use the "automatic" scrolling or the "normal" one.
            // It also has affects the way the sections fit in the browser/device window
            // in tablets and mobile phones. (true = "automatic" scrolling)
            // (default true)
            autoScrolling: true,
            // Speed in milliseconds for the scrolling transitions.
            // (default 700)
            scrollingSpeed: 700,
            // Whether or not to fit sections to the viewport or not.
            // When set to true the current active section will always fill the whole viewport.
            // Otherwise the user will be free to stop in the middle of a section.
            // (default true)
            fitToSection: true,
            // If fitToSection is set to true, this delays the fitting by the configured milliseconds.
            // (default 1000)
            fitToSectionDelay: 600,
            // Determines whether to use scrollbar for the site or not. In case of using scroll bar,
            // the autoScrolling functionality will still work as expected.
            // (default false)
            scrollBar: false,
            // Whether or not to create a scroll for the section/slide in case its
            // content is bigger than the height of it.
            // (default false)
            scrollOverflow: false,
            easing: 'easeInOutCubic',
            // Section navigation and indicator
            navigation: true,
            navigationPosition: 'right',
            // Make a random
            licenseKey: 'P9722JYT-' + randomString(8) + '-M11QX8RJ-' + randomString(8),
            // EXTENSIONS
            // Enables or disables the dragging and flicking of sections and slides by using mouse or fingers.
            // (default false)
            //dragAndMove: true,
        });

        // Prevent click navigation, disable anchor click
        // var nav = $('#fp-nav');
        // var anchors = $('#menu a');
        // nav.css('display', 'inline');
        // anchors.css('pointer-events', '');
        //
        // document.addEventListener('scroll', function () {
        //     nav.css('display', 'none');
        //     anchors.css('pointer-events', 'none');
        //
        //     // Disable for 600ms
        //     setTimeout(function () {
        //         nav.css('display', 'inline');
        //         anchors.css('pointer-events', '');
        //     }, 1500);
        // });

        // This page must be the guide page
        if (window.location.href.indexOf(guidePage) !== -1) {
            // Contains hashtag and previous page must be link page
            if (window.location.hash.indexOf('#page-') !== -1 && previousUrl.indexOf(linkPage) !== -1) {
                history.replaceState({}, document.title, location.pathname);

                // Reset?
                previousUrl = '';

                // Scroll to top
                fp.moveTo('page-1');
            }
        }
    }

    $('.clearable').each(function () {
        var inp = $(this).find('input'),
            cle = $(this).find('.clearable__clear');

        inp.on('input', function () {
            cle.toggle(!!this.value);
        });

        cle.on('touchstart click', function (e) {
            e.preventDefault();
            inp.val('').trigger('input');
        });
    });

    // Toogle password visible, eye-open/eye-close
    $('.show_pass').click(function () {
        if ($(this).hasClass('hidden') === false) {
            $(this).parents('.group_form_null ').find('.input_mk').attr('type', 'text');
            $(this).addClass('hidden');
        } else {
            $(this).parents('.group_form_null ').find('.input_mk').attr('type', 'password');
            $(this).removeClass('hidden');
        }
    });

    $('.show_pass').mouseup(function () {
        $(this).parents('.group_form_null ').find('.input_mk').attr('type', 'password');
    }).mousedown(function () {
        $(this).parents('.group_form_null ').find('.input_mk').attr('type', 'text');
    });

    // Password complexity indicator
    $('.div_input_pos_signup .input_mk').on('keyup change', function (evt) {
        var val = $(evt.target).val();
        var result = {
            verified: false,
            rules: {
                len: false,
                lower_case: false,
                upper_case: false,
                number: false,
                special_chars: false
            }
        };

        if (val === '') {
            $('.password-indicator').addClass('password-empty');
            $('.password-indicator-verified').removeClass('password-indicator-verified');
            return;
        } else {
            $('.password-indicator').removeClass('password-empty');
        }

        var rules = result.rules;
        rules.len = val.length >= 6 && val.length <= 20;

        rules.lower_case = /[a-z]/.test(val);
        rules.upper_case = /[A-Z]/.test(val);
        rules.number = /[0-9]/.test(val);
        rules.special_chars = /[^a-zA-Z0-9]/.test(val);

        // Update the text indicator
        if (rules.len) {
            $('.div_input_pos_signup .password-indicator-length').addClass('password-indicator-verified');
        } else {
            $('.div_input_pos_signup .password-indicator-length').removeClass('password-indicator-verified');
        }

        var count = 0;
        if (rules.lower_case) {
            count++;
            $('.div_input_pos_signup .password-indicator-lower-case').addClass('password-indicator-verified');
        } else {
            $('.div_input_pos_signup .password-indicator-lower-case').removeClass('password-indicator-verified');
        }

        if (rules.upper_case) {
            count++;
            $('.div_input_pos_signup .password-indicator-upper-case').addClass('password-indicator-verified');
        } else {
            $('.div_input_pos_signup .password-indicator-upper-case').removeClass('password-indicator-verified');
        }

        if (rules.number) {
            count++;
            $('.div_input_pos_signup .password-indicator-number').addClass('password-indicator-verified');
        } else {
            $('.div_input_pos_signup .password-indicator-number').removeClass('password-indicator-verified');
        }

        if (rules.special_chars) {
            count++;
            $('.div_input_pos_signup .password-indicator-special-chars').addClass('password-indicator-verified');
        } else {
            $('.div_input_pos_signup .password-indicator-special-chars').removeClass('password-indicator-verified');
        }

        rules.complexity = count >= 2;

        if (rules.complexity) {
            $('.div_input_pos_signup .password-indicator-complexity').addClass('password-indicator-verified');
        } else {
            $('.div_input_pos_signup .password-indicator-complexity').removeClass('password-indicator-verified');
        }

        // Update the password strength meter
        result.verified = rules.len && rules.complexity;

        return result;
    });

    //
    $('.btn_edit_profile').click(function () {
        $('body').addClass('edit_mode');
    });

    $('.btn_un_edit_mode').click(function () {
        $('body').removeClass('edit_mode');
    });

    // Hidden background when show keyboard
    var sz = $(window).width() + $(window).height();
    $(window).resize(function () {
        if ($(window).width() + $(window).height() !== sz) {
            $('body').css('background-size', '0');
        } else {
            $('body').css('background-size', 'contain');
        }

        //$('.bg_OTP').css('height', $(window).height());
    });

    // Set height of HTML tag
    $('html').css('height', $(window).height());

    //Resize
    $(window).resize(function () {
        $('html').css('height', $(window).height());
    });

    $('body.bg_OTP').css('height', ($(window).height() - 150));

    // PIN
    if ($('.inputs .pin').length > 0) {
        $('.inputs .pin').jqueryPincodeAutotab();
    }

    // Show soft-keyboard?
    // The script that calls focus() click() on an input needs
    // to be running with user context, ie. triggered by a user interaction.

    $('#ShowLoading').on('show.bs.modal', function (e) {
        setTimeout(function () {
            $('.btn_refesh').show();
        }, 5000);
    });

});
