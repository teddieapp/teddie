import React from 'react';
import ReactDOM from 'react-dom';
import './theme';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCOSgZg_IT4ddlFlgPBCAm99Kd-ZhKjqkY",
    authDomain: "uofthacks-aa0ee.firebaseapp.com",
    databaseURL: "https://uofthacks-aa0ee.firebaseio.com",
    projectId: "uofthacks-aa0ee",
    storageBucket: "uofthacks-aa0ee.appspot.com",
    messagingSenderId: "577016302846"
};

firebase.initializeApp(config);
window.firebase = firebase;
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
