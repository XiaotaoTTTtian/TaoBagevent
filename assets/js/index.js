$(function() {
        let layer = layui.layer;
        // console.log(layer);
        $.ajax({
                method: 'get',
                url: '/my/userinfo',
                // header: localStorage.getItem('key'),
                // headers: {
                //     'Authorization': localStorage.getItem('key')
                // },
                success: function(res) {
                    console.log(res);
                    if (res.status != 0) {
                        return layer.msg(res.message);
                    }
                    getUserPic(res.data);
                }
            })
            // 退出
        $('#exit').click(function() {
            // console.log(1);
            layer.confirm('是否退出登录?', { icon: 3, title: '提示' }, function(index) {
                //do something
                localStorage.removeItem('key');
                location.href = 'http://127.0.0.1:5500/login.html';
                layer.close(index);
            });

        })

    })
    // 设置用户昵称和图片
function getUserPic(data) {
    let uname = data.nickname || data.username;
    let pic = (uname + '').charAt(0).toUpperCase();
    console.log(pic);
    $('#userid').html('欢迎&nbsp;&nbsp;' + uname);
    if (data.user_pic == null) {
        $('.text_pic').html(pic).show();
        $('.layui-nav-img').hide();
    } else {
        $('.text_pic').hide();
        $('.layui-nav-img').show();
        $('.layui-nav-img').prop('src', data.user_pic);

    }
}