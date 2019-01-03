function apiCall() {
    var queryURL = "https://api.steampowered.com/";
    var apiKey = "&key=" + document.getElementById("apiKey").textContent;
    var steamID = "&steamid=76561198002826553";
    var queryAttr = "&include_appinfo=1&include_played_free_games=1";
    var queryString = queryURL + "IPlayerService/GetOwnedGames/v1/?" + "format=json" + apiKey + steamID + queryAttr;
    var imgUrl = "http://media.steampowered.com/steamcommunity/public/images/apps/"
  
    function getInfo() {
      //http GET Request
      var request = new XMLHttpRequest();
      request.open('GET', queryString, true);
      request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 400) {
          var response = JSON.parse(request.responseText); //JSON Object
          buildPage(response);
          //console.log(response); //Console Print (F12)
        } else {
          console.log("Error in network request: " + request.statusText);
        }
      });
      request.send();
    }
  
    function buildPage(response) {
      //Loop Through all Game Objects
      for (var prop in response.response.games) {
        //Assign General Game Info
        var gameName = response.response.games[prop].name;
        var gameAppId = response.response.games[prop].appid;
        var gameStoreLink = "http://store.steampowered.com/app/" + gameAppId + "/";
        var gameTime = response.response.games[prop].playtime_forever;
  
        //Assign Icons & Logos
        var gameIconUrl = response.response.games[prop].img_icon_url; //Grab Icon URL
        var gameIconDisp = imgUrl + gameAppId + "/" + gameIconUrl + ".jpg"; //Small Img
        var gameLogoUrl = response.response.games[prop].img_logo_url; //Grab Logo URL
        var gameLogoDisp = imgUrl + gameAppId + "/" + gameLogoUrl + ".jpg"; //Big Img
  
        //Create HTML DOM Elements
        var newDiv = document.createElement('div');
        var newLogo = document.createElement('img');
        var newIcon = document.createElement('img');
        var newLogoLink = document.createElement('a');
        var newIconLink = document.createElement('a');
        var newPname = document.createElement('p');
        var newPtime = document.createElement('p');
        var newPicon = document.createElement('p');
        var newPlogo = document.createElement('p');
        var br = document.createElement('br');
  
        //Assign HTML DOM Elements
        newDiv.classList.add("game");
        newLogo.src = gameLogoDisp;
        newIcon.src = gameIconDisp;
        newLogoLink.href = gameStoreLink;
        newIconLink.href = gameStoreLink;
        newLogoLink.appendChild(newLogo);
        newIconLink.appendChild(newIcon);
        newLogoLink.target = "_blank"; //New Tab or Window        
        newIconLink.target = "_blank"; //New Tab or Window
        newPname.style = "font-weight: bold";
        newPname.textContent = "Game Name: " + gameName;
        newPtime.textContent = "Playtime in Mins: " + gameTime;
        newPicon.textContent = "Game Icon Store Link: ";
        newPlogo.textContent = "Logo Store Link: ";
        newDiv.appendChild(newPname);
        newDiv.appendChild(newPtime);
        newDiv.appendChild(newPicon);
        newDiv.appendChild(newIconLink);
        newDiv.appendChild(br);
        newDiv.appendChild(newPlogo);
        newDiv.appendChild(newLogoLink);
        document.body.appendChild(newDiv);
      }
    }
    getInfo();
  }
  apiCall();