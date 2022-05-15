$(function() {
    let form = layui.form;
    let layer = layui.layer;
    console.log("🚀 ~ file: user_pwd.js ~ line 4 ~ layer", form)
        // 表单验证
    form.verify({
        oldPwd: function(value) {
            let newPwd = $('#oldPwd').val();
            if (value === newPwd) {
                return '密码不能一样';
            }
        },
        newPwd: function(value) {
            let newPwd = $('#newPwd').val();
            if (value !== newPwd) {
                return '密码必须一样';
            }
        }


        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    });
    // 提交修改的密码
    $('#form').submit(function(e) {
        e.preventDefault();
        // console.log(1);
        let data = $(this).serialize()
        console.log("🚀 ~ file: user_pwd.js ~ line 33 ~ $ ~ data", data)
        $.post('/my/updatepwd', data, function(res) {
            console.log(res);
            if (res.status === 0) {
                return layer.msg(res.message)
            } else {
                return layer.msg(res.message)
            }

        })
    })
})