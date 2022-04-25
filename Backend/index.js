import connectMongo from "./db.js";
import express from "express";
import authfile from "./routes/auth.js";
import notefile from "./routes/note.js";
import cors from "cors";


connectMongo();
const app = express();
const port = 5000
app.use(express.json());
app.use(cors())

// Available Routes
app.use("/api/auth", authfile);
app.use("/api/notes", notefile);


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})




// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.get('/api/v1/signup', (req, res) => {
//     res.send('Hello Sign Up!')
// })

// app.get('/api/v1/login', (req, res) => {
//     res.send('Hello Login!')
// })






