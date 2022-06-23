import {computed} from 'vue';
import moment from 'moment-timezone';
export const useFormattingDateTime  = (event: {date: string, dateTimeFrom: string, dateTimeTo: string}, withWeekDay: boolean) => {
  const eventFormat = computed(() => withWeekDay ? 'dddd, MMMM D, YYYY' : 'MMMM D, YYYY');
  const eventDate = computed(() => moment(event.dateTimeFrom).format(eventFormat.value));
  const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const eventDateTimeFrom = computed(() => {
    if (!event.dateTimeFrom) return null;
    return moment(event.dateTimeFrom).minute() === 0 ? moment(event.dateTimeFrom).format('ha') : moment(event.dateTimeFrom).format('h:mma')
  })
  const eventDateTimeTo = computed(() => {
    if (!event.dateTimeTo) return null;
    return moment(event.dateTimeTo).minute() === 0 ? moment(event.dateTimeTo).format('ha') : moment(event.dateTimeTo).format('h:mma')
  })

  const eventFormattedTimezone = computed(() => {
    if (['America/Los_Angeles', 'America/Vancouver', 'America/Tijuana'].includes(currentTimezone)) {
      return 'Pacific Time';
    }

    if (['America/Boise', 'America/Cambridge_Bay', 'America/Chihuahua', 'America/Creston', 'America/Dawson',
      'America/Dawson_Creek', 'America/Denver', 'America/Edmonton', 'America/Fort_Nelson', 'America/Hermosillo',
      'America/Inuvik', 'America/Mazatlan', 'America/Ojinaga', 'America/Phoenix', 'America/Whitehorse',
      'America/Yellowknife'].includes(currentTimezone)) {
      return 'Mountain Time';
    }

    if (['America/Atikokan', 'America/Cancun', 'America/Cayman', 'America/Detroit', 'America/Grand_Turk', 'America/Indiana/Indianapolis',
      'America/Indiana/Marengo', 'America/Indiana/Petersburg', 'America/Indiana/Vevay', 'America/Indiana/Vincennes',
      'America/Indiana/Winamac', 'America/Iqaluit', 'America/Jamaica', 'America/Kentucky/Louisville', 'America/Kentucky/Monticello',
      'America/Nassau', 'America/New_York', 'America/Nipigon', 'America/Panama', 'America/Pangnirtung', 'America/Port-au-Prince',
      'America/Santo_Domingo', 'America/Thunder_Bay',	'America/Toronto'].includes(currentTimezone)) {
      return 'Eastern Time';
    }

    const tzSplit = (currentTimezone || '').split('/', 2);
    const cityName = tzSplit.length >= 2 ? tzSplit[1].replace('_', '') : currentTimezone;
    return `${cityName} Time`;
  })

  return {
    eventDate,
    eventDateTimeFrom,
    eventDateTimeTo,
    eventFormattedTimezone,
    currentTimezone,
  }
}
