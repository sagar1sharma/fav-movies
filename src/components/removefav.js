import React from 'react';

const RemoveFavourites = (movie) => {
	let temp = movie.movie.Title.replace(/ /g, "-");
	let add = 'https://vidcloud9.me/watch-'+temp+'-'+movie.movie.Year+'-online-free';
	console.log(add);
	
	return (
		<>
			<a href = {add}><span className='mr-2'>Watch Online</span></a>
			
				
		</>
	);
};

export default RemoveFavourites;