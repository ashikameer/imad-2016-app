var express = require('express');
var morgan = require('morgan');
var path = require('path');
var counter = 0 ;

var app = express();
function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.data;
    var content=data.content;
    var htmlTemplate=`
    <html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="vireport" content="width-device-width,initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
     <div class="container">
        <div>
             <a href="/">Home</a>
         </div>
         <hr/>
         <h3>
             ${heading}
         </h3>
         <div>
             ${date}
         </div>
         <div>
             ${content}
         </div>
     </div> 
    </body>
</html>
`
return htmlTemplate;
}
app.use(morgan('combined'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/counter', function (req, res){
  counter=counter+1;
  res.send(counter.toString())
});
var articles={ 
    'article-one':{
    title:" Article One | Ashik Ameer",
    heading:"Article One",
    date:"Oct 3rd,2016",
    content:`<p>
                 This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.
             </p>
             <p>
                 This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.
             </p>
             <p>
                 This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.This is the content.
             </p>`
    }
}

app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
