const getGenre = (idArray) => {
    const genresArr = []
    const genres = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystery',
        10749: 'Romance',
        878: 'Sci-fi',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western'
    }
    idArray.forEach(id => {
        genresArr.push(genres[id])
    })
    return genresArr.join(', ')
}

const truncate = (str) => {
    if (str.length > 250) {
        return str.substring(0, 250) + "..."
    } else {
        return str
    }
}
const getPoster = (data) => {
    ///get poster if there is one, if not - get "no image" image///
    return data.poster_path === null
        ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
        : `https://image.tmdb.org/t/p/original/${data.poster_path}`
}
const appendMoviesHtml = (data, genresArr, poster, movieList, btnType) => {
    const newMovie = document.createElement('li');
    newMovie.classList.add('movie');
    newMovie.innerHTML = `
            <img class="movie-img" src="${poster}" alt="">
                <div class="movie-content"> 
                    <header class="movie-header">
                        <strong class="movie-title">${data.original_title}</strong>
                        <img src="star.svg" alt="">
                        <small class="movie-rating">${data.vote_average}</small>
                    </header>
                    <div class="movie-info">
                        <span class="movie-date">${data.release_date.substring(0, 4)}</span>
                        <span class="movie-genre">${genresArr}</span>
                        <button class="${btnType}-btn"><img src="icon-${btnType}.svg" alt="">${btnType === 'unwatchlist' ? 'Remove' : 'Add to watchlist'}</button>
                    </div>
                    <p class="movie-overview">
                    ${truncate(data.overview)}
                    </p>
                </div>
                `
    movieList.appendChild(newMovie)
}
export { getGenre, getPoster, appendMoviesHtml }