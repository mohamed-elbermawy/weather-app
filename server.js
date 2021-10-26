const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;
const staticFolderPath = path.join(__dirname, "public");
const viewsPath = path.join(__dirname, "templates/views");
const partialPath = path.join(__dirname, "templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(staticFolderPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "weather",
    info: "Use this site to get your weather!",
    name: "weather page",
  });
});

app.get("/api/weather", (req, res) => {
  if (!req.query.address) return res.send({ error: "you must provide an address" });

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    forecast(data.latitude, data.longitude, (error, forecastdata) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastdata,
        location: data.location,
        address: req.query.address,
      });
    });
  });
});

app.get("/weather", (req, res) => {
  res.render("weather", {
    title: "weather",
    name: "Weather page",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: "About page",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "help page",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "help 404",
    name: "help 404 page",
    massage: "Help article not found",
  });
});

app.get("/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "404 page",
    massage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
