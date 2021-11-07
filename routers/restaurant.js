const { Router } = require("express");
const request = require("request");
const router = new Router();
const authMiddleware = require("../auth/middleware");

const API_KEY = "AIzaSyC8xDuaNPzG31t7Ns31FOlA8Q1HngWaWTM";

//model imports
const ListRest = require("../models/").listRest;
const Restaurant = require("../models/").restaurant;
const UserRest = require("../models/").userRest;

// GET a restaurant with its placeId
router.get("/:id", (req, res) => {
  const placeId = req.params.id;
  request(
    {
      url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).send({ type: "error", message: err.message });
      }

      res.send(JSON.parse(body));
    }
  );
});

// search for a restaurant by name using google places api
router.post("/search", (req, res) => {
  const { name } = req.body;
  request(
    {
      url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name}&inputtype=textquery&fields=formatted_address%2Cname%2Cprice_level%2Crating%2Cphotos%2Cplace_id&key=${API_KEY}`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).send({ type: "error", message: err.message });
      }

      res.send(JSON.parse(body));
    }
  );
});

// mark a restaurant as visited on my list
router.patch("/visited", async (req, res, next) => {
  try {
    const { listId, restaurantId } = req.body;
    const restaurantOnList = await ListRest.findOne({
      where: { listId: listId, restaurantId: restaurantId },
    });
    if (!restaurantOnList)
      res.status(404).send("Restaurant does not belong to this list");
    else {
      const markVisited = await restaurantOnList.update({
        visited: !restaurantOnList.visited,
      });
      res.status(201).send(markVisited);
    }
  } catch (e) {
    next(e);
  }
});

// add a restaurant as MY favorite
router.post("/:placeId/favorite", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const placeId = req.params.placeId;

    // is restaurant already in the database?
    const restaurant = await Restaurant.findOne({
      where: { placeId: placeId },
    });
    if (!restaurant)
      res.status(404).send({
        message: "Restaurant is not yet in database",
      });
    // check to see if already in favorites table
    const checkRelation = await UserRest.findOne({
      where: { userId: userId, restaurantId: restaurant.id },
    });
    if (checkRelation)
      res.status(404).send({
        message: "You already have this restaurant marked as a favorite",
      });

    const addFavorite = await UserRest.create({
      userId: userId,
      restaurantId: restaurant.id,
    });
    res.status(201).send({ ...addFavorite.dataValues });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
