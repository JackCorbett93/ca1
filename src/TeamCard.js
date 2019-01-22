import React from 'react';
import { Container, Row, Col, Card, CardImg, CardText, CardBody,
       CardTitle, CardSubtitle, Button } from 'react';

class TeamCard extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            flag: false
        };
            this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState(prevState => ({
            flag: !prevState.flag
        }));
    }

    render() {
      return (
        <Col md={3} sytle={{'margin': "10px 10px"}}>
          <Card>
          <CardText>
          {this.props.email}
          </CardText>
          <CardBody style={this.state.flag ? {display:'none'} : {}}>
          <CardText>{this.props.body}</CardText>
          </CardBody>
          <Button color={this.state.flag ? "primary" : "danger"} onClick={this.handleClick}>
          {this.state.flag ? "unflag" : "Flag as inappropriate"}
          </Button>
          </Card>
        </Col>
      );
    }
}
export default TeamCard;
