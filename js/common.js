$(document).ready(function () {

    $('.clearable').each(function () {
        var $inp = $(this).find('input'),
            $cle = $(this).find('.clearable__clear');

        $inp.on('input', function () {
            $cle.toggle(!!this.value);
        });

        $cle.on('touchstart click', function (e) {
            e.preventDefault();
            $inp.val('').trigger('input');
        });
    });

    //Show pass
    $('.show_pass').click(function () {
        if ($(this).hasClass('hidden') === false) {
            $(this).parents('.group_form_null ').find('.input_mk').attr('type', 'text');
            $(this).addClass('hidden');
        }
        else {
            $(this).parents('.group_form_null ').find('.input_mk').attr('type', 'password');
            $(this).removeClass('hidden');
        }
    });


    $('.show_pass')
        .mouseup(function () {
            $(this).parents('.group_form_null ').find('.input_mk').attr('type', 'password');
        })
        .mousedown(function () {
            $(this).parents('.group_form_null ').find('.input_mk').attr('type', 'text');
        });

    // OTP input
    function processInput(holder) {
        var elements = holder.children(), // taking the "kids" of the parent
            str = ''; //unnecesary || added for some future mods

        elements.each(function (e) { // iterates through each element
            var val = $(this).val().replace(/\D/, ''), // taking the value and parsing it. Returns string without changing the value.
                focused = $(this).is(':focus'), // checks if the current element in the iteration is focused
                parseGate = false;

            var clear = $('#inputs input');
            val.length === 1 ? parseGate = false : parseGate = true;
            /*
                a fix that doesn't allow the cursor to jump
                to another field even if input was parsed
                and nothing was added to the input
            */

            $(this).val(val); // applying parsed value.

            if (parseGate && val.length > 1) {
                // takes you to another input
                var exist = elements[e + 1] ? true : false; // checks if there is input ahead

                exist && val[1] ? ( // if so then
                    elements[e + 1].disabled = false,
                        elements[e + 1].value = val[1], // sends the last character to the next input
                        elements[e].value = val[0], // clears the last character of this input


                        // NEED TO FOCUS HERE
                        elements[e + 1].focus(), // sends the focus to the next input
                        elements[e + 1].classList.add('focused')
                ) : void 0;
            } else if (parseGate && focused && val.length == 0) {
                // if the input was REMOVING the character, then

                var exist = elements[e - 1] ? true : false; // checks if there is an input before
                if (exist) {
                    elements[e - 1].focus(); // sends the focus back to the previous input
                }

                elements[e].classList.remove('focused');

                if (e === 0) {
                    elements[0].classList.add('focused');
                }
            }

            val === '' ? str += ' ' : str += val;
        });
    }

    //
    $('.btn_edit_profile').click(function () {
        $('body').addClass('editmode');
    });

    $('.btn_un_editmode').click(function () {
        $('body').removeClass('editmode');
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

    const isIos = !!window.navigator.userAgent.match(/iPad|iPhone/i);
    const pinLen = $('.inputs .pin').length;

    function setFocus(input) {
        // No set timeout, not work on Safari
        if (isIos) {
            setTimeout(function () {
                input.select();
                input.focus();
            }, 100);
        } else {
            input.focus();
        }
    }

    // Process custom event pindel
    $('.inputs .pin').on('delpin', function (evt) {
        console.log('On delpin ' + evt.target.id + ' = "' + $(evt.target).val() + '"');

        var curr = parseInt(evt.target.id.substr('pin-'.length));
        $('#pin-' + curr).val('');

        if (curr >= 0) {
            console.log('Focus #0 for PIN-' + curr);
            setFocus($('#pin-' + curr));
        }
    });

    // Always set focus on PIN inputs
    $('.inputs .pin').blur(function (evt) {
        console.log('On blur ' + evt.target.id + ' = "' + $(evt.target).val() + '"');
        var curr = parseInt(evt.target.id.substr('pin-'.length));

        // Check all PIN are empty
        if ($('#pin-0').val() === '') {
            evt.stopPropagation();

            console.log('Focus #1 for PIN-' + 0);
            setFocus($('#pin-0'));
        } else {
            var last = false;
            for (var i = pinLen - 1; i >= 0; i--) {
                var digit = $('#pin-' + i).val() || '';
                if (digit !== '') {
                    last = i + 1;
                    last = last > (pinLen - 1) ? (pinLen - 1) : last;
                    break;
                }
            }

            if (last !== false) {
                if(last !== curr) {
                    evt.stopPropagation();
                }

                console.log('Focus #2 for PIN-' + last);
                setFocus($('#pin-' + last));
            }
        }
    });

    $('.inputs .pin').focus(function (evt) {
        console.log('On focus ' + evt.target.id + ' = "' + $(evt.target).val() + '"');
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
            console.log('Blur ' + evt.target.id, $(evt.target).val());
            $(evt.target).blur();
            evt.stopPropagation();

            if(last === false) {
                console.log('Focus #3 for PIN-' + 0);
                setFocus($('#pin-0'));
            } else {
                console.log('ERROR ' + evt.target.id, $(evt.target).val());
            }
        } else  if (last !== false) {
            if(last !== curr) {
                $(evt.target).blur();
                evt.stopPropagation();

                console.log('Focus #4 for PIN-' + last);
                setFocus($('#pin-' + last));
            }
        }
    });

    $('#pin-' + (pinLen - 1)).on('keyup', function (evt) {
        console.log('On keyup ' + evt.target.id + ' = "' + $(evt.target).val() + '"');

        if ($('#pin-5').val() !== '') {
            console.log('Focus #5 for PIN-' + 0);

            // Set focus for PIN-0 if error, submit and clear all PIN
            $('.inputs .pin').val('');
            setFocus($('#pin-0'));
        }
    });

    // Set height of HTML tag
    $('html').css('height', $(window).height());
    $('body').css('height', ($(window).height() - 150));

    // PIN
    if (pinLen > 0) {
        $('.inputs .pin').jqueryPincodeAutotab();
    }

    // HTML5 autofocus attribute is not supported on iOS
    // https://caniuse.com/#feat=autofocus
    console.log('Focus STARTED');
    setFocus($('#pin-0'));

    // Show soft-keyboard?
    // The script that calls focus() click() on an input needs 
    // to be running with user context, ie. triggered by a user interaction.
});
