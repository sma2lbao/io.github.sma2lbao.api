import apollo from './namespace/apollo.config';
import database from './namespace/database.config';
import github from './namespace/github.config';
import global from './namespace/global.config';
import mail from './namespace/mail.config';
import oss from './namespace/oss.config';

export const configs = [apollo, database, github, global, mail, oss];
export { default as schemas } from './schemas';
