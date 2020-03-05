import { PO } from './PO.model';

export interface CO{
    Course_Outcome:string;
    Cognitive_Level:string;
    No_of_hours:string; //Strength
    CO_Target:number;
    Bloom_Level:Array<string>;
    // PO_map:Array<PO>;
    PO_map:Array<string>;
    CO_Assessment:Array<string>;
    PI_map:Array<string>;
    ISE1:number;        //marks obtainable
    ISE2:number;
    ISE3:number;
    ISE4:number;
    MSE:number;
    ESE:number;

    ISE1A:number;   //marks attained
    ISE2A:number;

    ISEAvg:number;
    ISEA:number;
    MSEA:number;
    ESEA:number;
    CSA:number;
    Total_Attainment:number;

    Action:boolean;
    Action_plan:string;
    Modification_plan:string;

    p:number;    //max possible % obtainable in a CO
    obt:number;  //obtained % value in a CO
    dv:number;  //direct attainment value
    course_exit:Array<number>;
}
