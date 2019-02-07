import React from 'react';
import { Col, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Link} from 'react-router-dom'
import "./index.css";
class TeamCard extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            flag: false,
            teams: [],
            searchTerm: '',
            alphabetical: 'az'
        };
    }

    render() {
      // checks to see if any player data is on team object and then pushes it into array so it can show number of players or their name
      let player;
      let players =  [];
      if (this.props.players.length !== 0) {
        for (let i = 0; i < this.props.players.length; i++) {
          player = this.props.players[i].name;
          players.push(player);
        }
      } else {
        player = "Not available"
      }

      if (players.length > 0){
      return (
        <Col md={4} sytle={{'margin': "10px 10px"}}>
        {/*sets up link to page players and passes in the id of the team the user clicks on*/}
          <Link to={`/Players/${this.props.id}`}>
            <Card className="tcard">
            <CardBody style={this.state.flag ? {display:'none'} : {}}>
            <CardTitle>{this.props.name}</CardTitle>
            <CardText>Number of Players: {players.length}</CardText>
            <CardImg alt="profile" className="mtimg" src={this.props.image}/>
            </CardBody>
            </Card>
            </Link>
            </Col>
          )
        }
        else {
          return(
          <Col md={4} sytle={{'margin': "10px 10px"}}>
          <Card className="tcard">
          <CardBody style={this.state.flag ? {display:'none'} : {}}>
          <CardTitle>{this.props.name}</CardTitle>
          <CardText>Number of Players: {players.length}</CardText>
          <CardImg alt="profile" className="mtimg" src={this.props.image}/>
          </CardBody>
          </Card>
          </Col>
        )
    }
  }
}

export default TeamCard;
