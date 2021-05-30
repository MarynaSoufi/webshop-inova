import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const databaseVariables = require('./databaseConfig.json');
import * as EnvironmentVariables from './environmentVariables.js';

export {
	databaseVariables,
	EnvironmentVariables,
};
