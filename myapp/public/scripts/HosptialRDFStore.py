import csv
from rdflib import Graph, Literal, BNode, Namespace, RDF, URIRef
from rdflib.namespace import DC, FOAF, RDFS, RDF
from rdflib.plugins.stores import sparqlstore

# Setting up the Stardog Server
endpoint = 'http://localhost:5820/demo/query'
store = sparqlstore.SPARQLUpdateStore()
store.open((endpoint, endpoint))


#g = Graph(store, identifier=hospitalURI)
g = Graph(); #default Graph

#Namespaces
DBO = Namespace("http://dbpedia.org/ontology/")
DBP = Namespace("http://dbpedia.org/property/")
SCHEMA = Namespace("http://schema.org/")
g.bind("dc", DC)
g.bind("foaf", FOAF)
g.bind("dbo", DBO)
g.bind("dbp", DBP)
g.bind("schema", SCHEMA)

#Literals (predeterminded datasets)
phone = BNode() #Figure out which data you want o store in the BNode
hosptial = BNode() #Figure out which data you want o store in the BNode


# Structuring the CSV data
with open("C:/Users\philn\PycharmProjects\HackerBoyOscar-Co\CSV\Hospital.csv") as csvfile:
    readCSV = csv.reader(csvfile, delimiter = '\t')

    for row in readCSV:
        org_id = Literal(row[0].replace(" ", "_")) #int
        org_code = Literal(row[1].replace(" ", "_")) #String
        org_type = Literal(row[2].replace(" ", "_")) #String
        sub_type = Literal(row[3].replace(" ", "_")) #String aka Menatal Hosptial, Vet
        sector = Literal(row[4].replace(" ", "_")) #String
        org_status = Literal(row[5].replace(" ", "_")) #String
        isPimMang = Literal(row[6].replace(" ", "_")) #Boolean
        org_Name = Literal(row[7].replace(" ", "_")) #String
        address1 = Literal(row[8].replace(" ", "_")) #String
        address2  = Literal(row[9].replace(" ", "_")) #String
        address3 = Literal(row[10].replace(" ", "_")) #String
        city = Literal(row[11].replace(" ", "_")) #String
        county = Literal(row[12].replace(" ", "_")) #String
        zip_code = Literal(row[13].replace(" ", "_")) #String
        lat = Literal(row[14].replace(" ", "_")) #float
        long = Literal(row[15].replace(" ", "_")) #float
        parent_ODS_Code = Literal(row[16].replace(" ", "_")) #String
        parent_Name = Literal(row[17].replace(" ", "_")) #String
        phone = Literal(row[18].replace(" ", "_")) #int String?
        email = Literal(row[19].replace(" ", "_"))#String
        website = Literal(row[20].replace(" ", "_")) #String
        fax = Literal(row[21].replace(" ", "_")) #String


        #Setting the global URI
        hospitalURI = URIRef('http://example.com/hosptial/') + org_id


        #Adding the triples (Name, phone, county, city and address)
        g.add((hospitalURI, RDF.type, SCHEMA.hospital))
        g.add((hospitalURI, RDFS.label, org_Name))
        g.add((hospitalURI, FOAF.phone, phone))
        g.add((hospitalURI, FOAF.mbox, email))
        g.add((hospitalURI, DBP.type, sector))
        g.add((hospitalURI,DBO.address, address1))
        g.add((hospitalURI,DBO.location, city))
        g.add((hospitalURI,DBP.region, county))


        for s, p, o in g:
           print((s, p, o))

        print(g.serialize(format='turtle'))

        g.serialize(destination="hospitialdata.ttl",format="turtle")

        





