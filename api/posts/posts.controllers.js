const Post = require("../../models/Post");
const Tag = require("../../models/tag");

exports.fetchPost = async (postId, next) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    next(error);
  }
};

// exports.postsCreate = async (req, res) => {
//   try {
//     const newPost = await Post.create(req.body);
//     res.status(201).json(newPost);
//   } catch (error) {
//     next(error);
//   }
// };

exports.addTag = async (req, res, next) => {
  try {
    const { tagId, postId } = req.params;
    const tag = await Tag.findbyid(tagId);
    const post = await Post.findById(postId);
    if (!tag || !post) res.status(404).json("tag or post not found");

    await tag.updateOne({ $push: { posts: post } });
    await post.updateOne({ $push: { tags: tag } });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsDelete = async (req, res) => {
  try {
    await Post.findByIdAndRemove({ _id: req.post.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsUpdate = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.post.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsGet = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    next(error);
  }
};
