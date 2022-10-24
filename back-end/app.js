const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./app/routes");
const routesAdmin = require("./app/routesAdmin");
const checkAccess = require("./app/_helpers/checkAccess");
const path = require("path");
const notificationService = require("./app/services/notification");

require("dotenv").config();

const app = express();
const mongoDbUrl = process.env.MONGO_DB_URL;
const port = process.env.PORT;

//connect to DB
mongoose
  .connect(mongoDbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Could not connect to DB"));

app.use(cors());
app.use(express.json({ limit: "50mb" }));

//routes
app.use("/api", routes);
app.use("/admin", checkAccess, routesAdmin); // access by token
app.use("/public", express.static(path.join(__dirname, "public")));

// listening server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//websocket
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

io.on("connection", async (socket) => {
  io.emit("broadcast", await notificationService.getNotification());
  socket.on("create", async () =>
    io.emit("broadcast", await notificationService.getNotification())
  );
  socket.on("change", async () =>
    io.emit("broadcast", await notificationService.getNotification())
  );
  socket.on('disconnect', function () {
  });
});
