import React from "react";
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import { Button, Container,  Icon, Image, Item, Label, Segment, Dimmer, Loader,Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {hotelListURL} from '../../constants';
import {basefolderURL} from '../../constants';
import "../../App.css";

class HotelList extends React.Component{

    state={
      loading: false,
      error: null,
      data: [],
    }

    componentDidMount(){
      this.setState({loading:true})
      axios.get(hotelListURL)
      .then(res => {
        console.log(res.data);
        this.setState({data: res.data, loading: false })
      })
      .catch(err=>{
        this.setState({
          error: err, loading: false 
        })
      })

    }
   

    render(){
      const {data,error,loading}=this.state;
        return(
          
            <div>
            
  <Container>
    {error && 
    <Message negative error header='There was some error with your submission!' content={JSON.stringify(error)}/>
  }
    {loading && <Segment>
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>

      <Image src='/images/wireframe/short-paragraph.png' />
</Segment>
}
    <Item.Group divided>
      {data.map(item=>
        {
          return <Item >
            <img alt='img' className='hotelsimage' src={basefolderURL+item.image} />
          <Item.Content>
        <Item.Header as='a' >{item.name}</Item.Header>
            <Item.Meta>
              <span className='cinema'>{item.location}</span>
            </Item.Meta>
            
            <Item.Description>{item.address}</Item.Description>
            <Item.Extra>
              <Button primary floated='right' onClick={()=>this.props.history.push(`/hotels/${item.id}`)} >
                Book Now
                <Icon name='right chevron' />
              </Button>
              <Label>Covid Safety Rating: {item.safetyrating}/5  </Label>
            </Item.Extra>
          </Item.Content>
        </Item>
        })}
    
  </Item.Group>
  </Container>
  </div>
);
        }}
       

export default withRouter(HotelList);

  