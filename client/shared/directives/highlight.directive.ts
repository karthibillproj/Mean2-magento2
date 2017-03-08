import {ElementRef,Directive,HostListener,HostBinding} from "@angular/core";

@Directive({
    selector:'[myhighlight]',
})

export class HighlightDirective{

    @HostBinding('class.active') someField: boolean = false;
    constructor(private el: ElementRef){

    }

   

     @HostListener('click') onClick(){
        this.someField=true;
    }
}