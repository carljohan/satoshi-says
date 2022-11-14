import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render(<App />, document.getElementById('root'));
if (module.hot) {
    module.hot.accept(App, () => {
        const App = require('./components/App.jsx').default;
        ReactDOM.render(<App />, document.getElementById('root'));
    });
}

