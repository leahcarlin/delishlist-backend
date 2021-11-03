const { Router } = require("express");
const request = require("request");
const router = new Router();

const API_KEY = "AIzaSyC8xDuaNPzG31t7Ns31FOlA8Q1HngWaWTM";

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

// mark a restaurant as a favorite
// router.put("/:id/favorite", (req, res, next) => {
//   const id = req.params.id

// })

module.exports = router;
