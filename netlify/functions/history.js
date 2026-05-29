exports.handler = async function () {
  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/stats_snapshots?select=id,captured_at,period,data&order=captured_at.desc&limit=100`,
    {
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
    }
  );

  if (!res.ok) {
    return { statusCode: res.status, body: JSON.stringify({ error: "Failed to fetch history" }) };
  }

  const rows = await res.json();
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(rows),
  };
};
