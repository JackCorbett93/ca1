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
          {this.props.name}
          </CardText>
          <CardImg>
          if (this.prop.image_url == null){
            this.prop.image_url = "./defaultimg.png"
          }
          <img alt="profile" src={this.prop.image_url} />
          </CardImg>
          <CardBody style={this.state.flag ? {display:'none'} : {}}>
          <CardText>{this.props.players}</CardText>
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
