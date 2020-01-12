import { PO } from './PO.model';

export interface CO{
    Course_Outcome:string;
    Cognitive_Level:string;
    No_of_hours:string;
    // PO_map:Array<PO>;
    PO_map:Array<string>;
    ISE1:number;
    ISE2:number;
    MSE:number;
    ESE:number;

    ISE1A:number;
    ISE2A:number;
    MSEA:number;
    ESEA:number;

    p:number;
    dv:number;
    course_exit:Array<number>;
}
