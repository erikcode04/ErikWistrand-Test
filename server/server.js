import express  from "express";
import cors from "cors"

const app = express();
const port = 5000;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
    try {
        console.log(req.body);
        res.send("It works") 

//här nedan kan man lägga till em datorbas connection




    } 
    catch (error) {
        console.log(error);
    }
})


app.listen(port,() => {
    console.log("App running on port " + port );
})
