(function ($) {
    $.fn.jqueryPincodeAutotab = function (options) {
        const pinLen = $(this).length;

        let settings = $.extend({
            alwaysFocus: false,
            autoFocus: true,
            complete: function (pin) {		// fires when all fields are filled in
                // pin:	the entered pin code
            },
        }, options);

        let lastInputValue = '';
        let hasBackspaceSupport;

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

        function setLog(msg) {
            if ($('.pin-log')) {
                $('.pin-log').html(msg + '<br />' + $('.pin-log').html());
            }
        }

        function getPin(index) {
            return $('#pin-' + index);
        }

        function setFocus(index) {
            const pin = getPin(index);
            // Not work on Safari?
            if (isIos()) {
                // 4ms is specified by the HTML5 spec
                setTimeout(function () {
                    pin.select(); // select first
                    pin.focus();
                }, 10);
            } else {
                pin.focus();
            }
        }

        function getLastIndexNotEmpty() {
            let lastNotEmpty = -1;
            for (let i = pinLen - 1; i >= 0; i--) {
                const data = getPin(i).val() || '';
                if (data !== '') {
                    lastNotEmpty = i + 1;
                    lastNotEmpty = lastNotEmpty > (pinLen - 1) ? (pinLen - 1) : lastNotEmpty;
                    break;
                }
            }

            return lastNotEmpty;
        }

        function unmask(value) {
            // Remove every non-digit character
            const output = value.replace(new RegExp(/[^\d]/, 'g'), '');
            return output;
        }

        // Change type to number on Android
        if (isAndroid()) {
            $(this).prop('type', 'number');
        }

        $(this).on('delpin', function (evt) {
            const index = parseInt(evt.target.id.substr('pin-'.length));
            setLog('On delpin PIN-' + index + ': value=' + $(this).val());

            $(this).val('');
            if ($(this).val() !== '') {
                setLog('On delpin PIN-' + index + ': cannot clear value PIN-' + index);
                $(evt.target).attr('value', ''); // for sure
            }

            setLog('On delpin PIN-' + index + ': set focus PIN-' + index);
            setFocus(index);
        });

        if (settings.alwaysFocus) {
            // Always set focus on PIN inputs?
            $(this).blur(function (evt) {
                const index = parseInt(evt.target.id.substr('pin-'.length));
                setLog('On blur PIN-' + index + ': value=' + $(this).val());

                // Check all PIN are empty
                if (getPin(0).val() === '') {
                    evt.stopPropagation();

                    setLog('On blur PIN-' + index + ': set focus PIN-' + 0);
                    setFocus(0);
                } else {
                    let lastNotEmpty = getLastIndexNotEmpty();
                    if (lastNotEmpty !== -1) {
                        if (lastNotEmpty !== index) {
                            evt.stopPropagation();
                        }

                        setLog('On blur PIN-' + index + ': set focus PIN-' + lastNotEmpty);
                        setFocus(lastNotEmpty);
                    }
                }
            });
        }

        $(this).focus(function (evt) {
            const index = parseInt(evt.target.id.substr('pin-'.length));
            setLog('On focus PIN-' + index + ': value=' + $(this).val());
            let lastIndexNotEmpty = getLastIndexNotEmpty();

            // Check all PIN are empty
            if (getPin(0).val() === '' && index > 0) {
                //$(evt.target).blur();
                //evt.stopPropagation();

                if (lastIndexNotEmpty === -1) {
                    setLog('On focus PIN-' + index + ': set focus PIN-' + 0);
                    setFocus(0);
                } else {
                    setLog('On focus PIN-' + index + ': ERROR focus PIN-' + index);
                }
            } else if (lastIndexNotEmpty !== -1) {
                if (lastIndexNotEmpty !== index) {
                    //$(evt.target).blur();
                    //evt.stopPropagation();

                    setLog('On focus PIN-' + index + ': set focus PIN-' + lastIndexNotEmpty);
                    setFocus(lastIndexNotEmpty);
                }
            }
        });

        $(this).on('keydown', function (evt) {
            let move = 0;
            const index = parseInt(evt.target.id.substr('pin-'.length));
            let keyCode = evt.which || evt.keyCode;
            const currentValue = $(this).val();

            setLog('On keydown PIN-' + index + ': key code: ' + keyCode + ', last: ' + lastInputValue + ', current: ' + currentValue);

            // Update last input value
            lastInputValue = currentValue;
            switch (keyCode) {
                // number 0
                case 48:
                case 96:
                    $(this).val('0');
                    move = 1;
                    evt.preventDefault();
                    evt.stopPropagation();
                    break;

                // number 1
                case 49:
                case 97:
                    $(this).val('1');
                    move = 1;
                    evt.preventDefault();
                    evt.stopPropagation();
                    break;

                // number 2
                case 50:
                case 98:
                    $(this).val('2');
                    move = 1;
                    evt.preventDefault();
                    evt.stopPropagation();
                    break;

                // number 3
                case 51:
                case 99:
                    $(this).val('3');
                    move = 1;
                    evt.preventDefault();
                    evt.stopPropagation();
                    break;

                // number 4
                case 52:
                case 100:
                    $(this).val('4');
                    move = 1;
                    evt.preventDefault();
                    evt.stopPropagation();
                    break;

                // number 5
                case 53:
                case 101:
                    $(this).val('5');
                    move = 1;
                    evt.preventDefault();
                    evt.stopPropagation();
                    break;

                // number 6
                case 54:
                case 102:
                    $(this).val('6');
                    move = 1;
                    evt.preventDefault();
                    evt.stopPropagation();
                    break;

                // number 7
                case 55:
                case 103:
                    $(this).val('7');
                    move = 1;
                    evt.preventDefault();
                    evt.stopPropagation();
                    break;

                // number 8
                case 56:
                case 104:
                    $(this).val('8');
                    move = 1;
                    evt.preventDefault();
                    evt.stopPropagation();
                    break;

                // number 9
                case 57:
                case 105:
                    $(this).val('9');
                    move = 1;
                    evt.preventDefault();
                    evt.stopPropagation();
                    break;

                case 8: // backspace
                case 46: // delete
                    $(this).val('');
                    move = -1;
                    evt.preventDefault();
                    evt.stopPropagation();
                    break;

                case 9: // tab
                    if (evt.shiftKey) {
                        move = -1;
                    } else {
                        move = 1;
                    }
                    evt.preventDefault();
                    evt.stopPropagation();
                    break;

                // case 86: // v
                //     if (!(evt.ctrlKey || evt.metaKey)) {
                //         evt.preventDefault();
                //     }
                //     break;

                // case 13: // enter
                // case 16: // shift
                // case 17: // ctrl
                // case 91: // command in mac
                //     break;

                // Key code 229 means that user pressed some button, but input method is still processing that.
                // This is a standard behavior for some input methods like entering Japanese or Chinese hieroglyphs.
                case 229: // Chrome on Android device always returns 229 key code
                    if ($.isNumeric(currentValue)) {
                        move = 1;
                    }

                    break;

                default:
                    evt.preventDefault();
                    evt.stopPropagation();
            }

            const prevIndex = (index >= 1) ? (index - 1) : -1;
            const nextIndex = (index <= pinLen) ? (index + 1) : -1;
            switch (move) {
                case 1:
                    if (nextIndex !== -1) {
                        setFocus(nextIndex);
                    }

                    break;

                case -1:
                    // Delete PIN
                    if (prevIndex !== -1) {
                        // Custom event
                        getPin(prevIndex).trigger({type: 'delpin'});
                    }

                    break;

                default:
                    break;
            }
        });

        $(this).on('paste', function (evt) {
            const index = parseInt(evt.target.id.substr('pin-'.length));
            evt.preventDefault();

            const clipboardData = evt.clipboardData || evt.originalEvent.clipboardData || window.clipboardData;
            const pastedData = clipboardData.getData('text/plain');
            for (let i = 0; i < pinLen; i++) {
                const data = function () {
                    return pastedData[i];
                };

                getPin(i).val(data);
            }
        });

        $(this).on('input DOMSubtreeModified', function (evt) {
            const index = parseInt(evt.target.id.substr('pin-'.length));
            let currentValue = $(this).val();
            setLog('On input PIN-' + index + ', last: ' + lastInputValue + ', current: ' + currentValue);

            const pattern = new RegExp($(this).prop('pattern'));
            currentValue = unmask(currentValue);

            if (!currentValue.match(pattern)) {
                $(this).val('').addClass('invalid');

                // fire error callback
                //that.settings.invalid($(this), nr);

                evt.preventDefault();
                evt.stopPropagation();
            }
        });

        getPin(pinLen - 1).on('keyup', function (evt) {
            const index = parseInt(evt.target.id.substr('pin-'.length));
            setLog('On keyup PIN-' + index + ': value=' + $(this).val());

            if ($(this).val() !== '') {
                setLog('On focus PIN-' + index + ': set focus PIN-' + 0);

                // Set set focus PIN-0 if error, submit and clear all PIN
                $('.inputs .pin').val('');
                setFocus(0);
            }
        });

        // HTML5 autofocus attribute is not supported on iOS
        // https://caniuse.com/#feat=autofocus
        if (settings.autoFocus) {
            setLog('-- Auto focus STARTED --');
            setFocus(0);
        }
    };

    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function () {
            return $.css(this, 'visibility') === 'hidden';
        }).length;
    }

    function focusable(element, isTabIndexNotNaN) {
        var map, mapName, img, nodeName = element.nodeName.toLowerCase();

        if ('area' === nodeName) {
            map = element.parentNode;
            mapName = map.name;

            if (!element.href || !mapName || map.nodeName.toLowerCase() !== 'map') {
                return false;
            }

            img = $('img[usemap=#' + mapName + ']')[0];
            return !!img && visible(img);
        }

        return (/input|select|textarea|button|object/.test(nodeName) ?
            !element.disabled : 'a' === nodeName ?
                element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element);
        // the element and all of its ancestors must be visible
    }

    $.extend($.expr[':'], {
        focusable: function (element) {
            return focusable(element, !isNaN($.attr(element, 'tabindex')));
        }
    });
}(jQuery));