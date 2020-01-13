import { PO } from './PO.model';

export interface CO{
    Course_Outcome:string;
    Cognitive_Level:string;
    No_of_hours:string;
    // PO_map:Array<PO>;
    PO_map:Array<string>;
    ISE1:number;        //marks obtainable
    ISE2:number;
    MSE:number;
    ESE:number;

    ISE1A:number;   //marks attained
    ISE2A:number;
    MSEA:number;
    ESEA:number;

    p:number;    //max possible % obtainable in a CO
    obt:number;  //obtained % value in a CO
    dv:number;  //direct attainment value
    course_exit:Array<number>;
}
