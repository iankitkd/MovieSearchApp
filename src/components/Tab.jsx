import React from 'react'

export default function Tab({tabItems, currentTab, setCurrentTab}) {
  return (
    <div className='flex flex-row bg-button-disabled rounded-full'>
        {
            tabItems.map((ele, index) => {
                return(
                    <div 
                        key={index} 
                        className={`px-4 py-2 rounded-full font-semibold hover:cursor-pointer
                             ${currentTab == ele ? "bg-button-primary hover:bg-button-hover" : "hover:text-text-contrast"} `}
                        onClick={() => setCurrentTab(ele)}
                    >
                        {ele}
                    </div>
                )
            })
        }
    </div>
  )
}
