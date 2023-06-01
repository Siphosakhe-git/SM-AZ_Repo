const {createPool} = require("mysql");

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cmt'
})

const get_all_users = (request, response) => {

    const sqlQuery1 = "SELECT * FROM user;"

    pool.query(sqlQuery1, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            let all_users_data = JSON.parse(JSON.stringify(result));

            response.json(all_users_data);
        }
    })
}

module.exports = {
    get_all_users
}