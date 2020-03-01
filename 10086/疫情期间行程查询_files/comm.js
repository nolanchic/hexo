/**
 * Created by ljh on 2017/7/5.
 */
/*===========================
 工具对象
 ===========================*/
var Utils = Utils || {};
/**
 * md5
 * */
(function ($) {
    'use strict'

    /*
    * Add integers, wrapping at 2^32. This uses 16-bit operations internally
    * to work around bugs in some JS interpreters.
    */
    function safeAdd(x, y) {
        var lsw = (x & 0xffff) + (y & 0xffff)
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
        return (msw << 16) | (lsw & 0xffff)
    }

    /*
    * Bitwise rotate a 32-bit number to the left.
    */
    function bitRotateLeft(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt))
    }

    /*
    * These functions implement the four basic operations the algorithm uses.
    */
    function md5cmn(q, a, b, x, s, t) {
        return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
    }

    function md5ff(a, b, c, d, x, s, t) {
        return md5cmn((b & c) | (~b & d), a, b, x, s, t)
    }

    function md5gg(a, b, c, d, x, s, t) {
        return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
    }

    function md5hh(a, b, c, d, x, s, t) {
        return md5cmn(b ^ c ^ d, a, b, x, s, t)
    }

    function md5ii(a, b, c, d, x, s, t) {
        return md5cmn(c ^ (b | ~d), a, b, x, s, t)
    }

    /*
    * Calculate the MD5 of an array of little-endian words, and a bit length.
    */
    function binlMD5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << (len % 32)
        x[((len + 64) >>> 9 << 4) + 14] = len

        var i
        var olda
        var oldb
        var oldc
        var oldd
        var a = 1732584193
        var b = -271733879
        var c = -1732584194
        var d = 271733878

        for (i = 0; i < x.length; i += 16) {
            olda = a
            oldb = b
            oldc = c
            oldd = d

            a = md5ff(a, b, c, d, x[i], 7, -680876936)
            d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
            c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
            b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
            a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
            d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
            c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
            b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
            a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
            d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
            c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
            b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
            a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
            d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
            c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
            b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

            a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
            d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
            c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
            b = md5gg(b, c, d, a, x[i], 20, -373897302)
            a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
            d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
            c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
            b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
            a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
            d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
            c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
            b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
            a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
            d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
            c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
            b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)

            a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
            d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
            c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
            b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
            a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
            d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
            c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
            b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
            a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
            d = md5hh(d, a, b, c, x[i], 11, -358537222)
            c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
            b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
            a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
            d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
            c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
            b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)

            a = md5ii(a, b, c, d, x[i], 6, -198630844)
            d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
            c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
            b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
            a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
            d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
            c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
            b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
            a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
            d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
            c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
            b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
            a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
            d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
            c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
            b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)

            a = safeAdd(a, olda)
            b = safeAdd(b, oldb)
            c = safeAdd(c, oldc)
            d = safeAdd(d, oldd)
        }
        return [a, b, c, d]
    }

    /*
    * Convert an array of little-endian words to a string
    */
    function binl2rstr(input) {
        var i
        var output = ''
        var length32 = input.length * 32
        for (i = 0; i < length32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff)
        }
        return output
    }

    /*
    * Convert a raw string to an array of little-endian words
    * Characters >255 have their high-byte silently ignored.
    */
    function rstr2binl(input) {
        var i
        var output = []
        output[(input.length >> 2) - 1] = undefined
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0
        }
        var length8 = input.length * 8
        for (i = 0; i < length8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32)
        }
        return output
    }

    /*
    * Calculate the MD5 of a raw string
    */
    function rstrMD5(s) {
        return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
    }

    /*
    * Calculate the HMAC-MD5, of a key and some data (raw strings)
    */
    function rstrHMACMD5(key, data) {
        var i
        var bkey = rstr2binl(key)
        var ipad = []
        var opad = []
        var hash
        ipad[15] = opad[15] = undefined
        if (bkey.length > 16) {
            bkey = binlMD5(bkey, key.length * 8)
        }
        for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 0x36363636
            opad[i] = bkey[i] ^ 0x5c5c5c5c
        }
        hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
        return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
    }

    /*
    * Convert a raw string to a hex string
    */
    function rstr2hex(input) {
        var hexTab = '0123456789abcdef'
        var output = ''
        var x
        var i
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i)
            output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
        }
        return output
    }

    /*
    * Encode a string as utf-8
    */
    function str2rstrUTF8(input) {
        return unescape(encodeURIComponent(input))
    }

    /*
    * Take string arguments and return either raw or hex encoded strings
    */
    function rawMD5(s) {
        return rstrMD5(str2rstrUTF8(s))
    }

    function hexMD5(s) {
        return rstr2hex(rawMD5(s))
    }

    function rawHMACMD5(k, d) {
        return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
    }

    function hexHMACMD5(k, d) {
        return rstr2hex(rawHMACMD5(k, d))
    }

    function md5(string, key, raw) {
        if (!key) {
            if (!raw) {
                return hexMD5(string)
            }
            return rawMD5(string)
        }
        if (!raw) {
            return hexHMACMD5(key, string)
        }
        return rawHMACMD5(key, string)
    }

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return md5
        })
    } else if (typeof module === 'object' && module.exports) {
        module.exports = md5
    } else {
        $.md5 = md5
    }
})(this);
/**
 * 获取浏览器内核
 * */
