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
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
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

    function setPinFocus(input) {
        const isIos = !!window.navigator.userAgent.match(/iPad|iPhone/i);

        // Not work on Safari?
        if (isIos) {
            // 4ms is specified by the HTML5 spec
            setTimeout(function () {
                input.select(); // select first
                input.focus();
            }, 10);
        } else {
            input.focus();
        }
    }

    // OTP input
    function processInput(holder) {
        var elements = holder.children(), // taking the "kids" of the parent
            str = ''; //unnecesary || added for some future mods

        elements.each(function (evt) { // iterates through each element
            var val = $(this).val().replace(/\D/, ''); // taking the value and parsing it. Returns string without changing the value.
            var focused = $(this).is(':focus'); // checks if the current element in the iteration is focused
            var clear = $('#inputs input');
            var parseGate = val.length !== 1;
            /*
                a fix that doesn't allow the cursor to jump
                to another field even if input was parsed
                and nothing was added to the input
            */

            $(this).val(val); // applying parsed value.

            var exist; // checks if there is input
            if (parseGate && val.length > 1) {
                // takes you to another input
                exist = elements[evt + 1] ? true : false; // checks if there is input ahead

                if (exist && val[1]) {
                    // if so then
                    elements[evt + 1].disabled = false;
                    elements[evt + 1].value = val[1]; // sends the last character to the next input
                    elements[evt].value = val[0]; // clears the last character of this input


                    // NEED TO FOCUS HERE
                    //elements[e + 1].focus(); // sends the focus to the next input
                    setPinFocus(elements[evt + 1]);
                    elements[evt + 1].classList.add('focused');
                }
            } else if (parseGate && focused && val.length === 0) {
                // if the input was REMOVING the character, then

                exist = elements[evt - 1] ? true : false; // checks if there is an input before
                if (exist) {
                    elements[evt - 1].focus(); // sends the focus back to the previous input
                }

                elements[evt].classList.remove('focused');

                if (evt === 0) {
                    elements[0].classList.add('focused');
                }
            }

            val === '' ? str += ' ' : str += val;
        });
    }

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

    const pinLen = $('.inputs .pin').length;

    function setLog(msg) {
        //console.log(msg);
        if($('.pin-log')) {
            $('.pin-log').html(msg + '<br />' + $('.pin-log').html());
        }
    }

    // Process custom event pindel
    $('.inputs .pin').on('delpin', function (evt) {
        setLog('On delpin ' + evt.target.id + ' = "' + $(evt.target).val() + '"');

        $(evt.target).val('');
        if($(evt.target).val() !== '') {
            setLog('Cannot clear value ' + evt.target.id + ' = "' + $(evt.target).val() + '"');
            $(evt.target).attr('value', ''); // for sure
        }

        var curr = parseInt(evt.target.id.substr('pin-'.length));
        if (curr >= 0) {
            setLog('Focus #0 for PIN-' + curr);
            setPinFocus($(evt.target));
        }
    });

    // Always set focus on PIN inputs?
    // var alwaysFocus = false;
    // if (alwaysFocus) {
    //     $('.inputs .pin').blur(function (evt) {
    //         setLog('On blur ' + evt.target.id + ' = "' + $(evt.target).val() + '"');
    //         var curr = parseInt(evt.target.id.substr('pin-'.length));
    //
    //         // Check all PIN are empty
    //         if ($('#pin-0').val() === '') {
    //             evt.stopPropagation();
    //
    //             setLog('Focus #1 for PIN-' + 0);
    //             setPinFocus($('#pin-0'));
    //         } else {
    //             var last = false;
    //             for (var i = pinLen - 1; i >= 0; i--) {
    //                 var digit = $('#pin-' + i).val() || '';
    //                 if (digit !== '') {
    //                     last = i + 1;
    //                     last = last > (pinLen - 1) ? (pinLen - 1) : last;
    //                     break;
    //                 }
    //             }
    //
    //             if (last !== false) {
    //                 if (last !== curr) {
    //                     evt.stopPropagation();
    //                 }
    //
    //                 setLog('Focus #2 for PIN-' + last);
    //                 setPinFocus($('#pin-' + last));
    //             }
    //         }
    //     });
    // }

    $('.inputs .pin').focus(function (evt) {
        setLog('On focus ' + evt.target.id + ' = "' + $(evt.target).val() + '"');
        var curr = parseInt(evt.target.id.substr('pin-'.length));

        var last = false;
        for (var i = pinLen - 1; i >= 0; i--) {
            var digit = $('#pin-' + i).val() || '';
            if (digit !== '') {
                last = i + 1;
                last = last > (pinLen - 1) ? (pinLen - 1) : last;
                break;
            }
        }

        // Check all PIN are empty
        if ($('#pin-0').val() === '' && curr > 0) {
            setLog('Blur ' + evt.target.id, $(evt.target).val());
            //$(evt.target).blur();
            //evt.stopPropagation();

            if (last === false) {
                setLog('Focus #3 for PIN-' + 0);
                setPinFocus($('#pin-0'));
            } else {
                setLog('ERROR ' + evt.target.id, $(evt.target).val());
            }
        } else if (last !== false) {
            if (last !== curr) {
                //$(evt.target).blur();
                //evt.stopPropagation();

                setLog('Focus #4 for PIN-' + last);
                setPinFocus($('#pin-' + last));
            }
        }
    });

    $('#pin-' + (pinLen - 1)).on('keyup', function (evt) {
        setLog('On keyup ' + evt.target.id + ' = "' + $(evt.target).val() + '"');

        if ($('#pin-5').val() !== '') {
            setLog('Focus #5 for PIN-' + 0);

            // Set focus for PIN-0 if error, submit and clear all PIN
            $('.inputs .pin').val('');
            setPinFocus($('#pin-0'));
        }
    });

    // Set height of HTML tag
    $('html').css('height', $(window).height());

    //Resize
    $(window).resize(function () {
        $('html').css('height', $(window).height());
    });

    $('body.bg_OTP').css('height', ($(window).height() - 150));

    // PIN
    if (pinLen > 0) {
        $('.inputs .pin').jqueryPincodeAutotab();
    }

    // HTML5 autofocus attribute is not supported on iOS
    // https://caniuse.com/#feat=autofocus
    setLog('-- Auto focus STARTED --');
    setPinFocus($('#pin-0'));

    // Show soft-keyboard?
    // The script that calls focus() click() on an input needs
    // to be running with user context, ie. triggered by a user interaction.

    $('#ShowLoading').on('show.bs.modal', function (e) {
        setTimeout(function () {
            $('.btn_refesh').show();
        }, 5000);
    });

});