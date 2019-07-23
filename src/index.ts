require('dotenv').config();
const { App } = require('@slack/bolt');
import { dakoku } from './dakoku';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});
app.command('/出勤', async ({ ack, say }: any) => {
  ack();
  dakoku('clockin');
  say('出勤したかも');
});
app.command('/退勤', async ({ ack, say }: any) => {
  ack();
  dakoku('clockout');
  say('退勤したかも');
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
