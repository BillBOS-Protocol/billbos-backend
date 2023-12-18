import { ViewRecord } from './viewRecord.entity';
export declare class Ad {
    id: number;
    ad_id: string;
    chain_id: string;
    viewRecord: ViewRecord[];
    createdAt: Date;
    updatedAt: Date;
}
