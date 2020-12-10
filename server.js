const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();

const PORT = process.env.PORT || 3000;

app.get(`/`, (req,res,next) => {
    res.send('Test router');
})

app.listen(PORT, () => {
    console.log(`Example app is listening on port http://localhost:${PORT}`);
})