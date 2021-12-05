'Content-Type'='text/html'
let url=request.url;
if (url==='/'){
    fs.readfile(path.join(__dirname,'index.html'), Options='utf-8', callback=(err,data)=>{
        if(err) throw err;
        Response.end(data);
    });
}
else if(url==='/shape.html'){
    fs.readfile(path.join(__dirname,'index.html'), Options='utf-8', callback=(err,data)=>{
        if(err) throw err;
        Response.end(data);
    });
}
else if(url==='/leaf.html'){
    fs.readfile(path.join(__dirname,'index.html'), Options='utf-8', callback=(err,data)=>{
        if(err) throw err;
        Response.end(data);
    });
}
else if(url==='/flower'){
    fs.readfile(path.join(__dirname,'index.html'), Options='utf-8', callback=(err,data)=>{
        if(err) throw err;
        Response.end(data);
    });
}
else if(url==='/fruit'){
    fs.readfile(path.join(__dirname,'index.html'), Options='utf-8', callback=(err,data)=>{
        if(err) throw err;
        Response.end(data);
    });
}
else if(url==='/trunk'){
    fs.readfile(path.join(__dirname,'index.html'), Options='utf-8', callback=(err,data)=>{
        if(err) throw err;
        Response.end(data);
    });
}