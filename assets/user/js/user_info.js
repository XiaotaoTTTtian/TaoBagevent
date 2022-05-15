$(function() {
        let layer = layui.layer;
        getPages()
            // 重置按钮
        $('#reset').click(function() {
                getPages()
                    // console.log(1);
            })
            // 提交按钮
        $('#form').submit(function(e) {
            e.preventDefault();
            let data = $(this).serialize();
            // console.log(data);
            $.post('/my/userinfo', data, function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败！')
                } else {
                    return layer.msg(res.message)

                }

            })
            window.parent.getRender();
        })
    })
    // 渲染页面
function getPages() {
    let form = layui.form;
    let layer = layui.layer;
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {

            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            //给表单赋值
            form.val("formTest", res.data);
        }
    })
}