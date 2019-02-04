import React from 'react';
import { Col, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import Players from "./Team_Play";
import Routes from './Main';
import { Link, Route } from 'react-router-dom'
class TeamCard extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            flag: false
        };

    }

    // handleClick(){
    //     this.setState(prevState => ({
    //         flag: !prevState.flag
    //     }));
    //<CardText>players: {players.toString()}</CardText>
    // }
    handleEvent = event => {

    }
    render() {
      // let player;
      // let players =  [];
      // if (this.props.players.length !== 0) {
      //   for (let i = 0; i < this.props.players.length; i++) {
      //     player = this.props.players[i].name;
      //     players.push(player);
      //   }
      // } else {
      //   player = "Not available"
      // }
      return (
        <Col md={4} sytle={{'margin': "10px 10px"}}>
          <Card>
          <CardBody style={this.state.flag ? {display:'none'} : {}}>
          <CardTitle>{this.props.name} {this.props.id}</CardTitle>
          <CardImg alt="profile" src={this.props.image}/>
          <CardText>Country: {this.props.hometown}</CardText>
          <CardText>Full name: {this.props.fname}</CardText>
          </CardBody>
          </Card>
        </Col>
      );
    }
}
export default TeamCard;
