import React from "react";
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux"
import { Button, Container,  Icon, Image, Item, Label, Segment, Dimmer, Loader,Message,Card } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {hotelDetailURL} from '../../constants';
import {basefolderURL} from '../../constants';
import {addtocartURL} from '../../constants';
import {authAxios} from '../../utils'
import "../../App.css";
import {fetchCart} from "../../store/actions/cart"

class HotelDetail extends React.Component{

    state={
      loading: false,
      error: null,
      data: [],
      noofdays:null,
      startdate:null,
    }

    componentDidMount(){
      this.handleFetchHotel();
    }

    handleFetchHotel=()=>{
      const {match: {params}}=this.props;
      this.setState({loading:true})
      axios.get(hotelDetailURL(params.hotelID))
      .then(res => {
        console.log(res.data);
        this.setState({data: res.data, loading: false })
      })
      .catch(err=>{
        this.setState({
          error: err, loading: false 
        })
      })
    };
    handleInput = (e) => { 
      this.setState({ 
          [e.target.name]: e.target.value, 
      }); 
  }; 

    handleAddToCart = slug => {
      this.setState({ loading: true })
        const noofdays= this.state.noofdays;
        const startdate= this.state.startdate;
        authAxios.post(addtocartURL, {slug, noofdays, startdate})
        .then(res => {
          console.log(res.data);
          this.props.fetchCart();
          this.setState({ loading: false });
        })
        .catch(err => {
          this.setState({ error: err, loading: false });
        });
    };

    render(){
      const {data,error,loading}=this.state;
      const item= data;  
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
<Card fluid
    header={item.name}
    meta={item.location}
    description={item.address}
    extra={<label>Covid Safety Rating: {item.safetyrating}/5</label>}
  />
  <hr></hr>
  {data.rooms &&(
    data.rooms.map(r=>{
      return <Item.Group divided key={r.id}>
      <Item>
        <img alt='img' className='hotelsimage' src={basefolderURL+ r.image} />
        <Item.Content>
          <Item.Header as='a'>{r.roomtype}</Item.Header>
          <Item.Meta>
            <span className='cinema'>₹{r.price}</span>
          </Item.Meta>
          <Item.Description></Item.Description>
          <form onSubmit={()=>this.handleAddToCart(r.slug)}>
          <input value={this.state.noofdays} name="noofdays" onChange={this.handleInput} ></input>
          <input type="date" value={this.state.startdate} name="startdate" onChange={this.handleInput} ></input>
          <Item.Extra>
            <Button type="submit" primary floated='right' >
              Book Room
              <Icon name='right chevron' />
            </Button>
          </Item.Extra>
          </form>
        </Item.Content>
      </Item>
    </Item.Group>
    })
  )}
  
   
    
  </Container>
  </div>
);
        }}
       
const mapDispatchToProps = dispatch =>{
  return{
    fetchCart: () => dispatch(fetchCart())
  }
}

export default withRouter (connect(null, mapDispatchToProps)(HotelDetail));

