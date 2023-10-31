const express = require("express");
const { postsCreate } = require("./author.controllers");

const router = express.Router();

router.post("/:authorId", postsCreate);

module.exports = router;
