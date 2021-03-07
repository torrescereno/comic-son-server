const Producto = require('../models/producto');

let productos = [];
const getProduct = (id) => productos.find( producto => producto.id == id)

const obtenerProductos = (req, res) => {
    try {
        res.status(200).json(productos)
    } catch (err) {
        console.log(err);
        res.status(400).json({mensaje: 'error al realizar la solicitud'})
    }  
}

const agregarProducto = (req, res) => {

    try {

        if (req.body.admin) {
            // Se toma todos del cuerpo que reciba del front (el id y el timestamp lo genera la base de datos)
            
            // ******* //
            const id = productos.length + 1;
            const timestamp =  new Date();
            const {nombre, descripcion, codigo, foto, precio, stock} = req.body;
            // ******* //

            const pProducto = new Producto(id, timestamp, nombre, descripcion, codigo, foto, precio, stock);
            productos.push(pProducto);
            res.status(200).json(pProducto)
        }else{
            res.status(401).json({"error": "-1", "descripcion": "ruta POST/prodcutos metodo agregarProductos no autorizada"})
        }

    } catch (err) {
        console.log(err);
        res.status(400).json({mensaje: 'error al intentar agregar un producto'})
    }
}

const busrcarPrducto = (req, res) => {
    try {
        const id = req.params.id;
        const producto = getProduct(id);
        !producto ? res.status(204).json({error: 'producto no encontrado'}) : res.status(200).json(producto);
    } catch (err) {
        console.log(err);
        res.status(400).json({mensaje: `error al intentar buscar el producto`})
    }
}

const actualizarProducto = (req, res) => {
    try {

        if (req.body.admin) {
            const id = req.params.id;
            const producto = getProduct(id);
    
            !producto ?  res.sendStatus(404) : 
                producto.nombre = req.body.nombre;
                producto.des = req.body.precio;
                producto.foto = req.body.foto;
                producto.precio = req.body.precio; 
                producto.stock = req.body.stock;
            
            res.status(201).json(producto)
        
        }else{
            res.status(401).json({"error": "-1", "descripcion": "ruta PUT/prodcutos metodo actualizarProducto no autorizada"})
        }
        
    } catch (err) {
        console.log(err);
        res.status(400).json({mensaje: `error al intentar actualizar el producto`});
    }
}

const borrarProducto = (req, res) => {
    try {
        if (req.body.admin) {
            const id = req.params.id;
            const producto = getProduct(id)
    
            !producto ?  res.sendStatus(404) :   
                productos = productos.filter( producto => producto.id != id );
            
            res.status(410).json(producto);
        }else{
            res.status(401).json({"error": "-1", "descripcion": "ruta DELETE/prodcutos metodo borrarProducto no autorizada"})
        }
        
    } catch (err) {
        console.log(err);
        res.status(400).json({mensaje: `error al intentar borrar el producto`});
    }
}

module.exports = {
    obtenerProductos,
    agregarProducto,
    busrcarPrducto,
    actualizarProducto,
    borrarProducto,
    productos
}