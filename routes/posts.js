const router = require('express').Router();
const Post = require('../models/Post');

// 新規投稿
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 投稿編集
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.updateOne({
        $set: req.body,
      });
      return res.status(200).json('投稿編集に成功しました');
    } else {
      return res.status(403).json('他の人の投稿を編集できません');
    }
  } catch (err) {
    return res.json(500).json(err);
  }
});

// 投稿削除
router.delete('/:id/delete', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json('投稿削除が成功しました');
    } else {
      return res.status(403).json('他の人の投稿を削除できません');
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 投稿取得
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 投稿にいいねを押す
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: {
          likes: req.body.userId,
        },
      });
      return res.status(200).json('投稿にいいねを押しました');
    } else {
      await post.updateOne({
        $pull: {
          likes: req.body.userId,
        },
      });
      return res.status(403).json('投稿からいいねを外しました');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// タイムラインの投稿取得
router.get('/timeline/all', async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
