const express = require('express');
const rutaProducto = express.Router();
const { obtenerProductos,
        agregarProducto,
        busrcarPrducto,
        actualizarProducto,
        borrarProducto } = require('../services/producto.services')

rutaProducto.route('')

// Obteenr todos los productos
.get(obtenerProductos)

// Agregar un producto
.post(agregarProducto)

rutaProducto.route('/:id')

// Buscar un producto por ID
.get(busrcarPrducto)

// Actualizar un producto
.put(actualizarProducto)

// Borrar un producto
.delete(borrarProducto);

module.exports = rutaProducto;