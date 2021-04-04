var admin = require("firebase-admin");
var serviceAccount = require("../../key.json");

module.exports = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://comic-son-default-rtdb.firebaseio.com",
});
