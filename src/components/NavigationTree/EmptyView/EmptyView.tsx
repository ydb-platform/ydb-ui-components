import React from 'react';
import block from 'bem-cn-lite';

import {TreeView} from '../../TreeView/TreeView';

import './EmptyView.scss';

const b = block('ydb-navigation-tree-view-empty');

export function EmptyView() {
    return <TreeView name={<span className={b()}>Нет данных</span>} />;
}
