// 1
//性别
$("input[name='user-sex']").picker({
    title: "请选择您的性别",
    toolbarCloseText: "确定",
    cols: [{
        textAlign: 'center',
        values: ['0', '1'],
        displayValues: ['男', '女']
    }],
    onChange: function(e) {
        $('.show_sex').html(e.displayValue[0]);
    }
});
//生日
$("input[name='user-birthday']").datetimePicker({
    title: "请选择您的生日",
    toolbarCloseText: "确定",
    times: function() {
        return []
    }
});
//城市
$("input[name='user-city']").cityPicker({
    title: "请选择您的城市",
    toolbarCloseText: "确定"
});
//学历
$("input[name='user-xl']").picker({
    title: "请选择您的学历",
    toolbarCloseText: "确定",
    cols: [{
        textAlign: 'center',
        values: ['高中及以下', '大专', '本科', '研究生在读', '硕士', '博士']
    }]
});
var upload = function(c) {
    "use strict";
    var $c = document.querySelector(c),
        file = $c.files[0],
        reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
        // $d.setAttribute("src", e.target.result);
        var li = document.createElement('li');
        var img = document.createElement('img');
        img.src = e.target.result;
        var aDel = document.createElement('a');
        aDel.href = 'javascript:;';
        aDel.onclick = function() {
            this.parentNode.remove();
            $c.parentNode.style.display = 'block';
            $c.value = '';
        }
        li.appendChild(img);
        li.appendChild(aDel);
        $c.parentNode.previousElementSibling.appendChild(li);
        $c.parentNode.style.display = 'none';
    };
};
//证件类型
$("input[name='user-zjtype']").picker({
    title: "请选择您的证件类型",
    toolbarCloseText: "确定",
    cols: [{
        textAlign: 'center',
        values: ['全部', '大陆身份证', '台胞证', '护照']
    }]
});
//如何了解到我们
$("input[name='user-knowus']").picker({
    title: "请选择您是如何了解到我们",
    toolbarCloseText: "确定",
    cols: [{
        textAlign: 'center',
        values: ['微信朋友圈', '朋友介绍', '论坛、广告等', '课程培训', '线下咨询机构', '其他']
    }]
});