Utils.browser = function () {
    var versions = '';
    return {
        getVersion: function () {
            if (!versions) {
                var u = window.navigator.userAgent;
                versions = {
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者安卓QQ浏览器
                    iPad: u.indexOf('iPad') > -1, //是否为iPad
                    webApp: u.indexOf('Safari') == -1,//是否为web应用程序，没有头部与底部
                    weixin: u.indexOf('MicroMessenger') == -1 //是否为微信浏览器
                };
            }
            return versions;
        }
    };
}();
/**
 * 获取浏览器终端
 * */
Utils.mobileForm = function () {
    var appType = '';
    return {
        getMobileForm: function () {
            if (!appType) {
                var browser = Utils.browser.getVersion();
                //  1. 是否为移动终端
                if (browser.mobile) {
                    if (browser.ios || browser.iPhone || browser.iPad) {
                        //  3. 是否为ios移动终端
                        appType = "ios";
                    } else if (browser.android) {
                        //  4. 是否为android移动终端
                        appType = "android";
                    } else {
                        appType = "web";
                    }
                } else {
                    // 2. 是否为web 端
                    appType = "web";
                }
            }
            return appType;
        }
    };
}();
/**
 * 与客户端交互方法
 * reqJson:传给客户端的json对象
 * appDataCallbackObj ： 客户端回调
 * @return
 */
Utils.appCommunication = function (reqJson, appDataCallbackObj) {
    var appType = Utils.mobileForm.getMobileForm();
    if (appType == "android") {
        var reqJson = JSON.stringify(reqJson);
        // android 客户端回调
        window.appCallback = function (respJsonBack) {
            var respJsonBack = respJsonBack.replace(/\n/g, "");
            respJsonBack = JSON.parse(respJsonBack);
            appDataCallbackObj && appDataCallbackObj(respJsonBack);
        };
        // android 调用客户端（传递字符串）
        try {
            window.kingpoint.commonServer(reqJson);
        } catch (error) {
            console.log(error);
        }
    } else if (appType == "ios") {
        try {
            //ios 客户端回调
            jsBridge.bind('commonServer', function (respJsonBack) {
                appDataCallbackObj && appDataCallbackObj(respJsonBack);
            });
            // ios 调用客户端(传递对象)
            jsBridge.postNotification('commonServer', reqJson);
        } catch (error) {
            console.log(error);
            alert("jsBridge不存在！");
        }
    }
};
/**
 * 客户端跳转功能
 * */
Utils.appJump = function (reqData) {
    var reqJson = new Object();
    reqJson.servicename = 'GMCCJS_000_000_000_001';
    reqJson.reqData = reqData;
    //alert(reqJson);
    var appDataCallbackObj = null;
    Utils.appCommunication(reqJson, appDataCallbackObj); // 与客户端交互
};
/**
 * rem实现页面自适应
 * */
Utils.adaptive = function () {
    !function () {
        function e() {
            var e = document.documentElement.clientWidth, t = document.querySelector("html"),
                f = (e > 750 ? 750 : e) / 20;
            window.fontSize = f;
            t.style.fontSize = f + "px"
        }

        e(), window.addEventListener("resize", e);
    }();
};
/**
 * 获取url链接上的参数
 * */
Utils.getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return "";
};
/**
 * 发起接口请求
 * @param serviceName 接口
 * @param jsonData json
 * @param ajaxCallbackObj
 * @return json{serviceURL:"asf"}
 */
