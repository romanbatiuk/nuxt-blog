const moment = require('moment');
// moment.locale('uk');
export default (value, type) => {
	if (type === 'date') {
		return moment(value).format('LL');
	} else if (type === 'time') {
		return moment().format('LTS');
	}
	return moment(value).format('LLL');
};
