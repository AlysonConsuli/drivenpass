import app from "./app.js";
import "./config/setup.js";

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server is running on: http://localhost:${port}`)
);
