$(function() {
    let layer = layui.layer;
    $('#file_upload').click(function() {
        // console.log(1);
        $('#files').click();
    })
    $('#files').change(function(e) {
        // console.log(e.target);
        let file = e.target.files[0];
        // console.log(base64);
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })
    $('#affirm').click(function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
            // console.log(dataURL);
        $.post('/my/update/avatar', { avatar: dataURL }, function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            window.parent.getRender();
        })
    })
})