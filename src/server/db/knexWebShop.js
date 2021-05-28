import knex from 'knex'

//database configuration
const dbConfig =  {
  client: 'sqlite3',
  connection: {
    filename: './src/server/db/inova.sqlite3'
  },
  useNullAsDefault: true
};


//init en export
const knexWebShop = knex(dbConfig);
export default knexWebShop;