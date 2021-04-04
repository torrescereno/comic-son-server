const express = require("express");
const PORT = process.env.PORT || 8080;
const rutaProducto = require("./routes/producto.routes");
const rutaCarrito = require("./routes/carrito.routes");
app = express();

app.use(express.json());

app.use(
	express.urlencoded({
		extended: true,
	})
);

// Rutas base
app.get("/", (req, res) => {
	res.send("hola mundo");
});

// Inportar rutas
app.use("/productos", rutaProducto);
app.use("/carrito", rutaCarrito);

app.listen(PORT, () => {
	console.log(`Escuchando en el puerto: http://localhost:${PORT}/`);
});
