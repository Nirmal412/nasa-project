const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");

const { loadPlanetsData } = require("./models/planets.model");

const MONGO_URL =
  "mongodb+srv://nirmaltech757:3VFcbkauT59vFBn6@cluster.te8eftm.mongodb.net/nasa";
const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

mongoose.connection.once("open", () => {
  console.log("mongodb connection ready...");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  });

  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listning on port ${PORT}...`);
  });
}

startServer();
