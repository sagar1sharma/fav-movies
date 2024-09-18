import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import MovieList from "./components/movielist";
import MovieListHeading from "./components/movielistheading";
import SearchBox from "./components/searchbox";
import AddFavourites from "./components/addtofav";
import RemoveFavourites from "./components/removefav";

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [ra, setra] = useState('https://vidcloud9.me/watch-');

	const getMovieRequest = async (searchValue) => {
		const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		fetch('https://fav-movie-b549e-default-rtdb.firebaseio.com/movies.json')
		.then(res => {return res.json()})
		.then(data => {
			const movies = [];

			for(const key in data){
				const meetup = {
					id: key, 
					...data[key]
				};
				movies.push(meetup);
			}
			setFavourites(movies);
		})
	}, [])

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		var flag = false;

		fetch('https://fav-movie-b549e-default-rtdb.firebaseio.com/movies.json')
		.then(res => {return res.json()})
		.then(data => {

			for(const key in data){
				if(key.Title.Text === movie.Search.Title){
					flag = true;
				}
			}

		})

		if(flag === false){
			fetch('https://fav-movie-b549e-default-rtdb.firebaseio.com/movies.json',
				{
					method: 'POST',
					body: JSON.stringify(movie),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		}
	};

	const removeFavouriteMovie = (movie) => {
		setra('https://yts.autos/movies/'+movie.Title+'-'+movie.Year);
		<RemoveFavourites add={ra} />
	};

	return (
		<div>
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites }
				/>
			</div>
		</div>
		<footer><p>@Sagar Sharma</p></footer>
		</div>
	);
};

export default App;
