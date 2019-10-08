(function ($) {
    $.fn.jqueryPincodeAutotab = function (options) {
        var listOfElements = $(this);

        var settings = $.extend({
            prevElement: null,
            nextElement: null,
            defaultFlow: true
        }, options);

        var lastInputValue = '';
        var hasBackspaceSupport;
        var isIos = function () {
            return !!window.navigator.userAgent.match(/iPad|iPhone/i);
        };

        var isAndroid = function () {
            return window.navigator && /android/i.test(window.navigator.userAgent);
        };

        // On Android chrome, the keyup and keydown events always return key code 229
        // as a composition that buffers the user’s keystrokes
        var isAndroidBackspaceKeydown = function (lastInputValue, currentInputValue) {
            if (!isAndroid() || !lastInputValue || !currentInputValue) {
                return false;
            }

            return currentInputValue === lastInputValue.slice(0, -1);
        };

        var setPinFocus = function (input) {
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
        };

        return this.each(function (index, value) {
            $(value).on('input', function (evt) {

            });

            $(value).on('keydown', function (evt) {
                var move = 0;

                var currentValue = $(this).val();
                // If we got any charCode === 8, this means, that this device correctly
                // sends backspace keys in event, so we do not need to apply any hacks
                var keyCode = evt.which || evt.keyCode;

                var log =  keyCode + '/' + hasBackspaceSupport + '/' + lastInputValue + '/' + currentValue;
                $('.pin-log').html(log + '<br />' + $('.pin-log').html());

                hasBackspaceSupport = hasBackspaceSupport || keyCode === 8;
                if (!hasBackspaceSupport && isAndroidBackspaceKeydown(lastInputValue, currentValue)) {
                    keyCode = 8;
                } else {
                    keyCode = evt.keyCode;
                }

                // Update last input value
                lastInputValue = currentValue;

                switch (keyCode) {
                    // number 0
                    case 48:
                    case 96:
                        $(this).val('0');
                        move = 1;
                        evt.preventDefault();
                        break;

                    // number 1
                    case 49:
                    case 97:
                        $(this).val('1');
                        move = 1;
                        evt.preventDefault();
                        break;

                    // number 2
                    case 50:
                    case 98:
                        $(this).val('2');
                        move = 1;
                        evt.preventDefault();
                        break;

                    // number 3
                    case 51:
                    case 99:
                        $(this).val('3');
                        move = 1;
                        evt.preventDefault();
                        break;

                    // number 4
                    case 52:
                    case 100:
                        $(this).val('4');
                        move = 1;
                        evt.preventDefault();
                        break;

                    // number 5
                    case 53:
                    case 101:
                        $(this).val('5');
                        move = 1;
                        evt.preventDefault();
                        break;

                    // number 6
                    case 54:
                    case 102:
                        $(this).val('6');
                        move = 1;
                        evt.preventDefault();
                        break;

                    // number 7
                    case 55:
                    case 103:
                        $(this).val('7');
                        move = 1;
                        evt.preventDefault();
                        break;

                    // number 8
                    case 56:
                    case 104:
                        $(this).val('8');
                        move = 1;
                        evt.preventDefault();
                        break;

                    // number 9
                    case 57:
                    case 105:
                        $(this).val('9');
                        move = 1;
                        evt.preventDefault();
                        break;

                    case 8: // backspace
                    case 46: // delete
                        $(this).val('');
                        move = -1;
                        evt.preventDefault();
                        break;

                    case 9: // tab
                        if (evt.shiftKey) {
                            move = -1;
                        } else {
                            move = 1;
                        }
                        evt.preventDefault();
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

                    case 229: // Android device on Chrome always returns 229 keycode
                        var androidKeyCode = $(this).val();
                        $('.pin-log').html('androidKeyCode' + androidKeyCode + '<br />' + $('.pin-log').html());
                        if ($.isNumeric(androidKeyCode)) {
                            move = 1;
                        }
                        break;

                    default:
                        evt.preventDefault();
                }

                for (var i = 0; i < listOfElements.length; i++) {
                    var prevElement;
                    var nextElement;
                    if (i - 1 >= 0) {
                        prevElement = listOfElements[i - 1];
                    }

                    if (i + 1 <= listOfElements.length) {
                        nextElement = listOfElements[i + 1];
                    }

                    if (listOfElements[i] === this) {
                        var ele, j;
                        switch (move) {
                            case 1:
                                if (nextElement) {
                                    // $(nextElement).select();
                                    // if (isIos) {
                                    //     $(nextElement).select();
                                    // }
                                    //
                                    // // Set timeout?
                                    // $(nextElement).focus();

                                    setPinFocus($(nextElement));
                                } else {
                                    if (settings.nextElement) {
                                        // settings.nextElement.select();
                                        // if (isIos) {
                                        //     settings.nextElement.select();
                                        // }
                                        //
                                        // // Set timeout?
                                        // settings.nextElement.focus();
                                        setPinFocus(settings.nextElement);
                                    } else if (settings.defaultFlow) {
                                        ele = $(':focusable');
                                        for (j = 0; j < ele.length; j++) {
                                            if (ele[j] === this) {
                                                if (ele[j + 1]) {
                                                    //$(ele[j + 1]).select();
                                                    // if (isIos) {
                                                    //     $(ele[j + 1]).select();
                                                    // }
                                                    //
                                                    // // Set timeout?
                                                    // $(ele[j + 1]).focus();
                                                    setPinFocus($(ele[j + 1]));
                                                }

                                                break;
                                            }
                                        }
                                    }
                                }

                                break;

                            case -1:
                                // Delete PIN
                                if (prevElement) {
                                    //$(prevElement).select();
                                    //$(prevElement).focus();

                                    // Custom event
                                    $(prevElement).trigger({type: 'delpin'});
                                } else {
                                    if (settings.prevElement) {
                                        //settings.prevElement.select();
                                        //settings.prevElement.focus();

                                        // Custom event
                                        settings.prevElement.trigger({type: 'delpin'});
                                    } else if (settings.defaultFlow) {
                                        ele = $(':focusable');
                                        for (j = 0; j < ele.length; j++) {
                                            if (ele[j] === this) {
                                                if (ele[j - 1]) {
                                                    //$(ele[j - 1]).select();
                                                    //$(ele[j - 1]).focus();

                                                    // Custom event
                                                    $(ele[j - 1]).trigger({type: 'delpin'});
                                                }

                                                break;
                                            }
                                        }
                                    }
                                }

                                break;
                        }
                    }
                }
            });

            $(value).on('paste', function (event) {
                event.preventDefault();
                var clipboardData = event.clipboardData || event.originalEvent.clipboardData || window.clipboardData;
                var pastedData = clipboardData.getData('text/plain');
                for (var i = 0; i < listOfElements.length; i++) {
                    var data = function () {
                        return pastedData[i];
                    };

                    $(listOfElements[i]).val(data);
                }
            });
        });
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