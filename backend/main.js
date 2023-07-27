const express = require("express");
const bodyParser = require("body-parser");
const { getTokenBalances } = require("./alchemy");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Use JSON parser middlewarec
app.use(bodyParser.json());
app.use(cors());


app.post("/get-token-balances", async (req, res) => {
  try {
    const { address } = req.body;
    const tokenBalances = await getTokenBalances(address);

    res.json({ tokenBalances });
  } catch (error) {
    console.log("Error fetching token balances:", error);
    res.status(500).json({ error: "Error fetching token balances" });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
