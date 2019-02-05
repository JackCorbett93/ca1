import React, { Component } from 'react';
import {Container, Row} from 'reactstrap';
import TeamCard from './TeamCard';
import axios from 'axios';
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
            .then(axios.spread((firstres, secondres, thirdres, forthres) => {
              //console.log(firstres.data + secondres.data + thirdres.data)
              // results.push(firstres.data)
              // results.push(secondres.data)
              //results.push(thirdres.data)
              //results = results.concat(firstres.data).concat(secondres.data).concat(thirdres.data)
              results = firstres.data.concat(secondres.data)
              results2 = thirdres.data.concat(forthres.data)
              fresults = results.concat(results2)
              console.log(fresults)
              this.setState({
                teams: fresults,
                isLoaded: true,
                //teams: secondres.data,
                //teams: thirdres.data,
              });
            }))

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

        handleChange(event) {
          const target = event.target;
          const value = target.type === 'checkbox' ? target.checked : target.value;
          const name = target.name;

          this.setState({
            [name]: value
          });
        }

        render(){
          let sortedUsers;

          if (this.state.alphabetical === "az") {
            sortedUsers = this.state.teams.sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
        } else {
          sortedUsers = this.state.teams.sort((a, b) =>
          a.name < b.name ? 1 : -1
        );
      }
      if (this.state.NoPly === true){

      }

      let filteredUsers = sortedUsers;

      if (this.state.searchTerm)
      filteredUsers = this.state.teams.filter(u =>
        u.name.startsWith(this.state.searchTerm)
      );
      let img, player;

      const teamNames = filteredUsers.map(t => {
        // if (t.name !== null){
        //   uppercase = t.name;
        //   uppercase.ToUpperCase;
        // }

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
        id={t.id}
        name={t.name}
        players={player}
        image={img}/>
      });
      return (
        <Container>
        <div>
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
        <input type="submit" value="Submit" />
        </form>
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
        <label>
        Filter no players:
        </label>
        <input
        type="checkbox"
        name="NoPly"
        value={this.state.NoPly}
        onChange={this.handleChange}
        />
        <Row>
        {teamNames}
        </Row>
        </div>
        </Container>
      );
    }
  }
  export default App;
