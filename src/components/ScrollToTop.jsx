import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
      const isDetailsPage = /^\/(movie|tv|person)\/\d+$/.test(location.pathname);

      if (isDetailsPage) {
        window.scrollTo(0, 0);
      }
    }, [location])
    
    return null;
}
