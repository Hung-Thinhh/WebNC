import http from'http';
import myDateTime from './date.js';
import getUrl from './getUrl';
http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type':
      'text/html; charset=utf-8'
  });
  res.write(myDateTime() + "<br>")
  res.write(getUrl.getPath(req)+"<br>")
  res.write(getUrl.getParamsURL(req)+"<br>")
  res.write('Hello KTPM0121, Chúc bạn thành công với Nodejs');
  res.end()
}) . listen (8080) ;