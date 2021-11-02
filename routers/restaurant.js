const { Router } = require("express");
const request = require("request");
const router = new Router();

const API_KEY = "AIzaSyC8xDuaNPzG31t7Ns31FOlA8Q1HngWaWTM";

router.get("/", (req, res) => {
  request(
    {
      url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJ8TC-edsJxkcRJaQoPxTsOmQ&key=${API_KEY}`,
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
