const db = require('../db');

async function family() {
    result = await db.query('SELECT full_name, age FROM isono_family');
    return result.rows
}

module.exports = family;
