import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button}from 'react-bootstrap';
import {FaTimes}from 'react-icons/fa';
import Messages from '../components/Messages';
import Loader from '../components/Loader';
import { useGetOrdersQuery } from '../slices/ordersApiSlice';

function OrderListScreen() {
  const {data:orders, isLoading, error}=useGetOrdersQuery();
  return (
    <>
    <h1>Orders</h1>
    {isLoading?<Loader></Loader>:error?<Messages variant='danger'>{error}</Messages>:(
      <Table striped  hover responsive 
      className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            
          </tr>
        </thead>
        <tbody>
          {orders.map((order)=>{
            return<tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user && order.user.name}</td>
              <td>{order.createdAt.substring(0,10)}</td>
              <td>{order.totalPrice}</td>
              <td>
              {order.isPaid?(
                order.paidAt.substring(0,10)
              ):(
                <FaTimes style={{color:'red'}}></FaTimes>
              )}

              </td>
              <td>
              {order.isDelivered?(
                order.deliveredAt.substring(0,10)
              ):(
                <FaTimes style={{color:'red'}}></FaTimes>
              )}

              </td>
              <td>
                <LinkContainer to={`/orders/${order._id}`}>
                    <Button variant='ight' className='btn-sm'>
                    Details
                    </Button>
                </LinkContainer>
              </td>
            </tr>

          })}
        </tbody>
      </Table>
    )}
    </>
  )
}

export default OrderListScreen