const fs=require('fs');

const requestHandler = (req,res) => {
    const url=req.url;
    const method=req.method;
    if(url==='/')
    {
        fs.readFile('message.txt',{encoding:"utf-8"},(err,data)=>{
            if(err)
            {
                console.log(err);
            }
            console.log(`data from file`+data);
            res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write(`<body>${data}</body>`);
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    });
}
if(url==='/message' && method==='POST')
    {
        const body=[];
        req.on('data',(chunk)=>{
            console.log(chunk);
             body.push(chunk);
        });
        return req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            const message=parsedBody.split('=')[1];
            fs.writeFile('message.txt',message,(error)=>{
                if(error){
                    console.log(error);
                }
                res.statusCode=302;
            res.setHeader('Location','/');
            return res.end();
            });           
        })        
    }
    if(url==='/home')
        {
            res.write('<html>');
            res.write('<head><title>My first page</title></head>');
            res.write('<body><h1>Welcome home</h1></body>');
            res.write('</html>');
            return res.end();
        }
        if(url==='/about')
            {
                res.write('<html>');
                res.write('<head><title>My first page</title></head>');
                res.write('<body><h1>Welcome to About Us page</h1></body>');
                res.write('</html>');
                return res.end();
            }
            if(url==='/node')
                {
                    res.write('<html>');
                    res.write('<head><title>My first page</title></head>');
                    res.write('<body><h1> Welcome to my Node Js project</h1></body>');
                    res.write('</html>');
                    return res.end();
                }   
}

//module.exports=requestHandler;
//module.exports={
//    handler:requestHandler,
//    someText:'Hello Node.js',
//}
module.exports.handler=requestHandler;
module.exports.someText="Hello Node.js";