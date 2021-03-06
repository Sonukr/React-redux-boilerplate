import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import './styles.css';
import { connect } from 'react-redux';
import { GetData } from '../../actions/getData';


const Home = () => (
    <div className='container'>
        <h2>Home</h2>
    </div>
)

const About = () => (
    <div className='container'>
        <h2>About</h2>
    </div>
)

const NoMatch = () =>{
    return (
        <div className='container'>
            <h2>No Match</h2>
        </div>
    )
}

const WillMatch = () => {
    return(
        <div className='container'>
            <h2>Matched</h2>
        </div>
    )
}

const Topic = ({ match }) => (
    <div className='container'>
        <h3>{match.params.topicId}</h3>
    </div>
)

const Topics = ({ match }) => (
    <div className='container'>
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

class HomePageProxy extends Component {
    constructor (props) {
        super(props);
        this.state = {
          isDropDownOpen: false
        };
    }

    componentDidMount(){
        this.getData();
        console.log(this.props)
    }


    getData = async() =>{
        const resp = await(await fetch('https://jsonplaceholder.typicode.com/posts')).json()
        this.props.dispatch(new GetData(resp).plainAction())
    }
    render() {
    return (
        <div className="App">
        <Router>
            <div className="menu">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/topics">Topics</Link></li>
        
                    <li><Link to="/will-match">Will Match</Link></li>
                    <li><Link to="/will-not-match">Will Not Match</Link></li>
                </ul>

                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/topics" component={Topics}/>
                

                    <Route path="/" exact component={Home}/>
                
                    <Route path="/will-match" component={WillMatch}/>
                    <Route component={NoMatch}/>
                </Switch>
            </div>
        </Router>
    </div>
    )
    }
};

const mapStateToProps = state => ({
    data: state.data
});

export const HomePage =  connect(mapStateToProps)(HomePageProxy)