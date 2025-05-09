require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Statische Dateien aus /public bereitstellen
app.use(express.static(path.join(__dirname, "public")));

// API: Kahoot-Link aus .env
app.get("/api/kahoot-url", (req, res) => {
  const url = process.env.KAHOOT_URL;
  if (!url) {
    return res.status(500).send("KAHOOT_URL fehlt in .env");
  }
  res.send(url);
});

// API: Buttons aus .env laden
app.get("/api/buttons", (req, res) => {
  const buttons = Object.entries(process.env)
    .filter(([key]) => key.startsWith("BUTTON_"))
    .map(([_, value]) => {
      const parts = value.split(",");
      const text = (parts[0] || "").trim();
      const href = (parts[1] || "").trim();
      return { text, href };
    });

  res.json(buttons);
});

// Index (Startseite)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/poster", (req, res) => {
  const url = process.env.POSTER_URL;
  if (!url) return res.status(404).send("POSTER_URL nicht gesetzt.");
  res.json({ url });
});


// Server starten
app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});
