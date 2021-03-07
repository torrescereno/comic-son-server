const Carrito = require('../models/carrito');

const prod = require('./producto.services');

let carritos = [];
const productos = prod.productos;
let productosCarrito = [];


const getCart = (id) => carritos.find( carrito => carrito.id == id);
const getProduct = (id) => productos.find( producto => producto.id == id);

// Lsitar todos los carritos existentes
const listarCarritos = (req, res) => {
    try {
        res.status(200).json(carritos)
    } catch (err) {
        console.log(err);
        res.status(400).json({mensaje: 'error al realizar la solicitud'})
    } 
};

const agregarCarrito = (req, res) => {

    try {

        const { idProdcuto, cantidadProducto }  = req.body; 

        // Buscar el producto
        const producto = getProduct(idProdcuto);

        if (!producto){
            res.status(204).json({error: 'producto no encontrado'})
            return;
        }else{
            // Se crea un nuevo carrito con el producto
            if (carritos.length == 0) {
                // Esta vacio
                const idCarrito = carritos.length + 1;
                const timestamp = new Date();

                // Crear un arrego de productos con el id y la cantidad
                // que se desaa agregar

                productosCarrito.push({ "idProducto": idProdcuto, 
                                        "timestamp": producto.timestamp, 
                                        "nombre": producto.nombre, 
                                        "descripcion" : producto.descripcion,
                                        "codigo": producto.codigo,
                                        "foto": producto.foto,
                                        "precio": producto.precio,
                                        "catidadProducto" : cantidadProducto, });
                const pCarrito = new Carrito(idCarrito, timestamp, productosCarrito);
                carritos.push(pCarrito);
                res.sendStatus(200)
                return;
            }

            for (const item of carritos) {

                const id = item.producto[0].idProducto;

                if (id == idProdcuto) {
                    // El producto ya fue cargado al carrito
                    item.producto[0].catidadProducto += cantidadProducto;
                    res.sendStatus(200)
                }else{
                    // El carrito existe y el prodcuto no ha sido cargado
                    productosCarrito.push({ "idProducto": idProdcuto, 
                                        "timestamp": producto.timestamp, 
                                        "nombre": producto.nombre, 
                                        "descripcion" : producto.descripcion,
                                        "codigo": producto.codigo,
                                        "foto": producto.foto,
                                        "precio": producto.precio,
                                        "catidadProducto" : cantidadProducto, });
                    res.sendStatus(200)
                }
            };

        }
                
    } catch (err) {
        console.log(err);
        res.status(400).json({mensaje: 'No se puedo agregar el carrito'})
    }
};

const borrarCarrito = (req, res) => {

    try {
        const id = req.params.id;
        const carrito = getCart(id)

        !carrito ?  res.sendStatus(404) :   
            carritos = carritos.filter( carrito => carrito.id != id );
        
        res.status(410).json(carrito);
    } catch (err) {
        console.log(err);
        res.status(400).json({mensaje: `error al intentar borrar el carrito`});
    };
};

module.exports = {
    listarCarritos,
    agregarCarrito,
    borrarCarrito,
}