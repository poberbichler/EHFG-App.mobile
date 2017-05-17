import {Pipe, PipeTransform} from "@angular/core";
import {UtcTimeService} from "../../service/time.service";
import {DatePipe} from "@angular/common";

@Pipe({name: 'utcDate'})
export class UtcDatePipe implements PipeTransform {
  constructor(private utcTimeService: UtcTimeService) { }

  transform(value: any, ...args: any[]): any {
    return new DatePipe('de-DE').transform(this.utcTimeService.getUtcTimeFor(value), args[0]);
  }
}
