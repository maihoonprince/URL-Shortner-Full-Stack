const express = require("express");
const { connectToMongoDB } = require("./connect");
const path = require("path"); 
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const staticRoute = require("./routes/staticRouter");

const app = express();
const PORT = 8001;

// Connecting to MongoDB database:
connectToMongoDB("mongodb://localhost:27017/short-url").then(() => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); 

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use("/", staticRoute);
app.use("/url", urlRoute);

// for get operations:

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    }
    );
    res.redirect(entry.redirectURL);
});

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`server started at PORT : ${PORT}`));
