$(function() {
    $('#line_res').click(function() {
        $('.table_enroll').hide();
        $('.table_register').show();
    })
    $('#line_enroll').click(function() {
        $('.table_enroll').show();
        $('.table_register').hide();
    })
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
})