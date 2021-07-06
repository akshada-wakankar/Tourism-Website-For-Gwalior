import React from "react";
import { Button,Icon, Container, Header, Label, Menu, Table } from 'semantic-ui-react'
import {authAxios} from "../../utils"
import {orderSummaryURL} from "../../constants"

class OrderSummary extends React.Component{

  state={
    data: null,
    error:null,
    loading: false,
  }
  componentDidMount(){
    this.handleFetchOrder();
  }

  handleFetchOrder=()=>{
    this.setState({loading:true})
    authAxios
        .get(orderSummaryURL)
        .then(res => {
          this.setState({data:res.data, loading:false})})
        .catch(err => {
          this.setState({error:err, loading:false});
        });
  }

    render(){
      const{data, error, loading}= this.state;
      console.log(data);
        return(
            <div>
                <br></br>
                <Container>
                <Header as="h3">Booking Summary</Header>
                { data && <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Room no.</Table.HeaderCell>
                      <Table.HeaderCell>Room Type</Table.HeaderCell>
                      <Table.HeaderCell>Hotel</Table.HeaderCell>
                      <Table.HeaderCell>Price</Table.HeaderCell>
                      <Table.HeaderCell>Number of Rooms</Table.HeaderCell>
                      <Table.HeaderCell>Checkin Date</Table.HeaderCell>
                      <Table.HeaderCell>Number of Days</Table.HeaderCell>
                      <Table.HeaderCell>Total Price</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                  {data.order_rooms.map((order_room,   i )=>{ return(
                        
                        <Table.Row key={order_room.id}>
                          <Table.Cell>
                            <Label ribbon>{i}</Label>
                          </Table.Cell>
                  <Table.Cell>{order_room.room}</Table.Cell>
                          <Table.Cell>{order_room.room_obj.hotel_name}</Table.Cell>
                          <Table.Cell>₹{order_room.room_obj.price}</Table.Cell>
                          <Table.Cell>{order_room.numberofrooms}</Table.Cell>
                          <Table.Cell>{order_room.startdate}</Table.Cell>
                          <Table.Cell>{order_room.numberofdays}</Table.Cell>
                          <Table.Cell>₹{order_room.total_room_price}</Table.Cell>
                        </Table.Row>                       
                  )})}
                  </Table.Body>
                  
                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell colSpan='6'>
                        <Button color='green' textalign='right' floated='right'>Checkout</Button>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>

                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell colSpan='6' >
                  <h2 align='right' textalign='right' floated='right'>Total: ₹ {data.total}</h2>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
              </Table>}
              </Container>
            </div>
        )
    }
}

export default OrderSummary;