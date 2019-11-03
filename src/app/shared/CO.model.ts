import { PO } from './PO.model';

export interface CO{
    Course_Outcome:string;
    Cognitive_Level:string;
    No_of_hours:number;
    PO_map:Array<PO>;
}
