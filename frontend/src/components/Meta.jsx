import React from 'react';
import {Helmet} from 'react-helmet-async';

function Meta({title,description,keywords}) {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}/>
        <meta name='keywords' content={keywords}/>
    </Helmet>
  )
}

Meta.defaultProps={
    title:'Welcome to Proshop',
    description:'we sell the best products for cheap',
    keywords:'electrocins,buy electronics'
}
export default Meta