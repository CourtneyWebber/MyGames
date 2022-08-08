function loadCards() {
         axios.get('http://localhost:4000/games')
             .then(response => {
                 checkContent(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })    
}

function checkContent(games) {
        if ('content' in document.createElement('template')) {
        games.forEach(game => { populateCards(game); })
    }
}

function populateCards(game) {
    const template = document.getElementById("card-template").content.cloneNode(true);
    template.querySelector('.card-title').innerText = game.title;
    template.querySelector('.card-text').innerText = game.overview;
    template.querySelector('.card-img-top').src = "assets/" + game.image + ".jpg";
    template.querySelector('.card-link').href = game.url;
    document.querySelector('#games').appendChild(template);
}

function populateDropdown() {
    axios.get('http://localhost:4000/games')
        .then(response => { 
            let games = response.data;
            let select = document.getElementById("select");            
                games.forEach(game => {
                    let gameOption = document.createElement('option');
                    gameOption.innerText = game.title;
                    gameOption.value = game.id;
                    console.log(gameOption);
                    select.appendChild(gameOption);
                })           
        })
        .catch(function (error) {
            console.log(error);
        })
}

function checkButton() {
    if (document.getElementById('hidden').value == "addGame") {        
        addGame();       
    }
    else {        
        editGame();
    }    
    return false;
}

function checkRadio() {  
    if (document.getElementById('radNew').checked) {
        document.getElementById('gameForm').reset();
        document.getElementById('selectLabel').style.visibility = "hidden";
        document.getElementById('select').style.visibility = "hidden";
        document.getElementById('editBtn').style.display = "none";
        document.getElementById('newBtn').style.display = "initial";

    }
    else if (document.getElementById('radEdit').checked) {
        document.getElementById('selectLabel').style.visibility = "visible";
        document.getElementById('select').style.visibility = "visible";
        document.getElementById('editBtn').style.display = "initial";
        document.getElementById('newBtn').style.display = "none";
    }
}

function fillForm() {
    let form = document.getElementById('gameForm');
    form.reset();
    let selectElement = document.getElementById("select");    
    let id = selectElement.options[selectElement.selectedIndex].value;

    axios.get('http://localhost:4000/games/id?id=' + id)
        .then(response => {
            game = response.data;
           
            document.getElementById("title").value = game.title;
            document.getElementById("overview").value = game.overview;
            document.getElementById("more").value = game.more;

            if (Object.keys(game.reviews) == 0) {   
                document.getElementById("review").value = game.reviews[0].Courtney;
            }        
            //TODO

            document.getElementById("released").value = game.released;
            document.getElementById("developer").value = game.developer;

            game.genres.forEach(genre => {
                if (genre) {
                    document.getElementById(`${genre}`).checked = true;
                }
                else {
                    console.log("no genres");
                }                
            });

            game.platforms.forEach(platform => {
                if (platform) {
                    document.getElementById(`${platform}`).checked = true;
                }
                else {
                    console.log("no platforms");
                }
            });

            game.numPlayers.forEach(numPlayer => {
                if (numPlayer) {
                    document.getElementById(`${numPlayer}`).checked = true;
                }
                else {
                    console.log("no players");
                }                
            });

            document.getElementById("url").value = game.url;
    })
    .catch (error => {
        console.log(error);
    })
}

function editGame() {
    axios.get('http://localhost:4000/games')
        .then(response => {
            let games = response.data;
            let selectElement = document.getElementById("select");
            let id = selectElement.options[selectElement.selectedIndex].value;   
            let updateImage = "";

            for (let i = 0; i < games.length; i++) {
                if (games[i].id == id) {
                    updateImage = games[i].image;
                }
            }

            let updateTitle = document.getElementById("title").value;
            let updateOverview = document.getElementById("overview").value;
            let updateMore = document.getElementById("more").value;
            let updateReview = document.getElementById("review").value;
            let updateYear = document.getElementById("released").value;
            let updateDev = document.getElementById("developer").value;

            let genreArray = [];
            let genreChecks = document.getElementsByName("genres");
            for (var i = 0; i < genreChecks.length; i++) {
                if (genreChecks[i].checked) {
                    genreArray.push(genreChecks[i].value);
                }
            }

            let platformArray = [];
            let platformChecks = document.getElementsByName("platforms");
            for (var i = 0; i < platformChecks.length; i++) {
                if (platformChecks[i].checked) {
                    platformArray.push(platformChecks[i].value);
                }
            }

            let playerArray = [];
            let playerChecks = document.getElementsByName("numPlayers");
            for (var i = 0; i < playerChecks.length; i++) {
                if (playerChecks[i].checked) {
                    playerArray.push(playerChecks[i].value);
                }
            }

            let updateURL = document.getElementById("url").value;            

            let updatedGame = ({ id: id, title: updateTitle, overview: updateOverview, more: updateMore, reviews: { "Courtney": updateReview }, released: updateYear, developer: updateDev, genres: genreArray, platforms: platformArray, numPlayers: playerArray, url: updateURL, image: updateImage });

            putJSON(updatedGame, id);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function addGame() {    
    axios.get('http://localhost:4000/games')    
        .then(response => {            
            let gamesLength = (Object.keys(response.data).length + 1);

            let newTitle = document.getElementById("title").value;
            let newOverview = document.getElementById("overview").value;
            let newMore = document.getElementById("more").value;

            let newReview = document.getElementById("review").value;

            let newYear = document.getElementById("released").value;
            let newDev = document.getElementById("developer").value;

            let genreArray = [];
            let genreChecks = document.getElementsByName("genres");
            for (var i = 0; i < genreChecks.length; i++) {
                if (genreChecks[i].checked) {
                    genreArray.push(genreChecks[i].value);
                }
            }

            let platformArray = [];
            let platformChecks = document.getElementsByName("platforms");
            for (var i = 0; i < platformChecks.length; i++) {
                if (platformChecks[i].checked) {
                    platformArray.push(platformChecks[i].value);
                }
            }

            let playerArray = [];
            let playerChecks = document.getElementsByName("numPlayers");
            for (var i = 0; i < playerChecks.length; i++) {
                if (playerChecks[i].checked) {
                    playerArray.push(playerChecks[i].value);
                }
            }

            let newURL = document.getElementById("url").value;
            let newImage = "new";

            let newGame = ({ id: gamesLength, title: newTitle, overview: newOverview, more: newMore, reviews: { "Courtney": newReview }, released: newYear, developer: newDev, genres: genreArray, platforms: platformArray, numPlayers: playerArray, url: newURL, image: newImage });

            postJSON(newGame);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function postJSON(newGame) {
    axios.post('http://localhost:4000/games/addGame', newGame)
        .then(response => {
            alert("New game added");
            document.getElementById('gameForm').reset();
            populateDropdown();
            setCount();          
        })
        .catch(function (error) {
            console.log(error);
            alert("New game unable to be added");
        }); 
}

function putJSON(updatedGame, id) {    
    axios.put('http://localhost:4000/games/updateGame', updatedGame)
        .then(response => {
            alert("Game updated");
        })
        .catch(function (error) {
            console.log(error);
            alert("Game not updated")
        });       
}

function validateLogin() {
    const person = {
        name: "Courtney",
        username: "Username",
        password: "Password"
    }
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if ((username != person.username) || (password != person.password)) {
        alert("Username or password incorrect");
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        return false;
    }
}

function setCount() {
    axios.get('http://localhost:4000/games')
        .then(response => {
            document.getElementById('gamesCount').innerHTML = response.data.length;
        })
        .catch(function (error) {
            console.log(error);
        })
}
    
//npx json-server --watch db.json --port 3000