const express = require("express");
const CookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");

const { PORT } = require("../config");

const server = express();

server.listen(PORT, () => console.log(`SERVER READY AT PORT ${PORT}`));
// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(CookieParser());
server.use(express.static(path.join(__dirname, "public")));
// Settings
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

// Request Listeners
fs.readdir(path.join(__dirname, "routes"), (err, files) => {
    if (!err) {
        files.forEach((file) => {
            let routePath = path.join(__dirname, "routes", file);
            let Route = require(routePath);
            if (Route.path && Route.router)
                server.use(Route.path, Route.router);
        });
    }
});
