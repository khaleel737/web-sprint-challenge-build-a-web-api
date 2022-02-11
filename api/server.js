const express = require('express');
const res = require('express/lib/response');
const server = express();
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router')

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use(`/api/actions`, actionsRouter);
server.use(`/api/projects`, projectsRouter);


server.get(`/`, (req, res) => {
    res.send(`<h2>here's a little code I wrote, please read the README word for word, don't worry, you got this
    in every task there may be trouble, but if you worry you make it double, don't worry, you got this
    ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
    your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
    there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
    I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it</h2>`);
});

module.exports = server;
