import React, { Component } from 'react';
import {Container, Row} from 'reactstrap';
import TeamCard from './TeamCard';
import axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      teams: []
    };
  }

  componentDidMount() {
    axios.get("https://cors-anywhere.herokuapp.com/https://api.pandascore.co/csgo/teams.json", {
      'headers': {
        'Authorization': 'Bearer b8uyLf66NWc6YMeNnFqqfZMSAq56eXR_h9aKKfHh13VmeJe80Z4'
   }})
      .then(response => {
          console.log(response.data);
          this.setState({
              isLoaded: true,
              teams: response.data
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
         const teamList = this.state.teams.map( t=> {

           if (t.image_url === null || t.image_url === undefined){
             img = "https://placeholdit.imgix.net/~text?txtsize=33&txt=NoImage&w=318&h=180";
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
         {teamList}
         </Row>
         </Container>
             );
     }
}
export default App;
