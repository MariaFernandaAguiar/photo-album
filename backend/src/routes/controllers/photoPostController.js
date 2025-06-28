const Login = require("../../models/logins");
const PhotoPost = require("../../models/photoPost");

exports.findAll = async (req, res) => {
  try {
    const posts = await PhotoPost.findAll({
      include: {
        model: Login,
        attributes: [
          "login_id",
          "login_name",
          "login_email",
          "login_photo_url",
        ],
      },
    });
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao buscar posts" });
  }
};

exports.findOne = async (req, res) => {
  try {
    const post = await PhotoPost.findOne({
      where: { post_id: req.params.postId },
      include: {
        model: Login,
        attributes: [
          "login_id",
          "login_name",
          "login_email",
          "login_photo_url",
        ],
      },
    });
    if (!post) return res.status(404).json({ error: "Post não encontrado" });
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao buscar post" });
  }
};

exports.create = async (req, res) => {
  try {
    const novoPost = await PhotoPost.create({
      post_photo_url: req.body.post_photo_url,
      post_caption: req.body.post_caption,
      login_id: req.body.login_id,
    });
    return res.status(201).json(novoPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao criar post" });
  }
};

exports.update = async (req, res) => {
  try {
    const post = await PhotoPost.findOne({
      where: { post_id: req.params.postId },
    });

    if (!post) return res.status(404).json({ error: "Post não encontrado" });
    if (post.login_id !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Você não tem permissão para atualizar este post" });
    }

    await PhotoPost.update(
      {
        post_photo_url: req.body.postPhotoUrl,
        post_caption: req.body.postCaption,
      },
      { where: { post_id: req.params.postId } }
    );

    const updatedPost = await PhotoPost.findOne({
      where: { post_id: req.params.postId },
    });
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao atualizar post" });
  }
};

exports.delete = async (req, res) => {
  try {
    const post = await PhotoPost.findOne({
      where: { post_id: req.params.postId },
    });

    if (!post) return res.status(404).json({ error: "Post não encontrado" });
    if (post.login_id !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Você não tem permissão para deletar este post" });
    }

    await PhotoPost.destroy({ where: { post_id: req.params.postId } });
    return res.status(200).json({ mensagem: "Post deletado com sucesso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao deletar post" });
  }
};
