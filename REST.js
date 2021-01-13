const db = require('quick.db');
const https = require('https');
const express = require('express');
const querystring = require('querystring');

const levelServers = new db.table('LEVEL_SYSTEM');
const levels = new db.table('level');

const authTokens = {
  '9Uj3k5KtaMbraZJK2piDNXkxpv5ZyU2T': [
    'leaderboard',
    'guild',
    'channel',
    'user'
  ],   // private
  'ivIvV7sF5JpqzKgmfle40T8LJqSdJeJs': [
    'leaderboard'
  ]    // public
};

function listen(app, bot) {
  /* Discord OAuth */
  app.get('/token', (req, res) => {
    const type = req.query['type'];
    if (!['code', 'refresh'].includes(type))
      return res.json({ error: 'Invalid type specified. Must be either "code" or "refresh"' });

    const token = req.query['token'];
    
    let data = {
      client_id:  '793442206723735572',
      client_secret: 'ArqgS49djTmHfWpMkgltDTZDROgbKIBd',
      redirect_uri: 'https://aiko.cf/dashboard',
      scope: 'identify guilds guilds.join'
    };

    switch (type) {
      case 'code':
        Object.assign(data, {
          grant_type: 'authorization_code',
          code: token
        });
        break;
      case 'refresh':
        Object.assign(data, {
          grant_type: 'refresh_token',
          refresh_token: token
        });
        break;
    }
    
    data = querystring.stringify(data);

    const request = https.request('https://discordapp.com/api/v6/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }, response => {
      let chunks = '';
      
      response.on('data', chunk => chunks += chunk);
      response.on('end', () => res.end(chunks));
    });

    request.write(data);
    request.end();
  });

  app.get('/discordapi/*', (req, res) => {
    const token = req.query['token'];
    const method = req.query['method'] || 'GET';

    const route = req.url.split('discordapi/')[1];

    const request = https.request(`https://discord.com/api/${route}`, {
      method,
      headers: { 'Authorization': `Bearer ${token}` }
    }, response => {
      let chunks = '';

      response.on('data', chunk => chunks += chunk);
      response.on('end', () => res.end(chunks));
    });

    request.end();
  });

  /* check authentication token */
  app.use((req, res, next) => {
    const url = req.url.split('/');
    url.shift();
    if (url[0] === 'api' && !Object.keys(authTokens).includes(url[1]))
      return res.send({ error: 'An invalid authentication token was provided' });
    
    if (!url[2])
      return res.send({ error: 'No API was specified' });
    
    if (!authTokens[url[1]].includes(url[2]))
      return res.send({ error: 'You do not have permission to use this api' })
    
    next();
  });

  /* leaderboard endpoint */
  app.get('/api/:auth/leaderboard', (req, res) => {
    res.send({ error: 'No server ID was specified' });
  });

  app.get('/api/:auth/leaderboard/:guildID', (req, res) => {
    const guildID = req.params['guildID'];
    const amount = parseInt(req.query.amount) || Infinity;

    const levelsEnabled = levelServers.get(`toggle_${guildID}`);
    if (levelsEnabled) {
      let users = levels.get(`points.${guildID}`);
      let ranks = levels.get(`rank.${guildID}`);
      users = Object.entries(users);
      users = users.sort((a, b) => b[1] - a[1]);

      let rankedUsers = [];
      for ([userID, points] of users) {
        const user = bot.users.cache.get(userID);
        if (!user) continue;

        const rank = ranks[userID];

        rankedUsers.push([user.username, { points, rank }]);

        if (rankedUsers.length === amount) break;
      }

      let server = bot.guilds.cache.get(guildID);
      server = server && server.name || 'Unknown';

      return res.send({ data: {
          users: rankedUsers,
          server
      } });
    }

    res.send({ error: 'The specified server either does not exist or has levels disabled' });
  });

  /* guild endpoint */
  app.get('/api/:auth/guild', (req, res) => {
    res.send({ error: 'No server ID was specified' });
  });

  app.get('/api/:auth/guild/:guildID', (req, res) => {
    const guildID = req.params['guildID'];

    const guild = bot.guilds.cache.get(guildID);
    if (!guild) return res.send({ error: 'The specified guild could not be found' });

    res.send({ data: guild });
  });

  /* channel endpoint */
  app.get('/api/:auth/channel', (req, res) => {
    res.send({ error: 'No channel ID was specified' });
  });

  app.get('/api/:auth/channel/:channelID', (req, res) => {
    const channelID = req.params['channelID'];

    const channel = bot.channels.cache.get(channelID);
    if (!channel) return res.send({ error: 'The specified channel could not be found' });

    res.send({ data: channel });
  });

  /* user endpoint */
  app.get('/api/:auth/user', (req, res) => {
    res.send({ error: 'No user ID was specified' });
  });

  app.get('/api/:auth/user/:userID', (req, res) => {
    const userID = req.params['userID'];

    const user = bot.users.cache.get(userID);
    if (!user) return res.send({ error: 'The specified user could not be found' });

    res.send({ data: user });
  });

  console.log('REST API attached');
}

module.exports = listen;