const mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Serigne1*"
});

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Serigne1*",
  database: "Groupomania"
});


const schema = 'CREATE DATABASE Groupomania';

function runQuery(query){
     return new Promise((resolve, reject) => {
        try {
            db.query(query, function (err, result) {
                if (err) throw err;
                resolve(true);
            });
        } catch (err) {
            reject(err);
        }
    });
}

const runCreationDB = () => {
    const cycle = async () => {
        const createDB = () => {
            return new Promise((resolve, reject) => {
                try {
                    con.connect(function (err) {
                        if (err) throw err;
                        console.log("Connecté au serveur MySQL");
                        con.query(schema, function (err, result) {
                            if (err) throw err;
                            console.log('Groupomania database créé');
                            resolve(true);
                        });
                    });
                } catch (err) {
                    reject(err);
                }
            });
        };
        await createDB();
        /*
        db.connect(async function (err) {
            if (err) throw err;
            try {
                const post = await runQuery(postTable);
                console.log("Tableau posts créé");
                process.exit();
            } catch (err) {
                console.log("ERROR =>", err);
            }
        });*/
    };
    cycle();
};

runCreationDB();