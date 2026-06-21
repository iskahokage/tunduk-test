export interface Candidate {
    id: string;
    name: string;
    position: string;
    pos_label: string;
    file: string;
    email: string;
    phone: string | null;
    city?: string;
    tg: string;
    exp: string[][];
    total_exp: string;
    stack: string;
    edu: string;
    verdict: string;
    vc: string;
    criteria: string[][];
    summary: string;
    questions: string[];
    status: string;
    createdAt: string;
}

export type SortField = 'name' | 'total_exp' | 'createdAt';
export type SortOrder = 'asc' | 'desc';
