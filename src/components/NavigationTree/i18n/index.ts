import {Lang} from '../../../utils';
import {i18n} from '../../i18n';

import en from './en.json';
import ru from './ru.json';

const COMPONENT = 'ydb-navigation-tree';

i18n.registerKeyset(Lang.En, COMPONENT, en);
i18n.registerKeyset(Lang.Ru, COMPONENT, ru);

export default i18n.keyset(COMPONENT);
