import React from "react";
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {  Grid, Divider, Button, Container,  Icon, Image, Item, Label, Segment, Dimmer, Loader,Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {basefolderURL, placesListURL} from '../../constants';
import "../../App.css";
class PlacesList extends React.Component{

    state={
      loading: false,
      error: null,
      data: [],
    }

    componentDidMount(){
      this.setState({loading:true})
      axios.get(placesListURL)
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
        <Grid columns={3} relaxed='very'>
            <Grid.Column>
            <img alt='img' className='placesimage' src={basefolderURL+item.image} />
          <Item.Content>
        <Item.Header as='a' >{item.name}</Item.Header>
            <Item.Meta>
              <span className='cinema'>{item.location}</span>
            </Item.Meta>
            
          </Item.Content>

          </Grid.Column>
          <Grid.Column>
                <p>
                <Item.Meta>
              <span className='cinema'><b>Timing:</b> {item.time}</span>
                </Item.Meta>
                <Item.Meta>
              <span className='cinema'><b>Fee:</b>{item.fee}</span>
              </Item.Meta>
              
            
            <Item.Extra>
              <Label> <span className='cinema'><b>Distance from Bus Stand:</b> {item.distance} km</span> </Label>
            </Item.Extra>
        <Item.Description>{item.description}</Item.Description>
        </p>
        
      </Grid.Column>
      <Grid.Column>
      <iframe src={item.maplink} width='100%' height="100%" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>      

      </Grid.Column>
      
    </Grid>

   
            
        </Item>
        
        })}
    
  </Item.Group>
  </Container>
  </div>
);
        }}
       

export default withRouter(PlacesList);

  