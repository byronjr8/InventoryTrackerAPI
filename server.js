
const db = require('./db.js');
const api = require('./api.js');
app= api(db);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));