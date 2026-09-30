// Tiny sync server so the dashboard and a real phone on the same WiFi share one live state.
// Run: node server.js   then open http://localhost:4321 (or http://<your-laptop-ip>:4321/phone.html on the phone)
const http=require('http'),fs=require('fs'),path=require('path'),os=require('os');
const PORT=process.env.PORT||4321, DIR=__dirname;
let state='';const clients=new Set();
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.md':'text/plain'};
const send=m=>{const line=`data: ${JSON.stringify(m)}\n\n`;clients.forEach(c=>c.write(line))};
http.createServer((req,res)=>{
  const url=req.url.split('?')[0];
  if(url==='/api/state'&&req.method==='GET'){res.writeHead(state?200:204,{'Content-Type':'text/plain','Cache-Control':'no-store'});return res.end(state)}
  if(url==='/api/state'&&req.method==='POST'){let b='';req.on('data',c=>b+=c);req.on('end',()=>{if(b&&b!==state){state=b;send({type:'state',str:b})}res.writeHead(204);res.end()});return}
  if(url==='/api/reset'&&req.method==='POST'){state='';send({type:'reset'});res.writeHead(204);return res.end()}
  if(url==='/api/events'){res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-store',Connection:'keep-alive'});res.write(':ok\n\n');clients.add(res);const ka=setInterval(()=>res.write(':ka\n\n'),20000);req.on('close',()=>{clients.delete(res);clearInterval(ka)});return}
  const f=path.join(DIR,url==='/'?'index.html':path.normalize(url).replace(/^(\.\.[\/\\])+/,''));
  if(!f.startsWith(DIR))return res.writeHead(403).end();
  fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);return res.end('Not found')}res.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream'});res.end(d)});
}).listen(PORT,'0.0.0.0',()=>{
  const ips=Object.values(os.networkInterfaces()).flat().filter(i=>i&&i.family==='IPv4'&&!i.internal).map(i=>i.address);
  console.log(`\n  Family wallet demo running\n  Side by side:  http://localhost:${PORT}\n  Dashboard:     http://localhost:${PORT}/dashboard.html`);
  ips.forEach(ip=>console.log(`  Phone (WiFi):  http://${ip}:${PORT}/phone.html`));console.log('');
});
