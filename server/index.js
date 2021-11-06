const http = require('http');
const axios = require('axios');

const server = http.createServer((req, res) => {
    if(req.url === '/getUsers') {
        axios.get('https://randomuser.me/api/?results=100').then((resp) => {
            const usersList = resp.data.results;
            const filteredList = usersList.map(({name, email, cell, location, picture}) => {
                return {
                    name: {
                        title: name.title,
                        firstName: name.first,
                        lastName: name.last
                    },
                    email,
                    phoneNo: cell,
                    city: location.city,
                    picture: picture.medium
                }
            });
            res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000'});
            res.end(JSON.stringify(filteredList));
        }).catch((err) => {
            res.writeHead(500, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000'});
            res.end({msg: 'Some error occurred', err});    
        });
    } else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end('Welcome to User Server');
    }
})

server.listen(5000, 'localhost', () => {
    console.log('Server listening on port 5000');
})