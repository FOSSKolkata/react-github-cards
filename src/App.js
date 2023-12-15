import './App.css';
import React from 'react';

// Github users for testing : gaeron, sophiebits, sebmarkbage, bvaughn

const CardList = (props) => (
  <div>
     {props.profiles.map(profile => <Card {...profile}/>)}
  </div>
);

class Card extends React.Component{
  render(){
    const profile = this.props;
    return (
        <div className="github-profile">
          <img src={profile.avatar_url} />
          <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
          </div>
        </div>
    )
  }
}

class Form extends React.Component{
  state = {userName: ''}
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.userName);
    fetch(`https://api.github.com/users/${this.state.userName}`)
    .then((response) => response.json())
    .then((data) => {
      this.props.onSubmit(data);
      this.setState({userName: ''});
    })
    .catch((error) => console.log(error));
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          value={this.state.userName}
          placeholder="Github username"
          onChange={event => this.setState({userName: event.target.value})}
          required />   
        <button>Add Card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: []
  }

  addNewProfile = (profileData) => {
    this.setState(prevState => ({
          profiles: [...prevState.profiles, profileData]
        }
      ))
    };

   render() {
    return(
      <div> 
        <div className='header'>{this.props.title}</div>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles={this.state.profiles}/>
      </div>
    )
   } 
}

export default App;
