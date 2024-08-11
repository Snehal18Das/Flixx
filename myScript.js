const global_var = {
	currentPage: window.location.pathname,
	page:1,
	pagee:1
};
console.log(global_var.currentPage);

let term = 0;

//initialize app
function init()
{
	switch(global_var.currentPage)
	{
		case '/C:/Users/user/Desktop/WebDev/JS/My-Flixx/myIndex.html':
		home();
		document.getElementById('btn1').addEventListener('click', load);
		function load(e)
		{
			global_var.page++;
			loadMoreMovies(global_var.page);
			console.log(global_var.page);
		}
		console.log('Home');
        break;
		

		break;

		case '/C:/Users/user/Desktop/WebDev/JS/My-Flixx/movie-details.html':
		movieDetails();
		console.log('Movie Details Page');
		break;

		case '/C:/Users/user/Desktop/WebDev/JS/My-Flixx/tv-details.html':
		console.log("TV Shows Details Page");
		showDetails();
		break;

		case '/C:/Users/user/Desktop/WebDev/JS/My-Flixx/Search-Page.html':
		console.log('Search Page');
		// following code is a VERY IMPORTANT STEP which returns the values of type and search
		//input SPECIFICALLY
		const input = new URLSearchParams(location.search).get('search-input');
		const type = new URLSearchParams(location.search).get('type');
		search(type, input);
		document.getElementById('next').addEventListener('click', next);
		function next(e)
		{
			global_var.pagee++;
		    searchMore(type, input, global_var.pagee);
	    }

	    document.getElementById('prev').addEventListener('click', prev);
		function prev(e)
		{
			global_var.pagee--;
		    searchMore(type, input, global_var.pagee);
	    }
		break;

		case '/C:/Users/user/Desktop/WebDev/JS/My-Flixx/Popular-Movies.html':
		console.log('Popular Movies');
		document.querySelector('.w1').style.color='gold';//changes color and makes bold of link of 
		//current page
		document.querySelector('.w1').style.fontWeight='1000';

		home();//displays 12 popular movies
		document.getElementById('btn1').addEventListener('click', load);
		function load(e)
		{
			global_var.page++;
			loadMoreMovies(global_var.page);
			console.log(global_var.page);
		}

		break;
    
		case '/C:/Users/user/Desktop/WebDev/JS/My-Flixx/Popular-TVShows.html':
		console.log('Popular TV Shows');
		shows();
		document.getElementById('btn1').addEventListener('click', load);
		function load(e)
		{
			global_var.page++;
			loadMoreShows(global_var.page);
			console.log(global_var.page);
		}
		document.querySelector('.w2').style.color='gold';//changes color and makes bold of link of 
		//current page
		document.querySelector('.w2').style.fontWeight='1000';
		break;
	}
}
init();

//load more function
function loadMoreMovies(page)//loads 8 more popular movies from next page when button is clicked
{
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWFjNjk4MDM1NTM5YzllZTE0Y2JiMDYzNzcxMWMwMiIsInN1YiI6IjY1NjMwZWIwNzA2ZTU2MDBlMTUzOWJmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K1TUfo9J--APcH60jW8kHV7Giesl_ykzraGxZlbT9T0'
  }
};

fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, options)
  .then(response => response.json())
  .then(data => {
  	for(let i=0;i<=7;i++)
  	{
  		    
  			let title=data.results[i].title;
  			let release=data.results[i].release_date;
  			let image=data.results[i].poster_path;
  			let details=data.results[i].id;

  			let div=document.createElement('div');
  			div.classList.add('card');
  			div.innerHTML=`<a href="movie-details.html?id=${details}"><img src="https://image.tmdb.org/t/p/w500${image}"></a>
    			<h5 class="movie-title">${title}</h5>
    			<p>Release Date: ${release}</p>`;

    			document.querySelector('.movie-flex').appendChild(div);
  		}
  }
   )
  .catch(err => console.error(err));
}


