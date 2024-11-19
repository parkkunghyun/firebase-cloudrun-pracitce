import React from 'react'
import { Link } from 'react-router-dom'

const ChairCard = ({chair}) => {
  return (
      <Link to={`/chairs/${chair.id}`} className='flex flex-col *: items-center p-2 m-2 hover:scale-105 border-2 rounded-lg shadow-lg '>
          <img src={chair.image} alt="chair" />
          <h1 className='text-lg font-bold'>{chair.name}</h1>
          <p className='text-gray-500'>{chair.price}</p>
    </Link>
  )
}

export default ChairCard

// description
// "고급스러운 느낌의 월넛 컬러 애쉬우드 프레임에 오염 방지 기능 PU를 적용한 케톤 암체어입니다"
// (문자열)


// image
// "http://www.gagu824.com/data/item/1724720849/thumb-7I2464Sk7J28_600x600.jpg"
// (문자열)


// name
// "케톤 암체어"
// (문자열)


// price
// 185000