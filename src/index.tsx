import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store } from './store/store';
import { Provider } from 'react-redux';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { OptionsPage } from './views/OptionsPage/OptionsPage';
import { Header } from './views/Common/Header/Header';
import darkTheme from './themes/darkTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
            <Paper square>
                <Header />

                <Router>
                    <Switch>
                        <Route path="/options" component={OptionsPage} />
                        <Route component={App} />
                    </Switch>
                </Router>
            </Paper>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
