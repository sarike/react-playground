import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import ListPage from './page/list'
import DetailPage from './page/detail'
import registerServiceWorker from './registerServiceWorker';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/solarized.css';
import './index.css';

class App extends Component {
    render() {
        console.info(Route)
        return (
            <Router>
                <Switch>
                    <Route path="/:owner/:repo/:path" component={DetailPage} />
                    <Route path="/:owner/:repo" component={ListPage} />
                    <Route path="/" component={DetailPage} />
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
