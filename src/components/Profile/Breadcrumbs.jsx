import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumbs = () => {
  return (
    <div className='container'>
      <p class="top-breadcrumbs">
        <Link to='/' class="bread-items">
          Home /
        </Link>
        <span class="bread-items active">{" "} Profile</span>
      </p>
    </div>
  )
}

export default Breadcrumbs
