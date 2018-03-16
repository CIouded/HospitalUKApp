
var express = require('express')
var logger = require('express-logger')
var fetch = require('isomorphic-fetch')
var fetch = require('isomorphic-fetch')


var app = express()
const { Connection, query } = require('stardog');
var sparqlQueries = require('./public/hospitalQueries/queries.js')

var hospitalList = []


// Creates a connection to Stardog Server

    /*const SDConnection = new Connection({
        username: 'admin',
        password: 'admin',
        endpoint: 'http://localhost:5820'
    });

    query.execute(SDConnection, 'HackerBoyHospitialDB',sparqlQueries.mentalHospitalQuery)
        .then(({body}) => {
            return body.results.bindings;
            console.log(body.results.bindings);
            }).catch(err)
            => {
            console.log(err);
        });*/

const SDconnection = new Connection({
  username: 'admin',
  password: 'admin',
  endpoint: 'http://localhost:5820'
});

query.execute(SDconnection, 'HackerBoyHospitialDB', sparqlQueries.mentalHospitalQuery, {}).then(({ body }) => {
  //console.log(body.results.bindings);
  let temp = [];
  temp = body.results.bindings;
  //console.log(hospitalList);
  for(var i = 0; i < temp.length; i++) {
    hospitalList.push({
      name: temp[i].name.value.replace(/_/g, ' ')
    });
  }
  //console.log(hospitalList);
});

//.catch(err)
//=> {
//  console.log(err);

app.set("view enegine", "hbs");

app.get('/', function (request, response) {
        response.render('index.hbs', {hospitalList: hospitalList})

});

app.get('/index/:name', function(request, resposne){
        let name = request.params.name;
        resposne.render("detailDataview.hbs", {hospitalList: hospitalList});

});

app.get('/about', function (request, response) {
        response.render('about.hbs')
});

app.use(express.static(__dirname + '/public'));
//app.use(logger());
//app.use(logger({path:'/public/stylesheet.css'}));
app.use(logger({path:'/public/scripts/testscript.js'}));

app.listen(3000);





/*
//Code for query other endpoints - simple query to get height of eiffel tower

var SparqlHttp = require('sparql-http-client')
SparqlHttp.fetch = fetch

var endpoint = new SparqlHttp({endpointUrl: 'http://dbpedia.org/sparql'})
//actual query
var query = 'SELECT ?height ' +
    'WHERE { <http://dbpedia.org/resource/Eiffel_Tower> <http://dbpedia.org/property/height> ?height }'

//example query
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
