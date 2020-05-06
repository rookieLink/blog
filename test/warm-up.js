/* global $, artDialog, Select, template, utilsApp */
//@import url('/js/expo/venue/www/module/rollNum.js')
//@import url('/js/expo/venue/m/common/warm-up-utils.js')

(function() {
    Select.use('select[name="unit"]');
    Select.use('select[name="areaCode"]');


    utilsApp.venueEvents();

    if (window.innerWidth < 1024 && window.venueWebFlag) {
        var url = window.location.href;
        var arrUrl = url.split("//");
        var start = arrUrl[1].indexOf("/");
        var relUrl = arrUrl[1].substring(start);
        window.location.href = '//m.made-in-china.com' + relUrl;
    }

    /*banner动效*/
    var windowWidth = $(window).width() > 1440;
    var lottieAnimate = function(el, assetsName) {
        lottie.loadAnimation({
            container: el, // the dom element that will contain the animation
            renderer: 'svg',
            assetsPath: windowWidth ? '$${path.mic_touch}/img/expo/venue/activity-aggregation/images-' + assetsName + '/' : '$${path.mic_touch}/img/expo/venue/activity-aggregation/images-' + assetsName + '/1280/',
            loop: false,
            autoplay: true,
            path: windowWidth ? '$${path.mic_touch}/img/expo/venue/activity-aggregation/data1920-' + assetsName + '.json' : '$${path.mic_touch}/img/expo/venue/activity-aggregation/data1280-' + assetsName + '.json'
        });
    };
    lottieAnimate($('.J-banner-left')[0], 'left');
    lottieAnimate($('.J-banner-right')[0], 'right');

    /*数字上滚动效*/
    $(".J-rollNum").each(function() {
        $(this).rollNumber({
            duration: 500,
            delay: 500
        });
    });

    var expoId = $('#expoId').val();

    $('.J-submit').click(function() {
        $('.J-regisForm').submit();
    });

    // 绑定失去焦点事件
    $("input[name='buyerName'],input[name='companyName'],input[name='purchaseQuantity']")
        .bind("blur", function() {
            $('.J-regisForm').validate().element(this);
        });
    $("input[name='buyerName'],input[name='companyName'],input[name='productKeywords'],input[name='purchaseQuantity']")
        .bind("input propertychange", function() {
            $('.J-regisForm').validate().element(this);
        });

    // 手机号、邮箱输入时 清空唯一性报错
    $('input[name="buyerEmail"]').bind("input propertychange", function() {
        $('.J-dup-mail').html('');
        $('.J-regisForm').validate().element(this);
    });
    $('input[name="mobileNum"]').bind("input propertychange", function() {
        $('.J-dup-phone').html('');
        $('.J-regisForm').validate().element(this);
    });

    // 邮箱失焦判断正确性、唯一性
    $('input[name="buyerEmail"]').bind("blur", function() {
        if ($('.J-regisForm').validate().element(this)) {
            // $.ajax({});
        }
    });
    // 手机号失焦判断正确性、唯一性
    $('input[name="mobileNum"]').bind("blur", function() {
        if ($('.J-regisForm').validate().element(this)) {
            // $.ajax({});
        }
    });

    // 产品关键词获取焦点及失焦 placeholder切换
    $('input[name="productKeywords"]').bind('focus', function() {
        this.setAttribute('placeholder', 'Enter different Sourcing Products with commas');
    });
    $('input[name="productKeywords"]').bind('blur', function() {
        this.setAttribute('placeholder', 'Sourcing Product(s)');
        $('.J-regisForm').validate().element(this);
    });


    $.validator.addMethod("num", function(value, element, param) {
        return /^[0-9]+$/.test(value);
    });

    var baseUrl = "http://mock.ued.vemic.com/p/5ea8e52b85b23b23bda3c1fd"

    $('.J-regisForm').validate({
        errorWrap: true,
        errorWrapElement: '<div class="err-block"><span class="arrow-left"></span></div>',
        onsubmit: true,
        onfocusout: false,
        onkeyup: false,
        focusInvalid: false,
        rules: {
            buyerName: {
                required: true,
                enonly: true,
                maxlength: 50,
            },
            buyerEmail: {
                required: true,
                email: true
            },
            companyName: {
                required: true,
                enonly: true,
                maxlength: 160
            },
            productKeywords: {
                required: true,
                enonly: true,
                maxlength: 50,
            },
            purchaseQuantity: {
                required: true,
                num: true,
                maxlength: 10,
                min: 0
            },
            mobileNum: {
                required: true,
                num: true,
                maxlength: 20
            },
            unit: {
                required: true,
            }
        },
        messages: {
            buyerName: {
                required: 'Please enter your full name',
                enonly: 'Please enter in English',
                maxlength: 'Please enter less than 50 characters',
            },
            buyerEmail: {
                required: 'Please enter a valid email address',
                email: 'Please enter a valid email address',
            },
            companyName: {
                required: 'Please enter company name',
                enonly: 'Please enter in English',
                maxlength: 'Please enter less than 160 characters',
            },
            productKeywords: {
                required: 'Please enter your sourcing products',
                enonly: 'Please enter in English',
                maxlength: 'Please enter less than 50 characters',
            },
            purchaseQuantity: {
                required: 'Please enter estimated quantity',
                num: 'Please type in estimated quantity in positive number',
                maxlength: 'Please enter no more than 10 characters',
                min: 'The quantity must be greater than 0'
            },
            mobileNum: {
                required: 'Please enter mobile phone number',
                num: 'Only allow numeric (0-9) for mobile phone number',
                maxlength: 'Please enter a valid phone number'
            },
            unit: {
                required: 'Please Choose unit',
            },
        },
        highlight: function(element, errorClass) {
            // console.log(123);
            // $(element).closest('input').addClass("no-margin");
        },
        unhighlight: function(element, errorClass) {
            // console.log(234);
            // $(element).closest('input').removeClass("no-margin");
        },
        submitHandler: function() {
            $('.J-dup-mail').html('');
            $('.J-dup-phone').html('');
            var paramsArray = $(".J-regisForm").serializeArray();
            var params = {};
            $.each(paramsArray, function(index, item) {
                params[item.name] = item.value;
            });
            params.mobileNum = params.areaCode + '-' + params.mobileNum;
            $.ajax({
                url: baseUrl + "/expo/venue/apply/" + expoId,
                type: 'post',
                dataType: 'json',
                cache: false,
                data: params,
                success: function(data) {
                    if (data.success) {
                        // new artDialog({
                        //     title: false,
                        //     lock: true,
                        //     opacity: .4,
                        //     content: template($('#J-DlgTpl').html(), {
                        //         code: data.code
                        //     })
                        // });
                    } else {
                        if (data.errorCode.indexOf("E01") > -1) {
                            $('.J-dup-mail').html('<label for="buyerEmail" generated="true" class="error" style="display: inline-block;">Only allow numeric (0-9) for mobile phone number</label>\n');
                        }
                        if (data.errorCode.indexOf('E02') > -1) {
                            $('.J-dup-phone').html('<label for="buyerEmail" generated="true" class="error" style="display: inline-block;">Only allow numeric (0-9) for mobile phone number</label>\n');
                        }
                    }
                },
                error: function() {

                }
            });
        },
        invalidHandler: function(form, validator) { //不通过回调
            $('.J-dup-mail').html('');
            $('.J-dup-phone').html('');
        }
    });

    var $bannerWrap = $('.J-regisForm'),
        $registerWrap = $('.J-register-wrap'),
        _bannerTop = $bannerWrap.offset().top,
        _bannerHeight = $bannerWrap.height();
    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop >= _bannerTop + _bannerHeight) {
            $registerWrap.removeClass('not-display');
        } else {
            $registerWrap.addClass('not-display');
        }
    });
    $('.J-register-button').on('click', function() {
        $("html,body").animate({
            scrollTop: _bannerTop - 100
        }, 500);
    });

    $('.J-hot-item').each(function() {
        var hrefStr = $(this).attr('href');
        if (hrefStr.indexOf('?') !== -1) {
            this.setAttribute('href', hrefStr + '&source=venue_hot');
        } else {
            this.setAttribute('href', hrefStr + '?source=venue_hot');
        }
    });

    function add0(time) {
        if (time < 10) {
            time = "0" + time;
        }
        return time;
    }

    var interValObj;
    var sysSecond = parseInt($("#time").val()); //这里获取倒计时的起始时间
    function setRemainTime() {
        if (sysSecond > 0) {
            var minute = Math.floor((sysSecond / 60) % 60); //计算分 
            var hour = Math.floor((sysSecond / 3600) % 24); //计算小时
            var day = Math.floor((sysSecond / 3600) / 24); //计算天 
            $(".remain-day").html(add0(day));
            $(".remain-hour").html(add0(hour));
            $(".remain-minute").html(add0(minute));
            sysSecond = sysSecond - 1;
        } else { //剩余时间小于60的时候，就停止间隔函数
            if (interValObj) {
                window.clearInterval(interValObj);
            }
            window.location.reload();
        }
    }
    setRemainTime(sysSecond);
    interValObj = window.setInterval(setRemainTime, 1000); //间隔函数，1分钟执行

})();