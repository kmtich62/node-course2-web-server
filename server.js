/**
 * Created by kevinmitchell on 2/12/17.
 */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


//-------middleware to log to a file
app.use((request, response, next)=>{
    var now = new Date().toString();
    var log = `the time is ${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('unable to append to server.log');
        }
    });

    next();
});
//-----------------------------------
//no next statement causes the maintenance page to be displayed
// app.use((request, response, next)=>{
//     response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (request, response)=>{
    //response.send('<h1>hello express</h1>');
    response.render('home.hbs',{
        welcomeMessage: 'Hello fine travellers!',
        pageTitle: 'Home Page',
    });
});

app.get('/about', (request, response)=>{
    response.render('about.hbs', {
        pageTitle: 'About page',
    });
});

app.get('/bad', (request, response)=>{
    response.send({
        Error: "an error has happened"
    });
});

app.listen(3000, ()=>{
    console.log("server is up on port 3000");
});
