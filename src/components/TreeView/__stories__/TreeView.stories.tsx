import React from 'react';

import {Button} from '@gravity-ui/uikit';
import type {Meta, StoryObj} from '@storybook/react';

import {TreeView} from '../TreeView';

const meta: Meta<typeof TreeView> = {
    title: 'TreeView',
    component: TreeView,
};

export default meta;

type Story = StoryObj<typeof TreeView>;

const scrollContainerStyle: React.CSSProperties = {
    width: 360,
    height: 240,
    overflow: 'auto',
    border: '1px solid var(--g-color-line-generic)',
};

const scrollActionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: 8,
    marginBottom: 12,
};

export const Default: Story = {
    render: function Component() {
        const [state, setState] = React.useState<Record<string, boolean>>({'0': true});

        return (
            <div>
                <TreeView
                    name="Root"
                    hasArrow
                    collapsed={!state['0']}
                    actions={[{text: 'Show Directory', action: console.log}]}
                    additionalNodeElements={
                        <Button size="s" onClick={console.log}>
                            Make
                        </Button>
                    }
                    onClick={() =>
                        setState((current) => ({
                            ...current,
                            '0': !current['0'],
                        }))
                    }
                >
                    <TreeView
                        name="Folder 1"
                        active
                        hasArrow
                        collapsed={!state['1']}
                        onClick={() =>
                            setState((current) => ({
                                ...current,
                                '1': !current['1'],
                            }))
                        }
                    >
                        <TreeView
                            name="Item 1"
                            collapsed={!state['1-1']}
                            onClick={() =>
                                setState((current) => ({
                                    ...current,
                                    '1-1': !current['1-1'],
                                }))
                            }
                        />
                    </TreeView>
                    <TreeView
                        name="Item 2"
                        collapsed={!state['2']}
                        onClick={() =>
                            setState((current) => ({
                                ...current,
                                '2': !current['2'],
                            }))
                        }
                    />
                </TreeView>
            </div>
        );
    },
};

export const ScrollActiveIntoView: Story = {
    render: function Component() {
        const [activeIndex, setActiveIndex] = React.useState(60);
        const items = React.useMemo(() => Array.from({length: 80}, (_, index) => index + 1), []);
        const activeItemRef = React.useRef<HTMLDivElement>(null);

        React.useEffect(() => {
            activeItemRef.current?.scrollIntoView({block: 'nearest'});
        }, [activeIndex]);

        const handleScrollToSelected = React.useCallback(() => {
            activeItemRef.current?.scrollIntoView({block: 'center'});
        }, []);

        return (
            <React.Fragment>
                <div style={scrollActionsStyle}>
                    <Button size="s" onClick={() => setActiveIndex(5)}>
                        Select top item
                    </Button>
                    <Button size="s" onClick={() => setActiveIndex(40)}>
                        Select middle item
                    </Button>
                    <Button size="s" onClick={() => setActiveIndex(75)}>
                        Select bottom item
                    </Button>
                    <Button size="s" onClick={handleScrollToSelected}>
                        Scroll to selected
                    </Button>
                </div>
                <div style={scrollContainerStyle}>
                    {items.map((item) => (
                        <TreeView
                            key={item}
                            name={`Item ${item}`}
                            active={item === activeIndex}
                            onClick={() => setActiveIndex(item)}
                            itemRef={item === activeIndex ? activeItemRef : undefined}
                        />
                    ))}
                </div>
            </React.Fragment>
        );
    },
};
