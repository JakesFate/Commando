const ArgumentType = require("./base");

class DurationArgumentType extends ArgumentType {
	constructor(client) {
		super(client, "duration");
	}

	validate(val, msg, arg) {
		if (val.includes(".")) return false;
		// No decimals allowed!!!

		const millis = timeStrToMillis(val);
		if (millis > Number.MAX_SAFE_INTEGER || millis < 1000) {
			arg.error = "Time must be greater than or equal to 1 seconds.";
			return false;
		}

		return val
			.split(" ")
			.reduce(
				(acc, timePart) => acc && !!timePart.match(/\d+(?=y|mo|w|d|h|m|s)/i),
				true
			);
	}

	parse(val) {
		return timeStrToMillis(val);
	}
}

function timeStrToMillis(str) {
	const years = +str.match(/\d+(?=y)/i);
	const months = +str.match(/\d+(?=mo)/i);
	const weeks = +str.match(/\d+(?=w)/i);
	const days = +str.match(/\d+(?=d)/i);
	const hours = +str.match(/\d+(?=h)/i);
	const minutes = +str.match(/\d+(?=m)/i);
	const seconds = +str.match(/\d+(?=s)/i);

	const millis =
		years * 365 * 24 * 60 * 60 * 1000 +
		months * 30 * 24 * 60 * 60 * 1000 +
		weeks * 7 * 24 * 60 * 60 * 1000 +
		days * 24 * 60 * 60 * 1000 +
		hours * 60 * 60 * 1000 +
		minutes * 60 * 1000 +
		seconds * 1000;

	return millis;
}

module.exports = DurationArgumentType;
