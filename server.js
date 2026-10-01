const http=require('http');
const fs=require('fs');
const path=require('path');
const files={
  '/':'index.html',
  '/index.html':'index.html',
  '/manifest.webmanifest':'manifest.webmanifest',
  '/sw.js':'sw.js',
  '/icon.svg':'icon.svg'
};
const types={
  '.html':'text/html; charset=utf-8',
  '.webmanifest':'application/manifest+json; charset=utf-8',
  '.js':'application/javascript; charset=utf-8',
  '.svg':'image/svg+xml; charset=utf-8'
};
const server=http.createServer((req,res)=>{
  const u=new URL(req.url,'http://localhost');
  const file=files[u.pathname]||'index.html';
  const p=path.join(__dirname,file);
  fs.readFile(p,(err,data)=>{
    if(err){res.writeHead(500,{'content-type':'text/plain; charset=utf-8'});return res.end('Server error');}
    res.writeHead(200,{
      'content-type':types[path.extname(file)]||'application/octet-stream',
      'cache-control':file==='index.html'?'no-store':'public, max-age=300'
    });
    res.end(data);
  });
});
const port=Number(process.env.PORT||3000);
server.listen(port,'0.0.0.0',()=>console.log('Super Salto listening on '+port));