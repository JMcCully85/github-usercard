import axios from "axios";

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
const cards = document.querySelector(".cards");
axios
  .get(`https://api.github.com/users/JMcCully85`)

  /*
    STEP 2: Inspect and study the data coming back, this is YOUR
      github info! You will need to understand the structure of this
      data in order to use it to build your component function
  
      Skip to STEP 3.
  */

  /*
    STEP 4: Pass the data received from Github into your function,
      and append the returned markup to the DOM as a child of .cards
  */

  .then((res) => {
    cards.appendChild(createCard(res.data));
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    //console.log('done')
  });
/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];

axios
  .get(`https://api.github.com/users/tetondan/followers`) //get follower objects from profile
  .then((res) => {
    res.data.forEach((obj) => {
      followersArray.push(obj.login); //get only names of the friends and add them to the followersArray
    });
    return followersArray; //return the array so we can use it in the next .then statement
  })

  .then((names) => {
    followersArray.forEach((name) => {
      //forEach name in the array
      axios
        .get(`https://api.github.com/users/${name}`) //get the git profile of the friend
        .then((res) => {
          cards.appendChild(createCard(res.data));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log("done");
        });
    });
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    //console.log('done')
  });
console.log(followersArray.length);

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function createCard(gitObj) {
  const card = document.createElement("div");
  const img = document.createElement("img");
  const cardInf = document.createElement("div");
  const name = document.createElement("h3");
  const userName = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const link = document.createElement("a");
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");

  card.appendChild(img);
  card.appendChild(cardInf);
  cardInf.appendChild(name);
  cardInf.appendChild(userName);
  cardInf.appendChild(location);
  cardInf.appendChild(profile);

  cardInf.appendChild(followers);
  cardInf.appendChild(following);
  cardInf.appendChild(bio);

  card.classList.add("card");
  img.classList.add("img");
  cardInf.classList.add("card-info");
  name.classList.add("name");
  userName.classList.add("username");

  img.src = gitObj["avatar_url"];
  name.textContent = "Name: " + gitObj["name"];
  userName.textContent = gitObj["login"];
  location.textContent = `Location:  ${gitObj["location"]}`;
  profile.textContent = "Profile: " + link;
  link.href = gitObj["html_url"];
  link.innerHTML = gitObj["html_url"];
  profile.appendChild(link);
  followers.textContent = "Followers: " + gitObj["followers"];
  following.textContent = "Following: " + gitObj["following"];
  bio.textContent = "Bio: " + gitObj["bio"];

  return card;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
