const firebaseConfig = {
    apiKey: "AIzaSyBmuvGdbETORBhbfatOPrYeSquikimjHFs",
    authDomain: "movie-anime-tv-2074f.firebaseapp.com",
    databaseURL: "https://movie-anime-tv-2074f-default-rtdb.firebaseio.com",
    projectId: "movie-anime-tv-2074f",
    storageBucket: "movie-anime-tv-2074f.firebasestorage.app",
    messagingSenderId: "176765100626",
    appId: "1:176765100626:web:3f84c4f942ffcac5d0358b",
    measurementId: "G-J4SDQ7TR57"
  };


firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Function to fetch movies data from Firebase
function fetchMovies() {
  const moviesRef = database.ref('Movies'); // Reference to 'Movies' node in Firebase

  moviesRef.once('value', function(snapshot) {
      const moviesData = snapshot.val(); // Get the movie data as a JavaScript object
      
      // Check if there's data
      if (moviesData) {
          const contentElement = document.getElementById('content'); // Ensure 'content' div exists in Movies.html

          // Clear the content first
          contentElement.innerHTML = '';

          // Loop through the movies data and create HTML elements
          Object.keys(moviesData).forEach(function(movieKey) {
            const movie = moviesData[movieKey];
        
            // Create the movie card element
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card'); // Add a CSS class for styling
        
            // Create an anchor element for the clickable area
            const link = document.createElement('a');
            link.href = movie.link;  // Set the link to the movie's URL
            link.target = "_blank";  // Open the link in a new tab
        
            // Add the HTML content for the movie card inside the link
            link.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}" class="movie-image">
                <h3>${movie.title}</h3>
                <p>${movie.description}</p>
                <span>More Info</span>
            `;
        
            // Append the link (which wraps the movie card) to the movie card div
            movieCard.appendChild(link);
        
            // Append the movie card to the content div
            contentElement.appendChild(movieCard);
        });
        
      } else {
          // If no data exists
          contentElement.innerHTML = "<p>No movies found.</p>";
      }
  });
}

// Function to fetch anime data from Firebase
function fetchAnimes() {
  const animesRef = database.ref('Animes'); // Reference to the "Animes" node in Firebase

  animesRef.once('value', function(snapshot) {
      const animesData = snapshot.val(); // Get the anime data as an object
      
      // Ensure there is data
      if (animesData) {
          const contentElement = document.getElementById('content'); // Get the div where anime cards will be placed

          // Clear the content div
          contentElement.innerHTML = '';

          // Loop through the animes data and create HTML elements for each anime
          Object.keys(animesData).forEach(function(animeKey) {
            const anime = animesData[animeKey];
        
            // Create the anime card element
            const animeCard = document.createElement('div');
            animeCard.classList.add('anime-card'); // Add a CSS class for styling
        
            // Create an anchor element for the clickable area
            const link = document.createElement('a');
            link.href = anime.link;  // Set the link to the anime's URL
            link.target = "_blank";  // Open the link in a new tab
        
            // Add the HTML content for the anime card inside the link
            link.innerHTML = `
                <img src="${anime.image}" alt="${anime.title}" class="anime-image">
                <h3>${anime.title}</h3>
                <p>${anime.description}</p>
                <span>More Info</span>
            `;
        
            // Append the link (which wraps the anime card) to the content div
            animeCard.appendChild(link);
            contentElement.appendChild(animeCard);
        });
        
      } else {
          // If no data exists in the "Animes" section
          contentElement.innerHTML = "<p>No anime found.</p>";
      }
  });
}

// Call the appropriate function based on the page
if (window.location.pathname.includes('Movies.html')) {
  fetchMovies(); // Fetch movie data if on Movies page
} else if (window.location.pathname.includes('Anime.html')) {
  fetchAnimes(); // Fetch anime data if on Anime page
}