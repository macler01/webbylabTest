const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const exphbs         = require('express-handlebars');
const PORT           = process.env.PORT || 3000;
const filmRouter     = require(`./routes/filmsRouter`);

// View
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
// Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Test Router
app.use(async (req,res,next) => {
    console.log(`${req.method}: ${req.url}`);
    next();
})
// Film Router
app.use(`/films`, filmRouter);

app.listen(PORT, () => {
    console.log(`Example app is listening on port http://localhost:${PORT}`);
})