const Sequelize = require("sequelize");
const database = require("../config/database");
const Login = require("./logins");

const PhotoPost = database.define(
  "photo_posts",
  {
    post_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_photo_url: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    post_caption: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    post_created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    login_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Login,
        key: "login_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: false,
  }
);

Login.hasMany(PhotoPost, { foreignKey: "login_id" });
PhotoPost.belongsTo(Login, { foreignKey: "login_id" });

PhotoPost.sync();

module.exports = PhotoPost;
