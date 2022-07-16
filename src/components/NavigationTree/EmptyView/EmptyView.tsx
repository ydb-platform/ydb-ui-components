import React from 'react';
import block from 'bem-cn-lite';

import i18n from '../i18n';
import {TreeView} from '../../TreeView/TreeView';

import './EmptyView.scss';

interface EmptyViewProps {
    level?: number;
}

const b = block('ydb-navigation-tree-view-empty');

export function EmptyView({level}: EmptyViewProps) {
    return <TreeView name={<span className={b()}>{i18n('label_empty')}</span>} level={level} />;
}
