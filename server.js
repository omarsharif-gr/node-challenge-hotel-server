const express = require("express");
const cors = require("cors");

const moment = require("moment")

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");
const { request } = require("http");
const { response } = require("express");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// Read all bookings
app.get("/bookings", function (request, response) {
  response.json(bookings);
});


// Read one booking as specified by an ID
app.get("/bookings/:bookingId", function (request, response) {
  const findBooking = bookings.filter((booking) => {
    return booking.id === parseInt(request.params.bookingId);
  });
  if (findBooking.length === 0) {
    response
      .status(404)
      .send(`There is no booking with the id of ${request.params.bookingId}`);
  } else {
    response.json(findBooking);
  }
});

// Delete one booking:
app.delete("/bookings/:bookingId", (req, res)=> {
  const originalLengthOfBookings = bookings.length;
  bookings = bookings.filter((booking) => {
    return booking.id != request.params.bookingId;
  });
  if (originalLengthOfBookings === bookings.length) {
    response.status(404).send(`${request.params.bookingId} is not in our database.`)
  } else {
    response.json(bookings);
  }
  })


// Add one booking

// TODO add your routes and helper functions here

const listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
