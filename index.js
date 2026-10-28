require("dotenv").config();

const { act } = require("react");
const {App} = require("slack/bolt");
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
})

app.command("/jasb-ping",async ({command,ack,respond}) => {
  const start = Date.now();
  await ack();
  const end = Date.now();
  const latency = start-end;
  await respond({
    text: `JASB is up :j-pixl:\nRecorded Latency:${latency}ms`
  });
});

app.command("/jasb-help", async ({command,ack,respond}) =>{
  await ack();
  await respond({
    text:`JASB or Just Another Slackbot, an AI workflow by <@U0AE3R4FR3R>, *A work in progress* `
  })
})