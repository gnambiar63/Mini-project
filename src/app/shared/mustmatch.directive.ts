import { Validators, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import{ Input,Directive } from '@angular/core';

@Directive({
    selector : '[passmatch]',
    providers:[{
        provide:NG_VALIDATORS,
        useExisting:MustMatchDirective,
        multi:true
    }]
})

export class MustMatchDirective implements Validators
{
    @Input() passmatch: string;
    validate(control: AbstractControl):{[key:string]:any} | null{
        const ControlToCompare =control.parent.get(this.passmatch)
        if(ControlToCompare && ControlToCompare.value!=control.value)
        {
            return { 'NotEqual' : true }
        }

        return null;
    }
}

