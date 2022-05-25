import {i18n} from '../../i18n';
import en from './en.json';
import ru from './ru.json';

const COMPONENT = 'ydb-navigation-tree';

i18n.registerKeyset('en', COMPONENT, en);
i18n.registerKeyset('ru', COMPONENT, ru);

export default i18n.keyset(COMPONENT);
