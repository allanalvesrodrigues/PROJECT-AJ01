const express = require("express");

const app = express();

app.use(express.json());

// rota de teste
app.get("/", (req, res) => {
  res.send("Servidor rodando 🚀");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});