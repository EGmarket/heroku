const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mangomarketecom.gzttn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("volenture");
      const volentureCollection = database.collection("volentureService");
      
      //Get Api
      app.get('/services', async(req, res)=>{
          const cursor = volentureCollection.find({});
          const volentureService = await cursor.toArray();
          res.json(volentureService);
      })
     
    //   const result = await volentureCollection.insertOne();
    //   console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send("Server is Running");
})

app.listen(port, ()=>{
    console.log("server is running on ", port);
})