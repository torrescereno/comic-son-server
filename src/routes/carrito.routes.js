const express = require("express");
const rutaCarrito = express.Router();
const {
	getAllCarts,
	postCart,
	deleteCart,
} = require("../services/carrito.services");

rutaCarrito
	.route("")

	.get(getAllCarts)
	.post(postCart);

rutaCarrito.route("/:id").delete(deleteCart);

module.exports = rutaCarrito;
