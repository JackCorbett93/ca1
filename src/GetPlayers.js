import React, { Component } from 'react';
import {Container, Row, Card, CardImg, CardTitle} from 'reactstrap';
import TeamCard from './PlayersCard';
import axios from 'axios';
import "./index.css";
class Team_Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      Details: []
    };
  }
//api requests players with the team id
  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.pandascore.co/csgo/players.json?filter[team_id]=${this.props.match.params.id}`, {
      'headers': {
        'Authorization': 'Bearer b8uyLf66NWc6YMeNnFqqfZMSAq56eXR_h9aKKfHh13VmeJe80Z4',
        'X-Per-Page': 100,
      }
   })
      .then(response => {
          console.log(response.data);
          this.setState({
            //sets reponse data to Details
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
    //sets variable so that if nothing came through on api request it just sets defualt
    let img, player,timg,tname;
    //maps incoming data to variables
         const teamdetails = this.state.Details.map( t=> {
           //sees if there is data that comes through players eg if it has zero players then it will show this
           if (this.state.Details === null || this.state.Details === undefined || this.state.Details.length <= 0){
             tname = "Data not provided by api";
           } else {
             tname= t.current_team.name
           }
           if (t.current_team.image_url === null || t.current_team.image_url === undefined){
             timg = "https://placeholdit.imgix.net/~text?txtsize=33&txt=No Image&w=500&h=500";
           } else {
             timg = t.current_team.image_url;
           }
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
            //sets variables and returns it to card
          return <TeamCard
           key={t.id}
           name={t.name}
           fname={t.last_name}
           hometown={t.hometown}
           players={player}
           image={img}/>
       });

         return (
         <Container>
         <Row>
         <Card>
         <CardTitle> {tname}</CardTitle>
         <div className="timg">
         <CardImg alt="profile" src={timg}/>
         </div>
         <Container>
         <Row noGutters>
         {teamdetails}
         </Row>
         </Container>
         </Card>
         </Row>
         </Container>
             );
     }
}
export default Team_Play;
