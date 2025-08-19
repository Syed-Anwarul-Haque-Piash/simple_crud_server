const express = require('express')
const cors=require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT||5000;
app.use(cors());
app.use(express.json());

//hWzfEzNdYsvjaQlF
//crud



const uri = "mongodb+srv://crud:hWzfEzNdYsvjaQlF@cluster0.edkybmp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database=client.db('buyersDB');
    const buyerCollection=database.collection('buyers');

    app.get('/buyers',async (req,res)=>{
        const cursor=buyerCollection.find();
        const result=await cursor.toArray();
        res.send(result);
    })

    app.post('/buyers',async(req,res)=>{
        const buyer=req.body;
        console.log(buyer);
        const result=await buyerCollection.insertOne(buyer);
        res.send(result);
    })

    app.delete('/buyers/:id',async(req,res)=>{
      const id=req.params.id;
      console.log('deleted id',id);
      const query= {_id: new ObjectId(id)};
      const result= await buyerCollection.deleteOne(query);
      res.send(result)
    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
