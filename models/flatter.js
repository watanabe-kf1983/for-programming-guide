const db = require('../db');

async function flatter(flatteree, flatterer) {

    const praise_words = ['素敵', 'スマート', 'オシャレ'];
    const flatter_words = [];

    for (word of praise_words) {
        flatter_words.push(`${flatteree}さんは${word}ですね`);
    }

    praise_words.forEach(word => {
        flatter_words.push(`${flatteree}さんは本当に${word}ですね`);
    });

    for (let i = 0; i < praise_words.length; i++) {
        flatter_words.push(`${flatteree}さんはつくづく${praise_words[i]}ですね`);
    }
    if (flatterer) {
        await push_history(flatteree, flatterer);
    }

    return { flatteree: { name: flatteree }, words: flatter_words };
}

async function push_history(flatteree, flatterer) {
    const client = await db.getClient();
    try {
        await client.query('BEGIN');
        await client.query(
            'INSERT INTO flatter_history VALUES ($1, $2, now())',
            [flatterer, flatteree]
        );
        await client.query('COMMIT');

    } catch (e) {
        await client.query('ROLLBACK');
        throw e;

    } finally {
        client.release();
    }
}

async function getFlatterers(flatteree) {
    result = await db.query(`SELECT DISTINCT flatterer 
                            FROM flatter_history 
                            WHERE flatteree = $1`, [flatteree]);
    return result.rows.map(row => row.flatterer);
}

async function getFlatterees(flatterer) {
    result = await db.query(`SELECT DISTINCT flatteree 
                            FROM flatter_history 
                            WHERE flatterer = $1`, [flatterer]);
    return result.rows.map(row => row.flatteree);
}


module.exports = {
    flatter: flatter,
    getFlatterees: getFlatterees,
    getFlatterers: getFlatterers
};
