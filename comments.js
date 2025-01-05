// create web server 
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var template = require('./lib/template.js');

var app = http.createServer(function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;
    var description = queryData.id;
    var list = template.list();
    
    if(pathname === '/'){
        if(queryData.id === undefined){
            title = 'Welcome';
            description = 'Hello, Node.js';
            template.HTML(title, list, 
                `<h2>${title}</h2>${description}`,
                `<a href="/create">create</a>`
            , response);
        } else {
            title = queryData.id;
            fs.readFile(`data/${title}`, 'utf8', function(err, description){
                description = sanitizeHtml(description);
                template.HTML(title, list, 
                    `<h2>${title}</h2>${description}`,
                    `
                    <a href="/create">create</a> 
                    <a href="/update?id=${title}">update</a>
                    <form action="/delete_process" method="post">
                        <input type="hidden" name="id" value="${title}">
                        <input type="submit" value="delete">
                    </form>
                    `
                , response);
            });
        }
    } else if(pathname === '/create'){
        title = 'Create';
        template.HTML(title, list, `
            <form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
        `, '', response);
    } else if(pathname === '/create_process'){
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8