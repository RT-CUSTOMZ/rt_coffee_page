import React from 'react';

export default class Logs extends React.Component {
    /*componentDidMount () {
        const script = document.createElement("script");

        script.src = "https://coffee-page-moc.firebaseio.com/.json?print=pretty";
        script.async = true;
        script.innerHTML = "document.write('This is output by document.write()!')";
        script.id = "testy";
        script.success = function(data){
            document.getElementById("divy").innerHTML = data
        }
        this.instance.appendChild(script);
    }*/

    render() {
      /*  let getJSON = function(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
                var status = xhr.status;
                if (status === 200) {
                    callback(null, xhr.response);
                } else {
                    callback(status, xhr.response);
                }
            };
            xhr.send();
        };

        getJSON('https://coffee-page-moc.firebaseio.com/.json?print=pretty',
            function(err, data) {
                if (err !== null) {
                    alert('Something went wrong: ' + err);
                } else {
                    alert('Your query count: ' + JSON.stringify(data.query));
                }
            });*/


        return(
            <div id={'test'} />
        )
    }
}