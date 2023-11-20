module.exports = {
	getAdd: (req, res) => {
		res.render('add-game.ejs', {
			title: 'Board Games | Add game'
		});
	},
	getEdit: (req, res) => {
		let query = "SELECT * FROM game";

		db.query(query, (err, games) => {
		  if (err) {
			console.error('Error getting game list', err);
			res.redirect('/');
		  }
	
		  res.render('edit-game.ejs', {
			title: 'Board Games | Edit Game',
			games: games
		  });
		});
	  },
	postAdd: (req, res) => {
		// TODO db.query to insert game
		const { gameName } = req.body;
		let query = "INSERT INTO game (Name) VALUES (?)";

		db.query(query, [gameName], (err, result) => {
			if (err) {
			  console.error('Error inserting game into the database:', err);
			
			  res.redirect('/error');
			  return;
			}
			console.log('Game inserted successfully');

		// If all went well, go back to main screen
		res.redirect('/');
	});
	},
	postEdit: (req, res) => {
		const gameId = req.body.selectedGame;
    const newGameName = req.body.newGameName;

    let query = "UPDATE game SET Name = ? WHERE gameid = ?";

    db.query(query, [newGameName, gameId], (err, result) => {
      if (err) {
        console.error('Error updating game:', err);
        res.redirect('/error');
        return;
      }

      console.log('Game updated successfully');
      res.redirect('/');
    });
  }
};
