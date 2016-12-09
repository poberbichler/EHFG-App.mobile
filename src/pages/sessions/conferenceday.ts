export class ConferenceDay {
  description: string;
  sessions: Session[];
}

export class Session {
  id: string;
  name: string;
  description: string;
  startTime: number;
  endTime: number;
  location: string;
  code: string;
  speakerIds: string[];
}
