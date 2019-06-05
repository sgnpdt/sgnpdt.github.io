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
		let elements = holder.children(), // taking the "kids" of the parent
			str = ''; //unnecesary || added for some future mods

		elements.each(function (e) { // iterates through each element
			let val = $(this).val().replace(/\D/, ''), // taking the value and parsing it. Returns string without changing the value.
				focused = $(this).is(':focus'), // checks if the current element in the iteration is focused
				parseGate = false;

			let clear = $('#inputs input');
			val.length === 1 ? parseGate = false : parseGate = true;
			/*
				a fix that doesn't allow the cursor to jump
				to another field even if input was parsed
				and nothing was added to the input
			*/

			$(this).val(val); // applying parsed value.

			if (parseGate && val.length > 1) { 
				// takes you to another input
				let exist = elements[e + 1] ? true : false; // checks if there is input ahead

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

				let exist = elements[e - 1] ? true : false; // checks if there is an input before
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
    let sz = $(window).width() + $(window).height();
    $(window).resize(function () {
        if ($(window).width() + $(window).height() !== sz) {
            $('body').css('background-size', '0');
        } else {
            $('body').css('background-size', 'contain');
        }
		
		//$('.bg_OTP').css('height', $(window).height());	
    });
	
    // Process custom event pindel
    $('#inputs input').on('delpin', function (evt) {
		let curr = parseInt(evt.target.id.substr('pin-'.length));
		console.log(evt.target.id, 'del');
		$('#pin-' + curr).val('');

		if (curr >= 0) {
			//$('#pin-' + curr).trigger('focus', $.Event('focus'));
			// Set timeout?
			$('#pin-' + curr).select(); 
			$('#pin-' + curr).focus();
		}
    });

	let pinLen = $('#inputs input').length;
	
	// Always set focus on PIN inputs
	$('#inputs input').blur(function (evt) {
		let curr = parseInt(evt.target.id.substr('pin-'.length));

		// Check all PIN are empty
		if ($('#pin-0').val() === '') {
			evt.stopPropagation();
			
			// Set timeout?
			$('#pin-0').select(); 
			$('#pin-0').focus(); 
		} else {
			let found = false;
			for (let i = 5; i >= 0; i--) {
				let digit = $('#pin-' + i).val().trim();
				if (digit !== '') {
					found = i + 1;
					break;
				}
			}

			if (found !== false) {
				evt.stopPropagation();
				if(found < $('.inputs-pin .pin').length - 1) {
					// Set timeout?
					$('#pin-' + found).select(); 
					$('#pin-' + found).focus();
				}
			}
		}
	});	
	
    $('#inputs input').focus(function (evt) {
        let curr = parseInt(evt.target.id.substr('pin-'.length));

		// Check all PIN are empty
		if ($('#pin-0').val() === '' && curr > 0) {
			$(evt.target).blur();
			evt.stopPropagation();
			
			// Set timeout?
			$('#pin-0').select(); 
			$('#pin-0').focus(); 
		}

		let found = false;
		for (let i = 5; i >= 0; i--) {
			let digit = $('#pin-' + i).val().trim();
			if (digit !== '') {
				found = i + 1;
				break;
			}
		}

		if (found !== false && found !== curr) {
			//console.log('found to focus ' + found);
			$(evt.target).blur();
			evt.stopPropagation();
			if(found < pinLen - 1) {
				// Set timeout?
				$('#pin-' + found).select(); 
				$('#pin-' + found).focus();
			}
		}
    });
		
	
	$('#pin-' + (pinLen - 1)).on('keyup', function (evt) {
		if ($('#pin-5').val() !== '') {
			
			// Submit and clear all PIN
			$('#inputs input').val('');
			
			// Set focus for PIN-0 if error
			setTimeout(function() { 
				$('#pin-0').select(); 
				$('#pin-0').focus(); 
			}, 100);
		}
	});
	
	$('body').bind('focusin focus', function(e){
		e.preventDefault();
	});
	
	const isIos = () => !!window.navigator.userAgent.match(/iPad|iPhone/i);

    // Set height of HTML tag
    $('html').css('height', $(window).height());
	$('body').css('height', ($(window).height() - 156));

    // PIN
    if (pinLen > 0) {
        $('#inputs input').jqueryPincodeAutotab();
    }

	// Focus PIN-0
	$('#pin-0').select();
	$('#pin-0').focus();
	
	// Show soft-keyboard?
	// The script that calls focus() click() on an input needs 
	// to be running with user context, ie. triggered by a user interaction.
});
