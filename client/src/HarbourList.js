import React, { Component } from 'react'
import { getLocation } from './api';
var parse = require('html-react-parser');


export default class HarbourList extends Component {

     render() {
        getLocation(localStorage.getItem('radius')|5.0,
        localStorage.getItem('latitude'),
        localStorage.getItem('longitude'));
        const list  = localStorage.getItem("priya")
        console.log(list)
        
     return(<div id='table'>{parse(list)}</div>)


     }
    }
    