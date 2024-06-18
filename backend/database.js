// database.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'restaurant.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Create Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS Users (
      UserID INTEGER PRIMARY KEY,
      Username TEXT NOT NULL,
      Password TEXT NOT NULL,
      Email TEXT NOT NULL
    )
  `);

  // Create Preferences table
  db.run(`
    CREATE TABLE IF NOT EXISTS Preferences (
      PreferenceID INTEGER PRIMARY KEY,
      UserID INTEGER,
      HungerLevel TEXT,
      FoodType TEXT,
      MaxPrice REAL,
      FOREIGN KEY (UserID) REFERENCES Users(UserID)
    )
  `);

  // Create Restaurants table
  db.run(`
    CREATE TABLE IF NOT EXISTS Restaurants (
      RestaurantID INTEGER PRIMARY KEY,
      Name TEXT NOT NULL,
      Address TEXT,
      Cuisine TEXT,
      PriceRange REAL
    )
  `);

  // Create Favorites table
  db.run(`
    CREATE TABLE IF NOT EXISTS Favorites (
      FavoriteID INTEGER PRIMARY KEY,
      UserID INTEGER,
      RestaurantID INTEGER,
      FOREIGN KEY (UserID) REFERENCES Users(UserID),
      FOREIGN KEY (RestaurantID) REFERENCES Restaurants(RestaurantID)
    )
  `);

  // Create DriveRoutes table
  db.run(`
    CREATE TABLE IF NOT EXISTS DriveRoutes (
      RouteID INTEGER PRIMARY KEY,
      UserID INTEGER,
      StartLocation TEXT,
      EndLocation TEXT,
      FOREIGN KEY (UserID) REFERENCES Users(UserID)
    )
  `);

  // Create RouteRestaurants table
  db.run(`
    CREATE TABLE IF NOT EXISTS RouteRestaurants (
      RouteRestaurantID INTEGER PRIMARY KEY,
      RouteID INTEGER,
      RestaurantID INTEGER,
      FOREIGN KEY (RouteID) REFERENCES DriveRoutes(RouteID),
      FOREIGN KEY (RestaurantID) REFERENCES Restaurants(RestaurantID)
    )
  `);
});

module.exports = db;
