(function ($, window, document) {

    function isIos() {
        return !!window.navigator.userAgent.match(/iPad|iPhone/i);
    }

    function isAndroid() {
        return window.navigator && /android/i.test(window.navigator.userAgent);
    }

    // On Android chrome, the keyup and keydown events always return key code 229
    // as a composition that buffers the user's keystrokes
    function isAndroidBackspaceKeydown(lastInputValue, currentInputValue) {
        if (!isAndroid() || !lastInputValue || !currentInputValue) {
            return false;
        }

        return currentInputValue === lastInputValue.slice(0, -1);
    }

    function log(...args) {
        if ($('.pin-log')) {
            let msg = args && args.length > 0 ? args[0] : '';
            if (args.length > 1) {
                msg += ', data: ' + JSON.stringify(args.slice(1));
            }

            $('.pin-log').html(msg + '<br />' + $('.pin-log').html());
        }
    }

    function unmask(value) {
        // Remove every non-digit character
        return value.replace(new RegExp(/[^\d]/, 'g'), '');
    }

    // Plugin definition
    $.fn.pincode = function (options) {
        const settings = $.extend({}, $.fn.pincode.defaults, options);

        return this.each(function () {
            // Do something to each element here.
            const eid = ($(this).attr('id') || 'pin') + '-';
            const container = $('<div />').prop({
                'id': eid + 'digits'
            });

            for (let i = 0; i < settings.digits; i++) {
                const input = $('<input>').prop({
                    'type': isAndroid() ? 'number' : 'tel',
                    'id': eid + i,
                    'maxlength': 1,
                    'inputmode': 'numeric',
                    'x-inputmode': 'numeric',
                    'pattern': "^\\d*$",
                    'min': 0,
                    'max': 9,
                    'placeholder': '',
                    'required': true,
                    'autocomplete': 'off',
                    'class': (settings.className || '') + ' pin-digit'
                });

                attach(input, i);
                container.append(input);
            }

            $(this).append(container);

            pin(settings.digits - 1).on('keyup', function (evt) {
                const index = parseInt(evt.target.id.substr(eid.length));
                log('On keyup PIN-' + index + ': value=' + $(this).val());

                if ($(this).val() !== '') {
                    log('On keyup PIN-' + index + ': set focus PIN-' + 0);

                    // Set set focus PIN-0 if error, submit and clear all PIN
                    $('.inputs .pin').val('');
                    focus(0);
                }
            });

            // HTML5 autofocus attribute is not supported on iOS
            // https://caniuse.com/#feat=autofocus
            if (settings.autoFocus) {
                log('-- Auto focus STARTED --');
                focus(0);
            }

            function pin(index) {
                return $('#' + eid + index);
            }

            function focus(index) {
                const input = pin(index);
                // Not work on Safari?
                if (isIos()) {
                    // 4ms is specified by the HTML5 spec
                    setTimeout(function () {
                        input.select(); // select first
                        input.focus();
                    }, 10);
                } else {
                    input.focus();
                }
            }

            function lastIndexNotEmpty() {
                let index = -1;
                for (let i = settings.digits - 1; i >= 0; i--) {
                    const data = pin(i).val() || '';
                    if (data !== '') {
                        index = i + 1;
                        index = index > (settings.digits - 1) ? (settings.digits - 1) : index;
                        break;
                    }
                }

                return index;
            }

            function attach(input, index) {
                let lastInputValue = '';

                input.on('delpin', function (evt) {
                    log('On delpin PIN-' + index + ': value=' + $(this).val());

                    $(this).val('');
                    if ($(this).val() !== '') {
                        log('On delpin PIN-' + index + ': cannot clear value PIN-' + index);
                        $(evt.target).attr('value', ''); // for sure
                    }

                    log('On delpin PIN-' + index + ': set focus PIN-' + index);
                    focus(index);
                });

                if (settings.alwaysFocus) {
                    // Always set focus on PIN inputs?
                    input.blur(function (evt) {
                        log('On blur PIN-' + index + ': value=' + $(this).val());

                        // Check all PIN are empty
                        if (pin(0).val() === '') {
                            evt.stopPropagation();

                            log('On blur PIN-' + index + ': set focus PIN-' + 0);
                            focus(0);
                        } else {
                            let lastNotEmpty = lastIndexNotEmpty();
                            if (lastNotEmpty !== -1) {
                                if (lastNotEmpty !== index) {
                                    evt.stopPropagation();
                                }

                                log('On blur PIN-' + index + ': set focus PIN-' + lastNotEmpty);
                                focus(lastNotEmpty);
                            }
                        }
                    });
                }

                input.focus(function (evt) {
                    log('On focus PIN-' + index + ': value=' + $(this).val());
                    const lastNotEmpty = lastIndexNotEmpty();

                    // Check all PIN are empty
                    if (pin(0).val() === '' && index > 0) {
                        //$(evt.target).blur();
                        //evt.stopPropagation();

                        if (lastNotEmpty === -1) {
                            log('On focus PIN-' + index + ': set focus PIN-' + 0);
                            focus(0);
                        } else {
                            log('On focus PIN-' + index + ': ERROR focus PIN-' + index);
                        }
                    } else if (lastNotEmpty !== -1) {
                        if (lastNotEmpty !== index) {
                            //$(evt.target).blur();
                            //evt.stopPropagation();

                            log('On focus PIN-' + index + ': set focus PIN-' + lastNotEmpty);
                            focus(lastNotEmpty);
                        }
                    }
                });

                input.on('keydown', function (evt) {
                    let move = 0;
                    let keyCode = evt.which || evt.keyCode;
                    const currentValue = $(this).val();

                    log('On keydown PIN-' + index + ': key code: ' + keyCode + ', last: ' +
                        lastInputValue + ', current: ' + currentValue);

                    // Update last input value
                    lastInputValue = currentValue;
                    // switch (keyCode) {
                    //     // number 0
                    //     case 48:
                    //     case 96:
                    //         $(this).val('0');
                    //         move = 1;
                    //         evt.preventDefault();
                    //         evt.stopPropagation();
                    //         break;
                    //
                    //     // number 1
                    //     case 49:
                    //     case 97:
                    //         $(this).val('1');
                    //         move = 1;
                    //         evt.preventDefault();
                    //         evt.stopPropagation();
                    //         break;
                    //
                    //     // number 2
                    //     case 50:
                    //     case 98:
                    //         $(this).val('2');
                    //         move = 1;
                    //         evt.preventDefault();
                    //         evt.stopPropagation();
                    //         break;
                    //
                    //     // number 3
                    //     case 51:
                    //     case 99:
                    //         $(this).val('3');
                    //         move = 1;
                    //         evt.preventDefault();
                    //         evt.stopPropagation();
                    //         break;
                    //
                    //     // number 4
                    //     case 52:
                    //     case 100:
                    //         $(this).val('4');
                    //         move = 1;
                    //         evt.preventDefault();
                    //         evt.stopPropagation();
                    //         break;
                    //
                    //     // number 5
                    //     case 53:
                    //     case 101:
                    //         $(this).val('5');
                    //         move = 1;
                    //         evt.preventDefault();
                    //         evt.stopPropagation();
                    //         break;
                    //
                    //     // number 6
                    //     case 54:
                    //     case 102:
                    //         $(this).val('6');
                    //         move = 1;
                    //         evt.preventDefault();
                    //         evt.stopPropagation();
                    //         break;
                    //
                    //     // number 7
                    //     case 55:
                    //     case 103:
                    //         $(this).val('7');
                    //         move = 1;
                    //         evt.preventDefault();
                    //         evt.stopPropagation();
                    //         break;
                    //
                    //     // number 8
                    //     case 56:
                    //     case 104:
                    //         $(this).val('8');
                    //         move = 1;
                    //         evt.preventDefault();
                    //         evt.stopPropagation();
                    //         break;
                    //
                    //     // number 9
                    //     case 57:
                    //     case 105:
                    //         $(this).val('9');
                    //         move = 1;
                    //         evt.preventDefault();
                    //         evt.stopPropagation();
                    //         break;
                    //
                    //     case 8: // backspace
                    //     case 46: // delete
                    //         $(this).val('');
                    //         move = -1;
                    //         evt.preventDefault();
                    //         evt.stopPropagation();
                    //         break;
                    //
                    //     case 9: // tab
                    //         if (evt.shiftKey) {
                    //             move = -1;
                    //         } else {
                    //             move = 1;
                    //         }
                    //         evt.preventDefault();
                    //         evt.stopPropagation();
                    //         break;
                    //
                    //     // case 86: // v
                    //     //     if (!(evt.ctrlKey || evt.metaKey)) {
                    //     //         evt.preventDefault();
                    //     //     }
                    //     //     break;
                    //
                    //     // case 13: // enter
                    //     // case 16: // shift
                    //     // case 17: // ctrl
                    //     // case 91: // command in mac
                    //     //     break;
                    //
                    //     // Key code 229 means that user pressed some button, but input method is still processing that.
                    //     // This is a standard behavior for some input methods like entering Japanese or Chinese hieroglyphs.
                    //     case 229: // Chrome on Android device always returns 229 key code
                    //         if ($.isNumeric(currentValue)) {
                    //             move = 1;
                    //         }
                    //
                    //         break;
                    //
                    //     default:
                    //         evt.preventDefault();
                    //         evt.stopPropagation();
                    // }
                    //
                    // const prevIndex = (index >= 1) ? (index - 1) : -1;
                    // const nextIndex = (index <= settings.digits) ? (index + 1) : -1;
                    // switch (move) {
                    //     case 1:
                    //         if (nextIndex !== -1) {
                    //             focus(nextIndex);
                    //         }
                    //
                    //         break;
                    //
                    //     case -1:
                    //         // Delete PIN
                    //         if (prevIndex !== -1) {
                    //             pin(prevIndex).trigger({type: 'delpin'});
                    //         }
                    //
                    //         break;
                    //
                    //     default:
                    //         break;
                    // }
                });

                input.on('paste', function (evt) {
                    evt.preventDefault();

                    const clipboardData = evt.clipboardData || evt.originalEvent.clipboardData || window.clipboardData;
                    const pastedData = clipboardData.getData('text/plain');
                    for (let i = 0; i < length; i++) {
                        const data = function () {
                            return pastedData[i];
                        };

                        pin(i).val(data);
                    }
                });

                input.on('input DOMSubtreeModified', function (evt) {
                    let currentValue = $(this).val();
                    log('On input PIN-' + index + ', last: ' + lastInputValue + ', current: ' + currentValue,
                        evt.target.value,
                        document.getElementById(evt.target.id).value);

                    const pattern = new RegExp($(this).prop('pattern'));
                    currentValue = unmask(currentValue);

                    if (!currentValue.match(pattern)) {
                        evt.preventDefault();
                        evt.stopPropagation();
                    }
                });
            }
        });
    };

    // Plugin defaults – added as a property on our plugin function.
    $.fn.pincode.defaults = {
        // Specify the maximum number of digits
        digits: 6,
        className: 'pin',
        // Set to false to disable logging. Default: true
        debug: true,
        alwaysFocus: false,
        autoFocus: true,
        complete: function (pin) {		// fires when all fields are filled in
            // pin:	the entered pin code
        },
    };
}(jQuery, window, document));