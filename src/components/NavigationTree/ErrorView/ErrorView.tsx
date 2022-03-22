import React from 'react';
import block from 'bem-cn-lite';

import i18n from '../i18n';
import {TreeView} from '../../TreeView/TreeView';

import './ErrorView.scss';

const b = block('ydb-navigation-tree-view-error');

export function ErrorView() {
    return <TreeView name={<span className={b()}>{i18n('label_error')}</span>} />;
}
