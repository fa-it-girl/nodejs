const http = require('http');
const fs = require('fs')
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if(url === '/'){
    res.write('<html>')
    res.write('<head><title>enter message</title></head>')
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button>send</button></input></form></body>')
    res.write('</head>')
    return res.end()
  }

  if(url === '/message' && method==='POST'){
    //redirect request to thr same page
    const body= [];
    req.on('data', (chunk) => {
      body.push(chunk)
      console.log(body)
    })
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString()
      console.log(parsedBody)
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message)
    })
    res.statusCode= 302;
    res.setHeader('Location', '/' )
     return res.end()
  }
  console.log(req.url, req.method, req.headers)
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>')
  res.write('<head><title>my fist page</title></head>')
  res.write('<body><h3>my fist node page</h3></body>')
  res.write('</head>')
  res.end();
});

server.listen(3000)
