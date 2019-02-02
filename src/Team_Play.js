import React, { Component } from 'react';
import {Container, Row} from 'reactstrap';
import TeamCard from './TeamCard';
import axios from 'axios';
class Team_Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      Details: []
    };
  }

  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.pandascore.co/csgo/players.json?filter[team_id]=3214`, {
      'headers': {
        'Authorization': 'Bearer b8uyLf66NWc6YMeNnFqqfZMSAq56eXR_h9aKKfHh13VmeJe80Z4',
        'X-Per-Page': 100,
      }
   })
      .then(response => {
          console.log(response.data);
          this.setState({
          isLoaded: true,
          Details: response.data
          });
        })
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        .catch(error => {
          console.log(error);
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render(){
    let img, player;
         const teamdetails = this.state.Details.map( t=> {

           if (t.image_url === null || t.image_url === undefined){
             img = "https://placeholdit.imgix.net/~text?txtsize=33&txt=No Image&w=500&h=500";
           } else {
             img = t.image_url;
           }

           if(t.players!== undefined || t.plyaers !== null || t.players.length > 0) {
             player = t.players;
           } else {
             player = "Not Available"
           }

          return <TeamCard
           key={t.id}
         name={t.name}
         players={player}
         image={img}/>
       });

         return (
         <Container>
         <Row>
         {teamdetails}
         </Row>
         </Container>
             );
     }
}
export default Team_Play;
