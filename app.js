const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Slim op sollicitatie')
})

app.listen(port, () => console.log('Currently listening on port ' + port))