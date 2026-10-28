require("dotenv").config();
const axios = require("axios");
const {App} = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/jasb-ping",async ({command,ack,respond}) => {
  const start = Date.now();
  await ack();
  const end = Date.now();
  const latency = end - start;
  await respond({
    text: `JASB is up :j-pixl:\nRecorded Latency:${latency}ms`
  });
});

app.command("/jasb-help", async ({command,ack,respond}) =>{
  await ack();
  await respond({
    text:`JASB or Just Another Slackbot, an AI workflow by <@U0AE3R4FR3R>, *A work in progress*\nCurrent Command List-
    1. /jasb-ping : Pings the bot for it's latency.
    2. /jasb-joke : Fetches a Joke.
    3. /jasb-help : The help command for JASB slackbot`
  })
});

app.command("/jasb-joke", async ({command,ack,respond}) =>{
  await ack();
  try {
    const joke = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text: `**${joke.data.setup}**\n\n${joke.data.punchline}`
    });
  }
  catch(err) {
    await respond ({
      text: `Imagine getting ghosted by a "joke" api :skulk:`
    })
  }
});

app.command("/jasb-user_info", async({command,ack,respond, client}) => {
  await ack();
  try {
    const triggered = await client.users.info({
      user : command.user_id
    });
    const user = triggered.user;
    const tz = user.tz ?? "Not Set!";
    const email = user.profile?.email ?? "Not Provided :>";
    const username = user.name;
    const userid = user.id;

    await respond({
      text: `User information for <@${userid}> is:\nTimezone : ${tz}\nSlack_Email : ${email}\nUsername : ${username}\nUser_ID : ${userid}`
    });
  }
  catch(err) {
    console.error(err);
    await respond ({text: `Failed to steal your data :(`});
  }
});

(async() => {
  await app.start();
  console.log("Bot is running!");
})();