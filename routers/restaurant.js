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

module.exports = router;
