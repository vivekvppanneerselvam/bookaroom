import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'jquery/dist/jquery.slim'
import 'popper.js'
import 'bootstrap/dist/js/bootstrap.min'
import './css/index.css'
import './css/style.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import queryString from 'query-string'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