//search function for next and prev buttons 
function searchMore(type, input, pagee)
{
	document.querySelector('.movie-flex').innerHTML='';
	if(pagee===1)
	{
		document.getElementById('prev').disabled='TRUE';
	}

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWFjNjk4MDM1NTM5YzllZTE0Y2JiMDYzNzcxMWMwMiIsInN1YiI6IjY1NjMwZWIwNzA2ZTU2MDBlMTUzOWJmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K1TUfo9J--APcH60jW8kHV7Giesl_ykzraGxZlbT9T0'
  }
};
if(type==='movies')
{
fetch(`https://api.themoviedb.org/3/search/movie?query=${input}&language=en-US&page=${pagee}`, options)
  .then(response => response.json())
  .then(data => {

  	document.getElementById('displayResult').innerHTML=`SHOWING ${data.results.length} of ${data.total_results} RESULTS`;
  	console.log(data);
  	const length = data.results.length;
  	for(let i=0;i<length;i++)
  	{
  		    let title=data.results[i].title;
  			let release=data.results[i].release_date;
  			let image=data.results[i].poster_path;
  			let details=data.results[i].id;
            
            let div=document.createElement('div');
  			div.classList.add('card');
  			div.innerHTML=`<a href="movie-details.html?id=${details}"><img src="https://image.tmdb.org/t/p/w500${image}"></a>
    			<h5 class="movie-title">${title}</h5>
    			<p>Release Date: ${release}</p>`;
    		document.querySelector('.movie-flex').appendChild(div);
    		
            //changing page number
    		document.querySelector('.page').innerHTML=`Page ${data.page} of ${data.total_pages}`;
  	}

  })
  .catch(err => console.error(err));
}
else if(type==='shows')
{
fetch(`https://api.themoviedb.org/3/search/tv?query=${input}&language=en-US&page=${pagee}`, options)
  .then(response => response.json())
  .then(data => {
  	document.getElementById('displayResult').innerHTML=`SHOWING ${data.results.length} of ${data.total_results} RESULTS`;
  	console.log(data);
  	const length = data.results.length;
  
  	for(let i=0;i<length;i++)
  	{
  		    let title=data.results[i].name;
  			let air=data.results[i].first_air_date;
  			let image=data.results[i].poster_path;
  			let details=data.results[i].id;

  			let div=document.createElement('div');
  			div.classList.add('card');
  			div.innerHTML=`<a href="tv-details.html?id=${details}"><img src="https://image.tmdb.org/t/p/w500${image}"></a>
    			<h5 class="movie-title">${title}</h5>
    			<p>Aired: ${air}</p>`;
                document.querySelector('.movie-flex').appendChild(div);


                //changing page number
    			document.querySelector('.page').innerHTML=`Page ${data.page} of ${data.total_pages}`;
  	}

  })
  .catch(err => console.error(err));
}
}






//search function
function search(type, input)
{
	

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWFjNjk4MDM1NTM5YzllZTE0Y2JiMDYzNzcxMWMwMiIsInN1YiI6IjY1NjMwZWIwNzA2ZTU2MDBlMTUzOWJmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K1TUfo9J--APcH60jW8kHV7Giesl_ykzraGxZlbT9T0'
  }
};
if(type==='movies')
{
fetch(`https://api.themoviedb.org/3/search/movie?query=${input}&language=en-US&page=1`, options)
  .then(response => response.json())
  .then(data => {
    document.querySelector('.page').innerHTML=`Page 1 of ${data.total_pages}`;
  	document.getElementById('displayResult').innerHTML=`SHOWING ${data.results.length} of ${data.total_results} RESULTS`;
  	console.log(data);
  	const length = data.results.length;
  	for(let i=0;i<length;i++)
  	{
  		  let title=data.results[i].title;
  			let release=data.results[i].release_date;
  			let image=data.results[i].poster_path;
  			let details=data.results[i].id;
            
        let div=document.createElement('div');
  			div.classList.add('card');
  			div.innerHTML=`<a href="movie-details.html?id=${details}"><img src="https://image.tmdb.org/t/p/w500${image}"></a>
    			<h5 class="movie-title">${title}</h5>
    			<p>Release Date: ${release}</p>`;
    		document.querySelector('.movie-flex').appendChild(div);
  	}

  })
  .catch(err => console.error(err));
}
else if(type==='shows')
{
fetch(`https://api.themoviedb.org/3/search/tv?query=${input}&language=en-US&page=1`, options)
  .then(response => response.json())
  .then(data => {
    document.querySelector('.page').innerHTML=`Page 1 of ${data.total_pages}`;
  	document.getElementById('displayResult').innerHTML=`SHOWING ${data.results.length} of ${data.total_results} RESULTS`;
  	console.log(data);
  	const length = data.results.length;
  
  	for(let i=0;i<length;i++)
  	{
  		    let title=data.results[i].name;
  			let air=data.results[i].first_air_date;
  			let image=data.results[i].poster_path;
  			let details=data.results[i].id;

  			let div=document.createElement('div');
  			div.classList.add('card');
  			div.innerHTML=`<a href="tv-details.html?id=${details}"><img src="https://image.tmdb.org/t/p/w500${image}"></a>
    			<h5 class="movie-title">${title}</h5>
    			<p>Aired: ${air}</p>`;

    			document.querySelector('.movie-flex').appendChild(div);
  	}

  })
  .catch(err => console.error(err));
}
}





