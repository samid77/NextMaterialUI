import React, { Fragment, useEffect } from 'react';
import router from 'next/router';

export default function Search() {
  
  useEffect(() => {
    if(localStorage.getItem('accesstoken') === null || '' || undefined) {
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
  }, [])

  return(
    <div>Search</div>
  )
}