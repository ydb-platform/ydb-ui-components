import React from 'react';
import block from 'bem-cn-lite';
import {Spin} from '@yandex-cloud/uikit';

import {TreeView} from '../../TreeView/TreeView';

import './LoaderView.scss';

interface LoaderViewProps {
    level?: number;
}

const b = block('ydb-navigation-tree-view-loader');

export function LoaderView({level}: LoaderViewProps) {
    return (
        <TreeView
            name={
                <div className={b()}>
                    <Spin size="xs" />
                </div>
            }
            level={level}
        />
    );
}
