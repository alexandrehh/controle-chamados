import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchItem from "./searchItemComponent/searchItemController"
import SaveItem from "./saveItemComponent/saveItemController"

ReactDOM.render(
    (
        <Router>
            <App>
                <Switch>
                    <Route exact path="/" component={SearchItem}/>
                    <Route path="/save" component={SaveItem}/>
                </Switch>
            </App>
        </Router>
    ),
    document.getElementById('root')
);