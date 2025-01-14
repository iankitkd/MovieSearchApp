import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage({ errorCode = 404, message = 'Page Not Found' }) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)] text-center">
      <div className="p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <h1 className="text-5xl font-bold text-accent-red">{errorCode}</h1>
        <p className="text-xl text-text-secondary mt-4">{message}</p>
        <button
          onClick={handleGoHome}
          className="mt-6 px-6 py-3 rounded-full bg-button-primary text-text-primary hover:bg-button-hover hover:text-text-contrast"
        >
          Go To HomePage
        </button>
      </div>
    </div>
  )
}
