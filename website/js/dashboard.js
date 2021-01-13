async function login() {
  let access_token, expires_in, refresh_token, scope;

  /* check if already have access token */
  let loginDetails = localStorage.getItem('aiko-login');

  /* refresh access token if it has expired */
  if (loginDetails) {
    loginDetails = JSON.parse(loginDetails);
    ({ expiry, refresh_token } = loginDetails);

    if (Date.now() < expiry) return loginDetails;

    return getToken('refresh', refresh_token);
  }

  /* check if there is a code that needs to be exchanged for an access token */
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');

  if (code) return getToken('code', code);

  /* go to Discord OAuth if there is no access token, refresh token or code */
  window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=793442206723735572&redirect_uri=https%3A%2F%2Faiko.cf%2Fdashboard&response_type=code&scope=identify%20guilds%20guilds.join&prompt=none';
}

async function getToken(type, token) {
  const response = await fetch(`https://aiko.cf/token?type=${type}&token=${token}`)
    .then(res => res.json());
  console.log(response)
  const { access_token, expires_in, refresh_token, scope } = response;

  localStorage.setItem('aiko-login', JSON.stringify({
    access_token,
    expiry: Date.now() + (expires_in * 1000),
    refresh_token,
    scope
  }));

  return { access_token, expires_in, refresh_token, scope };
}

(async function main() {
  const { access_token } = await login();

  const user = await fetch(`https://aiko.cf/discordapi/users/@me?token=${access_token}`)
    .then(res => res.json());

  const accountImage = document.querySelector('#account-icon img');
  accountImage.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`;


  const servers = await fetch(`https://aiko.cf/discordapi/users/@me/guilds?token=${access_token}`)
    .then(res => res.json());
  
  const mutualServers = [];

  for (server of servers) {
    if (!server.owner) continue;

    const guildMember = await fetch(`https://aiko.cf/discordapi/guilds/${server.id}/members/${user.id}`)
      .then(res => res.json());
    console.log(guildMember);
    mutualServers.push(guildMember);
  }

  const serversList = document.getElementById('servers');
  serversList.innerHTML = JSON.stringify(mutualServers);
})();