//displays popular movies in home page, also used in MOVIES page
function home()
{
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWFjNjk4MDM1NTM5YzllZTE0Y2JiMDYzNzcxMWMwMiIsInN1YiI6IjY1NjMwZWIwNzA2ZTU2MDBlMTUzOWJmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K1TUfo9J--APcH60jW8kHV7Giesl_ykzraGxZlbT9T0'
  }
};

fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
  .then(response => response.json())
  .then(data => {
  	for(let i=0;i<=11;i++)
  	{
  		    
  			let title=data.results[i].title;
  			let release=data.results[i].release_date;
  			let image=data.results[i].poster_path;
  			let details=data.results[i].id;

  			

  			let div=document.createElement('div');
  			div.classList.add('card');
  			div.innerHTML=`<a href="movie-details.html?id=${details}"><img src="https://image.tmdb.org/t/p/w500${image}"></a>
    			<h5 class="movie-title">${title}</h5>
    			<p>Release Date: ${release}</p>`;

    			document.querySelector('.movie-flex').appendChild(div);
  		
  	}
  }
   )
  .catch(err => console.error(err));
}






//displays 8 more popular tv shows when button is clicked
function loadMoreShows(page)
{
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWFjNjk4MDM1NTM5YzllZTE0Y2JiMDYzNzcxMWMwMiIsInN1YiI6IjY1NjMwZWIwNzA2ZTU2MDBlMTUzOWJmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K1TUfo9J--APcH60jW8kHV7Giesl_ykzraGxZlbT9T0'
  }
};

fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`, options)
  .then(response => response.json())
  .then(data => {
  	console.log(data);
  	for(let i=0;i<=11;i++)
  	{
  		    
  			let title=data.results[i].name;
  			let air=data.results[i].first_air_date;
  			let image=data.results[i].poster_path;
  			let details=data.results[i].id;

  			let div=document.createElement('div');
  			div.classList.add('card');
  			div.innerHTML=`<a href="tv-details.html?id=${details}"><img src="https://image.tmdb.org/t/p/w500${image}"></a>
    			<h5 class="movie-title">${title}</h5>
    			<p>Aired: ${air}</p>`;

    			document.querySelector('.movie-flex').appendChild(div);
  		
  	}
  }
   )
  .catch(err => console.error(err));
}




//displays popular tv shows, used in TV SHOWS page
function shows()
{
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWFjNjk4MDM1NTM5YzllZTE0Y2JiMDYzNzcxMWMwMiIsInN1YiI6IjY1NjMwZWIwNzA2ZTU2MDBlMTUzOWJmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K1TUfo9J--APcH60jW8kHV7Giesl_ykzraGxZlbT9T0'
  }
};

fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
  .then(response => response.json())
  .then(data => {
  	console.log(data);
  	for(let i=0;i<=11;i++)
  	{
  		    
  			let title=data.results[i].name;
  			let air=data.results[i].first_air_date;
  			let image=data.results[i].poster_path;
  			let details=data.results[i].id;

  			let div=document.createElement('div');
  			div.classList.add('card');
  			div.innerHTML=`<a href="tv-details.html?id=${details}"><img src="https://image.tmdb.org/t/p/w500${image}"></a>
    			<h5 class="movie-title">${title}</h5>
    			<p>Aired: ${air}</p>`;

    			document.querySelector('.movie-flex').appendChild(div);
  		
  	}
  }
   )
  .catch(err => console.error(err));
}



//shows details of shows. fires off when a show is clicked and showsdetails page is reached
function showDetails()
{ 
	const movieID=window.location.search.split('=')[1];//VERYYY IMPORTANT STEP TO ACQUIRE ID OF MOVIE 
	//CLICKED... returns whatever comes after '?' in search bar in url
	const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWFjNjk4MDM1NTM5YzllZTE0Y2JiMDYzNzcxMWMwMiIsInN1YiI6IjY1NjMwZWIwNzA2ZTU2MDBlMTUzOWJmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K1TUfo9J--APcH60jW8kHV7Giesl_ykzraGxZlbT9T0'
  }
};

fetch(`https://api.themoviedb.org/3/tv/${movieID}?language=en-US`, options)
  .then(response => response.json())
  .then(data => {
  	console.log(data);
  	const g1= data.genres[0].name;//3 genres
  	
  
  	const title = data.name; // name
  	const para=data.overview;// description
  	const date = data.first_air_date;//released date
  	const img=data.poster_path;//image link
  	const num = data.number_of_episodes;
  	const star = data.vote_average;
  	const lastEp = data.last_episode_to_air.name;
  	const status = data.status;
  	const p1 = data.production_companies[0].name;
  	const seasons=data.number_of_seasons;
  	
    
    displayBackdrop('movie', data.backdrop_path);

  	let div = document.createElement('div');
  	div.classList.add('main');
  	div.innerHTML=`<div class="image">
		<img src="https://image.tmdb.org/t/p/original${img}">
	</div>

	<div class="paragraph">
		<h1 class="name">${title}</h1>
		<p class="star"><i class="fa-solid fa-star" style="color: gold"></i> ${star} / 10 </p>
		<p class="release">First Air Date: ${date}</p>
		<p class="para">${para}</p>

		<h2 class="genre">Genres</h2>
		<p class="genres">${g1}</p>
		
		
	</div>`;
	document.querySelector('.add').appendChild(div);


    let div1 = document.createElement('div');
    div1.classList.add('info');
	div1.innerHTML=`<h1>SHOW INFO</h1>
	<p><span class="spann">No. of Seasons: </span>${seasons}</p>
	<p><span class="spann">No. of Episodes: </span>${num}</p>
	<p><span class="spann">Last episode to air: </span>${lastEp}</p>
	
	<p><span class="spann">Status: </span>${status}</p>

	<h3 style="padding-top: 17px; padding-bottom: 8px;">Production Companies</h3>
	<h4>${p1}</h4>`;
	document.querySelector('.add').appendChild(div1);

	

  })
  .catch(err => console.error(err));
}






