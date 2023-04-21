const express = require("express");
const cors = require("cors");
require("dotenv").config({
	path: "./app/.env",
});
const app = express();
const fileUpload = require("express-fileupload");
const data = require("./app/models");
const config = require("./app/config/password");
const api_version = "v1";

// =============================================================================
// DATABASE TABLE CREATION
// =============================================================================

data.sequelize
	.sync({
		alter: true,
	})
	.then((result) => {
		console.log(result, "Table created...");
	})
	.catch((err) => {
		console.log(err, "Table creation failed..");
	});
// =============================================================================
// CORS CONFIGURATION
// =============================================================================
var whitelist = [
	"http://localhost:4200",
	"http://192.168.5.210:4200",
	"http://localhost:8082",
];
var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
};
app.use(cors(corsOptions));

// =============================================================================
// parse requests of content-type - application/x-www-form-urlencoded & JSON
// =============================================================================
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(
	fileUpload({
		limits: {
			fileSize: 50 * 1024 * 1024,
		},
	})
);

// =============================================================================
// ROUTES
// =============================================================================
const route = require("./app/routes/auth-routes/route");
const auth = require("./app/routes/auth-routes/auth");
const users = require("./app/routes/users-routes/users");
const module_route = require("./app/routes/permission-routes/modules");
const submodule_route = require("./app/routes/permission-routes/sub_modules");
const submodule_action_route = require("./app/routes/permission-routes/sub_module_action");
const permissions = require("./app/routes/permission-routes/role_permissions");
const section = require("./app/routes/users-routes/sections");
const location = require("./app/routes/locations/locations");

// =============================================================================
// ROUTES -- CONNECTIONS
// =============================================================================
app.use("/we-connect/api/" + api_version, auth);
app.use("/we-connect/api/" + api_version, route);
app.use("/we-connect/api/" + api_version, users);
app.use("/we-connect/api/" + api_version, module_route);
app.use("/we-connect/api/" + api_version, submodule_route);
app.use("/we-connect/api/" + api_version, submodule_action_route);
app.use("/we-connect/api/" + api_version, permissions);
app.use("/we-connect/api/" + api_version, section);
app.use("/we-connect/api/" + api_version, location);

// =============================================================================
// set port, listen for requests
// =============================================================================
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
