const pgp = require('pg-promise')();
const db = pgp('postgres://eqadmin:Eque11a@flextra.dcs.flinders.edu.au:5432/flextra-dev');

db.one("select * from avails where avail_num = '251912'")
  .then(data => {
    console.log('topic code:', data.topic_code)
  })
  .catch(error => {
    console.log(error)
  })
