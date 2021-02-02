const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())
app.use('/dist', express.static(path.join(__dirname, '../dist')));


app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
  });

app.listen(3000, () => console.log("listening on port 3000"))