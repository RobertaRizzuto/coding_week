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
      return `<section class="gallery-child"><div class="film-card">
      <img
        class="poster"
        src="${IMAGE_URL}${el.poster_path}"
        alt="placeholder"
      />
      <div class="film-card-bottom">
        <div class="film-info">
          <h3>${el.title}</h3>
          <p>▹${el.overview}...<a href="${DETAILS_URL}${el.id}${el.title}">
          click for more details</a></p>
          <span>🎬<a href="${TRAILER_URL}">trailer</a></span>
        </div>
        <div  class="button-div">
          <button id="${json.results.indexOf(el)}" class="add-to-saved">♥
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
        console.log(e);
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
              savedArray.push(movies[e.target.id]);
              console.log(savedArray);
              localStorage.setItem("savedFilm", savedArray);
              document.getElementById(e.target.id).style.color = "red";
            }
          } catch (error) {
            localStorage.setItem("userPassword", userPassword);
            localStorage.setItem("userEmail", userEmail);
          }
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
