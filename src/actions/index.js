import * as home from './home';
import * as user from './user';
import * as utils from './utils';
import * as message from './message';
import * as topic from './topic';


export default {
	...home,
	...user,
	...utils,
	...message,
	...topic
};


