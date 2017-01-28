const platform = require('platform');
//import axios from 'axios'

class Global {
    constructor() {
        /*
        axios.get('http://jsonip.com/?callback')
        .then(response => {
            this.ip = response.data.ip
        })
        .catch(error => 
            console.log(error)
        )*/
        this.platform = platform
        let fs = window.RequestFileSystem || window.webkitRequestFileSystem;
        if (!fs) {
            console.log("check failed?");
        } else {
            fs(window.TEMPORARY,
                100,
                () => this.incognito = false,
                () => this.incognito = true);
        }        
    }
}

export default (new Global())