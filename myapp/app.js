
var express = require('express')
var logger = require('express-logger')
var fetch = require('isomorphic-fetch')
var SparqlHttp = require('sparql-http-client')


var app = express()
const { Connection, query } = require('stardog');
var sparqlQueries = require('./public/hospitalQueries/queries.js')

function addId(arr) {
    return arr.map(function(obj, index) {
        return Object.assign({}, obj, {
            id: index
        });
    });
};

var hospitalList = []


// Creates a connection to Stardog Server
const SDconnection = new Connection({
    username: 'admin',
    password: 'admin',
    endpoint: 'http://localhost:5820'
});



query.execute(SDconnection, 'HackerBoyHospitialDB', sparqlQueries.hospitalInfoQuery, {}).then(({ body }) => {
    //console.log(body.results.bindings);
    let temp = [];
    temp = body.results.bindings;
    //console.log(hospitalList);
    for(var i = 0; i < temp.length; i++) {
        hospitalList.push({
            name: temp[i].name.value.replace(/_/g, ' '),
            address: temp[i].address.value.replace(/_/g, ' '),
            city: temp[i].city.value.replace(/_/g, ' '),
            county: temp[i].county.value.replace(/_/g, ' '),
            email: temp[i].email.value.replace(/_/g, ' '),
            phone: temp[i].phone.value.replace(/_/g, ' '),
            sector: temp[i].sector.value.replace(/_/g, ' ')

        });
        //Ger unikt id till varje objekt i hospitalList
        hospitalList = addId(hospitalList);
    }


});

app.set("view enegine", "hbs");

app.get('/', function (request, response) {
    response.render('index.hbs', {hospitalList: hospitalList})

});

app.get('/index/:id/:name', function(request, response){
    var id = request.params.id;
    var name = request.params.name;
    var arrTemp = [];
    var arrTemp2 = [];
    var arrTemp3 = [];
    arrTemp2.push({
        name: hospitalList[id].name,
        address: hospitalList[id].address,
        city: hospitalList[id].city,
        county: hospitalList[id].county,
        email: hospitalList[id].email,
        phone: hospitalList[id].phone,
        sector: hospitalList[id].sector
    });

    var locationQuery = '\
    PREFIX  dbo:  <http://dbpedia.org/ontology/>\
    PREFIX  foaf:  <http://xmlns.com/foaf/0.1/>\
    PREFIX  dbr:  <http://dbpedia.org/resource/>\
    PREFIX dbp: <http://dbpedia.org/property/>\
    PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>\
    \
SELECT DISTINCT ?numBed ?latitude ?longitude\
\
    WHERE {\
\
    ?country rdf:type dbo:Hospital;\
               foaf:name "' + name + '"@en;\
               dbo:state dbr:England;\
               dbo:bedCount ?numBed;\
               geo:lat   ?latitude;\
               geo:long  ?longitude.\
    }'

    endpoint.selectQuery(locationQuery).then(function (res) {
        return res.json()
    }).then(function (result) {
        for(var i = 0; i < result.results.bindings.length; i++) {
            arrTemp.push({
                numBed: result.results.bindings[i].numBed.value,
                latitude: result.results.bindings[i].latitude.value,
                longitude: result.results.bindings[i].longitude.value
            });
        }
        var coords = arrTemp[0].longitude + ', ' + arrTemp[0].latitude;
        console.log(coords)
        //Linked geo data endpoint query
        var linkedGeoQuery = '\
    Prefix lgdo: <http://linkedgeodata.org/ontology/>\
    Prefix geom: <http://geovocab.org/geometry#>\
    Prefix ogc:<http://www.opengis.net/ont/geosparql#>\
    Select *\
    From <http://linkedgeodata.org> {\
      ?s\
        a lgdo:Pharmacy ;\
            rdfs:label ?l ;  \
            geom:geometry [\
            ogc:asWKT ?g\
        ] .\
    Filter(bif:st_intersects (?g, bif:st_point ('+ coords +'), 10)) .\
    }';

        endpointGeo.selectQuery(linkedGeoQuery).then(function (res) {
            return res.json()
        }).then(function (result) {
            for(var i = 0; i < result.results.bindings.length; i++){
                arrTemp3.push({
                   p_name: result.results.bindings[i].l.value
                });
            }

            console.log(arrTemp3);
            response.render("detailDataview.hbs", {arrTemp2: arrTemp2, arrTemp: arrTemp, arrTemp3: arrTemp3});

        }).catch(function (err) {
            console.error(err)
        });

    }).catch(function (err) {
        console.error(err)
    });

});


app.use(express.static(__dirname + '/public'));

app.listen(5000);


//Code for query other endpoints - simple query to get height of eiffel tower

SparqlHttp.fetch = fetch

var endpoint = new SparqlHttp({endpointUrl: 'http://dbpedia.org/sparql'})
var endpointGeo = new SparqlHttp({endpointUrl: 'http://linkedgeodata.org/sparql'})





