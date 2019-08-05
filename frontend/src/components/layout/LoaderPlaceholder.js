import React from 'react';
import loader from '../../media/loader.gif';

const LoaderPlaceholder = () => {
  return (
    <div className="loader-placeholder">
      <img src={loader} alt="" />
    </div>
  )
}

export default LoaderPlaceholder
