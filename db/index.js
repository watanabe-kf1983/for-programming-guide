const pg = require("pg")

const pool = new pg.Pool({
    database: 'mydb',
    user: 'watanabe',
    password: 'pass',
    max: 10
})

async function query(text, params) {
    return await pool.query(text, params)
}

module.exports = { query: query };