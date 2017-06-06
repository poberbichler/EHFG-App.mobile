import {Injectable} from "@angular/core";

@Injectable()
export class UtcTimeService {
  get currentTime(): Date {
    let result = this.getUtcTimeForDate(new Date());
    result.setHours(result.getHours() + 2)
    return result;
  }

  getUtcTimeFor(input: number): Date {
    return this.getUtcTimeForDate(new Date(input));
  }

  getUtcTimeForDate(input: Date): Date {
    input.setMinutes(input.getMinutes() + input.getTimezoneOffset());
    return input;
  }
}
