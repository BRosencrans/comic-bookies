const express = require("express");
const router = express.Router();
const {User, Post, Comment} = require('../../models');




// database routes for the posts
router.get("/", (req, res) => {
   //finds all posts and attached comments
    Post.findAll({
    include:[
    {model: Comment,
        as: "Comment",
    attributes: ['id','post_id','username','comment']
    }]
    })
    .then(allPosts => res.json(allPosts))
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    //finds one post and attached comments
   Post.findByPk(req.params.id,{
    include: [
    {model: Comment,
        as: 'Comment',
    attributes: ['id','post_id','username','comment'],
    }]
    })
    .then(onePost => {
    if (!onePost) {
    res.status(404).json({ message: "There is no post with this id" });
    return;
    }res.json(onePost);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    if(!req.session.userId){
        alert('log in first!');
        return res.status(403).json({message:"login first!"});
      
     }
   //creates new post
    Post.create({
    title: req.body.title,
    username: req.session.username,
    text: req.body.text,
    image: req.body.image})
    .then(newPost => {
        res.json(newPost)
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    //updates post
    Post.update({
    title: req.body.title,
    content: req.body.content}, 
    {where:{d: req.params.id}
    }).then(updatePost => {
    if (!updatePost) {
    res.status(404).json({ message: "There is no post with this id" });
    return;
    }res.json(updatePost);
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

router.delete('/:id',(req, res) => {
  //deletes a post
    Post.destroy({
    where: {id: req.params.id}
    }).then(deletePost => {
    if (!deletePost) {
    res.status(404).json({ message: "There is no post with this id" });
    return;
    }res.json(deletePost);
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

module.exports = router;