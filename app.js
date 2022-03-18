import 'dotenv/config';

import express from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();
const server = express();

app
	.prepare()
	.then(() => {
        
		server.use((req, res, next) => {
			// change !== to === when deployed to heroku
			if (req.headers['x-forwarded-proto'] !== 'https') {
				next();
			} else {
				res.redirect(301, `https://${req.hostname}${req.originalUrl}`);
			}
			
			res.setHeader(
				'strict-transport-security',
				'max-age=31536000; includeSubDomains; preload'
			);
		});
		
		server.all('*', (req, res) => {return handle(req, res)});
        
		server.listen(process.env.PORT || 3000, (error) => {
			if (error) throw error;
			console.error(`Listening on port ${process.env.PORT || 3000}`);
		});
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

import chalk from 'chalk';

server.use(express.json({ limit: '30mb', extended: true }));
server.use(express.urlencoded({ extended: true }));

import { resolve } from 'path';
server.use(express.static(`${resolve()}/static`, { dotfiles: 'allow' }));

server.enable('trust proxy');

server.listen(process.env.PORT || 3000, async (err) => {
    if (err) {
        return console.log(chalk.red(`Error starting the server ❌\nerr`));
    }
    
    console.log(chalk.green('Server successfully started ✔️'));
});

server.get('/', async (req, res) => {
    return res.status(200).send('Hello, World!');
});

import oauthRoute from './routes/oauth.js';
server.use('/oauth', oauthRoute);

import postRoute from './routes/post.js';
server.use('/post', postRoute);