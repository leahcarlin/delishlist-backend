const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const { SALT_ROUNDS } = require("../config/constants");
const { Op } = require("sequelize");

//model imports
const User = require("../models/").user;
const List = require("../models/").list;
const Collaborator = require("../models/").collaborator;
const Restaurant = require("../models/").restaurant;
const ListRest = require("../models/").listRest;
const UserRest = require("../models/").userRest;

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return res.status(200).send({ token, ...user.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, profileImg } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res
      .status(400)
      .send("Please provide an email, password and your first and last name");
  }

  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      profileImg,
    });

    delete newUser.dataValues["password"]; // don't send back the password hash

    const token = toJWT({ userId: newUser.id });

    res.status(201).json({ token, ...newUser.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res) => {
  // don't send back the password hash
  delete req.user.dataValues["password"];
  res.status(200).send({ ...req.user.dataValues });
});

// GET my lists `localhost:4000/mylists`
router.get("/mylists", authMiddleware, async (req, res, next) => {
  try {
    const userWithLists = await User.findByPk(req.user.id, {
      include: {
        model: List,
        include: {
          model: User,
          through: {
            attributes: [],
          },
        },
      },
    });
    // console.log("user in back end", userWithLists);
    res.send(userWithLists);
  } catch (e) {
    next(e);
  }
});

// GET single list details `localhost:4000/mylists/:id`
router.get("/mylists/:id", async (req, res, next) => {
  try {
    const listId = req.params.id;
    const listDetails = await List.findByPk(listId, {
      include: [
        {
          model: Restaurant,
          through: {
            attributes: ["visited"],
          },
        },
        {
          model: User,
          through: {
            attributes: [
              /*can put an attribute here*/
            ],
          },
        },
      ],
    });
    if (!listDetails) {
      res.status(404).send("No list found for this id");
    } else {
      console.log("list details in back end", listDetails);
      res.send(listDetails);
    }
  } catch (e) {
    next(e);
  }
});

// Create a new lists - POST `localhost:4000/mylists`
router.post("/mylists", authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) res.status(404).send({ message: "No user found" });
    const { title } = req.body;
    if (!title)
      res
        .status(400)
        .send({ message: "A title is required to create a new list" });
    else {
      const newList = await List.create({
        title,
        ownerId: req.user.id,
      });
      res.status(201).send({ ...newList.dataValues });
    }
  } catch (e) {
    next(e);
  }
});

// add a restaurant to one of my lists
router.post("/mylists/:id", async (req, res, next) => {
  try {
    const listId = req.params.id;
    const list = await List.findByPk(listId);
    if (!list) res.status(404).send({ message: "List not found" });

    const { name, photoReference, placeId, priceLevel, rating } = req.body;
    let restaurant = await Restaurant.findOne({ where: { placeId } });

    if (!restaurant) {
      restaurant = await Restaurant.create({
        name,
        photoReference,
        placeId,
        priceLevel,
        rating,
      });
    }

    const setRelations = await ListRest.create({
      listId: list.id,
      restaurantId: restaurant.id,
    });
    res
      .status(201)
      .send({ ...restaurant.dataValues, ...setRelations.dataValues });
  } catch (e) {
    next(e);
  }
});

// search for a user by name
router.post("/user/search", async (req, res, next) => {
  try {
    const { name } = req.body;
    const findUser = await User.findAll({
      where: {
        [Op.or]: {
          firstName: { [Op.iLike]: `%${name}%` },
          lastName: { [Op.iLike]: `%${name}%` },
        },
      },
    });
    console.log("user?", findUser);
    if (findUser.length === 0)
      res.status(404).send({ message: "No user(s) found" });
    else {
      res.status(201).send(findUser);
    }
  } catch (e) {
    next(e);
  }
});

// add a collaborator to one of my lists
router.get(
  "/mylists/:id/add/:userId",
  authMiddleware,
  async (req, res, next) => {
    try {
      const requestorId = req.user.id;
      const listId = req.params.id;

      //check permissions - only the owner can add collaborators to a list
      const list = await List.findByPk(listId);
      if (list.ownerId !== requestorId)
        res.status(401).send({
          message: "Only the list's owner can add other collaborators",
        });

      const addUserId = req.params.userId;
      const user = await User.findByPk(addUserId);
      if (!user) res.status(404).send({ message: "User not found" });

      const checkCollab = await Collaborator.findOne({
        where: { listId: list.id, userId: user.id },
      });
      console.log("check collab:", checkCollab);

      if (checkCollab) {
        res.status(406).send({
          message:
            "The user you want to add is already a collaborator on this list",
        });
      } else {
        const addCollab = await Collaborator.create({
          userId: user.id,
          listId: list.id,
        });
        res.status(201).send({ ...addCollab.dataValues });
      }
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