// 2
//职业背景
$("input[name='user-zybj']").picker({
    title: "请选择您的职业背景",
    toolbarCloseText: "确定",
    cols: [{
        textAlign: 'center',
        values: ['全职', '兼职']
    }]
});
//资质认证
$("input[name='user_aptitude']").picker({
    title: "请选择您的资质",
    toolbarCloseText: "确定",
    cols: [{
        textAlign: 'center',
        values: [
            '国家二级心理咨询师',
            '国家三级心理咨询师',
            '精神科医师',
            '心理治疗师',
            '注册系统心理师',
            '注册系统督导师',
            '注册系统助理心理师',
            '心理健康辅导员',
            '婚姻家庭咨询师',
            '在港澳台地区及海外执业的专家：需提供有当地法律认可的执业资格',
            '心理工作者',
            '医生',
            '律师',
            '教师'
        ]
    }]
});
//打开添加资质弹窗
var openAddAptitude = function() {
    $("input[name='user_aptitude']").val('');
    $("input[name='user_aptitude_num']").val('');
    $('.aptitude_popup .pic-list li').remove();
    $('#zzPic').parent().show();
    $('#zzPic').val('');
    $('.aptitude_popup').fadeIn(200);
}
//确认添加资质
$('.aptitude_popup .confirm').click(function() {
    var zzgrade = $("input[name='user_aptitude']").val(),
        zzNum = $("input[name='user_aptitude_num']").val(),
        zzPic = $('.aptitude_popup .pic-list img').attr('src');

    if (zzgrade == '') {
        $.alert("资质认证不能为空");
        return
    }

    aptitudeDivs(zzgrade, zzNum, zzPic);
    $('.aptitude_popup').fadeOut(200);
    var listLen = $('#aptitudeList>div').length;
    if (listLen >= 3) {
        $('.add-aptitude').hide();
    }
})
//资质结构
var aptitudeDivs = function(grade, num, picUrl) {
    var cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    var card1 = document.createElement('div');
    card1.className = 'aptitude-card';
        var label1 = document.createElement('div');
        label1.className = 'label';
        label1.innerHTML = '资质认证：';
        var info1 = document.createElement('div');
        info1.className = 'info';
        info1.innerHTML = grade;
    card1.appendChild(label1);
    card1.appendChild(info1);
    cardDiv.appendChild(card1);

    if (num !== '') {
        var card2 = document.createElement('div');
        card2.className = 'aptitude-card';
            var label2 = document.createElement('div');
            label2.className = 'label';
            label2.innerHTML = '资质编号：';
            var info2 = document.createElement('div');
            info2.className = 'info';
            info2.innerHTML = num;
        card2.appendChild(label2);
        card2.appendChild(info2);
        cardDiv.appendChild(card2);
    }
        
    if (picUrl !== undefined) {
        var card3 = document.createElement('div');
        card3.className = 'aptitude-card';
            var label3 = document.createElement('div');
            label3.className = 'label';
            label3.innerHTML = '资质证书：';
            var info3 = document.createElement('div');
            info3.className = 'info aptitude-pic';
                var img = document.createElement('img');
                img.src = picUrl;
            info3.appendChild(img);
        card3.appendChild(label3);
        card3.appendChild(info3);
        cardDiv.appendChild(card3);
    }

    var card4 = document.createElement('div');
    card4.className = 'aptitude-card aptitude-del';
        var aBtn = document.createElement('a');
        aBtn.href = 'javascript:;';
        aBtn.innerHTML = '删除该资质';
        aBtn.onclick = function() {
            this.parentNode.parentNode.remove();
            var listLen = $('#aptitudeList>div').length;
            if (listLen < 3) {
                $('.add-aptitude').show();
            }
        }
    card4.appendChild(aBtn);
    cardDiv.appendChild(card4);

    document.getElementById('aptitudeList').appendChild(cardDiv);
}
//打开图片示例
var openPicExample = function(obj) {
    var picSrc = $(obj).attr('data-src');
    $('.pic_popup img').attr('src', picSrc);
    $('.pic_popup').fadeIn(200);
}
//从业时间
$("input[name='user-age-time']").datetimePicker({
    title: "请选择您的从业时间",
    toolbarCloseText: "确定",
    times: function() {
        return []
    }
});
//受训背景
$('.training-btn').click(function() {
    $('.training-inp').fadeIn(200);
    $('.training-inp input').focus();
})
$('.training-inp input').on('blur', function() {
    var listDiv = document.createElement('div');
    listDiv.className = 'weui-cell_swiped';

    var topDiv = document.createElement('div');
    topDiv.className = 'weui-cell__bd';
    topDiv.style.transform = 'translate3d(0px, 0px, 0px)';
    var content = document.createElement('div');
    content.className = 'weui-cell';
    content.innerHTML = $(this).val();
    topDiv.appendChild(content);

    var footDiv = document.createElement('div');
    footDiv.className = 'weui-cell__ft';
    var delA = document.createElement('a');
    delA.className = 'weui-swiped-btn weui-swiped-btn_warn delete-swipeout';
    delA.href = 'javascript:;';
    delA.innerHTML = '删除';
    delA.onclick = function() {
        // this.appendNode.appendNode.remove();
        this.parentNode.parentNode.remove();
    }
    footDiv.appendChild(delA);

    listDiv.appendChild(topDiv);
    listDiv.appendChild(footDiv);

    document.getElementById('trainingList').appendChild(listDiv);
    $('#trainingList>div').swipeout();
    $('.training-inp').hide();
    $(this).val('');
})
//多图片上传
var uploads = function(c) {
    "use strict";
    var $c = document.querySelector(c),
        files = $c.files;
    $.each(files, function(index, item) {
        var reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onload = function(e) {
            var li = document.createElement('li');
            li.className = 'weui-uploader__file';
            li.style.backgroundImage = 'url(' + e.target.result + ')';
            var aDel = document.createElement('a');
            aDel.href = 'javascript:;';
            aDel.onclick = function() {
                this.parentNode.remove();
            }
            li.appendChild(aDel);
            $c.parentNode.previousElementSibling.appendChild(li);
        };
    })
}
//打开文字示例
var openTextExample = function(name) {
    var textCont = document.getElementById('textCont');
    textCont.innerHTML = '';
    if (name === 'specialty') { //专业背景
        var p1 = document.createElement('p');
        p1.innerHTML = '国家心理咨询师培训师（认证师资）；';
        var p2 = document.createElement('p');
        p2.innerHTML = '企业EAP咨询师；';
        var p3 = document.createElement('p');
        p3.innerHTML = '中国心理卫生协会会员；';
        var p4 = document.createElement('p');
        p4.innerHTML = '中科院心理所医学心理学硕士研究生；';
        textCont.appendChild(p1);
        textCont.appendChild(p2);
        textCont.appendChild(p3);
        textCont.appendChild(p4);
    } else if (name === 'scly') { //擅长领域
        var p1 = document.createElement('p');
        p1.innerHTML = '婚恋情感，家庭矛盾，个人成长，亲子教育，人际职场，情绪压力，性心理；按照擅长程度来排列，排在前面的会优先派单';
        textCont.appendChild(p1);
    } else if (name === 'zxfg') { //咨询风格
        var p1 = document.createElement('p');
        p1.innerHTML = '耐心、和蔼、严谨、敏锐、热诚，用几个关键词来形容自己的风格';
        textCont.appendChild(p1);
    }
    $('.text_popup').fadeIn(200);
}
// 上传头像
var uploadHead = function(c) {
    "use strict";
    var $c = document.querySelector(c),
        file = $c.files[0],
        reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
        // $d.setAttribute("src", e.target.result);
        $('.upload_head img').attr('src', e.target.result);
    };
}