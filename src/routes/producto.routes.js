const express = require("express");
const rutaProducto = express.Router();
const {
	getAllProducts,
	postProduct,
	getProductById,
	putProducts,
	deleteProduct,
	getProductByCod,
	getProductByName,
	getProductsByPrice,
} = require("../services/producto.services");

rutaProducto
	.route("")

	// Obteenr todos los productos
	.get(getAllProducts)

	// Agregar un producto
	.post(postProduct);

rutaProducto
	.route("/id/:id")

	// Buscar un producto por ID
	.get(getProductById)

	// Actualizar un producto
	.put(putProducts)

	// Borrar un deleteProduct
	.delete(deleteProduct);

rutaProducto
	.route("/codigo/:id")

	.get(getProductByCod);

rutaProducto.route("/search/:name").get(getProductByName);

rutaProducto.route("/precio/").get(getProductsByPrice);

module.exports = rutaProducto;
