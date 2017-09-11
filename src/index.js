import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';

const GithubURL = 'https://api.github.com/users/';
class GithubForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = {name:'', githubData:'', received: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({name: event.target.value});
      }

      handleSubmit(event) {
        let GithubUserURL = GithubURL.concat(this.state.name);
        fetch(GithubUserURL)
          .then(response => {
            if (!response.ok) {
              throw Error("Network request failed")
            }
            return response
          })
          .then(d => d.json())
          .then(d => {
            this.setState({
              githubData: d
            })
          }
          );
        console.log('hello');
        event.preventDefault();
      }

        render() {
            if (!this.state.githubData)
                return (
                <div>
                      <form onSubmit={this.handleSubmit}>
                        <label>
                          Name:
                          <textarea value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                      </form>
                </div>
                );
            return (
                <div>
                    <h3> Name: {this.state.githubData.name}</h3>
                    <h3> UserName: {this.state.githubData.login}</h3>
                    <h3> Created At: {this.state.githubData.created_at}</h3>
                    <h3> Followers: {this.state.githubData.followers}</h3>
                    <h3> Following: {this.state.githubData.following}</h3>
                    <h3> Public Repos: {this.state.githubData.public_repos} </h3>
                    <h3> Public Gists: {this.state.githubData.public_gists} </h3>
                    <a href={this.state.githubData.html_url}> Link to profile </a>
                </div>
            )
      }
}

ReactDOM.render(
    <GithubForm />,
    document.getElementById('root')
);
