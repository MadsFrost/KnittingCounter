export interface KnitCounter {
    id: number;
    name: string;
    cycle: number;
    minCycle: number;
    maxCycle: number;
    image?: string;
}


export interface KnitProject {
    id: number;
    name: string;
    date: string;
    knitCounters: KnitCounter[];
    image?: string;
    description?: string;
}