// 1
//性别
$("input[name='user-sex']").picker({
    title: "请选择您的性别",
    toolbarCloseText: "确定",
    cols: [{
        textAlign: 'center',
        values: ['男', '女']
    }]
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
$("input[name='user-aptitude']").select({
    title: "请选择您的资质",
    multi: true,
    min: 1,
    max: 3,
    items: [
        {
            title: "国家二级心理咨询师",
            value: 1
        },
        {
            title: "国家三级心理咨询师",
            value: 2
        },
        {
            title: "精神科医师",
            value: 3
        },
        {
            title: "心理治疗师",
            value: 4
        },
        {
            title: "注册系统心理师",
            value: 5
        },
        {
            title: "注册系统督导师",
            value: 6
        },
        {
            title: "注册系统助理心理师",
            value: 7
        },
        {
            title: "心理健康辅导员",
            value: 8
        },
        {
            title: "婚姻家庭咨询师",
            value: 9
        },
        {
            title: "在港澳台地区及海外执业的专家：需提供有当地法律认可的执业资格",
            value: 10
        },
        {
            title: "心理工作者",
            value: 11
        },
        {
            title: "医生",
            value: 12
        },
        {
            title: "律师",
            value: 13
        },
        {
            title: "教师",
            value: 14
        }
    ]
});