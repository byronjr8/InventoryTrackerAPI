
const db = require('./db');
const api = require('./api');

app= api(db);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));