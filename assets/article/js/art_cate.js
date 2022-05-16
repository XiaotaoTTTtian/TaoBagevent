$(function() {
        // console.log(1);
        // 获取数据
        let layer = layui.layer;
        getPages();
        let indexAdd = null;
        let indexEdit = null;
        $('#add').click(function() {
                indexAdd = layer.open({
                    type: 1,
                    content: $('#dialog-add').html(),
                    area: ['500px', '300px'],
                    title: ['添加文章分类', 'font-size:18px;'],
                    closeBtn: 1
                });

            })
            // 添加图书
        $('body').on('submit', '#form_add', function(event) {
                // console.log(event);
                event.preventDefault();
                // console.log(1);
                let data = $('#form_add').serialize();
                // console.log(data);
                $.post('/my/article/addcates', data, function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg(res.message);
                    layer.close(indexAdd);

                    getPages()
                })
            })
            // 删除图书
        $('#tbody').on('click', '.delete', function() {
                let id = $(this).parent().prop('id');
                console.log(id);
                $.ajax({
                    method: 'GET',
                    // url: '/my/article/deletecate/:id' + id,
                    url: '/my/article/deletecate/' + id,
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message);
                        }
                        layer.msg(res.message);
                        getPages()
                    }
                })

            })
            // 编辑图书
        $('#tbody').on('click', '.edit', function() {
                let id = $(this).parent().prop('id');
                let form = layui.form;
                // console.log(id);
                $.ajax({
                    method: 'GET',
                    // url: '/my/article/deletecate/:id' + id,
                    url: '/my/article/cates/' + id,
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message);
                        }
                        layer.msg(res.message);
                        // console.log(res);
                        indexEdit = layer.open({
                            type: 1,
                            content: $('#dialog-edit').html(),
                            area: ['500px', '300px'],
                            title: ['修改文章分类', 'font-size:18px;'],
                            closeBtn: 1
                        });
                        form.val("formEdit", res.data);
                    }
                })

            })
            // 上传
        $('body').on('submit', '#form_edit', function(event) {
            event.preventDefault();
            // alert(1)
            let data = $(this).serialize();
            // console.log(data);
            $.post('/my/article/updatecate', data, function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                layer.close(indexEdit);
                getPages();
            })

        })
    })
    // 渲染页面
function getPages() {
    $.get('/my/article/cates', function(res) {
        let layer = layui.layer;
        // console.log(res);
        if (res.status !== 0) {
            return layer.msg(res.message)
        }
        layer.msg(res.message);
        let htmlstr = template('table_body', res);
        // console.log(htmlstr);
        $('#tbody').html(htmlstr);
    })
}