import React from 'react'
import MovieContainer from '../components/MovieContainer'
import SeriesContainer from '../components/SeriesContainer'

function Home() {
  const title = "Home";
  document.title = "Dumbflix | " + title;

  return (
    <>
    <div>
      <div className='background-hero-home container-fluid mx-auto'>
        <div className='hero ms-5 text-light d-flex flex-column align-content-center justify-content-center'>
            <h1 className='text-size text-start'>THE WITCHER</h1>
            <p className='text-align-justify'>The Witcher is based on the book series of the same name by Polish writer Andrzej Sapkowski. 
                            Set on a fictional, medieval-inspired landmass known as the Continent, The Witcher explores 
                            the legend of Geralt of Rivia, Yennefer of Vengerberg and Princess Ciri.</p>
            <div className='mb-4'>
              <span>2019</span> 
              <button className='btn btn-outline-light ms-2 py-1 tv-s shadow'>TV Series</button>
            </div>
            <div>
            <button className='btn btn-watch text-light py-2 px-5 fs-4 shadow'>WATCH NOW!</button>
            </div>
        </div>
      </div>
    </div>
  
  <div className='sectionSeries'>
    <SeriesContainer />
    <MovieContainer />
  </div>
    </>
  )
}

export default Home