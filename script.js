import { getGenre, getPoster, appendMoviesHtml } from "./utils.js"

const form = document.querySelector('form')
const input = document.querySelector('input')
const movieList = document.querySelector('.movie-list')
const movieWatchlist = document.querySelector('.movie-watchlist')
const content = document.querySelector('.content')
const watchlistContent = document.querySelector('.watchlist-content')
const h2 = document.querySelector('h2')

///create movies array in localStorage///
if (!localStorage.getItem('moviesArr')) {
    const arr = []
    localStorage.setItem("moviesArr", JSON.stringify(arr))
}
const moviesArr = JSON.parse(localStorage.getItem('moviesArr'))


///append movies html to watclist page///
if (localStorage.getItem('moviesArr')) {
    const data = JSON.parse(localStorage.getItem('moviesArr'));

    if (data.length > 0) {
        watchlistContent.style.display = 'none';
    }

    for (let i = 0; i < data.length; i++) {
        const targetMovie = data[i]
        const poster = targetMovie.poster
        const genresArr = targetMovie.genres
        appendMoviesHtml(targetMovie, genresArr, poster, movieWatchlist, 'unwatchlist')

        ///add listener on remove from watclist button///
        const unWatchlistBtns = document.querySelectorAll('.unwatchlist-btn')
        unWatchlistBtns[i].addEventListener('click', (e) => {
            const arr = JSON.parse(localStorage.getItem('moviesArr'))
            const moviesArr = arr.filter(item => arr[i] !== item)

            localStorage.removeItem('moviesArr');
            localStorage.setItem("moviesArr", JSON.stringify(moviesArr))
            location.reload()
        })
    }
}

///listen to form submit, if there is one=///
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        if (input.value) {
            const res = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=a7debf737e8923bee6062d3ebfc460a0&query=${input.value}`)
            const resData = await res.json()
            const data = resData.results

            const getMovies = () => {
                //reset//
                content.style.display = 'none';
                movieList.innerHTML = ``
                //reset//

                for (let i = 0; i < data.length; i++) {
                    const targetMovie = data[i]

                    ///get genres from their ids and poster for the movie///
                    const genresArr = getGenre(targetMovie.genre_ids)
                    const poster = getPoster(targetMovie)

                    appendMoviesHtml(targetMovie, genresArr, poster, movieList, 'watchlist')

                    ///add movie to watchlist on button click///
                    const watchlistBtns = document.querySelectorAll('.watchlist-btn')
                    watchlistBtns[i].addEventListener('click', (e) => {
                        ///check if targetMovie is already in the watchlist, if not - add it///
                        const isFound = moviesArr.some(item => item.original_title === targetMovie.original_title)

                        if (!isFound) {
                            moviesArr.push({
                                original_title: targetMovie.original_title,
                                vote_average: targetMovie.vote_average,
                                poster: poster,
                                genres: genresArr,
                                overview: targetMovie.overview
                            })
                            localStorage.setItem("moviesArr", JSON.stringify(moviesArr))
                        }

                        e.target.setAttribute('disabled', true)
                    })

                }
            }
            ///check if there is a movie found, if not - display text///
            if (data.length >= 1) {
                getMovies()
            } else {
                h2.innerText = 'Unable to find what you’re looking for. Please try another search.'
            }
        }
    })
}