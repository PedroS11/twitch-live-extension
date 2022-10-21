import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SettingsPage } from './views/SettingsPage/SettingsPage';
import darkTheme from './themes/darkTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { BottomNavigation } from './views/Common/BottomNavigation/BottomNavigation';
import { Header } from './views/Common/Header/Header';
import { ExploreStreamsPage } from './views/ExploreStreamsPage/ExploreStreamsPage';

const routing = (
    <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
            <Paper square>
                <Router>
                    <Header />
                    <Switch>
                        <Route path="/settings" component={SettingsPage} />
                        <Route path="/explore" component={ExploreStreamsPage} />
                        <Route component={App} />
                    </Switch>
                    <BottomNavigation />
                </Router>
            </Paper>
        </ThemeProvider>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));
