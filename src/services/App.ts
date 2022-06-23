import {EventNotifyService} from 'src/services/EventNotifyService';

export class App {
  eventNotifyService: EventNotifyService = new EventNotifyService();
}

export const app: App = new App();
