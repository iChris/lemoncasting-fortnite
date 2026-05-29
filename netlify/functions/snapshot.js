const { schedule } = require("@netlify/functions");

const BASE = "https://fortnite-api.com/v2";
const NAME = "Lemoncasting";

async function fetchStats() {
  const encoded = encodeURIComponent(NAME);
  const headers = { Authorization: process.env.FORTNITE_API_KEY };
  const [lifetimeRes, seasonRes] = await Promise.all([
    fetch(`${BASE}/stats/br/v2?name=${encoded}&accountType=epic&timeWindow=lifetime&image=none`, { headers }),
    fetch(`${BASE}/stats/br/v2?name=${encoded}&accountType=epic&timeWindow=season&image=none`, { headers }),
  ]);
  const [lifetime, season] = await Promise.all([lifetimeRes.json(), seasonRes.json()]);
  return { lifetime, season };
}

async function saveSnapshot(period, data) {
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/stats_snapshots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ period, data }),
  });
  if (!res.ok) throw new Error(`Supabase insert failed: ${res.status}`);
}

// Scheduled function — runs @weekly automatically
exports.handler = schedule("@weekly", async () => {
  const now = new Date();
  const periods = ["weekly"];
  if (now.getDate() === 1) periods.push("monthly");
  if (now.getMonth() === 0 && now.getDate() === 1) periods.push("yearly");

  const data = await fetchStats();
  await Promise.all(periods.map((p) => saveSnapshot(p, data)));
  console.log(`Saved snapshot(s): ${periods.join(", ")}`);
  return { statusCode: 200 };
});

module.exports.fetchStats = fetchStats;
module.exports.saveSnapshot = saveSnapshot;
