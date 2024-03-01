import {block} from '../../../utils/cn';
import {TreeView} from '../../TreeView/TreeView';
import i18n from '../i18n';

import './EmptyView.scss';

interface EmptyViewProps {
    level?: number;
}

const b = block('ydb-navigation-tree-view-empty');

export function EmptyView({level}: EmptyViewProps) {
    return <TreeView name={<span className={b()}>{i18n('label_empty')}</span>} level={level} />;
}
