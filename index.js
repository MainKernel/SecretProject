import bodyParser from "body-parser";
import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";


const app = express();
const port = 3001;
const __dir = dirname(fileURLToPath(import.meta.url));
var isAuthorized = false;
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    if(req.body["password"] === "Test"){
        isAuthorized = true;
    }
    next();
});
app.get("/",(req, res) => {
res.sendFile(__dir + "/public/index.html");
});

app.post("/check", (req, res) => {
    if(isAuthorized){
        res.sendFile(__dir + "/public/secret.html");
    }else{
        res.redirect("/");
    }
});

app.listen(port, () => {
    console.log("Listen on port: " + port);
});

