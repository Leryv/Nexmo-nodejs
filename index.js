import express from "express";
import "dotenv/config";
import { sendSms } from "./lib.js";

const PORT = process.env.PORT;
const { json, urlencoded } = express;

const app = express();

app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.post("/send", (req, res) => {
  const { phone, message } = req.body;
  sendSms(phone, message)
    .then((data) => res.json({ success: true, data }))
    .catch((err) => res.json({ success: false, message: err }));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
