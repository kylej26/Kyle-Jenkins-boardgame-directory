module.exports = {
	getAdd: (req, res) => {
		let query = "SELECT * FROM Game";

    db.query(query, (err, games) => {
      if (err) {
        console.error('Error fetching games:', err);
        //error messages
        res.redirect('/error');
        return;
      }

      res.render('add-game-session.ejs', {
        title: 'Board Games | Add Game Session',
        games: games
      });
    });
  },
	postAdd: (req, res) => {
		const { gameId } = req.body;
		if (!gameId || isNaN(gameId)) { //checks if input is number 
			console.error('Invalid gameId:', gameId);
			
			res.redirect('/error');
			return
		}
		const gameIdInt = parseInt(gameId, 10);
	
	
		// TODO: Insert game session information into the database
		let insertQuery = "INSERT INTO session (gameid, date) VALUES (?, NOW())";
	
		db.query(insertQuery, [gameIdInt], (err) => {
		  if (err) {
			console.error('Error inserting game session into the database:', err);
			
			res.redirect('/error');
			return;
		  }
	
		  // If all went well, go back to the main screen or wherever appropriate
		  console.log('Game session inserted successfully');
		  res.redirect('/');
		});
	  }
	};
