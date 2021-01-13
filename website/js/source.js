function fetchLeaderboard(serverID, count=10) {
  return new Promise(async (resolve, reject) => {
    const users = await fetch(`https://aiko.cf/api/ivIvV7sF5JpqzKgmfle40T8LJqSdJeJs/leaderboard/${serverID}?amount=${count}`)
      .then(res => res.json());

    if (users.error) {
      reject(console.error(`REST API Error: ${data.error}`));
    }

    resolve(users.data);
  });
}