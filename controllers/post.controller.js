import Post from "../models/Post.js";

export async function createPost(req, res) {
  const { author, title, content, cover } = req.body;
  try {
    const post = await Post.create({ author, title, content, cover });
    res.status(201).json({ data: post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}

export async function getAllPosts(req, res) {
  try {
    const posts = await Post.findAll();
    res.json({ data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}

export async function getPostById(req, res) {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.json({ data: post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}

export async function updatePost(req, res) {
  const { id } = req.params;
  const { author, title, content, cover } = req.body;
  try {
    const [rowCount, rows] = await Post.update(
      { author, title, content, cover },
      { where: { id }, returning: true }
    );
    if (rowCount !== 1) return res.status(404).json({ msg: "Post not found" });
    res.json({ msg: "Post updated", data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;
  try {
    const rowCount = await Post.destroy({ where: { id } });
    if (rowCount !== 1) return res.status(404).json({ msg: "Post not found" });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}
