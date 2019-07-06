import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

export const initalData = data => {
	socket.emit('initial_data', data);
};

export const getData = cb => {
	socket.on('get_data', data => {
		console.log(data);

		return cb(null, data);
	});
};

export const updateData = data => {
	socket.emit('update_data', data);
};