import React from 'react'

export default function Loader() {
  return (
    <div className="flex items-center justify-center gap-3 lg:h-[calc(100vh-64px)] mt-3">
      <div className="w-4 h-4 bg-button-primary rounded-full animate-pulse-custom" style={{ animationDelay: '0ms' }}></div>
      <div className="w-4 h-4 bg-button-primary rounded-full animate-pulse-custom" style={{ animationDelay: '200ms' }}></div>
      <div className="w-4 h-4 bg-button-primary rounded-full animate-pulse-custom" style={{ animationDelay: '400ms' }}></div>
    </div>
  )
}
