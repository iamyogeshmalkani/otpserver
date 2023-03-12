import bodyParser from  "body-parser"
import cors from  "cors"
import express from  "express"
import mongoose from  "mongoose"
import routes from  "./routes/index.js"

//create express app

const app = express();
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
const port = 4000;
app.use("/", routes);

app.listen(port, () =>
  console.log(`server is listening at http://localhost:${port}`)
);
const CONNECTION_URL =
  "mongodb+srv://admin:yogesh2002@cluster0.h3vdi.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, {})
  .then(() => app.listen(PORT, () => console.log("server running on ", PORT)))
  .catch((error) => console.log(error.message));
app.use(cors());
