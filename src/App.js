import React, { Component } from 'react';
import TeamCard from './TeamCard';
import axios from 'axios';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      teams: []
    };
  }

  componentDidMount() {
    axios.get("https://cors-anywhere.herokuapp.com/https://api.pandascore.co/csgo/teams.json",
      {'headers': {"Authorization": 'Bearer ' +'b8uyLf66NWc6YMeNnFqqfZMSAq56eXR_h9aKKfHh13VmeJe80Z4'}})
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
         const teamList = this.state.teams.map(t => (
          <TeamCard
           key={t.name}
         name={t.name}
         image={t.image_url} />
       ));

         return (
         <container>
         <row>
         {teamList}
         </row>
         </container>
             );
     }
}
export default App;
