$(function() {
    // 登录和注册的切换
    $('#line_res').click(function() {
        $('.table_enroll').hide();
        $('.table_register').show();
    })
    $('#line_enroll').click(function() {
            $('.table_enroll').show();
            $('.table_register').hide();
        })
        // 表单验证
    var form = layui.form;
    var layer = layui.layer;
    // console.log(layer);
    form.verify({
        repsw: function(value) {
            let val = $('#password').val();
            if (value != val) {
                return '两次密码输入不一致';
            }
        },
        psw: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    })
    $('#form').on('submit', function(event) {
        event.preventDefault();
        const data = $(this).serialize();
        console.log(data);
        $.post('http://www.liulongbin.top:3007/api/login', data, function(res) {
            console.log(res);
            if (res.status != 0) {
                return alert('登录失败');
            }
            localStorage.setItem('key', res.token);
            location.href = 'http://127.0.0.1:5500/index.html';
        })
    })
    $('#form2').on('submit', function(event) {
        event.preventDefault();
        data = $(this).serialize();
        $.post('http://www.liulongbin.top:3007/api/reguser', data, function(res) {
            console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功', {
                icon: 1,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            }, function() {
                $('#line_enroll').click();
            });
        })
    })
})