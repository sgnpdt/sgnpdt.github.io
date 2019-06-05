(function ($) {
    $.fn.jqueryPincodeAutotab = function (options) {
        var listOfElements = $(this);

        var settings = $.extend({
            prevElement: null,
            nextElement: null,
            defaultFlow: true
        }, options);

        return this.each(function (index, value) {
            $(value).on('keydown', function (event) {
                let move = 0;
                switch (event.keyCode) {
                    //number 0
                    case 48:
                    case 96:
                        $(this).val('0');
                        move = 1;
                        event.preventDefault();
                        break;

                    //number 1
                    case 49:
                    case 97:
                        $(this).val('1');
                        move = 1;
                        event.preventDefault();
                        break;

                    //number 2
                    case 50:
                    case 98:
                        $(this).val('2');
                        move = 1;
                        event.preventDefault();
                        break;

                    //number 3
                    case 51:
                    case 99:
                        $(this).val('3');
                        move = 1;
                        event.preventDefault();
                        break;

                    //number 4
                    case 52:
                    case 100:
                        $(this).val('4');
                        move = 1;
                        event.preventDefault();
                        break;

                    //number 5
                    case 53:
                    case 101:
                        $(this).val('5');
                        move = 1;
                        event.preventDefault();
                        break;

                    //number 6
                    case 54:
                    case 102:
                        $(this).val('6');
                        move = 1;
                        event.preventDefault();
                        break;

                    //number 7
                    case 55:
                    case 103:
                        $(this).val('7');
                        move = 1;
                        event.preventDefault();
                        break;

                    //number 8
                    case 56:
                    case 104:
                        $(this).val('8');
                        move = 1;
                        event.preventDefault();
                        break;

                    //number 9
                    case 57:
                    case 105:
                        $(this).val('9');
                        move = 1;
                        event.preventDefault();
                        break;

                    case 8: //backspace
                    case 46: //delete
                        $(this).val('');
                        move = -1;
                        event.preventDefault();
                        break;

                    case 9: //tab
                        if (event.shiftKey) {
                            move = -1;
                        } else {
                            move = 1;
                        }
                        event.preventDefault();
                        break;

                    case 86: //v
                        if (!(event.ctrlKey || event.metaKey)) {
                            event.preventDefault();
                        }
                        break;
                    case 13: //enter
                    case 16: //shift
                    case 17: //ctrl
                    case 91: //command in mac
                        break;
                    case 229: //android device on chrome always returns 229 keycode
                        let androidKeyCode = $(this).val();
                        if ($.isNumeric(androidKeyCode)) {
                            move = 1;
                        }
                        break;
                    default:
                        event.preventDefault();
                }

                for (let i = 0; i < listOfElements.length; i++) {
                    let prevElement;
                    let nextElement;
                    if (i - 1 >= 0) {
                        prevElement = listOfElements[i - 1];
                    }

                    if (i + 1 <= listOfElements.length) {
                        nextElement = listOfElements[i + 1];
                    }

                    if (listOfElements[i] === this) {
                        let ele, j;
                        switch (move) {
                            case 1:
                                if (nextElement) {
                                    $(nextElement).select();
									
									// Set timeout?
                                    $(nextElement).focus();
                                } else {
                                    if (settings.nextElement) {
                                        settings.nextElement.select();
										
										// Set timeout?
                                        settings.nextElement.focus();
                                    } else if (settings.defaultFlow) {
                                        ele = $(':focusable');
                                        for (j = 0; j < ele.length; j++) {
                                            if (ele[j] === this) {
                                                if (ele[j + 1]) {
                                                    $(ele[j + 1]).select();
													
													// Set timeout?
                                                    $(ele[j + 1]).focus();
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
                let clipboardData = event.clipboardData || event.originalEvent.clipboardData || window.clipboardData;
                let pastedData = clipboardData.getData('text/plain');
                for (let i = 0; i < listOfElements.length; i++) {
                    let data = function () {
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
        let map, mapName, img, nodeName = element.nodeName.toLowerCase();
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
            !element.disabled :
            'a' === nodeName ?
                element.href || isTabIndexNotNaN :
                isTabIndexNotNaN) &&
            // the element and all of its ancestors must be visible
            visible(element);
    }

    $.extend($.expr[':'], {
        focusable: function (element) {
            return focusable(element, !isNaN($.attr(element, 'tabindex')));
        }
    });
}(jQuery));