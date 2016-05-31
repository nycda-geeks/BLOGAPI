var pg = require('pg')
var connectionString = process.env.DATABASE_URL || 'postgres://maartje:hartje123@192.168.99.100:32769/blogapp'

var client = new pg.Client(connectionString) 
client.connect()
var query = client.query('CREATE TABLE blog (user_id SERIAL PRIMARY KEY, user_name VARCHAR(40) not null, user_pass VARCHAR(40) not null, post_title VARCHAR(40) not null, post_cont VARCHAR(40) not null)')
query.on('end', function(){ client.end() })
