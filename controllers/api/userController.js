const express = require("express");
const router = express.Router();
const { User, Post, Comment } = require("../../models");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "aww shucks!", err });
    });
});
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id, {
    include: {
      model: Post,
      as: "Post",
    },
  })
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "aww shucks!", err });
    });
});
router.post("/signup", (req, res) => {
  console.log(req.body);
  User.create({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  })
    .then((userData) => {
      req.session.userId = userData.id;
      req.session.userEmail = userData.email;
      req.session.username = userData.username;
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "aww shucks!", err });
    });
});
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((userData) => {
      if (!userData) {
        return res.status(403).json({ msg: "incorrect login credentials" });
      } else {
        if (bcrypt.compareSync(req.body.password, userData.password)) {
          req.session.userId = userData.id;
          req.session.userEmail = userData.email;
          req.session.username = userData.username;
          return res.json(userData);
        } else {
          return res.status(403).json({ msg: "incorrect login credentials" });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "aww shucks!", err });
    });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("An error occurred while logging out.");
    }
    res.clearCookie("sid");
    res.status(200).send("Logout successful.");
  });
});

router.get("/username", (req, res) => {
  User.findOne({
    where: {
      username: req.query.username,
    },
  })
    .then((userData) => {
      req.session.username = userData.username;
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "aww shucks!", err });
    });
});

module.exports = router;
