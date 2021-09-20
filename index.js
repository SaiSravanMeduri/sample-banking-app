//mongodb+srv://sravanmeduri:<password>@mycluster.mo4ac.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const exp = require("express");
const app = exp();
const path = require("path");
app.use(exp.static(path.join(__dirname, "dist/banking-app")));

const mc = require("mongodb").MongoClient;

const dbUrl = "mongodb+srv://sravanmeduri:sravan01M@mycluster.mo4ac.mongodb.net/BankingDatabase?retryWrites=true&w=majority";


let dbObj;

// Connect to MongoDB Atlas
mc.connect(
    dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
        if (err) {
            console.log("Error in db connection\n", err);
        } else {
            // If no error occurs, client object is returned
            // Database object is being extracted here
            dbObj = client.db("BankingDatabase");
            console.log("Connected to Database Successfully");
        }
    }
);


app.get("/getusers", (req, res) => {
    dbObj.collection("Users").find({}).toArray((err, userArray) => {
        if (err) {
            console.log("Error in reading data of all users\n", err);
        }
        else {
            res.send({ message: userArray })
        }
    })
})

app.use(exp.json())

app.put("/editbalance/:userName", (req, res) => {
    let newBalance = req.body.balance;
    dbObj.collection("Users").findOne({ userName: { $eq: req.params.userName } }, (err, userObject) => {
        if (err) {
            console.log("Error in updating user\n", err);
        }
        else if (userObject == null) {
            res.send({ message: "no user" })
        }
        else {
            dbObj.collection("Users").update(
                {
                    userName: req.params.userName
                },
                {
                    $set: {
                        balance: newBalance
                    }
                },
                (err, success) => {
                    if (err) {
                        console.log("Error in updating user\n", err);
                    }
                    else {
                        res.send({ message: "product updated" })
                    }
                }
            )
        }
    })
})


app.post("/postTransfers", (req, res) => {
    let newTransfer = req.body
    dbObj.collection("Transfers").insertOne(
        newTransfer,
        (err, success) => {
            if (err) {
                console.log("Error in posting transfers\n", err);
            }
            else {
                res.send({ message: "transfer table updated" })
            }
        }
    )
})

app.get("/getTransfers", (req, res) => {
    dbObj.collection("Transfers").find({}).toArray((err, transfers) => {
        if (err) {
            console.log("Error in reading data of all transfers\n", err);
        }
        else {
            res.send({ message: transfers })
        }
    })
})


// Handling Unavailable Path
app.use((req, res, next) => {
    res.send({ message: `The path ${req.url} is not available` });
});

// Assign Port Number
const port = 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
