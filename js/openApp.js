// 打开APP
function openApp() {
    $('.confirm').fadeOut(200);
    var ua = navigator.userAgent.toLowerCase();

    if (isWeixinBrowser(ua)) {
        $('.layer').show(); //遮罩层（使用外部浏览器打开，此处样式自行设定）
    } else {
        if (isAndroid(ua)) {
            //android
            // window.location = 'innersect://navigation?target=product&id=1747';
            window.location = 'qingshuo://launcher';
            var loadDateTime = Date.now();
            var turn = setTimeout(function() {
                var timeOutDateTime = Date.now();
                if ((timeOutDateTime - loadDateTime) < 1000) {
                    window.location = 'http://www1.qingshuo.com/download/app_download.html'
                }
            }, 600);
        } else {
            //ios
            window.location = 'https://itunes.apple.com/cn/app/%E6%83%85%E8%AF%B4/id1255033300';
            /*let loadDateTime = Date.now();
            let turn = setTimeout(function() {
                let timeOutDateTime = Date.now();
                if ((timeOutDateTime - loadDateTime) < 1000) {
                    window.location = 'itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1243476718';
                }
            }, 600);*/
        }
    }
}
function isWeixinBrowser(ua) {
    return (/micromessenger/.test(ua)) ? true : false;
}
function isAndroid(ua) {
    return ua.indexOf('android') > -1 || ua.indexOf('linux') > -1;
}

$('.layer').click(function() {
    $(this).fadeOut(200);
})