adaptive();

var data = {
    phone: '',
};

/*window.onload = function () {
    data.phone = getCookie('tel4NCP');
    if (data.phone) {
        getSessionId(function () {
            api.index.Request()
        })
    }else {
        location.href = 'https://app.10086.cn/activity/epidemicQuery/index.html'
    }
};
*/
function adaptive() {
    !function () {
        function e() {
            var e = document.documentElement.clientWidth, t = document.querySelector("html"),
                f = e / 20;
            window.fontSize = f;
            t.style.fontSize = f + "px"
        }

        e(), window.addEventListener("resize", e);
    }();
}

//写cookies

function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();

    var time = 's60';
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec*1);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getsec(str)
{
    var str1=str.substring(1,str.length)*1;
    var str2=str.substring(0,1);
    if (str2=="s")
    {
        return str1*1000;
    }
    else if (str2=="h")
    {
        return str1*60*60*1000;
    }
    else if (str2=="d")
    {
        return str1*24*60*60*1000;
    }
}

function getCookie(name){
    var strcookie = document.cookie;//获取cookie字符串
    var arrcookie = strcookie.split("; ");//分割
//遍历匹配
    for ( var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name){
            return arr[1];
        }
    }
    return "";
}

// 关闭弹框
function closeAlert(obj) {
    $(obj).hide();
}

//显示弹框
function showAlert(obj) {
    $(obj).show();
}

var api = {
    index: {
        servicename: 'GMCCAPP_704_014_001_002',
        Request: function () {
            var jsonData = {
                encryptContent:data.phone
            };
            var param = {
                "serviceURL": "../../serv/",
                "reqKey": "reqJson"
            };
            Utils.doAjaxInterface.doAjax(this.servicename, jsonData, this, param);
        },
        doSuccess: function (res) {
            if (res.result === '000') {
                loadModule.hide();

                $('.login').hide();

                if (res.roamingCities_15==='u14')  {
                    $('.res_data_t1').text('由于您在网时间不足15日，无法提供15天内行程查询服务。');
                    $('.res_data_2,.res_data_box').text('')
                }else if (res.roamingCities_30==='u30') {
                    var $ul = $('.data1');
                    $ul.empty();
                    $ul.text(res.roamingCities_15);

                    $('.res_data_t2').text('由于您在网时间不足30日，无法提供16-30天内行程查询服务。')
                    $('.res_data_2>.res_data_box').text('')
                }else {
                    var $ul = $('.data1');
                    $ul.empty();
                    $ul.text(res.roamingCities_15);


                    $ul = $('.data2');
                    $ul.empty();
                    $ul.text(res.roamingCities_30);
                }


                var p = res.mobileNumber;
                p = p.replace(p.substring(3, 7), '****');

                $('.show_phone').text(p);
                _tag.setMobile(res.mobileNumber);


                $('#app').show();
            }else {
                loadModule.hide();
                $('#app').show();
                $('.res_data_box').text('暂无查询结果');
                $('.modal_center').text('系统繁忙，暂不能提供漫游地查询服务，请您稍后再试，谢谢。')
                showAlert('.guidance');
            }
        },
        doError: function () {
            loadModule.hide();
            errorAlert.show('系统繁忙，请稍候再试！');
        }
    }
};

/************************************************分享部分***************************/
var shareIcon = `https://gd.10086.cn/${Utils.service.getServ()}/webpage/roamInquire/images/icon.jpg`;// 分享后展示的一张图片

var lineLink = 'https://app.10086.cn/activity/epidemicQuery/index.html'; // 点击分享后跳转的页面地址
var shareDesc = '中国移动疫情期间行程查询服务'  // 分享后的描述信息
var shareTitle = '疫情期间行程查询' // 分享后的标题
var appid = ''; // 应用id,如果有可以填，没有就留空

function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage', {
        "appid": appid,
        "img_url": shareIcon,
        "img_width": "200",
        "img_height": "200",
        "link": lineLink,
        "desc": shareDesc,
        "title": shareTitle
    }, function (res) {
        //_report('send_msg', res.err_msg);  // 这是回调函数，必须注释掉
    })
}

function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline', {
        "img_url": shareIcon,
        "img_width": "200",
        "img_height": "200",
        "link": lineLink,
        "desc": shareDesc,
        "title": shareTitle
    }, function (res) {
        //_report('timeline', res.err_msg); // 这是回调函数，必须注释掉
    });

}

function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo', {
        "content": shareDesc,
        "url": lineLink,
    }, function (res) {
        //_report('weibo', res.err_msg);
    });
}

// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    // 发送给好友
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
        shareFriend();
    });
    // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
        shareTimeline();
    });
    // 分享到微博
    WeixinJSBridge.on('menu:share:weibo', function (argv) {
        shareWeibo();
    });
}, false);
