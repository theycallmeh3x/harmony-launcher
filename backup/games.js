const SteamAPI = require('steamapi');
  const steam = new SteamAPI('AFC6033C0C6567ECA1DF5DE432B95294');
  steam.resolve('http://steamcommunity.com/id/TrippySpud').then(id => {
    console.log(id); // Grab ID from URL 
    steam.getUserSummary(id).then(summary => {
      document.getElementById("userInfo").innerHTML = `<h1>Steam ID:</h1> ${id}<br>
        Summary: ${JSON.stringify(summary)}`;
        console.log(JSON.stringify(summary));
        });

          steam.getUserRecentGames(id).then(recentgame => {
            document.getElementById("recentGame").innerHTML = `<h1>Recent Games:</h1> ${JSON.stringify(recentgame)}`;
            console.log(JSON.stringify(recentgame, null, 2));


          });
          
          

  });