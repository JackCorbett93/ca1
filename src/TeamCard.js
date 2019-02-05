import React from 'react';
import { Col, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
//import Players from "./Team_Play";
import { Link} from 'react-router-dom'
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

    // handleClick(){
    //     this.setState(prevState => ({
    //         flag: !prevState.flag
    //     }));
    //<CardText>players: {players.toString()}</CardText>
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
        <Link to={`/Players/${this.props.id}`}>
          <Card>
          <CardBody style={this.state.flag ? {display:'none'} : {}}>
          <CardTitle>{this.props.name} {this.props.id}</CardTitle>
          <CardText>Number of Players: {players.length}</CardText>
          <CardImg alt="profile" src={this.props.image}/>
          </CardBody>
          </Card>
          </Link>
        </Col>
      );
    }
}
export default TeamCard;
