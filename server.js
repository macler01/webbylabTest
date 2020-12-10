const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 3000;

const filmRouter = require(`./routes/filmsRouter`);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(async (req,res,next) => {
    console.log(`${req.method}: ${req.url}`);
    next();
})

app.use(`/films`, filmRouter);

app.listen(PORT, () => {
    console.log(`Example app is listening on port http://localhost:${PORT}`);
})