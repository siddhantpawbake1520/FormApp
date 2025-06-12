const http=require('http');
const fs=require('fs');
const path=require('path');
const {parse}=require('querystring');
const PORT=3000;

const server=http.createServer((req, res) => {
  if(req.method==='GET') {
    let filePath=path.join(__dirname,'public',req.url==='/'?'index.html':req.url);
    let ext=path.extname(filePath);
    let contentType=ext==='.css'?'text/css':'text/html';

    fs.readFile(filePath,(err,content)=>{
      if(err){
        res.writeHead(404);
        res.end('Page not found');
      } else {
        res.writeHead(200,{'Content-Type':contentType});
        res.end(content);
      }
    });
  }else if (req.method==='POSTreq.url==='/submit'){
    let body = '';
    req.on('data',chunk=>body+=chunk.toString());
    req.on('end',()=>{
      const formData = parse(body);
      const submission = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date().toISOString()
      };
      if(!fs.existsSync('submissions')){
        fs.mkdirSync('submissions');
      }
        const filename=`submissions/${Date.now()}.json`;
        fs.writeFileSync(filename,JSON.stringify(submission,null,2));
      res.writeHead(200,{'Content-Type':'text/html'});
      res.end(`<h1>Thank you for your feedback,${formData.name}!</h1>`);
    });
  }else{
    res.writeHead(404);
    res.end('Not found');
  }
});
server.listen(PORT,()=>{
  console.log(`Server running at http://localhost:${PORT}`);
});