import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Post = sequelize.define("posts", {
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
  },
});

export default Post;
