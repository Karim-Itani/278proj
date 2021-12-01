const MongoClient = require('mongodb').MongoClient;

async function main() {
    const uri = "mongodb+srv://cmpsnonstudy:cmps278@278cluster.fpuge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await createPlant(client, {
            name: "Japanese Allspice, Wintersweet",
            scientificname: "Chimonanthus praecox",
            description: "Chimonanthus praecox is a deciduous shrub native to China. It has some fragrant flowers of winter interest that bloom on leafless branches. Flowers have yellow showy petals with a purplish-brown center. Leaves are rough and glossy and emerge in spring after flowers bloom to then turn yellow in fall. Flowers are edible.",
            frenchname: "Chimonanthe précoce",
            pronunciation: "kye-mun-AN-thus PREE-kocks",
            planttype: "Shrub",
            origin: "China",
            heatzone: "4 to 9",
            hardinesszones: "7 to 9",
            Uses: "Specimen, Border Plant, Edible",
            GrowthRate: "Moderate",
            TreeShape: "Upright",
            CanopySymmetry: "Symmetrical",
            CanopyDensity: "Medium",
            CanopyTexture: "Coarse",
            HeightatMaturity: "3 to 5 m",
            SpreadatMaturity: "1.5 to 3 meters",
            Leafarrangement: "Opposite",
            Leafpersistence: "Deciduous",
            Leaftype: "Simple",
            Leafblade: "10 - 20",
            Leafshape: "Ovate",
            Leafmargins: "Entire",
            Leaftexture: "Glossy, Coarse",
            Colorgrowingseason: "Green",
            Colorchangingseason: "Green, Yellow",
            Flowershowiness: "Yes",
            Flowersizerange: "1.5 - 3",
            Flowersexuality: "Diecious (Monosexual)",
            Flowerscent: "Pleasant (Sweet)",
            Flowercolor: "Yellow, Red",
            flowerseason: "Spring, Winter",
            Trunkcrownshaft: "No",
            Numberoftrunks: "Multi-Trunked",
            Trunkestheticvalues: "Showy",
            fruittype: "Capsule",
            fruitshowiness: "No",
            fruitsizerange: " 3 - 7",
            fruitcolor: "Grey",
            fruitseason: "Spring, Winter",
            frosttolerant: "Yes",
            heattolerant: "No",
            droughttolerant: "Yes",
            salttolerant: "Poor",
            soilreq: "Clay, Loam, Sand",
            soilphreq: "Acidic, Neutral, Alkaline",
            waterreq: "Moderate",
            lightreq: "Part",
            toxicity: "Yes",
            invasivepotential: "No",
            suceptibilitypestsanddiseases: "No",
            fruitleavesflowerslitter: "Yes",
            edibleparts: "Flower",
            plantpropagation: "Seed, Cutting, Layering"
        });
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}
// await createManyPlants(client, )
// await listDatabases(client);
// await findoneplantbyname(client, "Flowering ");

main().catch(console.error);

async function findoneplantbyname(client, nameofPlant) {
    const result = await client.db("plantdatabase").collection("plant_info").findOne({ name: nameofPlant });

    if (result) {
        console.log(`Found a plant(s) in the collection with name '${nameofPlant}'`)
        console.log(result);
    } else {
        console.log(`No plant found`)
    }
}


// async function findbycriteria(client, )

async function createPlant(client, newPlant) {
    const result = await client.db("plantdatabase").collection("plant_info").insertOne(newPlant);

    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function createManyPlants(client, newPlantsarray) {
    const result = await client.db("plantdatabase").collection("plant_info").insertMany(newPlantsarray);

    console.log(`${result.insertedCount} new listings created with the following id(s):`);
    console.log(result.insertedIds);
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}

const { MongoClient, ObjectID } = require("mongodb");
const Express = require("express");
const Cors = require("cors");
const BodyParser = require("body-parser");
const { request } = require("express");
const client = new MongoClient(process.env["mongodb+srv://cmpsnonstudy:cmps278@278cluster.fpuge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"]);
const server = Express();
server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));
server.use(Cors());
var collection;
server.get("/search", async(request, response) => {});
server.get("/get/:id", async(request, response) => {});
server.listen("3000", async() => {
    try {
        await client.connect();
        collection = client.db("food").collection("recipes");
    } catch (e) {
        console.error(e);
    }
});

server.get("/search", async(request, response) => {
    try {
        let result = await collection.aggregate([{
            "$search": {
                "autocomplete": {
                    "query": `${request.query.query}`,
                    "path": "name",
                    "fuzzy": {
                        "maxEdits": 2,
                        "prefixLength": 3
                    }
                }
            }
        }]).toArray();
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});

server.get("/get/:id", async(request, response) => {
    try {
        let result = await collection.findOne({ "_id": ObjectID(request.params.id) });
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});