import {Pipe,PipeTransform} from '@angular/core';


@Pipe({
	name:'findPipe'
})

export class findPipeFilter implements PipeTransform{

	transform(items: any[],filterBy: string): any[]{
		filterBy = filterBy?filterBy.toLowerCase():null;
		return filterBy?items.filter((item:any) => item.title.toLowerCase().indexOf(filterBy.toLowerCase())!=-1):items;
	}
}