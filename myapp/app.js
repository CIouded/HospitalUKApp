
var express = require('express')
var logger = require('express-logger')
var fetch = require('isomorphic-fetch')
var fetch = require('isomorphic-fetch')
var app = express()


app.set("view enegine", "hbs")

app.get('/', function (request, response) {
        response.render('index.hbs')
});

app.get('/about', function (request, response) {
        response.render('about.hbs')
});

app.use(express.static(__dirname + '/public'));
//app.use(logger());
//app.use(logger({path:'/public/stylesheet.css'}));
app.use(logger({path:'/public/scripts/testscript.js'}));

app.listen(5000);



/*
//Code for query other endpoints - simple query to get height of eiffel tower

var SparqlHttp = require('sparql-http-client')
SparqlHttp.fetch = fetch

var endpoint = new SparqlHttp({endpointUrl: 'http://dbpedia.org/sparql'})
//actual query
//var query = 'SELECT ?height ' +
//    'WHERE { <http://dbpedia.org/resource/Eiffel_Tower> <http://dbpedia.org/property/height> ?height }'

example query
var query = 'select distinct ?Concept where {[] a ?Concept} LIMIT 5'


// run query with promises
endpoint.selectQuery(query).then(function (res) {
    return res.json()
}).then(function (result) {
    console.log(result.results.bindings)
}).catch(function (err) {
    console.error(err)
})
 */
