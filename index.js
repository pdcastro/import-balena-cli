#!/usr/bin/env node

class ExpectedError extends Error {};

async function ssh(uuid) {
	const { run } = require('balena-cli');
	const path = require('path');

	if (!uuid) {
		throw new ExpectedError('Please provide the device UUID as argument');
	}
	cmd = [
		process.argv[0],
		path.join(__dirname, 'node_modules', 'balena-cli', 'bin', 'balena'),
		'ssh',
		uuid,
	];
	console.error(`[debug] cmd=${JSON.stringify(cmd)}`);
	await run(cmd);
}

// Usage:
// $ node index.js <device-uuid>
//
async function main() {
	try {
		await ssh(process.argv[2]);
	} catch (e) {
		if (e instanceof ExpectedError) {
			console.error(e.message);
		} else {
			throw e;
		}
	}
}

main();
