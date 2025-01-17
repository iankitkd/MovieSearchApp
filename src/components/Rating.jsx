import React from 'react'

export default function Rating({rating}) {
    const strokeOffset = 100 - rating;

    var circleColor = "stroke-red-500";
    var offsetCircleColor = "stroke-red-100"
    if(rating > 70) {
        circleColor = "stroke-green-500";
        offsetCircleColor = "stroke-green-100";
    } else if(rating > 50) {
        circleColor = "stroke-yellow-500"
        offsetCircleColor = "stroke-yellow-100"
    }


  return (
    <div className="relative w-[32px] h-[32px] bg-background-dark rounded-full">
      <svg className="w-full h-full transform rotate-[-90deg]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
        <circle className={`${offsetCircleColor} fill-background-dark`} cx="18" cy="18" r="15.915" strokeWidth="2"></circle>
        <circle className={`${circleColor} fill-transparent`} cx="18" cy="18" r="15.915" strokeWidth="2" strokeDasharray="100" strokeDashoffset={strokeOffset}></circle>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm text-text-secondary">
        {rating ? (
            <span className='flex items-center justify-center font-semibold'>{rating} <sup className='text-[6px]'>%</sup></span> 
          ) : (
            "NR"
          )
        }
      </div>
    </div>
  )
}
