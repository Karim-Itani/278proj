const MongoClient = require('mongodb').MongoClient;

async function main() {
    const uri = "mongodb+srv://cmpsnonstudy:cmps278@278cluster.fpuge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    const client = new MongoClient(uri);

    try {
        await client.connect();

        //        await listDatabases(client);

        // await createPlant(client, {
        //     name: "Cilician Fir",
        //     scientificname: "Abies cilicica",
        //     description: "Abies cilicica is a tall evergreen tree reaching 25 to 30 m at maturity. It has a pointy top and a dense foliage. Leaves are loosely arranged in needles, with two white lines on the bottom. It has reddish-green cones. The growth habit is columnar. In nature it can be found growing with Cedar of Lebanon tree on calcareous, rocky soils. It likes hot dry summers and mild and moist winters. The tree grows well in the sunny or slightly shady position. Any soil pH, from slightly alkaline to moderately acidic, is acceptable.  It survives heavy clay. It is often grown in lawn where it makes a magnificent specimen.",
        // })

        await createManyPlants(client, [{
            name: "Cilician Fir",
            scientificname: "Abies cilicica",
            description: "Abies cilicica is a tall evergreen tree reaching 25 to 30 m at maturity. It has a pointy top and a dense foliage. Leaves are loosely arranged in needles, with two white lines on the bottom. It has reddish-green cones. The growth habit is columnar. In nature it can be found growing with Cedar of Lebanon tree on calcareous, rocky soils. It likes hot dry summers and mild and moist winters. The tree grows well in the sunny or slightly shady position. Any soil pH, from slightly alkaline to moderately acidic, is acceptable.  It survives heavy clay. It is often grown in lawn where it makes a magnificent specimen.",
        }, {
            name: "Flowering Maple",
            scientificname: "Abutilon x hybridum",
            description: "Albutilon x hybridum is a name given to a group of evergreen hybrids with whorled, simple, maple-like leaves and showy, bell-shaped flowers in red, yellow, white and orange. It blooms during spring and early summer. “Flowering Maple” (common name) is a fast growing plant that can grow up to 1 m spread. It is ideal for use as a border plant, container and its flower can be edible. Furthermore, it is drought tolerant plant and it enjoys fairly rich moist but well-drained soil in full sun or semi-shaded location.",
        }])

        await findoneplantbyname(client, "Flowering ");

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

}

main().catch(console.error);

async function findoneplantbyname(client, nameofPlant) {
    const result = await client.db("plantdatabase").collection("plant_info").findOne({ name: nameofPlant });

    if (result) {
        console.log(`Found a plant in the collection with name '${nameofPlant}'`)
        console.log(result);
    } else {
        console.log(`No plant found`)
    }
}

async function findbycriteria(client, )

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







function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}