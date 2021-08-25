const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
	// find all tags
	const tags = await Tag.findAll({
		// be sure to include its associated Product data
		include: [Product],
	});
	res.status(200).json(tags);
});

router.get("/:id", async (req, res) => {
	// find a single tag by its `id`
	// be sure to include its associated Product data
	const tag = await Tag.findByPk(req.params.id, {
		include: [{ model: Product }],
	});
	res.status(200).json(tag);
});

router.post("/", async (req, res) => {
	// create a new tag
	const addTag = await Tag.create(req.body);
	res.status(200).json({
		msg: `Successfully created new tag!`,
		addTag,
	});
});

router.put("/:id", async (req, res) => {
	// update a tag's name by its `id` value
	await Tag.update(req.body, {
		where: {
			id: req.params.id,
		},
	});
	res.status(200).json({
		msg: `Successfully updated the tag with id of ${req.params.id}`,
		...req.body,
	});
});

router.delete("/:id", async (req, res) => {
	// delete on tag by its `id` value
	await Tag.destroy({
		where: {
			id: req.params.id,
		},
	});
	res.status(200).json({
		msg: `Successfully deleted the tag with id of ${req.params.id}`,
	});
});

module.exports = router;
