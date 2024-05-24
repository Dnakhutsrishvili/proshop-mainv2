import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductsCarousel';
import Messages from '../components/Messages';

function HomeScreen() {
  const {pageNumber,keyword}=useParams();
  const {data,isLoading,error}=useGetProductsQuery({keyword,pageNumber})

  return (
    <div>
      {!keyword?<ProductCarousel /> :(<Link to='/' className='btn btn-light mb-4' >Go Back</Link>)}
      {isLoading ? (<Loader></Loader>) : error ? (<Messages variant='danger'>{error?.data?.message||error.error}</Messages>) : (<>

            <h1>Latest products</h1>
            <Row>
              {data.products.map((product)=>{
               return <Col key={product._id} sm={12} md={6} lg={4} xl={3}> 
               <Product product={product} ></Product> 
                </Col>
              })}
            </Row>
            <Paginate pages={data.pages} page={data.page} keyword={keyword?keyword:''}/>
      </>)}

    </div>
  )
}

export default HomeScreen