const MongoClient = require('mongodb').MongoClient;

async function main() {
    const uri = "mongodb+srv://cmpsnonstudy:cmps278@278cluster.fpuge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await createPlant(client, {
            name: "",
            scientificname: "",
            description: "",
            frenchname: "",
            pronunciation: "",
            planttype: "",
            origin: "",
            heatzone: "",
            hardinesszones: "",
            Uses: "",
            GrowthRate: "",
            TreeShape: "",
            CanopySymmetry: "",
            CanopyDensity: "",
            CanopyTexture: "",
            HeightatMaturity: "",
            SpreadatMaturity: "",
            Leafarrangement: "",
            Leafpersistence: "",
            Leaftype: "",
            Leafblade: "",
            Leafshape: "",
            Leafmargins: "",
            Leaftexture: "",
            Colorgrowingseason: "",
            Colorchangingseason: "",
            Flowershowiness: "",
            Flowersizerange: "",
            Flowersexuality: "",
            Flowerscent: "",
            Flowercolor: "",
            flowerseason: "",
            Trunkcrownshaft: "",
            Numberoftrunks: "",
            Trunkestheticvalues: "",
            fruittype: "",
            fruitshowiness: "",
            fruitsizerange: "",
            fruitcolor: "",
            fruitseason: "",
            frosttolerant: "",
            heattolerant: "",
            droughttolerant: "",
            salttolerant: "",
            soilreq: "",
            soilphreq: "",
            waterreq: "",
            lightreq: "",
            toxicity: "",
            invasivepotential: "",
            suceptibilitypestsanddiseases: "",
            fruitleavesflowerslitter: "",
            edibleparts: "",
            plantpropagation: ""
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