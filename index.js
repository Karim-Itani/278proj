const MongoClient = require('mongodb').MongoClient;

async function main() {
    const uri = "mongodb+srv://cmpsnonstudy:cmps278@278cluster.fpuge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    const client = new MongoClient(uri);

    try {
        await client.connect();
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

}

main().catch(console.error);

async function listDatabases(client) {
    client.db().admin().listDatabases
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