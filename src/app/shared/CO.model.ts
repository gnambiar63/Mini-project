import { PO } from './PO.model';

export interface CO{
    Course_Outcome:string;
    Cognitive_Level:string;
    No_of_hours:string;
    // PO_map:Array<PO>;
    PO_map:Array<string>;
    ISE1:Array<number>;
    ISE2:Array<number>;
    MSE:Array<number>;
    ESE:Array<number>;
}
