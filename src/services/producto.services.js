const admin = require("../db/firebase");
const db = admin.firestore();
const query = db.collection("productos");

// Obtener todos los proctos
const getAllProducts = async (req, res) => {
	try {
		const querySnapshot = await query.get();
		const docs = querySnapshot.docs;
		const data = docs.map((doc) => ({
			id: doc.id,
			codigo: doc.data().codigo,
			descripcion: doc.data().descripcion,
			foto: doc.data().foto,
			nombre: doc.data().nombre,
			precio: doc.data().precio,
			stock: doc.data().stock,
		}));

		res.status(200).json(data);
	} catch (err) {
		res.status(400).json({ mensaje: "error al realizar la solicitud" });
	}
};

// Agregar productos
const postProduct = async (req, res) => {
	try {
		if (req.body.admin) {
			const querySnapshot = await query.get();
			const id = querySnapshot.docs.length + 1;
			const doc = query.doc(`${id}`);
			await doc.create(req.body);
			res.status(201).json("se creo el producto correctamente");
		} else {
			res.status(401).json({
				error: "-1",
				descripcion: "ruta POST/prodcutos metodo postProduct no autorizada",
			});
		}
	} catch (err) {
		res.status(400).json({ mensaje: "error al intentar agregar un producto" });
	}
};

// Buscsar producto por codigo
const getProductById = async (req, res) => {
	try {
		const id = req.params.id;
		const doc = query.doc(`${id}`);
		const item = await doc.get();
		const data = item.data();

		data.length === 0
			? res.status(204).json({ error: "producto no encontrado" })
			: res.status(200).json(data);
	} catch (err) {
		res.status(400).json({ mensaje: `error al intentar buscar el producto` });
	}
};

// Actualizar productos
const putProducts = async (req, res) => {
	try {
		if (req.body.admin) {
			const id = req.params.id;
			const doc = query.doc(`${id}`);
			const item = await doc.get();
			const data = item.data();

			data.length === 0 ? res.sendStatus(404) : await doc.update(req.body);

			res.status(201).json(data);
		} else {
			res.status(401).json({
				error: "-1",
				descripcion: "ruta PUT/prodcutos metodo putProducts no autorizada",
			});
		}
	} catch (err) {
		res
			.status(400)
			.json({ mensaje: `error al intentar actualizar el producto` });
	}
};

// Borrar productos
const deleteProduct = async (req, res) => {
	try {
		if (req.body.admin) {
			const id = req.params.id;
			const doc = query.doc(`${id}`);
			const item = await doc.get();
			const data = item.data();

			!data ? res.sendStatus(404) : await doc.delete();

			res.status(410).json(data);
		} else {
			res.status(401).json({
				error: "-1",
				descripcion: "ruta DELETE/prodcutos metodo deleteProduct no autorizada",
			});
		}
	} catch (err) {
		res.status(400).json({ mensaje: `error al intentar borrar el producto` });
	}
};

// Buscar producto por nombre
const getProductByName = async (req, res) => {
	try {
		const name = req.params.name;
		const data = await (await query.where("nombre", "==", name).get()).docs;
		const item = data.map((doc) => ({
			id: doc.id,
			codigo: doc.data().codigo,
			descripcion: doc.data().descripcion,
			foto: doc.data().foto,
			nombre: doc.data().nombre,
			precio: doc.data().precio,
			stock: doc.data().stock,
		}));

		item.length === 0
			? res.status(204).json({ error: "producto no encontrado" })
			: res.status(200).json(item);
	} catch (error) {
		res.status(400).json({ mensaje: "error al realizar la solicitud" });
	}
};

// Buscar producto por codigo
const getProductByCod = async (req, res) => {
	try {
		const id = req.params.id;
		const data = await (await query.where("codigo", "==", id).get()).docs;
		const item = data.map((doc) => ({
			id: doc.id,
			codigo: doc.data().codigo,
			descripcion: doc.data().descripcion,
			foto: doc.data().foto,
			nombre: doc.data().nombre,
			precio: doc.data().precio,
			stock: doc.data().stock,
		}));

		item.length === 0
			? res.status(204).json({ error: "producto no encontrado" })
			: res.status(200).json(item);
	} catch (error) {
		res.status(400).json({ mensaje: "error al realizar la solicitud" });
	}
};

// Buscar producto por rango de precio
const getProductsByPrice = async (req, res) => {
	try {
		const menor = req.query.menor || 0;
		const mayor = req.query.mayor || "all";
		let data = "";

		if (mayor === "all") {
			// todos los productos mayores al menor indicado
			const querySnapshot = await query.where("precio", ">=", menor).get();
			const docs = querySnapshot.docs;
			data = docs;
		} else {
			// todos los prodcutos entre el menor y el mayor
			const querySnapshot = await query
				.where("precio", ">=", 100)
				.where("precio", "<=", 10000)
				.get();
			const docs = querySnapshot.docs;
			data = docs;
		}

		const item = data.map((doc) => ({
			id: doc.id,
			codigo: doc.data().codigo,
			descripcion: doc.data().descripcion,
			foto: doc.data().foto,
			nombre: doc.data().nombre,
			precio: doc.data().precio,
			stock: doc.data().stock,
		}));

		item.length === 0
			? res.status(204).json({ error: "producto no encontrado" })
			: res.status(200).json(item);
	} catch (error) {
		res.status(400).json({ mensaje: "error al realizar la solicitud" });
	}
};

module.exports = {
	getAllProducts,
	postProduct,
	getProductById,
	putProducts,
	deleteProduct,
	getProductByCod,
	getProductByName,
	getProductsByPrice,
};
