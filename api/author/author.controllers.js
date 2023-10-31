const Post = require("../../models/Post");
const Author = require("../../models/author");

exports.postsCreate = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const author = Author.findbyid(authorId);
    if (!author) res.status(404).json("Author not found");
    await author.updateOne({ $push: { posts: newPost } });
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};
