import React from 'react';
import { Col, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

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
    // }

    render() {
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
      return (
        <Col md={4} sytle={{'margin': "10px 10px"}}>
          <Card>
          <CardBody style={this.state.flag ? {display:'none'} : {}}>
          <CardTitle>{this.props.name}</CardTitle>
          <CardImg alt="profile" src={this.props.image}/>
          <CardText>players: {players.toString()}</CardText>
          </CardBody>
          </Card>
        </Col>
      );
    }
}
export default TeamCard;
