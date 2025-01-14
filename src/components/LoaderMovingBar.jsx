import React from 'react'

export default function LoaderMovingBar() {
  return (
    <div className="relative w-full h-1 rounded-full overflow-hidden">
      <div className="absolute h-full w-2/3 bg-button-primary animate-movingBar"></div>
    </div>
  )
}
