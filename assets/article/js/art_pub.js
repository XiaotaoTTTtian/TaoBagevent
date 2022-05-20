$(function() {
    // console.log(1);
    // 渲染下拉选择框列表
    let layer = layui.layer;
    $.get('/my/article/cates', function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            let htmlstr = template('select_kind', res);
            $('#kind').html(htmlstr);
            layui.form.render();
        })
        // 初始化富文本编辑器
    initEditor();
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    var status = '已发布';
    // 3. 初始化裁剪区域
    $image.cropper(options)
        // 给添加封面添加点击事件
    $('#btn_select').click(function(res) {
        $('#file').click();
    })
    $('#file').change(function(e) {
        let file = e.target.files[0]
            // console.log(file);
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    $('#form').on('submit', function(event) {
        event.preventDefault();
        // alert(1);
        let form = document.getElementById('form')
        let fd = new FormData($(this)[0]);
        fd.append('state', status);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                fd.append('cover_img', blob)
                    // console.log(blob);
                publishText(fd)
                status = '已发布';
            })
            // 
    })
    $('#draft').click(function(event) {
        status = '草稿';
    })
})

function publishText(fd) {
    // console.log(1);
    $.ajax({
        method: 'POST',
        url: '/my/article/add',
        data: fd,
        contentType: false,
        processData: false,
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            // layer.msg(res.message);
            location.href = 'http://127.0.0.1:5500/article/art_list.html';
        }
    })
}