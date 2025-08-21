import express from 'express';
import cors from 'cors';
import { Sequelize, DataTypes } from 'sequelize';

const app = express();
const port = process.env.PORT || 3000;

const sequelize = new Sequelize(process.env.PG_URI);

app.use(express.json(), cors());

const Post = sequelize.define('posts', {
  author: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cover: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

await sequelize.authenticate();
await Post.sync();

app.post('/posts', async (req, res) => {
  const { author, title, content, cover } = req.body;
  try {
    const post = await Post.create({
      author,
      title,
      content,
      cover,
    });
    res.status(201).json({ data: post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json({ data: posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      res.status(404).json({ msg: 'Post not found' });
      return;
    }
    res.json({ data: post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { author, title, content, cover } = req.body;
  try {
    const [rowCount, rows] = await Post.update(
      { author, title, content, cover },
      { where: { id }, returning: true }
    );
    if (rowCount !== 1) {
      res.status(404).json({ msg: 'Post not found' });
      return;
    }
    res.json({ msg: 'Post updatet', data: rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rowCount = await Post.destroy({ where: { id } });
    if (rowCount !== 1) {
      res.status(404).json({ msg: 'Post not found' });
      return;
    }
    return res.status(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

app.listen(port, () => console.log(`Sequelize Server läuft auf port ${port}`));
