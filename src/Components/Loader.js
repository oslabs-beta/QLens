import React, { Fragment } from 'react';
import '../public/loader.css';

const Loader = () => {
  return (
    <Fragment>
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1 class="loading-text">Loading...</h1>
    </Fragment>
  );
};

export default Loader;
