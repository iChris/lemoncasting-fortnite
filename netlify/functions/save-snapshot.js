const { fetchStats, saveSnapshot } = require("./snapshot");

// Manual HTTP trigger for saving a snapshot
exports.handler = async function () {
  const data = await fetchStats();
  await saveSnapshot("weekly", data);
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ saved: ["weekly"] }),
  };
};
