$(function() {
    // 获取数据
    let layer = layui.layer;
    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    getPages()
        // 渲染页面
    function getPages() {
        // $.get('/my/article/list', q, function(res) {
        //     console.log(res);
        //     if (res.status !== 0) {
        //         return layer.msg('失败');
        //     }
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('失败');
                }
                // console.log(res);
                layer.msg('成功');
                let htmlstr = template('tpl_table', res);
                $('#tbody').html(htmlstr);
            }
        })

    }
    getTotal()

    function getTotal() {
        $.get('/my/article/list', q, function(res) {
            if (res.status !== 0) {
                return;
            }
            // console.log(res);
            Pages(res.total)
        })
    }
    // 分类下拉选择框的渲染
    $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return;
                }
                // console.log(res);
                let htmlSelct = template('s_calss', res);
                $('#select_calss').html(htmlSelct);
                layui.form.render();
            }
        })
        // 提交筛选结果
    $('#form').on('submit', function(e) {
            e.preventDefault();
            let cal = $('#select_calss').val();
            let status = $('#select_status').val();
            console.log(status);
            q.state = status
            q.cate_id = cal;
            console.log(q);
            getPages()

        })
        // 分页

    function Pages(total) {
        layui.use('laypage', function() {
            var laypage = layui.laypage;
            laypage.render({
                elem: 'pages',
                count: total,
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                limits: [2, 3, 4, 5, 10],
                limit: 2,
                curr: q.pagenum,
                jump: function(obj, first) {
                    if (!first) {
                        q.pagenum = obj.curr;
                        q.pagesize = obj.limit;
                        getPages();

                    }
                }
            });
        });
    }
    // 删除功能
    $('#tbody').on('click', '.delete', function() {
            let id = $(this).parent().prop('id');
            $.get('/my/article/delete/' + id, function(res) {
                if (res.status !== 0) {
                    return layer.msg('删除未完成');
                }
                layer.msg('删除成功');
                // console.log();
                let len = $('.delete').length;
                if (len === 1) {
                    q.pagenum = q.pagenum == 1 ? 1 : q.pagenum - 1;
                    getTotal()
                }
                getPages()
            })

        })
        // 编辑功能
    $('#tbody').on('click', '.edit', function() {
        // console.log(1);
        let id = $(this).parent().prop('id');
        let form = layui.form;
        // console.log(id);
        $.ajax({
            method: 'GET',
            // url: '/my/article/deletecate/:id' + id,
            url: '/my/article/' + id,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                console.log(res);
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
})
template.defaults.imports.timestamp = function(value) {
    const datetime = new Date(value)

    const year = datetime.getFullYear()
    const month = ("0" + (datetime.getMonth() + 1)).slice(-2)
    const date = ("0" + datetime.getDate()).slice(-2)
    const hour = ("0" + datetime.getHours()).slice(-2)
    const minute = ("0" + datetime.getMinutes()).slice(-2)
    const second = ("0" + datetime.getSeconds()).slice(-2)
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}