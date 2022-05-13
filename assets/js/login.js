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
    // console.log(form);
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
        // 发起ajax请求
        // $('#form1').submit(function(event) {
        //     // console.log(1);
        //     alert(1)
        //     event.preventDefault();
        //     // $.ajax({
        //     //     method: 'get',
        //     //     url: 'https://www.showdoc.cc/escook?page_id=3707158761215217',
        //     //     success: function(res) {
        //     //         console.log(res);
        //     //     }
        //     // })
        // })
    $('#form').on('submit', function(event) {
        event.preventDefault();
        const data = $(this).serialize();
        console.log(data);
        $.post('http://www.liulongbin.top:3007/api/login', data, function(res) {
            console.log(res);
        })
    })
    $('#form2').on('submit', function(event) {
        event.preventDefault();
        data = {
            username: $('#username').val(),
            password: $('#password').val()
        }

        $.post('http://www.liulongbin.top:3007/api/reguser', data, function(res) {
            console.log(res);
        })
        console.log(1);
    })
})