Utils.doAjaxInterface = function () {
    var session = '';
    var sessionid = '';

    function getUrl(serviceName, ajaxCallbackObj, params) {
        var serviceURL = (params && params.serviceURL) || '../../webserver',
            urlParams = (params && params.urlParams) || {};

        var sessionV = session || Utils.getQueryString("session") || Utils.sessionStorage.getItem("session");
        if (sessionV) {
            urlParams.sessionid = session = sessionV;
            Utils.sessionStorage.setItem("sessionid", sessionV);
        }

        var sessionidV = sessionid || Utils.getQueryString("sessionid") || Utils.sessionStorage.getItem("sessionid");
        if (sessionidV) {
            urlParams.sessionid = sessionid = sessionidV;
            Utils.sessionStorage.setItem("sessionid", sessionidV);
        }

        urlParams.servicename = serviceName;
        var url = Utils.createUrl(serviceURL, urlParams);
        return url;
    }

    return {
        doAjax: function (serviceName, jsonData, ajaxCallbackObj, params) {
            var reqKey = (params && params.reqKey) || 'reqJson',
                data = {},
                timeout = (params && params.timeout) || '',
                url = getUrl(serviceName, ajaxCallbackObj, params),
                header = {};
            var nonce = randomCode(),
                timestamp = new Date().getTime(),
                sign = sessionid + "," + nonce + "," + timestamp;
            header = {
                "nonce": nonce,
                "timestamp": timestamp,
                "sign": md5(sign).toUpperCase()
            };
            jsonData.header = header;
            jsonData = JSON.stringify(jsonData);
            data[reqKey] = jsonData;
            var xhr = $.ajax({
                url: url,
                data: data,
                type: "post",
                async: true,
                dataType: "text",
                success: function (data) {
                    if (!data) {
                        alert("数据异常，请稍后再试！")
                        return;
                    }
                    var data = JSON.parse(data);
                    ajaxCallbackObj.doSuccess(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    ajaxCallbackObj.doError();
                    //alert(errorThrown);
                },
                complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                    if (timeout !== '' && status == 'timeout') {//超时,status还有success,error等值的情况
                        ajaxTimeoutTest.abort();
                        ajaxCallbackObj.doComplete && ajaxCallbackObj.doComplete();
                    }
                }
            });
            return xhr;
        },
        fileAjax: function (serviceName, jsonData, ajaxCallbackObj, params) {
            var url = getUrl(serviceName, ajaxCallbackObj, params);
            var xhr = $.ajax({
                url: url,
                data: jsonData,
                processData: false,
                contentType: false,
                type: "post",
                async: true,
                dataType: "text",
                beforeSend: function (xhr) {
                    params.beforeSend && params.beforeSend(xhr);
                },
                success: function (data) {
                    if (!data) {
                        alert("数据异常，请稍后再试！")
                        return;
                    }
                    var data = JSON.parse(data);
                    ajaxCallbackObj.doSuccess(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    ajaxCallbackObj.doError();
                    //alert(errorThrown);
                }
            });
            return xhr;
        },
        getSession: function () {
            if (!session) {
                session = Utils.getQueryString("session") || Utils.sessionStorage.getItem("session");
            }
            return session;
        },
        setSession: function (sessions) {
            session = sessions;
            Utils.sessionStorage.setItem("session", session);
        },
        getSessionid: function () {
            if (!sessionid) {
                sessionid = Utils.getQueryString("sessionid") || Utils.sessionStorage.getItem("sessionid");
            }
            return sessionid;
        },
        setSessionid: function (sessionids) {
            sessionid = sessionids;
            Utils.sessionStorage.setItem("sessionid", sessionid);
        }
    }
}();
/**
 * 生成链接url，params
 * */
Utils.createUrl = function (serviceURL, obj) {
    var url = serviceURL + "?";
    for (var key in obj) {
        url += key + '=' + obj[key] + '&';
    }
    return url.substring(0, url.lastIndexOf('&'));
};
/**
 * 倒计时
 * @param time 倒计时间多少秒
 * @param secondsCallback 每秒回调
 * @param callBack 倒计时结束回调
 * */
Utils.countdown = function (time, secondsCallback, callBack) {
    var time = parseInt(time);
    secondsCallback && secondsCallback(time);
    var timer = setInterval(function () {
        time--;
        secondsCallback && secondsCallback(time);
        if (time <= 0) {
            callBack && callBack();
            clearInterval(timer);
        }
    }, 1000);
};
/**
 * 匹配字符
 * */
Utils.matching = {
    /**
     * 匹配广东移动手机号码
     * */
    checkPhone: function (phoneNumber) {
        var rex = /^1\d{10}$/;
        return rex.test(phoneNumber);
    }
};
/**
 * cookie
 * */
Utils.cookie = {
    /**
     * 设置cookie元素
     * @param cname
     * @param cvalue
     * @param exdays
     * @return
     */
    set: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
    },
    /**
     * 获取cookie元素
     * @param cname
     * @return
     */
    get: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    },
    /**
     * 删除cookie元素
     * @param name
     * @return
     */
    del: function (name) {
        setCookie(name, "", -1);
    }
};

/**
 * sessionStorage
 * */
Utils.sessionStorage = {
    setItem: function (key, value) {
        try {
            sessionStorage.setItem(key, value);
        } catch (error) {
        }
    },
    getItem: function (key) {
        try {
            return sessionStorage.getItem(key);
        } catch (error) {
        }
    }
};

/**
 * 获取当前环境
 * */
Utils.service = {
    getServ: function () {
        if ((/gmccuat/).test(window.location.pathname)) {
            return "gmccuat";
        } else if ((/gmcctest/).test(window.location.pathname)) {
            return 'gmcctest';
        } else {
            return 'gmccapp';
        }
    }
};
/**
 * 实现单点登录
 * */
