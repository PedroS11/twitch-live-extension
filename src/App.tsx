import React from 'react';
import { LiveStreamPage } from './views/LiveStreamPage/LiveStreamPage';
import { Header } from './views/Common/Header/Header';

function App() {
    return (
        <div>
            <Header />

            <LiveStreamPage />
        </div>
    );
}

export default App;
