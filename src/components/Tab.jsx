import React, {useCallback, useEffect, useState} from 'react'

import { FaCaretDown } from "react-icons/fa";

export default function Tab({tabItems, currentTab, setCurrentTab}) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isMenuOpen, setIsMenuOpen] = useState(isMobile ? false: true);
    
    const handleResize = useCallback(() => {
        const isMobileView = window.innerWidth <= 768;
        setIsMobile(isMobileView);
        setIsMenuOpen(!isMobileView);
    }, []);
    
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);
    
    
  return (
    <div className='relative min-w-[120px]'>
        <div className={`md:hidden ${isMenuOpen ? "hidden" : ""} flex flex-row items-center gap-1 bg-button-primary hover:bg-button-hover rounded-xl px-4 py-1 font-semibold hover:cursor-pointer`} 
            onClick={() => setIsMenuOpen(true)}
        >
            <span>{currentTab}</span> 
            <FaCaretDown />
        </div>

        {isMenuOpen && <div className='md:relative md:inset-0 z-10 absolute -top-4 left-0 w-full flex flex-col md:flex-row bg-button-disabled rounded-xl md:rounded-full'>
            {
                tabItems.map((ele, index) => {
                    return(
                        <div 
                            key={index} 
                            className={`px-4 py-1 md:py-2 flex items-center whitespace-nowrap rounded-xl md:rounded-full font-semibold hover:cursor-pointer
                                ${currentTab == ele ? "bg-button-primary hover:bg-button-hover" : "hover:text-text-contrast"} `}
                            onClick={() => {
                                setCurrentTab(ele);
                                if(isMobile) {
                                    setIsMenuOpen(false);
                                }
                            }}
                        >
                            {ele}
                        </div>
                    )
                })
            }
        </div>
        }
    </div>
  )
}
