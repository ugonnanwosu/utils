// libs
import _ from 'lodash'
import React, {

} from 'react'

import { createRoot } from 'react-dom/client'

// 2nd party libs

// relative modules
import ReactDev from './test-layout'

// modules

const domNode = document.getElementById('react-id');

Promise.all([

])
  .then((resp) => {


  })
  .finally(() => {

    const reactNode = (
      <ReactDev />
    );

    createRoot(domNode).render(reactNode);

    console.log('it did a thing!')
  });