import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import './style/index.css';

// ReactDOM.render(<App />, document.getElementById('root'));



//this might not work!
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <App />
    </Router>
);
