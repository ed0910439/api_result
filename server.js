// server.js
const express = require("express"); // 改這裡

const app = express();

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxxxx/exec";

app.get("/proxy", async (req, res) => {
  try {
    const targetUrl = GOOGLE_SCRIPT_URL + "?" + new URLSearchParams(req.query);

    console.log("Proxying request to:", targetUrl);

    const response = await fetch(targetUrl);
    const data = await response.text();

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Content-Type", "application/json");

    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ code: 500, message: "Proxy error" });
  }
});

app.listen(3000, () => console.log("Proxy server running on http://localhost:3000"));
