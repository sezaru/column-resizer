type Coordinate = {
    x: number;
    y: number;
};
declare enum ItemType {
    BAR = "BAR",
    SECTION = "SECTION"
}
type Trend = -1 | 0 | 1;
declare enum BarActionType {
    ACTIVATE = "activate",
    MOVE = "move",
    DEACTIVATE = "deactivate"
}
type BarAction = {
    type: BarActionType;
    coordinate: Coordinate;
    barIndex: number;
};
type SizeInfo = {
    elm: HTMLElement;
    isSolid: boolean;
    currentSize: number;
    maxSize?: number;
    minSize?: number;
    disableResponsive?: boolean;
};
type SizeRelatedInfo = {
    discard?: boolean;
    sizeInfoArray: SizeInfo[];
    flexGrowRatio: number;
};
type ColumnResizerEventMap = {
    'bar:click': null;
    'bar:status-change': {
        isActive: boolean;
    };
    'section:size-change': {
        size: number;
    };
    'column:activate': null;
    'column:after-resizing': null;
};

interface BarActionScanResult extends SizeRelatedInfo {
    barIndex: number;
    offset: number;
    type: BarActionType;
    originalCoordinate: Coordinate;
    defaultSizeInfoArray: SizeInfo[];
}

type ColumnBarConfig = {
    size: number;
};

type ColumnSectionConfig = {
    size?: number;
    defaultSize?: number;
    maxSize?: number;
    minSize?: number;
    disableResponsive?: boolean;
};

type ResizeResult = SizeRelatedInfo | BarActionScanResult;
declare class Resizer {
    private resizeResult;
    private isDiscarded;
    constructor(resizeResult: ResizeResult);
    resizeSection(indexOfSection: number, config: {
        toSize: number;
        preferMoveLeftBar?: boolean;
    }): void;
    moveBar(indexOfBar: number, config: {
        withOffset: number;
    }): void;
    discard(): void;
    isSectionResized(indexOfSection: number): boolean;
    isBarActivated(indexOfBar: number): boolean;
    getSectionSize(indexOfSection: number): number;
    getResult(): SizeRelatedInfo;
    getTotalSize(): number;
    private getSize;
}

type ColumnResizerConfig = {
    vertical: boolean;
    beforeApplyResizer?: (resizer: Resizer) => void;
};
declare class ColumnResizer {
    readonly config: Readonly<ColumnResizerConfig>;
    styles: {
        container: <T>(style?: T) => {
            readonly display: "flex";
        };
        section: <T>(config: ColumnSectionConfig, style?: T) => {};
        bar: <T>(config: ColumnBarConfig, style?: T) => {
            flex: string;
        };
    };
    attributes: {
        bar: (config: unknown) => {
            'data-item-type': ItemType;
            'data-item-config': string;
        };
        section: (config: unknown) => {
            'data-item-type': ItemType;
            'data-item-config': string;
        };
    };
    private itemsCache;
    private eventHub;
    private container;
    private barStore;
    private get axis();
    private get dimension();
    private get direction();
    get on(): <E extends Element, K extends keyof ColumnResizerEventMap>(elm: E | null, key: K, callback: (event: CustomEvent<ColumnResizerEventMap[K]>) => void) => () => void;
    constructor(config: Readonly<ColumnResizerConfig>);
    init(container: HTMLElement | null): void;
    dispose(): void;
    getResizer(): Resizer;
    applyResizer(resizer: Resizer): void;
    private dispatchBarAction;
    private sizeRelatedInfoChange;
    private monitorBarStatusChanges;
    private makeSizeInfos;
    private initStyles;
}

export { type BarAction, BarActionType, type ColumnBarConfig, ColumnResizer, type ColumnResizerConfig, type ColumnResizerEventMap, type ColumnSectionConfig, type Coordinate, ItemType, Resizer, type SizeInfo, type SizeRelatedInfo, type Trend };
