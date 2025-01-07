import React from 'react'
import { Link } from "react-router-dom"

const quickLinks = [
    {
        title: "Home",
        link: "/"
    },
    {
        title: "About Us",
        link: "/"
    },
    {
        title: "Contact",
        link: "/"
    },
    {
        title: "Privacy Policy",
        link: "/"
    },
]

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className='bg-background-card pt-5 pb-0 flex flex-col justify-center items-center'>

        <div className='flex flex-col md:flex-row md:justify-center items-center py-4'>
            {quickLinks.map((ele, index) => {
                return (
                    <div key={index} className='text-text-secondary hover:text-text-contrast p-1 mx-4'> 
                        <Link to={ele.link}> {ele.title} </Link>
                    </div>
                );
            })}
        </div>

        <div className='text-center text-text-secondary border-t border-border p-2'>
            <p>Copyright &copy; {currentYear} | All rights reserved</p>
        </div>

    </footer>
  )
}
