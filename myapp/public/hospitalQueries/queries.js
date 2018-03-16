exports.mentalHospitalQuery = '\
    PREFIX dbo: <http://dbpedia.org/ontology/>\
    PREFIX dbp: <http://dbpedia.org/property/> \
    PREFIX schema: <http://schema.org/>\
   SELECT DISTINCT ?name \
    WHERE \
    {\
    ?a	a schema:hospital. \
    ?a rdfs:label		?name\
    }\
    LIMIT 50';
