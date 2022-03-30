import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs';

createServer({
	models: {
		transaction: Model
	},

	seeds(server) {
		server.db.loadData({
			transactions: [
				{
					id: 1,
					title: 'Salário',
					amount: 4000,
					type: 'deposit',
					category: 'Trabalho',
					created_at: new Date('2022-03-05')
				},
				{
					id: 2,
					title: 'Aluguel',
					amount: 1000,
					type: 'withdraw',
					category: 'Casa',
					created_at: new Date('2022-03-08')
				}
			]
		})
	},
	
	routes() {
		this.namespace = 'api';
		this.get('/transactions', () => {
			return this.schema.all('transaction');
		});

		this.post('/transactions', (schema, request) => {
			const data = JSON.parse(request.requestBody);

			return schema.create('transaction', data);
		});
	}
})

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);