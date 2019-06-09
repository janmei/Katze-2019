const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const axios = require('axios');

// our localhost port
const port = process.env.PORT || 3001;

const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

io.on('connection', socket => {
	console.log('New client connected' + socket.id);
	//console.log(socket);

	socket.on('initial_data', data => {
		axios
			.get('http://localhost:9000/views/name/' + data)
			.then(res => {
				// console.log(res.data);

				socket.emit('get_data', res.data);
			})
			.catch(function(err) {
				console.log(err);
			});
	});

	socket.on('update_data', data => {
		axios
			.get('http://localhost:9000/views/' + data)
			.then(res => {
				socket.broadcast.emit('get_data', res.data);
			})
			.catch(function(err) {
				console.log(err);
			});
	});

	// disconnect is fired when a client leaves the server
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

/* Below mentioned steps are performed to return the Frontend build of create-react-app from build folder of backend */

app.use(express.static('build'));
app.use('/kitchen', express.static('build'));
app.use('/updatepredicted', express.static('build'));

server.listen(port, () => console.log(`Listening on port ${port}`));
