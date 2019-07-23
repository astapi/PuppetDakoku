require('dotenv').config();
const { App } = require('@slack/bolt');
import { dakoku } from './dakoku';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});
app.message('出勤', async ({ say }: any) => {
  await dakoku('clockin');
  say('出勤したかも');
});
app.message('退勤', async ({ say }: any) => {
  await dakoku('clockout');
  say('退勤したかも');
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
