// DO THIS FOR USERS EVENTS AND SONGS
// NOW IT DOES IT FOR USERS PLANTS AND NOTIFICATIONS

const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../models/User');
const Event = require('../models/Event');
const Track = require('../models/Track');

(async function() {
  /** CONNECT TO MONGO */
  //"mongodb+srv://flo:krjAXHmI6Br0ueAl@todocluster-5dky8.mongodb.net/test?retryWrites=true&w=majority"
  //mongodb+srv://flo:<password>@cluster0-hkch3.mongodb.net/test?retryWrites=true&w=majority

  mongoose.connect("mongodb+srv://flo:0OEqIlxiIDRVkVlB@cluster0-hkch3.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

  mongoose.connection.on('open', () => {
    console.log(`Connected to the database...`);
  });

  console.log(`First, i will delete all the old users`);

  /** DELETE ALL USERS */
  try {
    await User.deleteMany({});
    console.log('Old users moved to a better place. Spandau');
  } catch (e) {
    console.log(e);
  }

  /** DELETE ALL EVENTS */
  try {
    await Event.deleteMany({});
    console.log('Old Events moved to a better place. Spandau');
  } catch (e) {
    console.log(e);
  }

  /** DELETE ALL TRACKS */
  try {
    await Track.deleteMany({});
    console.log('Old Tracks moved to a better place. Spandau');
  } catch (e) {
    console.log(e);
  }

  //   console.log(`I am creating 10 fake users`);

  //   /** CREATE 20 FAKE USERS */
  const userPromises = Array(10)
    .fill(null)
    .map(() => {
      const user = new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'heydj',
        role: faker.random.arrayElement(['Admin', 'User'])
      });
      console.log(`Created user:`);
      console.log(`Email: ${user.email}`);
      console.log(`Password: ${user.password}`);
      console.log(`Role: ${user.role}`);
      console.log(`-----------------------------`);

      const token = user.generateAuthToken();
      return user.save();
    });

  try {
    await Promise.all(userPromises);
    console.log('Users stored in the database!');
  } catch (e) {
    console.log(e);
  }

  console.log(`I am creating 10 fake Events`);

  /** CREATE 10 FAKE EVENTS FOR EACH USER */
  const allUsers = await User.find();
  for (const user of allUsers) {
    const eventsPromises = Array(5)
      .fill(null)
      .map(() => {
        const event = new Event({
          userId: user._id,
          title: faker.name.lastName(),
          artist: faker.name.firstName(),
          date: faker.date.future(''),
          location: faker.address.city(),
          time: faker.date.future(''),
          genre: faker.name.firstName()
        });

        return event.save();
      });

    try {
      await Promise.all(eventsPromises);
      console.log(`Created 10 events for ${user.firstName} ${user.lastName}!`);
    } catch (e) {
      console.log(e);
    }
  }

  /** CREATE SOME FAKE Tracks */
  const allEvents = await Event.find();
  for (const event of allEvents) {
    const notPromises = Array(15)
      .fill(null)
      .map(() => {
        const track = new Track({
          userId: event.userId,
          eventId: event._id,
          artist: faker.company.companyName(),
          album: faker.company.catchPhraseDescriptor(),
          title: faker.commerce.color(),
          artwork: faker.image.imageUrl(),
          deezerId: faker.hacker.abbreviation(),
          duration: faker.hacker.noun()
        });

        return track.save();
      });

    try {
      await Promise.all(notPromises);
      console.log(`Created 15 tracks for your event, ${event.title}`);
    } catch (e) {
      console.log(e);
    }
  }
  mongoose.connection.close();
})();


