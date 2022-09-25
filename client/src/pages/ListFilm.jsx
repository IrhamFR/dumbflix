import React, { useState } from 'react'
import MovieContainerAd from '../components/MovieContainerAd'
import SeriesContainerAd from '../components/SeriesContainerAd'
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ListFilm() {

  const title = "List";
  document.title = "Dumbflix | " + title;

  const [category, setCategory] = useState("Category")


  console.log(category)
  return (
    <>
    <div className='d-flex mt-4 mx-5 px-5 justify-content-between'>
      <div className='d-flex gap-4'>
        <h4 className='text-white'>List Film</h4>
        <select value={category} onChange={(e) => setCategory(() => e.target.value)} className='bg-black text-white' name="list" id="list">
          <option disabled selected >Category</option>
          <option>TV Series</option>
          <option>Movies</option>
        </select>
      </div>
      <div>
        <Button className="btn bg-danger text-white border-0 px-5" as={Link} to='/add-film'>Add Film</Button>
      </div>
    </div>
    
    <div className='sectionSeries'>
      {category == "TV Series" ? 
      (<SeriesContainerAd />):(<MovieContainerAd />)}
    </div>
      
    </>
  )
}

export default ListFilm