import React, { Component } from 'react';
import TeamCard from './TeamCard.js';
import axios from 'axios';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    axios.get("https://api.pandascore.co/csgo/teams.json?page=1",
     {'headers': {'X-RapidAPI-Key': 'b8uyLf66NWc6YMeNnFqqfZMSAq56eXR_h9aKKfHh13VmeJe80Z4'}})
      .then(response => {
          console.log(response);
          // this.setState({
          //   isLoaded: true,
          //   items: result.items
          // });
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
         const commentList = this.state.items.map( c=>
          <TeamCard
           key={c.id}
         name={c.name} />
         );

         return (
         <container>
         <row>
         {commentList}
         </row>
         </container>
             );
     }
}
export default App;
