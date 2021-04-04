const admin = require("../db/firebase");
const db = admin.firestore();
const carritoRef = db.collection("carrito");
const productoRef = db.collection("productos");

// Lsitar todos los carritos existentes
const getAllCarts = async (req, res) => {
	try {
		const id = req.params.id;
		const doc = carritoRef.doc(`${id}`);
		const item = await doc.get();
		const data = item.data();
		res.status(200).json(data);
	} catch (err) {
		console.log(err);
		res.status(400).json({ mensaje: "error al realizar la solicitud" });
	}
};

// Agregar carrito
const postCart = async (req, res) => {
	try {
		const { idProdcuto, cantidadProducto } = req.body;

		const doc = productoRef.doc(`${idProdcuto}`);
		const item = await doc.get();
		const dataProducto = item.data();

		if (dataProducto.length === 0) {
			res.status(204).json({ error: "producto no encontrado" });
			return;
		} else {
			// generar id del carrito
			const querySnapshot = await carritoRef.get();
			const id = querySnapshot.docs.length + 1;
			const doc = carritoRef.doc(`${id}`);

			await doc.create({
				producto: dataProducto,
				cantidad: cantidadProducto,
			});

			res.status(201).json("se creo el carrito correctamente");
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({ mensaje: "No se puedo agregar el carrito" });
	}
};

// borrar carrito
const deleteCart = async (req, res) => {
	try {
		const id = req.params.id;
		const doc = carritoRef.doc(`${id}`);
		const item = await doc.get();
		const data = item.data();

		!data ? res.sendStatus(404) : await doc.delete();

		res.status(410).json(data);
	} catch (err) {
		res.status(400).json({ mensaje: `error al intentar borrar el carrito` });
	}
};

module.exports = {
	getAllCarts,
	postCart,
	deleteCart,
};