Utils.loginIn = {
    servicename: 'GMCCAPP_305_004_001_001',                 //请求接口
    testData: {
        "result": "000",
        "desc": "你好啊"
    },
    Request: function (url, channelId, power, businessId) {
        var jsonData = new Object();
        jsonData.url = url;
        jsonData.channelId = channelId || "wap";
        jsonData.power = power;
        jsonData.businessId = businessId || ''
        var params = {
            "serviceURL": "../../local/",
            "reqKey": "reqJson"
        };
        if (Utils.service.getServ() == "gmccapp") {
            params = {"serviceURL": "../../local/", "reqKey": "reqJson"};
        }
        Utils.doAjaxInterface.doAjax(this.servicename, jsonData, this, params);

        var data = JSON.stringify(this.testData);
        //var data = this.testData;
        //console.log(data);
        //this.doSuccess(data);
        //this.doError();
    },

    doSuccess: function (data) {
        var jData = data;
        var result = jData.result;
        var desc = jData.desc;//alert(result);
        if ("000" == result) {
            window.location.href = jData['url'];
        } else {
            errorAlert.show(desc);
        }
        loadModule.hide();
    },

    doError: function () {
        errorAlert.show("系统繁忙，请稍后再试");
        loadModule.hide();
    }
};
/**
 * 事件
 * */
var eventUtil = {
    /**
     * 添加事件
     * @param element 事件对象
     * @param type 事件类型
     * @param handler 事件方法
     * @param data 当一个事件被触发时要传递event.data给事件处理函数
     * 格式 {element:"",type:"",handler:function,data:{}}
     * */
    addHandler: function (obj) {
        var element = obj.element;
        var type = obj.type;
        var handler = obj.handler;
        var data = obj.data;
        $(element).on(type, data, handler);
    },

    /**
     * 获取事件
     * */
    getEvent: function (event) {
        return event ? event : window.event;
    },

    /**
     * 获取目标源
     * */
    getTarget: function (event) {
        return event.target || event.srcElement;
    },

    /**
     *  移除事件
     * @param element 事件对象
     * @param type 事件类型
     * @param handler 事件方法
     * 格式 {element:"",type:"",handler:function}
     * */
    removeHandler: function (obj) {
        var element = obj.element;
        var type = obj.type;
        var handler = obj.handler;
        $(element).off(type, handler);
    },

    /**
     * 阻止默认事件
     * */
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    /**
     * 阻止事件冒泡
     * */
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};
/**
 * 构建load加载
 * */
var loadModule = {
    show: function () {
        $(".mask-wrap").show();
        $(".loadingimg").show();
        $(".mask-background").show();
    },
    showLoad: function () {
        $(".mask-wrap").show();
        $(".loadingimg").show();
    },
    hide: function () {
        $(".mask-wrap").hide();
        $(".mask-background").hide();
        $(".loadingimg").hide();
    }
};
/**
 * 构建系统繁忙加载模块
 * */
var error = {
    desc: "加载失败，请稍后再试！",
    init: function (callback) {
        if ($(".error-wrap").length > 0) {
            return this;
        }
        var html = '<div class="error-wrap">' +
            '<div class="error-wrapcontent">' +
            '<div class="error-wrapimg" id="pageRefresh"></div>' +
            '<div class="error-wraptext"></div>' +
            '</div>' +
            '</div>';
        $("body").append(html);
        callback && eventUtil.addHandler({          //添加事件
            element: "#pageRefresh",
            type: "click",
            handler: callback,
            data: {}
        });
        return this;
    },
    show: function (retMsg, callback) {
        if ($(".error-wrap").length == 0) {
            this.init(callback);
        }
        var retMsg = retMsg || this.desc;
        $(".error-wrap").show();
        $(".error-wraptext").html(retMsg);
    },
    hide: function () {
        $(".error-wrap").hide();
    }
};
/**
 * 构建系统弹窗框
 * */
var errorAlert = {
    time: 2000,
    create: function () {
        if ($(".errorAlert-wrap").length > 0) {
            return this;
        }
        var html = '<div class="errorAlert-wrap" id="errorAlert">' +
            '<div class="errorAlert">' +
            '<div class="errorAlert-backgroud"></div>' +
            '<div class="errorAlert-text"></div>' +
            '</div>' +
            '</div>';
        $("body").append(html);
    },
    show: function (retMsg, time) {
        if ($(".errorAlert-wrap").length == 0) {
            this.create();
        }
        var time = time || this.time;
        var bol = this;
        $(".errorAlert-wrap").show();
        $(".errorAlert-text").html(retMsg);
        $("#errorAlert").click(function () {
            bol.hide();
        });
        this.timer = setTimeout(function () {
            $(".errorAlert-wrap").hide();
        }, time);
    },
    hide: function () {
        $(".errorAlert-wrap").hide();
        $(".errorAlert-text").html("");
        clearInterval(this.timer);
    }
};

