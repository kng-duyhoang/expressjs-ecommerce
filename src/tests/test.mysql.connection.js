const mysql = require('mysql2')

// Create pool
const pool = mysql.createPool({
    host: 'localhost',
    port: '8811',
    user: 'root',
    password: 'secret',
    database: 'test'
})

const batchSize = 100000;
const totalSize = 1_000_000;

let current_id = 1;
console.time('::::TIMER::::::')
const insertBatch = async () => {
    const values = [];
    for (let index = 0; index < batchSize && current_id <= totalSize; index++) {
        const name = `Name ${current_id}`;
        const age = current_id;
        const address =`Address ${current_id}`;
        values.push([current_id, name, age, address])
        current_id++;
        
    }
    if (!values.length) {
        pool.end( err => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Connect success`);
                
            }

        })
        return;
    }
    const sql = `INSERT INTO test_table (id, name, age, address) VALUES ?`

    pool.query(sql, [values], async (err, results) => {
        if(err) throw err;
        console.timeEnd()
        console.log(`Inserted ${results.affectedRows} records`);
        await insertBatch();
    })
}

insertBatch().catch(console.error)