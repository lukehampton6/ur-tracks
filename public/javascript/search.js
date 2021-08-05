var userSearch = "";
var songsObj = [];
var songs = "";
var playlist_name = "";

const search = function (event) {
  event.preventDefault();
  userSearch = document.getElementById("search").value;

  fetch("/api/playlists/search", {
    method: "POST",
    body: JSON.stringify({
      userSearch,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      var count = 1;
      songsObj = data;
      return data.forEach((element) => {
        var songList = document.createElement("h5");
        songList.setAttribute("id", `song${count}`);
        songList.setAttribute("onclick", `getInfo(this)`);
        songList.innerHTML +=
          count + ". " + element.name + " - " + element.song;
        count++;
        var songCard = document.getElementById("song-card");
        songCard.appendChild(songList);
      });
    });
};

function getInfo(data) {
  var id = data.id.split("song")[1] - 1;
  songs += songsObj[id].name + " " + songsObj[id].song + ", ";
  console.log(songs);
  //   songs += element.name + " - " + element.song + ",";
}

document.querySelector("#search-btn").addEventListener("click", search);

// fetch('https://cors-anywhere.herokuapp.com/http://api.deezer.com/search/track/autocomplete?limit=1&q=eminem')