/**
 * 构建在线客服
 * */
var onlineService = {
    create: function (desc, appType) {
        if ($(".onlineService").length > 0) {
            return
        }
        var test = desc || "在线客服";
        var appType = appType || "web";
        var html = '<div class="onlineService" appType="' + appType + '">' +
            '<span>' + test + '</span>' +
            '</div>';
        $("body").append(html);
        eventUtil.addHandler({          //添加事件
            element: ".onlineService",
            type: "click",
            handler: onlineService.gotoOnline,
            data: {}
        });
    },
    show: function (desc, appType) {
        if ($(".onlineService").length == 0) {
            this.create(desc, appType);
        }
        $(".onlineService").show();
    },
    hide: function () {
        $(".onlineService").hide();
    },
    gotoOnline: function () {
        var appType = $(this).attr('appType');
        if (appType == "app") {
            var reqData = new Object()
            reqData.code = 'GMCCAPP_001_009';
            Utils.appJump(reqData);
        } else {
            onlineUrl.Request();
        }
    }
};
/**
 * 在线客服链接查询
 * */
var onlineUrl = {
    servicename: 'GMCCAPP_405_007_001_001',                 //请求接口
    testData: {
        "result": "000",
        "desc": "你好啊"
    },
    Request: function () {
        var jsonData = {};
        jsonData.enterType = 0;
        console.log(jsonData);
        var parmes = {
            "serviceURL": "../../local/",
            "reqKey": "reqJson"
        };
        Utils.doAjaxInterface.doAjax(this.servicename, jsonData, this, parmes);

        var data = JSON.stringify(this.testData);
        //var data = this.testData;
        //console.log(data);
        //this.doSuccess(data);
        //this.doError();
    },

    doSuccess: function (data) {
        var jData = data;
        var result = jData.result;
        var desc = jData.desc;//alert(result);
        if ("000" == result) {
            var url = jData.url;
            window.location.href = url;
        } else if ("100" == result) {
            window.location.href = "http://dx.10086.cn/IvIvmy";
        }
    },

    doError: function () {

    }
};
/**
 * 跳转登录
 * */
Utils.gotoApplogin = function () {
    var reqData = {"code": "GMCCAPP_001_019"};
    Utils.appJump(reqData);
};
/**
 * 跳转下载链接增加渠道标识
 * */
Utils.loadAPPHref = {
    'BAIDU1': 'http://gd.10086.cn/wap2012/notice/baidu.shtml',
    'BAIDU3': 'http://gd.10086.cn/personal/others/baidu3/',
    'BAIDU4': 'http://gd.10086.cn/personal/others/baidu4/',
    'BAIDU5': 'http://gd.10086.cn/personal/others/baidu5/',
    'BAIDU6': 'http://gd.10086.cn/personal/others/baidu6/',
    'BAIDU7': 'http://gd.10086.cn/personal/others/baidu7/',
    'qtqd': 'http://gd.10086.cn/wap2012/notice/qtqd.shtml',
    'rxqd': 'http://gd.10086.cn/wap2012/notice/rxqd.shtml',
    'dszy': 'http://gd.10086.cn/wap2012/notice/dszy.shtml',

    'get': function (defaultHref) {
        var channel = Utils.getQueryString('channel'),
            defaultHref = defaultHref || 'http://gd.10086.cn/xy',
            href = Utils.loadAPPHref[channel] || defaultHref;
        return href;
    }
};

Utils.embeddedCode = {
    Request: function () {
        var reqJson = {"servicename": "GMCCJS_611_001_001_001", "reqData": ""};
        var appDataCallbackObj = Utils.embeddedCode.doSuccess;
        try {
            Utils.appCommunication(reqJson, appDataCallbackObj); // 与客户端交互
        } catch (e) {
        }

    },
    doSuccess: function (data) {
        var appType = Utils.mobileForm.getMobileForm();//获取手机类型
        if ("android" == appType) {
            data = eval("(" + data + ")");
        }
        ;
        var respData = data;
        var result = respData.result;
        var desc = respData.desc;
        if ('000' == result) {
            var mc_id = respData.mc_id;
            var cid = respData.cid;
            var meta1 = '';
            if ("android" === appType) {
                if (mc_id) {
                    if (typeof (wt_mcid) === "undefined") {
                        wt_mcid = "app-10086-android";
                    }
                    if (typeof (_tag.wt_mcid) === "undefined") {
                        _tag.wt_mcid = "app-10086-android";
                    }
                }

            } else {
                if (mc_id) {
                    if (typeof (wt_mcid) === "undefined") {
                        wt_mcid = "app-10086-iOS";
                    }
                    if (typeof (_tag.wt_mcid) === "undefined") {
                        _tag.wt_mcid = "app-10086-iOS";
                    }
                }
            }
            if (cid) {
                if (typeof (wt_cid) === "undefined") {
                    wt_cid = cid;
                }
                if (typeof (_tag.wt_cid) === "undefined") {
                    _tag.wt_cid = cid;
                }
            }
        }
    }
};

