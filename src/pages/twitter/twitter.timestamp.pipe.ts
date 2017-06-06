import {PipeTransform, Pipe} from "@angular/core";
import {DatePipe} from "@angular/common";
import {UtcTimeService} from "../../service/time.service";

@Pipe({name: 'twitterTimestamp'})
export class TwitterTimestampPipe implements PipeTransform {
  readonly second: number = 1000;
  readonly minute: number = 1000 * 60;
  readonly hour: number = this.minute * 60;
  readonly day: number = this.hour * 24;

  constructor(private utcTimeService: UtcTimeService) { }

  transform(input: number, args: string[]): any {
    let difference: number = this.utcTimeService.currentTime.getTime() - this.utcTimeService.getUtcTimeFor(input).getTime();
    if (difference < this.day) {
      if (difference < this.minute) {
        let value = (difference / this.second).toFixed(0);
        return "" + value + "s";
      }

      if (difference < this.hour) {
        let value = (difference / this.minute).toFixed(0);
        return "" + value + "m";

      }

      let value = (difference / this.hour).toFixed(0);
      return "" + value + "h";
    }

    return new DatePipe('de-DE').transform(this.utcTimeService.getUtcTimeFor(input), 'MMM d, HH:mm');
  }
}
