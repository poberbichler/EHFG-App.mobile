import {PipeTransform, Pipe} from "@angular/core";
import {DatePipe} from "@angular/common";

@Pipe({name: 'twitterTimestamp'})
export class TwitterTimestampPipe implements PipeTransform {
  readonly second: number = 1000;
  readonly minute: number = 1000 * 60;
  readonly hour: number = this.minute * 60;
  readonly day: number = this.hour * 24;

  transform(input: number, args: string[]): any {
    let difference: number = input - new Date().getUTCMilliseconds();
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

    return new DatePipe('de-DE').transform(input, 'MMM d, HH:mm');
  }
}
