$.ajaxPrefilter(function(option) {
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url;
    let pattern = /my/;
    // console.log(pattern.test('/myaa'));
    if (pattern.test(option.url)) {
        option.headers = { Authorization: localStorage.getItem('key') }
    }
    // console.log(option);
    option.complete = function(res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // console.log(1);
            localStorage.removeItem('key');
            location.href = 'http://127.0.0.1:5500/login.html';
        }
    }

})