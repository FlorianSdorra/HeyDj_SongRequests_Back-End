const mongoose = require("mongoose");
const faker = require("faker");
const User = require("../models/User");
const Event = require("../models/Event");

(async function() {
  /** CONNECT TO MONGO */
//   mongoose.connect("Our API / DB", {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
//   });

  mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error:")
  );

  mongoose.connection.on("open", () => {
    console.log(`Connected to the database...`);
  });

  console.log(`First, i will delete all the old users`);

  /** DELETE ALL USERS */
  try {
    await User.deleteMany({});
    console.log("Old users moved to a better place. Spandau");
  } catch (e) {
    console.log(e);
  }

  /** DELETE ALL EVENTS */
  try {
    await Event.deleteMany({});
    console.log("Old events moved to a better place. Spandau");
  } catch (e) {
    console.log(e);
  }

  /** DELETE ALL EVENTS */
  try {
    await Event.deleteMany({});
  } catch (e) {
    console.log(e);
  }

  /** CREATE 10 FAKE USERS */
  const userPromises = Array(10)
    .fill(null)
    .map(() => {
      const user = new User({
        email: faker.internet.email(),
        password: faker.internet.password(),
        userName: faker.internet.userName(),
        role: faker.random.arrayElement(["Admin", "User"])
      });

      const token = user.generateAuthToken();
      return user.save();
    });

  try {
    await Promise.all(userPromises);
    console.log("Users stored in the database!");
  } catch (e) {
    console.log(e);
  }

  /** CREATE 10 FAKE EVENTS */
  const eventPromises = Array(10)
    .fill(null)
    .map(() => {
      const event = new Event({
        title: faker.random.words(),
        artist: faker.internet.userName(),
        year: new Date(faker.date.past()).getFullYear(),
        location: faker.address.city()
      });

      return event.save();
    });

  try {
    await Promise.all(eventPromises);
  } catch (e) {
    console.log(e);
  }

  mongoose.connection.close();
})();
