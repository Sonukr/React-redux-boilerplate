import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
)

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)

const NoMatch = () =>{
    return (
        <div>
            <h2>No Match</h2>
        </div>
    )
}

const WillMatch = () => {
    return(
        <div>
            <h2>Matched</h2>
        </div>
    )
}

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
            <h3>Please select a topic.</h3>
        )}/>
    </div>
)

export class HomePage extends Component {
  render() {
    return (
        <div className="App">
        <Router>
            <div className="menu">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/topics">Topics</Link></li>
                    <li><Link to="/emonjis">Emonjis</Link></li>
                    <li><Link to="/sidebar">Sidebar Routing</Link></li>
                    <li><Link to="/recursive">Recursive Routing</Link></li>
                    <li><Link to="/old-match">Old Match, to be redirected</Link></li>
                    <li><Link to="/will-match">Will Match</Link></li>
                    <li><Link to="/will-not-match">Will Not Match</Link></li>
                    <li><Link to="/also/will/not/match">Also Will Not Match</Link></li>
                </ul>

                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/topics" component={Topics}/>
               

                    <Route path="/" exact component={Home}/>
                    <Redirect from="/old-match" to="/will-match"/>
                    <Route path="/will-match" component={WillMatch}/>
                    <Route component={NoMatch}/>
                </Switch>
            </div>
        </Router>
    </div>
    )
  }
};