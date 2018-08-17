var express = require('express');
var app = express();

// 声明文件操作系统对象
var fs = require('fs');

app.get('/', (req, res) => {
	res.writeHead(200, {'content-type': 'text/html'});
	fs.readFile('./index.html', (err, data) => {
		if (err) throw err;
		res.end(data);
	})
})

app.use(express.static('./'))

//配置服务端口
var server = app.listen(3000, function(err) {

    // var host = server.address().address;

    var port = server.address().port;

    if (err) {
      console.log(err)
      return
    }

    // console.log('Example app listening at http://%s:%s', host, port);
    console.log('Listening at http://localhost:' + port + '\n')
})