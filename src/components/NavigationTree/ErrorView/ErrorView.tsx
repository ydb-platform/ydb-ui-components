import React from 'react';
import block from 'bem-cn-lite';

import {TreeView} from '../../TreeView/TreeView';

import './ErrorView.scss';

const b = block('ydb-navigation-tree-view-error');

export function ErrorView() {
    return <TreeView name={<span className={b()}>Ошибка</span>} />;
}
