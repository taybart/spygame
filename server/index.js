const fs = require('fs');
const loadJsonFile = require('load-json-file');
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const sio = require('socket.io');
const config = require('./config.js');
const log = require('./log.js');


const places = fs.readdirSync('./locations').map((file) => {
  const words = (file.split('.')[0]).split('_');
  const fmtWords = words.map(w => w.charAt(0).toUpperCase() + w.slice(1));
  return ({
    file,
    value: words.join(' '),
    label: fmtWords.join(' '),
  });
});

const PORT = 3002;

app.use(bodyParser.json());
app.use(cors());

const server = app.listen(PORT, () => log.info(`Server listening on ${PORT}`));
const io = sio.listen(server);

const games = {};
const intervals = {};

app.get('/places', (req, res) => {
  res.json({ places });
});

function groomGames() {
  Object.keys(games).forEach((k) => {
    if ((Date.now() - games[k].started.getTime()) > config.gameTimeout) {
      delete games[k];
      log.info(`Deleted ${k} from global game object`);
    }
  });
}
setInterval(groomGames, 10 * 60 * 1000);


app.post('/new', (req, res) => {
  let gameId = String(Math.floor(Math.random() * 9) + 1);
  for (let i = 0; i < 4; i += 1) {
    gameId += String(Math.floor(Math.random() * 10));
  }

  games[gameId] = {
    started: new Date(),
    places: req.body.places,
    users: [req.body.username],
  };
  res.json({ status: 'OK', data: { gameId } });
});

app.post('/register', (req, res) => {
  const { gameId } = req.body;
  const gameIds = Object.keys(games);
  if (gameIds.indexOf(gameId) === -1) {
    return res.json({ status: 'error', msg: 'Game does not exist' });
  }
  games[gameId].users.push(req.body.username);
  res.json({ status: 'OK', data: { gameId } });
});

function startGame(gameId) {
  return new Promise((resolve) => {
    log.info('Starting game', gameId);
    clearInterval(intervals[gameId]);

    games[gameId].time = 8 * 60;
    const game = games[gameId];
    Promise.all(game.places.map(({ file }) => loadJsonFile(`./locations/${file}`)))
      .then((locations) => {
        game.locations = {};
        locations.forEach(obj =>
          Object.keys(obj).forEach((d) => {
            game.locations[d] = obj[d];
          }));
        io.sockets.in(gameId).emit('start', game);

        const spy = game.users[
          Math.floor(Math.random() * game.users.length)
        ];
        const location = Object.keys(game.locations)[
          Math.floor(Math.random() * Object.keys(game.locations).length)
        ];
        const roles = {
          spy,
          location,
        };
        io.sockets.in(gameId).emit('roles', roles);
        resolve();
      });
  });
}

app.get('/start', (req, res) => {
  const { gameId } = req.query;
  startGame(gameId)
    .then(() => {
      intervals[gameId] = setInterval(() => {
        if (games[gameId].time > 0) {
          games[gameId].time -= 1;
          io.sockets.in(gameId).emit('time', games[gameId].time);
        } else {
          clearInterval(intervals[gameId]);
        }
      }, 1000);
    })
    .then(() => res.json({ status: 'OK', data: { gameId } }));
});

app.get('/reset', (req, res) => {
  const { gameId } = req.query;
  startGame(gameId)
    .then(() => {
      intervals[gameId] = setInterval(() => {
        if (games[gameId].time > 0) {
          games[gameId].time -= 1;
          io.sockets.in(gameId).emit('time', games[gameId].time);
        } else {
          clearInterval(intervals[gameId]);
        }
      }, 1000);
    })
    .then(() => res.json({ status: 'OK', data: { gameId } }));
});

// SOCKET STUFF
io.on('connection', (socket) => {
  log.debug('Client connected on ws', socket.id);
  socket.on('join-game', (gameId) => {
    log.debug('Client', socket.id, 'joined game', gameId);
    socket.join(gameId);
  });
});

io.on('disconnect', (socket) => {
  log.debug('Disconnect', socket.id);
});
