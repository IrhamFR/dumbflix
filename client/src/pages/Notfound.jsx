import React from 'react'
import NotFound from '../Images/404.gif'

function Notfound() {
  return (
    <div className='d-flex justify-content-center flex-column align-items-center'>
        <img src={NotFound} width={350} alt="Not Found" />
        {/* <h1 className='text-light'>Page Not Found</h1> */}
    </div>
  )
}

export default Notfound