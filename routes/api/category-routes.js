const router = require("express").Router();
// const { where } = require("sequelize/types");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
	// find all categories
	const categories = await Category.findAll({
		// be sure to include its associated Products
		include: [{ model: Product }],
	});
	res.status(200).json(categories);
});

router.get("/:id", async (req, res) => {
	// find one category by its `id` value
	const category = await Category.findByPk(req.params.id, {
		// be sure to include its associated Products
		include: [{ model: Product }],
	});
	res.status(200).json(category);
});

router.post("/", async (req, res) => {
	// create a new category
	const addCategory = await Category.create(req.body);
	res.status(200).json({
		msg: `Successfully created new category!`,
		addCategory,
	});
});

router.put("/:id", async (req, res) => {
	// update a category by its `id` value
	await Category.update(req.body, {
		where: {
			id: req.params.id,
		},
	});
	res.status(200).json({
		msg: `Successfully updated the category with id of ${req.params.id}`,
		...req.body,
	});
});

router.delete("/:id", async (req, res) => {
	// delete a category by its `id` value
	await Category.destroy({
		where: {
			id: req.params.id,
		},
	});
	res.status(200).json({
		msg: `Successfully deleted the category with id of ${req.params.id}`,
	});
});

module.exports = router;