//shows movie details when clicked on a particluar movie
function movieDetails()
{ 
	const movieID=window.location.search.split('=')[1];//VERYYY IMPORTANT STEP TO ACQUIRE ID OF MOVIE 
	//CLICKED... returns whatever comes after '?' in search bar in url
	const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWFjNjk4MDM1NTM5YzllZTE0Y2JiMDYzNzcxMWMwMiIsInN1YiI6IjY1NjMwZWIwNzA2ZTU2MDBlMTUzOWJmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K1TUfo9J--APcH60jW8kHV7Giesl_ykzraGxZlbT9T0'
  }
};

fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`, options)
  .then(response => response.json())
  .then(data => {
  	console.log(data);
  	const g1= data.genres[0].name;//3 genres
  	
  
  	const title = data.title; // name
  	const para=data.overview;// description
  	const date = data.release_date;//released date
  	const img=data.poster_path;//image link
  	const revenue = data.revenue;
  	const budget = data.budget;
  	const star = data.vote_average;
  	const runtime = data.runtime;
  	const status = data.status;
  	const p1 = data.production_companies[0].name;
  	
  	
    
    displayBackdrop('movie', data.backdrop_path);

  	let div = document.createElement('div');
  	div.classList.add('main');
  	div.innerHTML=`<div class="image">
		<img src="https://image.tmdb.org/t/p/original${img}">
	</div>

	<div class="paragraph">
		<h1 class="name">${title}</h1>
		<p class="star"><i class="fa-solid fa-star" style="color: gold"></i> ${star} / 10 </p>
		<p class="release">Release Date: ${date}</p>
		<p class="para">${para}</p>

		<h2 class="genre">Genres</h2>
		<p class="genres">${g1}</p>
		
		
	</div>`;
	document.querySelector('.add').appendChild(div);


    let div1 = document.createElement('div');
    div1.classList.add('info');
	div1.innerHTML=`<h1>MOVIE INFO</h1>
	<p><span class="spann">Budget: </span>$${budget}</p>
	<p><span class="spann">Revenue: </span>$${revenue}</p>
	<p><span class="spann">Runtime: </span>${runtime} mins</p>
	<p><span class="spann">Status: </span>${status}</p>

	<h3 style="padding-top: 17px; padding-bottom: 8px;">Production Companies</h3>
	<h4>${p1}</h4>`;
	document.querySelector('.add').appendChild(div1);

	

  })
  .catch(err => console.error(err));
}



//used in showmoviedetails and showshowsdetails to display the backdrop 
function displayBackdrop(type, path)
{
	let bg = document.createElement('div');
	bg.style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${path})`;
	bg.classList.add('overlay');//overlay class available in css of movie-details
	document.querySelector('.add').appendChild(bg);
}

