import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const root=new URL('../',import.meta.url);
const flag=process.argv.indexOf('--port');
const port=Number(flag>=0?process.argv[flag+1]:process.env.PORT||3000);
if(!Number.isInteger(port)||port<1||port>65535)throw Error('Port must be an integer from 1 to 65535.');
const server=http.createServer(async(req,res)=>{
 try{
  const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path==='/'||path==='/index.html'?'index.html':/^\/assets\/(brand-garden|netnest-logo|linea-lifestyle|roam-lifestyle)\.jpg$/.test(path)?path.slice(1):null;
  if(!file){res.writeHead(404);res.end('Not found');return;}
  const bytes=await readFile(new URL(file,root));
  res.writeHead(200,{'Content-Type':file.endsWith('.jpg')?'image/jpeg':'text/html; charset=utf-8','Cache-Control':'no-cache'});
  res.end(req.method==='HEAD'?undefined:bytes);
 }catch{res.writeHead(404);res.end('Not found');}
});
server.on('error',error=>{
 console.error(error.code==='EADDRINUSE'?`Port ${port} is in use. Try npm run dev -- --port ${port+1}.`:error.message);
 process.exitCode=1;
});
server.listen(port,'127.0.0.1',()=>console.log(`NetNest: http://localhost:${port}\nServing ${fileURLToPath(root)}\nPress Ctrl+C to stop.`));
