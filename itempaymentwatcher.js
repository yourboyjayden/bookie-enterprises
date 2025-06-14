const axios = require('axios');
const client = require('./index.js');

const TORN_API_KEY = '3WCLYsxtRMhsQeLk';
const YOUR_TORN_ID = 3218330;
const WATCHED_MESSAGE = 'Bookie Enterprises Payment';
const CHECK_INTERVAL = 60 * 1000; // 1 minute

// Store the most recent log ID to avoid double-processing
let lastSeenLogId = null;

async function checkLogs() {
  try {
    const res = await axios.get(`https://api.torn.com/user/?selections=log&key=${TORN_API_KEY}`);
    const logs = res.data?.log?.items;

    if (!logs) return;

    const logEntries = Object.entries(logs).reverse(); // newest first

    for (const [logId, entry] of logEntries) {
      if (lastSeenLogId && parseInt(logId) <= lastSeenLogId) continue;

      if (
        entry?.type === 'item_send' &&
        entry?.data?.to_id === YOUR_TORN_ID &&
        entry?.data?.message?.trim() === WATCHED_MESSAGE
      ) {
        const senderName = entry.data?.from_name;
        console.log(`[MATCH] ${senderName} sent item(s) with valid message.`);

        const guild = client.guilds.cache.first(); // Get your single server
        if (!guild) return console.log('❌ Bot is not in any guild.');

        try {
          await guild.members.fetch(); // Load all members
          const member = guild.members.cache.find(m => {
            if (!m.nickname) return false;
            return m.nickname.startsWith(senderName + ' [');
          });

          if (member) {
            const role = guild.roles.cache.find(r => r.name === 'Bookie+');
            if (role && !member.roles.cache.has(role.id)) {
              await member.roles.add(role);
              console.log(`✅ Role 'Bookie+' assigned to ${member.nickname}`);
            } else if (!role) {
              console.log(`⚠️ Role 'Bookie+' not found in the guild`);
            } else {
              console.log(`ℹ️ ${member.nickname} already has the 'Bookie+' role`);
            }
          } else {
            console.log(`❌ No matching Discord member found for Torn name: ${senderName}`);
          }
        } catch (err) {
          console.error(`Error processing guild:`, err.message);
        }
      }

      lastSeenLogId = parseInt(logId);
    }
  } catch (err) {
    console.error('Error fetching logs:', err.message);
  }
}

// Run check on an interval
setInterval(checkLogs, CHECK_INTERVAL);
