import React from 'react'
import NavbarAdmin from '../components/NavbarAd'

function layoutAdmin(props) {
  return (
    <>
        <NavbarAdmin />
        {props.children}
    </>
  )
}

export default layoutAdmin