export interface FilterState {
    ids: number[];
    names: string[];
    states: {
        passed: boolean;
        failed: boolean;
    };
}
