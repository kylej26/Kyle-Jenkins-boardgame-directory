// index.js
const mysql = require('mysql');

module.exports = {
  getHomePage: (req, res, db) => {
    let query = "Select Name, times_played, MostRecent from game";
  

    db.query(query, (err, result) => {
      if (err) {
        res.redirect('/');
      }
      res.render('index.ejs', {
        title: 'Board Games | View Games',
        game: result
      });
    });
  }
};
