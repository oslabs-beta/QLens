import React, { Fragment } from 'react';
import '../public/loader.css';

const Loader = () => {
  return (
    <Fragment>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1 className="loading-text">Loading...</h1>
    </Fragment>
  );
};

export default Loader;
