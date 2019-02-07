import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import TeamCard from './TeamsCard';
import axios from 'axios';
import "./index.css";
//import fire from './fire';
let results = [];
let results2 = [];
let fresults = [];
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      teams: [],
      searchTerm: '',
      alphabetical: 'az'
    };
    this.handleChange = this.handleChange.bind(this);
  }
 //Makes four api calls due to there being four pages
  async componentDidMount() {
    axios.all([
      axios.get(`https://cors-anywhere.herokuapp.com/https://api.pandascore.co/csgo/teams.json?page=1`,{
        'headers': {
          'Authorization': 'Bearer b8uyLf66NWc6YMeNnFqqfZMSAq56eXR_h9aKKfHh13VmeJe80Z4'
        }}),
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.pandascore.co/csgo/teams.json?page=2`,{
          'headers': {
            'Authorization': 'Bearer b8uyLf66NWc6YMeNnFqqfZMSAq56eXR_h9aKKfHh13VmeJe80Z4'
          }}),
          axios.get(`https://cors-anywhere.herokuapp.com/https://api.pandascore.co/csgo/teams.json?page=3`,{
            'headers': {
              'Authorization': 'Bearer b8uyLf66NWc6YMeNnFqqfZMSAq56eXR_h9aKKfHh13VmeJe80Z4'
            }}),
            axios.get(`https://cors-anywhere.herokuapp.com/https://api.pandascore.co/csgo/teams.json?page=4`,{
              'headers': {
                'Authorization': 'Bearer b8uyLf66NWc6YMeNnFqqfZMSAq56eXR_h9aKKfHh13VmeJe80Z4'
              }})
            ])
            //then it splits up the calls into four variables and then concats it into two groups then into one big group
            .then(axios.spread((firstres, secondres, thirdres, forthres) => {
              results = firstres.data.concat(secondres.data)
              results2 = thirdres.data.concat(forthres.data)
              fresults = results.concat(results2)
              //console.log(fresults)
              this.setState({
                teams: fresults,
                isLoaded: true,
              });
            }))

            .catch(error => {
              console.log(error);
              this.setState({
                isLoaded: true,
                error
              });
            }
          );
        }

        handleChange(event) {
          //sets up serach box
          const target = event.target;
          const value = target.type === 'checkbox' ? target.checked : target.value;
          const name = target.name;

          this.setState({
            [name]: value,
          });
        }

        render(){
          //sorts order of teams shown depending on the drop down menu is on a-z or z-a
          let sortedTeams;
          if (this.state.alphabetical === "az") {
            sortedTeams = this.state.teams.sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
        } else {
          sortedTeams = this.state.teams.sort((a, b) =>
          a.name < b.name ? 1 : -1
        );
      }


      let filteredTeams = sortedTeams;

      if (this.state.searchTerm)
      //filters depending on letters in search bar
      filteredTeams = this.state.teams.filter(u =>
        u.name.startsWith(this.state.searchTerm)
      );
      let img, player;
      //eslint-disable-next-line
      const teamNames = filteredTeams.map(t => {
        // checks to see if profile picture is present if not put in default
        if (t.image_url === null || t.image_url === undefined){
          img = "https://placeholdit.imgix.net/~text?txtsize=33&txt=No Image&w=500&h=500";
        } else {
          img = t.image_url;
        }
        //checks to see if any players are present on the team if not gives out message
        if(t.players!== undefined || t.plyaers !== null || t.players.length > 0) {
          player = t.players;
        } else {
          player = "Not Available"
        }
        //checks to see if checkbox is ticked if yes then it will get rid of any team with zero players
        if (this.state.NoPly === false || this.state.NoPly === undefined){
          return <TeamCard
          key={t.id}
          id={t.id}
          name={t.name}
          players={player}
          image={img}/>
        }else if (this.state.NoPly === true && t.players.length > 0){
          return <TeamCard
          key={t.id}
          id={t.id}
          name={t.name}
          players={player}
          image={img}/>
        }

console.log(this.state.NoPly);
      });
      return (
        <Container>
        <Row>
        <Col>
        <form onSubmit={this.handleSubmit}>
        <label>
        Search for user:
        <input
        type="text"
        name="searchTerm"
        value={this.state.searchTerm}
        onChange={this.handleChange}
        />
        </label>
        </form>
        </Col>
        <Col xs="3">
        <label>
        Sort:
        </label>
        <select
        name="alphabetical"
        value={this.state.alphabetical}
        onChange={this.handleChange}
        >
        <option value="az">
        A to Z
        </option>
        <option value="za">Z to A</option>
        </select>
        </Col>
        <Col xs="3">
        <label>
        Show teams with players only :
        </label>
        <input
        type="checkbox"
        name="NoPly"
        value={this.state.NoPly}
        onChange={this.handleChange}
        />
        </Col>
        </Row>
        <Row noGutters>
        {teamNames}
        </Row>
        </Container>
      );
    }
  }
  export default App;
