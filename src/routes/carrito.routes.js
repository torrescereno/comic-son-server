const express = require('express');
const rutaCarrito = express.Router();
const { listarCarritos, agregarCarrito, borrarCarrito } = require('../services/carrito.services');



rutaCarrito.route('')

.get(listarCarritos)
.post(agregarCarrito);

rutaCarrito.route('/:id')
.delete(borrarCarrito);

module.exports = rutaCarrito;