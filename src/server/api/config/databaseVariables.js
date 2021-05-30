const config = {
	development: {
		dialect: 'sqlite',
		storage: './server/db/inova.sqlite3',
	},
	test: {
		dialect: 'sqlite',
		storage: ':memory',
	},
	production: {
		dialect: 'sqlite',
		storage: './server/db/inova.sqlite3',
	},
};

export default config;
