import React from 'react';
import block from 'bem-cn-lite';
import ReactTreeView from 'react-treeview';
import {DropdownMenu, DropdownMenuItemMixed} from '@gravity-ui/uikit';

import './TreeView.scss';

export interface TreeViewProps {
    children?: React.ReactNode;
    name: React.ReactNode;
    title?: string;
    icon?: React.ReactNode;
    collapsed?: boolean;
    active?: boolean;
    onClick?: () => void;
    onArrowClick?: () => void;
    hasArrow?: boolean;
    actions?: DropdownMenuItemMixed<any>[];
    options?: JSX.Element;
    level?: number;
}

const TREE_LEVEL_CSS_VAR = '--ydb-tree-view-level';

const b = block('ydb-tree-view');

export function TreeView({
    children,
    name,
    title,
    icon,
    collapsed = true,
    active = false,
    onClick,
    onArrowClick,
    hasArrow = false,
    actions,
    options,
    level,
}: TreeViewProps) {
    const rootRef = React.useRef<HTMLDivElement>(null);

    const nodeLabel = (
        <div className={b('content')}>
            {icon && <div className={b('icon')}>{icon}</div>}
            <div className={b('text')} title={title}>
                {name}
            </div>
            {actions && actions.length > 0 && (
                <div className={b('actions')}>
                    {options}
                    <DropdownMenu
                        defaultSwitcherProps={{
                            view: 'flat-secondary',
                            size: 's',
                            pin: 'brick-brick',
                        }}
                        items={actions}
                    />
                </div>
            )}
        </div>
    );

    React.useEffect(() => {
        const rootEl = rootRef.current;
        const itemEl = rootEl && rootEl.querySelector<HTMLDivElement>(`.${b('item')}`);

        if (!onClick || !itemEl) {
            return;
        }

        const skipClicksSelector = `.tree-view_arrow, .${b('actions')}`;

        function handleClick(event: MouseEvent) {
            const path = event
                .composedPath()
                .filter((item) => (item as Node).nodeType === Node.ELEMENT_NODE) as Element[];
            const hasSkipped = path.some((el) => el.matches(skipClicksSelector));

            if (!hasSkipped) {
                onClick!();
            }
        }

        itemEl.addEventListener('click', handleClick);

        return () => {
            itemEl.removeEventListener('click', handleClick);
        };
    }, [onClick]);

    return (
        <div
            ref={rootRef}
            className={b({'no-arrow': !hasArrow})}
            style={{[TREE_LEVEL_CSS_VAR]: level} as React.CSSProperties}
        >
            <ReactTreeView
                collapsed={collapsed}
                itemClassName={b('item', {active})}
                nodeLabel={nodeLabel}
                onClick={onArrowClick}
            >
                {children}
            </ReactTreeView>
        </div>
    );
}
