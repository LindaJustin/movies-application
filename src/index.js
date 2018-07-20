const $ = require('jquery');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');


  const genMovie = () => {
    getMovies().then((movies) => {
          console.log('Here are all the movies:');
         $("#movieList").html("");
          movies.forEach(({title, rating, id}) => {
              console.log(`id#${id} - ${title} - rating: ${rating}`);
              // let html = `<div></div>`;
              // html += `<h4>${title}</h4>`;
              // html += `<h4>${rating}</h4>`;
              // $("#movieList").html(html);
              $("#movieList").append(`id#${id} - ${title} - rating: ${rating}`);
          });
      }).catch((error) => {
          alert('Oh no! Something went wrong.\nCheck the console for details.');
          console.log(error);
      });
  };
  genMovie();



    $("#userSubmit").click(function(event){
      event.preventDefault();
      let movieTitle = $("#userAddMovie").val();
      let movieRating = $('input[name=userRating]:checked').val();
      const newMovie = {title: movieTitle, rating: movieRating};
      const url = "/api/movies";
      const options = {
        method: "POST",
          headers: {
          "Content-Type": "application/json",

          },
          body: JSON.stringify(newMovie),
      };
        fetch(url, options)
            .then((response) => {
              response.json();
            })
            // .catch(/* handle errors */);
            .then(() => {
              genMovie();
            });
      });


//javascript should make a post request to /api/movies.
//once you figure out how to get console info to the div, then aim the db to that div. then
