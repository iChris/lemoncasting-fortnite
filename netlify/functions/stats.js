exports.handler = async function (event) {
  const BASE = "https://fortnite-api.com/v2";
  const NAME = "Lemoncasting";
  const encoded = encodeURIComponent(NAME);

  try {
    const headers = { Authorization: process.env.FORTNITE_API_KEY };
    const [statsRes, historyRes] = await Promise.all([
      fetch(`${BASE}/stats/br/v2?name=${encoded}&accountType=epic&timeWindow=lifetime&image=none`, { headers }),
      fetch(`${BASE}/stats/br/v2?name=${encoded}&accountType=epic&timeWindow=season&image=none`, { headers }),
    ]);

    const [statsData, seasonData] = await Promise.all([
      statsRes.json(),
      historyRes.json(),
    ]);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ lifetime: statsData, season: seasonData }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