/**
 * AES加密
 * */
Utils.AES = {
    encrypt: function(word, keyItem, ivItem) {
        var keyItem = keyItem || 'gmccappkingpoint';
        var ivItem = ivItem || 'gmccappkingpoint';
        var key = CryptoJS.enc.Utf8.parse(keyItem); //16位
        var iv = CryptoJS.enc.Utf8.parse(ivItem);
        var encrypted = '';
        var srcs = CryptoJS.enc.Utf8.parse(word);
        encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    },
    // aes解密
    decrypt: function(word, keyItem, ivItem) {
        var keyItem = keyItem || 'gmccappkingpoint';
        var ivItem = ivItem || 'gmccappkingpoint';
        var key = CryptoJS.enc.Utf8.parse(keyItem); //16位
        var iv = CryptoJS.enc.Utf8.parse(ivItem);
        var decrypt = CryptoJS.AES.decrypt(word, key, {
            iv: iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
};

/**
 * 获取session
 * */
function getSessionId(callBack, jsonData2, serviceURL, reqKey) {
    var getMessage = {
        servicename: 'GMCCAPP_000_000_000_000',
        testData: {
            'result': '000',
            'desc': '6666',
            'sessionId': '44333'
        },
        Request: function () {
            var jsonData = $.extend({
                'equipmentNo': 'WEB',
                'mobileSystem': 'WEB',
                'mobileType': 'WEB',
                'mobileView': 'WEB',
                'appVersion': '5.4.0',
                'channelId': Utils.getQueryString('channelId')||'gmccweb',
                'distribution': 'WEB',
                'appId': getRandom(32),
                'appUid': getRandom(32)
            }, jsonData2);
            var serviceURL = serviceURL || '../../autologin/';
            var reqKey = reqKey || 'reqJson'
            //var data = JSON.stringify(this.testData);
            //var data = this.testData;
            //console.log(data);
            //this.doSuccess(this.testData);
            Utils.doAjaxInterface.doAjax(getMessage.servicename, jsonData, getMessage, {
                "serviceURL": serviceURL,
                "reqKey": reqKey
            })
        },
        doSuccess: function (data) {
            var result = data.result;
            var desc = data.desc;
            if (result == '000') {
                console.log(data);
                session = data.sessionId;
                Utils.doAjaxInterface.setSessionid(session);
            }
            callBack(desc);
        },
        doError: function () {
            callBack("系统繁忙，请稍后再试！");
        }
    };
    getMessage.Request();
}

function getSessionIdNew(obj) {
    // callBack, jsonData2, serviceURL, reqKey,channelId
    var getMessage = {
        servicename: 'GMCCAPP_000_000_000_000',
        testData: {
            'result': '000',
            'desc': '6666',
            'sessionId': '44333'
        },
        Request: function () {
            var jsonData = $.extend({
                'equipmentNo': 'WEB',
                'mobileSystem': 'WEB',
                'mobileType': 'WEB',
                'mobileView': 'WEB',
                'appVersion': '5.4.0',
                'channelId': obj.channelId,
                'distribution': 'WEB',
                'appId': getRandom(32),
                'appUid': getRandom(32)
            }, obj.jsonData2);
            var serviceURL = obj.serviceURL || '../../autologin/';
            var reqKey = obj.reqKey || 'reqJson'
            //var data = JSON.stringify(this.testData);
            //var data = this.testData;
            //console.log(data);
            //this.doSuccess(this.testData);
            Utils.doAjaxInterface.doAjax(getMessage.servicename, jsonData, getMessage, {
                "serviceURL": serviceURL,
                "reqKey": reqKey
            })
        },
        doSuccess: function (data) {
            var result = data.result;
            var desc = data.desc;
            if (result == '000') {
                console.log(data);
                session = data.sessionId;
                Utils.doAjaxInterface.setSessionid(session);
            }
            obj.callBack && obj.callBack();
        },
        doError: function () {
            obj.callBack && obj.callBack("系统繁忙，请稍后再试！");
        }
    };
    getMessage.Request();
}

/**
 * 获取随机数
 * */
function getRandom(length){
    var res = Math.random().toString().slice(2);
    if(res.length > length) return res.slice(0,length)
    while(res.length < length){
        res += Math.floor(Math.random() * 10)
    }
    return res;
}

/**
 * 获取登录状态
 * */
function getLoginMes(callBack, fail) {
    var getMobileNumber = {
        servicename: 'GMCCAPP_530_021_001_001',                 //请求接口
        testData: {
            "result": "000",
            "desc": "66666",
            "mobileNumber": "13800138001"
        },
        Request: function () {
            var jsonData = {};
            //var data = JSON.stringify(this.testData);
            //var data = this.testData;
            //console.log(data);
            //this.doSuccess(data);
            Utils.doAjaxInterface.doAjax(getMobileNumber.servicename, jsonData, getMobileNumber, {
                "serviceURL": "../../serv/",
                "reqKey": "reqJson"
            });
            //this.doError();
        },
        doSuccess: function (data) {
            var jData = data;
            var result = jData.result;
            var desc = jData.desc;
            if (result == '000') {
                var mobileNumber = jData.personalInfo.mobileNumber;
                callBack(mobileNumber, desc);
            } else {
                callBack && callBack('', desc);
            }
        },
        doError: function () {
            callBack && callBack('', '系统繁忙，请稍后再试！');
        }
    };
    getMobileNumber.Request();
}

/**
 * app外部4g取号登录和登录状态获取
 * @param {function} success 获取成功方法
 *                  返回参数  {string} mobileNumber 获取到的手机号码
 * @param {function} fail 获取失败方法
 *                  返回参数  {string} message 错误提示语
 * @param {string} bussinessId 业务Id
 * @param {string} isLogin 是否登录  0是1否       （可选）
 * */
function gmccAutoLogin(success, fail, businessId, sessionidData, isLogin) {
    var sessionid = Utils.doAjaxInterface.getSessionid() || Utils.doAjaxInterface.getSession();
    if (sessionid) {
        getLoginMes(function (phoneNumber) {
            if (phoneNumber) {
                success && success(phoneNumber)
            } else {
                getMobileNumberBy4GNew(success, fail, businessId, isLogin);
            }
        });
    } else {
        getSessionId(function () {
            getMobileNumberBy4GNew(success, fail, businessId, isLogin);
        }, sessionidData)
    }
}

function gmccAutoLoginNew(obj) {
    // success, fail, businessId, sessionidData, isLogin
    var sessionid = Utils.doAjaxInterface.getSessionid() || Utils.doAjaxInterface.getSession();
    if (sessionid) {
        getLoginMes(function (phoneNumber) {
            if (phoneNumber) {
                obj.success && obj.success(phoneNumber)
            } else {
                getMobileNumberBy4GNew(obj.success, obj.fail, obj.businessId, obj.isLogin);
            }
        });
    } else {
        // callBack, jsonData2, serviceURL, reqKey,channelId
        getSessionIdNew({
            callBack:function () {
                getMobileNumberBy4GNew(obj.success, obj.fail, obj.businessId, obj.isLogin);
            },
            channelId:obj.channelId,
            jsonData2:obj.sessionidData
        })
    }
}

/**
 * 跳转app功能（非app也适用）
 * */
function gmccAppJump(code, id, businessId) {
    var channelId = Utils.getQueryString('channelId'),
        isApp = Utils.getQueryString('isApp');
    if (channelId == 'gmccapp' || isApp === '0') {
        var reqData = {};
        reqData.code = code;
        reqData.id = id;
        Utils.appJump(reqData);
    } else {
        if (code == 'GMCCAPP_003_004') {
            var attr = id.split('|');
            Utils.loginIn.Request(attr[2], attr[1], attr[0], businessId);
        } else {
            window.location.href = 'http://gd.10086.cn/personal/others/text/index.shtml?functionCode=' + code + '&functionId=' + id + '';
        }
    }
}

/**
 * 10086APP动态获取标题无法显示问题
 * */
function iphoneTitle(title) {
    var body = document.getElementsByTagName('body')[0];
    var iframe = document.createElement("iframe");
    iframe.style.display = "none";
    // iframe.setAttribute("src", "index.html");
    document.title = title;
    var d = function () {
        setTimeout(function () {
            iframe.removeEventListener('load', d);
            body.removeChild(iframe);
        }, 0);
    };
    iframe.addEventListener('load', d);
    body.appendChild(iframe);
}

/**
 * 生成32位随机码
 * */
function randomCode() {
    var timestamp = new Date().getTime().toString();
    var arr = 'abcdefghijklmnopqrstuvwsyz0123456789'.split('');
    var nonce = '',
        len = 32 - timestamp.length;
    for (var i = 0; i < timestamp.length; i++) {
        nonce += arr[timestamp[i]];
    }
    for (var j = 0; j < len; j++) {
        var num = Math.round(Math.random() * 35);
        nonce += arr[num];
    }
    return nonce;
}

/**
 * 4G取号并且登录(新)
 * @param {function} success 获取成功方法     （可选）
 *                  返回参数  {string} mobileNumber, prodToken  获取到的手机号码
 * @param {function} fail 获取失败方法        （可选）
 *                  返回参数  {string} message 错误提示语
 * @param {string} bussinessId 业务Id         （可选）
 * @param {string} isLogin 是否登录  0是1否       （可选）
 * */
function getMobileNumberBy4GNew(success, fail, bussinessId, isLogin) {
    var appId = '300011877495',
        version = '1.2';
    var sign = YDRZ.getSign(appId, version);
    isLogin = isLogin || '0';
    //智能链接准签名
    var signVerify = {
        servicename: 'GMCCAPP_000_000_002_006',
        testData: {
            'result': '000',
            'desc': '6666',
            'sessionId': '44333'
        },
        Request: function () {
            var jsonData = {
                rawData: sign,
                bussinessId: bussinessId
            };
            var serviceURL = '../../login/';
            var reqKey = 'reqJson';
            //var data = JSON.stringify(this.testData);
            //var data = this.testData;
            //console.log(data);
            //this.doSuccess(this.testData);
            Utils.doAjaxInterface.doAjax(signVerify.servicename, jsonData, signVerify, {
                "serviceURL": serviceURL,
                "reqKey": reqKey
            })
        },
        doSuccess: function (data) {
            var result = data.result;
            var desc = data.desc;
            if (result == '000') {
                var sign = data.sign;
                YDRZ.getTokenInfo({
                    data: {//请求的参数
                        version: version, //接口版本号 （必填）
                        appId: appId, //应用Id （必填）
                        sign: sign,//RSA加密后的sign（必填）
                        openType: '1', //移动取号接口填写1,三网取号接口填写0 （必填）
                        // expandParams: encodeURI('phoneNum=13824947127'),//扩展参数  格式：参数名=值  多个时使用 | 分割 （选填）
                        expandParams: '',//扩展参数  格式：参数名=值  多个时使用 | 分割 （选填）
                        isTest: '1'//是否启用测试线地址（传0时为启用不为0或者不传时为不启用）
                    },
                    success: function (res) {//成功回调
                        if (res.code === '000000') {
                            tokenVerify.Request(res.token, res.userInformation);
                        }else{
                            fail && fail(res.message);
                        }
                    },
                    error: function (res) {//错误回调
                        fail && fail(res.message);
                    }
                })
            }else{
                fail && fail(desc);
            }
        },
        doError: function () {
            fail && fail("系统繁忙，请稍后再试！");
        }
    };
    //智能链接token校验
    var tokenVerify = {
        servicename: 'GMCCAPP_000_000_002_007',
        testData: {
            'result': '000',
            'desc': '6666',
            'sessionId': '44333'
        },
        Request: function (token, userInformation) {
            var jsonData = {
                token: token,
                userInformation: userInformation,
                bussinessId: bussinessId
            };
            var serviceURL = '../../login/';
            var reqKey = 'reqJson';
            //var data = JSON.stringify(this.testData);
            //var data = this.testData;
            //console.log(data);
            //this.doSuccess(this.testData);
            Utils.doAjaxInterface.doAjax(this.servicename, jsonData, this, {
                "serviceURL": serviceURL,
                "reqKey": reqKey
            })
        },
        doSuccess: function (data) {
            var result = data.result;
            var desc = data.desc;
            if (result == '000') {
                if (isLogin == '0') {
                    login.Request();
                }else{
                    var mobileNumber = data.mobileNumber;
                    success(mobileNumber);
                }
            }else{
                fail && fail(desc);
            }
        },
        doError: function () {
            fail && fail("系统繁忙，请稍后再试！");
        }
    };
    //智能链接登录
    var login = {
        servicename: 'GMCCAPP_000_000_002_008',
        testData: {
            'result': '000',
            'desc': '6666',
            'sessionId': '44333'
        },
        Request: function () {
            var jsonData = {
                bussinessId: bussinessId,
                channelId: Utils.getQueryString('channelId')
            };
            var serviceURL = '../../login/';
            var reqKey = 'reqJson';
            //var data = JSON.stringify(this.testData);
            //var data = this.testData;
            //console.log(data);
            //this.doSuccess(this.testData);
            Utils.doAjaxInterface.doAjax(this.servicename, jsonData, this, {
                "serviceURL": serviceURL,
                "reqKey": reqKey
            })
        },
        doSuccess: function (data) {
            var result = data.result;
            var desc = data.desc;
            if (result == '000') {
                var mobileNumber = data.mobileNumber;
                var prodToken = data.prodToken;
                success(mobileNumber, prodToken);
            }else{
                fail && fail(desc);
            }
        },
        doError: function () {
            fail && fail("系统繁忙，请稍后再试！");
        }
    };
    signVerify.Request();
};

/**
 * 4G取号嵌码
 * */
function getMobileNumberBy4GEmbeddedCode() {
    var appId = '300011877495';
    var _udataProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cscript src='" + _udataProtocol + "da.mmarket.com/udata/udata.js%3faid%"+appId+"' type='text/javascript'%3E%3C/script%3E"));

}