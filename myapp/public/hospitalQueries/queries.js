exports.hospitalNameQuery = '\
    PREFIX dbo: <http://dbpedia.org/ontology/>\
    PREFIX dbp: <http://dbpedia.org/property/> \
    PREFIX schema: <http://schema.org/>\
   SELECT DISTINCT ?name \
    WHERE \
    {\
    ?a	a schema:hospital. \
    ?a rdfs:label		?name\
    }\
    LIMIT 100';

exports.hospitaltestQuery = '\
PREFIX dbo: <http://dbpedia.org/ontology/>\
PREFIX dbp: <http://dbpedia.org/property/> \
PREFIX schema: <http://schema.org/>\
                                               \
SELECT DISTINCT ?name ?address ?city ?region ?email ?phone ?sector \
                                                             \
    WHERE \
    {                                                  \
       ?a       rdf:type  schema:hospital;                   \
                rdfs:label ?name;                            \
                dbo:address ?address\
                dbo:location ?city. \
    }                                                       \
    LIMIT 100';

exports.hospitalInfoQuery = '\
PREFIX dbo: <http://dbpedia.org/ontology/>\
PREFIX dbp: <http://dbpedia.org/property/> \
PREFIX schema: <http://schema.org/>\
PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
SELECT DISTINCT ?name ?address ?city ?county ?email ?phone ?sector \
                                                             \
    WHERE \
    {                                                  \
       ?a       rdf:type  schema:hospital;                   \
                rdfs:label ?name;                            \
                dbo:address ?address;                    \
                dbo:location ?city;                      \
                dbp:region  ?county; \
                dbp:type ?sector;           \
                foaf:mbox  ?email;                 \
                foaf:phone ?phone.                 \                                             \
    }                                                       \
    LIMIT 500';

exports.hospitalLocationQuery = '\
    PREFIX  dbo:  <http://dbpedia.org/ontology/>\
    PREFIX  dbr:  <http://dbpedia.org/resource/>\
    PREFIX dbp: <http://dbpedia.org/property/>\
    PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>\
    \
SELECT DISTINCT ?name ?numBed ?latitude ?longitude\
\
    WHERE {\
\
    ?country rdf:type dbo:Hospital;\
               rdfs:label ?name;\
               dbo:state dbr:England;\
               dbo:bedCount ?numBed;\
               geo:lat   ?latitude;\
               geo:long  ?longitude.\
    FILTER ( lang(?name) = \'en\').\
    }'

exports.linkedGeoQuery = '\
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
    Filter(bif:st_intersects (?g, bif:st_point (-4.051000, 51.091999), 10)) .\
    }';