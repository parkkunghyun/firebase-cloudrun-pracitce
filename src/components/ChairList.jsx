import React from 'react'
import ChairCard from './ChairCard'

const ChairList = ({chairs}) => {
  return (
      <div className='grid w-full grid-cols-2 p-4 m-4 md:grid-cols-3 lg:grid-cols-4'>
          {
              chairs.map((chair) => (
                  <ChairCard key={chair.id} chair={chair} />
              ))
          }
    </div>
  )
}

export default ChairList