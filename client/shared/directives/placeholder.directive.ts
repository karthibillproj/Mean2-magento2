import {Directive,Input} from "@angular/core"; 

@Directive({
  selector: '[imagePlaceholder]',
  host: {
    '(error)':'updateUrl()',
    '[src]':'src'
   }
})
export class DefaultImage {
  @Input() src:string;
  @Input() default:string = "../public/images/magento_icon.jpg";

  updateUrl() {
    this.src = this.default;

  }
}