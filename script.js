const listEl = document.querySelector(".gallery-container");

const BASE_URL =
  "https://api.themoviedb.org/3/discover/movie?with_genres=53&api_key=af74ad0e90e69222fbf8227780886461";
const IMAGE_URL = "https://image.tmdb.org/t/p/w220_and_h330_face/";
const DETAILS_URL = "https://www.themoviedb.org/movie/";

const TRAILER_URL = "https://www.youtube.com/embed/KAOdjqyG37A"; //IN QUESTO API NON ESISTONO TRAILER, ALLA KEY "VIDEO" TORNANO SOLO VALORI BOOLEANI(SEMPRE FALSE), quindi ne inserisco uno generico
let movies = [];
fetch(BASE_URL)
  .then((res) => {
    const json = res.json();

    return json;
  })
  .then((json) => {
    movies = json.results;
    listEl.innerHTML = json.results.map((el) => {
      return `<section id="section${json.results.indexOf(
        el
      )}" class="gallery-child"><div class="film-card">
      <img
        class="poster"
        src="${IMAGE_URL}${el.poster_path}"
        alt="placeholder"
      />
      <div class="film-card-bottom">
        <div class="film-info">
          <h3>${el.title}</h3>
          <a id="${json.results.indexOf(
            el
          )}" href="#">▹click for more details</a>
        </div>
        <div  class="button-div">
          <button id="${json.results.indexOf(
            el
          )}"class="add-to-saved">♥
          </button>
        </div>
      </div>
      </section>

    `;
    });

    const savedArray = [];
    const cards = document.querySelectorAll(".film-card");

    cards.forEach((el) => {
      el.addEventListener("click", function (e) {
        if (e.target.tagName === "BUTTON") {
          const userEmail = prompt("Please enter your email address");
          const userPassword = prompt("Please enter your password");
          try {
            if (
              localStorage.getItem("userPassword") !== userPassword &&
              localStorage.getItem("userEmail") !== userEmail
            ) {
              alert(
                "Passwords/email do not match or you are not registered, please refresh your page and try again."
              );
              throw error;
            } else {
              savedArray.push(movies[e.target.id])
              localStorage.setItem("savedFilm", savedArray);
              e.target.style.color = "red";
            }
          } catch (error) {
            localStorage.setItem("userPassword", userPassword);
            localStorage.setItem("userEmail", userEmail);
          }
        }
        if (e.target.tagName === "A") {
          const modalEl = document.createElement("div");
          modalEl.classList.add("modal");
          modalEl.innerHTML =
            e.target.parentNode.parentNode.parentNode.innerHTML +
            `<div class="modal-content">
            <h3 class="modal-title">Title: ${JSON.stringify(
              movies[e.target.id].title
            )}</h3>
            <p class="modal-overview">Overview: ${JSON.stringify(
              movies[e.target.id].overview
            )}</p>
            <p class="modal-language">Original language: ${JSON.stringify(
              movies[e.target.id].original_language
            )}</p>
            <p class="modal-vote">Vote: ${JSON.stringify(
              movies[e.target.id].vote_average
            )}</p>
            <p class="modal-date">Release date: ${JSON.stringify(
              movies[e.target.id].release_date
            )}</p>
            <p class="modal-trailer">Trailer ⇩</p>
            <iframe width="280" height="158" src="https://www.youtube.com/embed/KAOdjqyG37A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <button id="close-button" class="close-button">close</button>
           `;
          document.body.append(modalEl);
          const modals = document.querySelectorAll(".modal");
          modals.forEach((el) =>
            el.addEventListener("click", function (e) {
              if (e.target.tagName === "BUTTON") {
                modalEl.style.transform = "scale(0)";
              }
            })
          );
        }
      });
    });
  })
  .catch((err) => {
    console.log(err);
    listEl.innerHTML = `<li>ERRORE API</li>`;
    return [];
  });

//---------------------------------------------------------fine fetch
