const express = require("express");
const app = express();

app.use(express.json());

app.post("/api/sign_up", (req, res) => {
    console.log("POST body:", req.body);
    res.send("POST received");
});

app.listen(5000, () => console.log("Server running on port 5000"));
