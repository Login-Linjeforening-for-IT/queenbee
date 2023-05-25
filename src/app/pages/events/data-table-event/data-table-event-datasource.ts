import { BehaviorSubject } from 'rxjs';
import { BaseDataSource } from 'src/app/common/base-data-source';
import { compare } from 'src/app/common/utils';

import { EventService } from 'src/app/services/api/event.service';

// Interface for the data expected in an event.
export interface DataTableEventItem {
  id: number;
  name_no: string;
  name_en?: string;
  description_no?: string;
  description_en?: string;
  informational_no?: string;
  informational_en?: string;
  time_start: string;
  time_end: string;
  time_publish: string;
  time_signup_release: string;
  time_signup_deadline: string;
  time_updated: string;
  duration_type?: string;
  canceled: boolean;
  digital: boolean;
  capacity_reached?: boolean;
  image_small: string;
  image_banner: string;
  link_facebook: string;
  link_discord: string;
  link_signup: string;
  link_stream: string;
  category_id?: number;
  rule_id?: number;
  host_shortname?: string;
  cohost_shortname?: string;
  location_id?: number;
  parent?: number;
}

/**
 * Data source for the DataTableEvent view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableEventDataSource extends BaseDataSource<DataTableEventItem> {
  dataSubject: BehaviorSubject<DataTableEventItem[]> = new BehaviorSubject<DataTableEventItem[]>([]);

  constructor(private eventsService: EventService) {
    super();
    
    this.eventsService.fetchEvents().subscribe({
      next: events => {
         this.data.next(events);
         this.dataSubject.next(events);
      },
      error: error => {
         console.error('Error fetching events', error);
      }
    });
    
  }

  override getItemId(item: DataTableEventItem): number {
    return item.id;
  }

  /**
   * Sort the data (client-side).
   */
  override getSortedData(data: DataTableEventItem[]): DataTableEventItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'name_no': return compare(a.name_no, b.name_no, isAsc);
        case 'time_start': return compare(a.time_start, b.time_start, isAsc);
        case 'time_end': return compare(a.time_end, b.time_end, isAsc);
        case 'time_publish': return compare(a.time_publish, b.time_publish, isAsc);
        case 'time_signup_deadline': return compare(a.time_signup_deadline, b.time_signup_deadline, isAsc);
        case 'time_signup_release': return compare(a.time_signup_release, b.time_signup_release, isAsc);
        case 'time_updated': return compare(a.time_updated, b.time_updated, isAsc);
        case 'canceled': return compare(+a.canceled, +b.canceled, isAsc);
        case 'digital': return compare(+a.digital, +b.digital, isAsc);
        case 'image_small': return compare(a.image_small, b.image_small, isAsc);
        case 'image_banner': return compare(a.image_banner, b.image_banner, isAsc);
        case 'link_facebook': return compare(a.link_facebook, b.link_facebook, isAsc);
        case 'link_discord': return compare(a.link_discord, b.link_discord, isAsc);
        case 'link_signup': return compare(a.link_signup, b.link_signup, isAsc);
        case 'link_stream': return compare(a.link_stream, b.link_stream, isAsc);
        default: return 0;
      }
    });
  }
}

// 300 hundred lines of dummy data below
// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableEventItem[] = [
  {
    id: 1,
    name_no: "Dummy Event (Norwegian)",
    name_en: "Dummy Event (English)",
    description_no: "Dette er en testarrangement.",
    description_en: "This is a test event.",
    informational_no: "Informasjon om arrangementet på norsk.",
    informational_en: "Information about the event in English.",
    time_start: "2023-03-10T12:00:00Z",
    time_end: "2023-03-10T14:00:00Z",
    time_publish: "2023-03-09T12:00:00Z",
    time_signup_release: "2023-03-05T12:00:00Z",
    time_signup_deadline: "2023-03-08T12:00:00Z",
    time_updated: "2023-03-03T12:00:00Z",
    duration_type: "Short",
    canceled: false,
    digital: true,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/dummyevent",
    link_discord: "https://discord.gg/dummyevent",
    link_signup: "https://dummyevent.com/signup",
    link_stream: "https://dummyevent.com/stream",
    category_id: 2,
    rule_id: 3,
    host_shortname: "dummyhost",
    cohost_shortname: "dummycohost",
    location_id: 4,
    parent: undefined
  },
  {
    id: 2,
    name_no: "Konsert med Oslo Filharmonien",
    name_en: "Concert with Oslo Philharmonic Orchestra",
    description_no: "Konsert med Oslo Filharmonien i Oslo Konserthus.",
    description_en: "Concert with Oslo Philharmonic Orchestra at Oslo Concert Hall.",
    informational_no: "Konserten varer i to timer og har to pauser.",
    informational_en: "The concert lasts for two hours and has two intermissions.",
    time_start:"2023-04-15T19:30:00Z",
    time_end: "2023-04-15T21:30:00Z",
    time_publish: "2023-04-10T12:00:00Z",
    time_signup_release: "2023-03-15T12:00:00Z",
    time_signup_deadline: "2023-04-13T12:00:00Z",
    time_updated: "2023-03-01T12:00:00Z",
    duration_type: "Long",
    canceled: false,
    digital: false,
    capacity_reached: true,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/oslofilharmonien",
    link_discord: "",
    link_signup: "https://oslokonserthus.no/konsert-med-oslo-filharmonien",
    link_stream: "",
    category_id: 1,
    rule_id: 2,
    host_shortname: "oslokonserthus",
    cohost_shortname: "",
    location_id: 5,
    parent: undefined
  },
  {
    id: 3,
    name_no: "Boklansering: En ny roman av Jo Nesbø",
    name_en: "Book Launch: A new novel by Jo Nesbø",
    description_no: "Boklansering med Jo Nesbø i samtale med Kulturhusets litteraturkritiker.",
    description_en: "Book launch with Jo Nesbø in conversation with Kulturhuset's literary critic.",
    informational_no: "Arrangementet varer i en time og inkluderer signering av boken.",
    informational_en: "The event lasts for one hour and includes a book signing.",
    time_start: "2023-05-01T18:00:00Z",
    time_end: "2023-05-01T19:00:00Z",
    time_publish: "2023-04-15T12:00:00Z",
    time_signup_release: "2023-04-15T12:00:00Z",
    time_signup_deadline: "2023-04-15T12:00:00Z",
    time_updated: "2023-03-02T12:00:00Z",
    duration_type: "Short",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/jonesboofficial",
    link_discord: "",
    link_signup: "",
    link_stream: "",
    category_id: 3,
    rule_id: 2,
    host_shortname: "bokormene",
    cohost_shortname: "",
    location_id: 12,
    parent: undefined
  },
  {
    id: 4,
    name_no: "Familiedag på Tusenfryd",
    name_en: "Family Day at Tusenfryd",
    description_no: "En dag med aktiviteter og moro for hele familien på Tusenfryd.",
    description_en: "A day of activities and fun for the whole family at Tusenfryd.",
    informational_no: "Arrangementet inkluderer adgang til parken og utvalgte attraksjoner.",
    informational_en: "The event includes admission to the park and selected attractions.",
    time_start: "2023-06-10T10:00:00Z",
    time_end: "2023-06-10T18:00:00Z",
    time_publish: "2023-05-20T12:00:00Z",
    time_signup_release: "2023-05-01T12:00:00Z",
    time_signup_deadline: "2023-06-08T12:00:00Z",
    time_updated: "2023-03-05T12:00:00Z",
    duration_type: "Long",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/tusenfryd",
    link_discord: "",
    link_signup: "https://tusenfryd.no/familiedag",
    link_stream: "",
    category_id: 3,
    rule_id: 5,
    host_shortname: "tusenfryd",
    cohost_shortname: "",
    location_id: 6,
    parent: undefined
  },
  {
    id: 5,
    name_no: "Skogstur og bålpanne",
    name_en: "Forest Walk and Campfire",
    description_no: "En tur i skogen med bålpanne, pølser og marshmallows.",
    description_en: "A walk in the forest with a campfire, sausages, and marshmallows.",
    informational_no: "Arrangementet passer for både voksne og barn.",
    informational_en: "The event is suitable for both adults and children.",
    time_start: "2023-07-01T16:00:00Z",
    time_end: "2023-07-01T19:00:00Z",
    time_publish: "2023-06-15T12:00:00Z",
    time_signup_release: "2023-06-15T12:00:00Z",
    time_signup_deadline: "",
    time_updated: "2023-03-10T12:00:00Z",
    duration_type: "Short",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "",
    link_facebook: "",
    link_discord: "",
    link_signup: "https://skogstur-og-balpanne.eventbrite.no",
    link_stream: "",
    category_id: 4,
    rule_id: 5,
    host_shortname: "Skogsmennene",
    cohost_shortname: "",
    location_id: 6,
    parent: undefined
  },
  {
    id: 6,
    name_no: "Dummy Event (Norwegian)",
    name_en: "Dummy Event (English)",
    description_no: "Dette er en testarrangement.",
    description_en: "This is a test event.",
    informational_no: "Informasjon om arrangementet på norsk.",
    informational_en: "Information about the event in English.",
    time_start: "2023-03-10T12:00:00Z",
    time_end: "2023-03-10T14:00:00Z",
    time_publish: "2023-03-09T12:00:00Z",
    time_signup_release: "2023-03-05T12:00:00Z",
    time_signup_deadline: "2023-03-08T12:00:00Z",
    time_updated: "2023-03-03T12:00:00Z",
    duration_type: "Short",
    canceled: false,
    digital: true,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/dummyevent",
    link_discord: "https://discord.gg/dummyevent",
    link_signup: "https://dummyevent.com/signup",
    link_stream: "https://dummyevent.com/stream",
    category_id: 2,
    rule_id: 3,
    host_shortname: "dummyhost",
    cohost_shortname: "dummycohost",
    location_id: 4,
    parent: undefined
  },
  {
    id: 7,
    name_no: "Konsert med Oslo Filharmonien",
    name_en: "Concert with Oslo Philharmonic Orchestra",
    description_no: "Konsert med Oslo Filharmonien i Oslo Konserthus.",
    description_en: "Concert with Oslo Philharmonic Orchestra at Oslo Concert Hall.",
    informational_no: "Konserten varer i to timer og har to pauser.",
    informational_en: "The concert lasts for two hours and has two intermissions.",
    time_start:"2023-04-15T19:30:00Z",
    time_end: "2023-04-15T21:30:00Z",
    time_publish: "2023-04-10T12:00:00Z",
    time_signup_release: "2023-03-15T12:00:00Z",
    time_signup_deadline: "2023-04-13T12:00:00Z",
    time_updated: "2023-03-01T12:00:00Z",
    duration_type: "Long",
    canceled: false,
    digital: false,
    capacity_reached: true,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/oslofilharmonien",
    link_discord: "",
    link_signup: "https://oslokonserthus.no/konsert-med-oslo-filharmonien",
    link_stream: "",
    category_id: 1,
    rule_id: 2,
    host_shortname: "oslokonserthus",
    cohost_shortname: "",
    location_id: 5,
    parent: undefined
  },
  {
    id: 8,
    name_no: "Boklansering: En ny roman av Jo Nesbø",
    name_en: "Book Launch: A new novel by Jo Nesbø",
    description_no: "Boklansering med Jo Nesbø i samtale med Kulturhusets litteraturkritiker.",
    description_en: "Book launch with Jo Nesbø in conversation with Kulturhuset's literary critic.",
    informational_no: "Arrangementet varer i en time og inkluderer signering av boken.",
    informational_en: "The event lasts for one hour and includes a book signing.",
    time_start: "2023-05-01T18:00:00Z",
    time_end: "2023-05-01T19:00:00Z",
    time_publish: "2023-04-15T12:00:00Z",
    time_signup_release: "2023-04-15T12:00:00Z",
    time_signup_deadline: "2023-04-15T12:00:00Z",
    time_updated: "2023-03-02T12:00:00Z",
    duration_type: "Short",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/jonesboofficial",
    link_discord: "",
    link_signup: "",
    link_stream: "",
    category_id: 3,
    rule_id: 2,
    host_shortname: "bokormene",
    cohost_shortname: "",
    location_id: 12,
    parent: undefined
  },
  {
    id: 9,
    name_no: "Familiedag på Tusenfryd",
    name_en: "Family Day at Tusenfryd",
    description_no: "En dag med aktiviteter og moro for hele familien på Tusenfryd.",
    description_en: "A day of activities and fun for the whole family at Tusenfryd.",
    informational_no: "Arrangementet inkluderer adgang til parken og utvalgte attraksjoner.",
    informational_en: "The event includes admission to the park and selected attractions.",
    time_start: "2023-06-10T10:00:00Z",
    time_end: "2023-06-10T18:00:00Z",
    time_publish: "2023-05-20T12:00:00Z",
    time_signup_release: "2023-05-01T12:00:00Z",
    time_signup_deadline: "2023-06-08T12:00:00Z",
    time_updated: "2023-03-05T12:00:00Z",
    duration_type: "Long",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/tusenfryd",
    link_discord: "",
    link_signup: "https://tusenfryd.no/familiedag",
    link_stream: "",
    category_id: 3,
    rule_id: 5,
    host_shortname: "tusenfryd",
    cohost_shortname: "",
    location_id: 6,
    parent: undefined
  },
  {
    id: 10,
    name_no: "Skogstur og bålpanne",
    name_en: "Forest Walk and Campfire",
    description_no: "En tur i skogen med bålpanne, pølser og marshmallows.",
    description_en: "A walk in the forest with a campfire, sausages, and marshmallows.",
    informational_no: "Arrangementet passer for både voksne og barn.",
    informational_en: "The event is suitable for both adults and children.",
    time_start: "2023-07-01T16:00:00Z",
    time_end: "2023-07-01T19:00:00Z",
    time_publish: "2023-06-15T12:00:00Z",
    time_signup_release: "2023-06-15T12:00:00Z",
    time_signup_deadline: "",
    time_updated: "2023-03-10T12:00:00Z",
    duration_type: "Short",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "",
    link_facebook: "",
    link_discord: "",
    link_signup: "https://skogstur-og-balpanne.eventbrite.no",
    link_stream: "",
    category_id: 4,
    rule_id: 5,
    host_shortname: "Skogsmennene",
    cohost_shortname: "",
    location_id: 6,
    parent: undefined
  },
  {
    id: 11,
    name_no: "Familiedag på Tusenfryd",
    name_en: "Family Day at Tusenfryd",
    description_no: "En dag med aktiviteter og moro for hele familien på Tusenfryd.",
    description_en: "A day of activities and fun for the whole family at Tusenfryd.",
    informational_no: "Arrangementet inkluderer adgang til parken og utvalgte attraksjoner.",
    informational_en: "The event includes admission to the park and selected attractions.",
    time_start: "2023-06-10T10:00:00Z",
    time_end: "2023-06-10T18:00:00Z",
    time_publish: "2023-05-20T12:00:00Z",
    time_signup_release: "2023-05-01T12:00:00Z",
    time_signup_deadline: "2023-06-08T12:00:00Z",
    time_updated: "2023-03-05T12:00:00Z",
    duration_type: "Long",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/tusenfryd",
    link_discord: "",
    link_signup: "https://tusenfryd.no/familiedag",
    link_stream: "",
    category_id: 3,
    rule_id: 5,
    host_shortname: "tusenfryd",
    cohost_shortname: "",
    location_id: 6,
    parent: undefined
  },
  {
    id: 12,
    name_no: "Skogstur og bålpanne",
    name_en: "Forest Walk and Campfire",
    description_no: "En tur i skogen med bålpanne, pølser og marshmallows.",
    description_en: "A walk in the forest with a campfire, sausages, and marshmallows.",
    informational_no: "Arrangementet passer for både voksne og barn.",
    informational_en: "The event is suitable for both adults and children.",
    time_start: "2023-07-01T16:00:00Z",
    time_end: "2023-07-01T19:00:00Z",
    time_publish: "2023-06-15T12:00:00Z",
    time_signup_release: "2023-06-15T12:00:00Z",
    time_signup_deadline: "",
    time_updated: "2023-03-10T12:00:00Z",
    duration_type: "Short",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "",
    link_facebook: "",
    link_discord: "",
    link_signup: "https://skogstur-og-balpanne.eventbrite.no",
    link_stream: "",
    category_id: 4,
    rule_id: 5,
    host_shortname: "Skogsmennene",
    cohost_shortname: "",
    location_id: 6,
    parent: undefined
  },
  {
    id: 13,
    name_no: "Skogstur og bålpanne",
    name_en: "Forest Walk and Campfire",
    description_no: "En tur i skogen med bålpanne, pølser og marshmallows.",
    description_en: "A walk in the forest with a campfire, sausages, and marshmallows.",
    informational_no: "Arrangementet passer for både voksne og barn.",
    informational_en: "The event is suitable for both adults and children.",
    time_start: "2023-07-01T16:00:00Z",
    time_end: "2023-07-01T19:00:00Z",
    time_publish: "2023-06-15T12:00:00Z",
    time_signup_release: "2023-06-15T12:00:00Z",
    time_signup_deadline: "",
    time_updated: "2023-03-10T12:00:00Z",
    duration_type: "Short",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "",
    link_facebook: "",
    link_discord: "",
    link_signup: "https://skogstur-og-balpanne.eventbrite.no",
    link_stream: "",
    category_id: 4,
    rule_id: 5,
    host_shortname: "Skogsmennene",
    cohost_shortname: "",
    location_id: 6,
    parent: undefined
  },
  {
    id: 14,
    name_no: "Familiedag på Tusenfryd",
    name_en: "Family Day at Tusenfryd",
    description_no: "En dag med aktiviteter og moro for hele familien på Tusenfryd.",
    description_en: "A day of activities and fun for the whole family at Tusenfryd.",
    informational_no: "Arrangementet inkluderer adgang til parken og utvalgte attraksjoner.",
    informational_en: "The event includes admission to the park and selected attractions.",
    time_start: "2023-06-10T10:00:00Z",
    time_end: "2023-06-10T18:00:00Z",
    time_publish: "2023-05-20T12:00:00Z",
    time_signup_release: "2023-05-01T12:00:00Z",
    time_signup_deadline: "2023-06-08T12:00:00Z",
    time_updated: "2023-03-05T12:00:00Z",
    duration_type: "Long",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/tusenfryd",
    link_discord: "",
    link_signup: "https://tusenfryd.no/familiedag",
    link_stream: "",
    category_id: 3,
    rule_id: 5,
    host_shortname: "tusenfryd",
    cohost_shortname: "",
    location_id: 6,
    parent: undefined
  },
  {
    id: 15,
    name_no: "Skogstur og bålpanne",
    name_en: "Forest Walk and Campfire",
    description_no: "En tur i skogen med bålpanne, pølser og marshmallows.",
    description_en: "A walk in the forest with a campfire, sausages, and marshmallows.",
    informational_no: "Arrangementet passer for både voksne og barn.",
    informational_en: "The event is suitable for both adults and children.",
    time_start: "2023-07-01T16:00:00Z",
    time_end: "2023-07-01T19:00:00Z",
    time_publish: "2023-06-15T12:00:00Z",
    time_signup_release: "2023-06-15T12:00:00Z",
    time_signup_deadline: "",
    time_updated: "2023-03-10T12:00:00Z",
    duration_type: "Short",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "",
    link_facebook: "",
    link_discord: "",
    link_signup: "https://skogstur-og-balpanne.eventbrite.no",
    link_stream: "",
    category_id: 4,
    rule_id: 5,
    host_shortname: "Skogsmennene",
    cohost_shortname: "",
    location_id: 6,
    parent: undefined
  },
  {
    id: 16,
    name_no: "Dummy Event (Norwegian)",
    name_en: "Dummy Event (English)",
    description_no: "Dette er en testarrangement.",
    description_en: "This is a test event.",
    informational_no: "Informasjon om arrangementet på norsk.",
    informational_en: "Information about the event in English.",
    time_start: "2023-03-10T12:00:00Z",
    time_end: "2023-03-10T14:00:00Z",
    time_publish: "2023-03-09T12:00:00Z",
    time_signup_release: "2023-03-05T12:00:00Z",
    time_signup_deadline: "2023-03-08T12:00:00Z",
    time_updated: "2023-03-03T12:00:00Z",
    duration_type: "Short",
    canceled: false,
    digital: true,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/dummyevent",
    link_discord: "https://discord.gg/dummyevent",
    link_signup: "https://dummyevent.com/signup",
    link_stream: "https://dummyevent.com/stream",
    category_id: 2,
    rule_id: 3,
    host_shortname: "dummyhost",
    cohost_shortname: "dummycohost",
    location_id: 4,
    parent: undefined
  },
  {
    id: 17,
    name_no: "Konsert med Oslo Filharmonien",
    name_en: "Concert with Oslo Philharmonic Orchestra",
    description_no: "Konsert med Oslo Filharmonien i Oslo Konserthus.",
    description_en: "Concert with Oslo Philharmonic Orchestra at Oslo Concert Hall.",
    informational_no: "Konserten varer i to timer og har to pauser.",
    informational_en: "The concert lasts for two hours and has two intermissions.",
    time_start:"2023-04-15T19:30:00Z",
    time_end: "2023-04-15T21:30:00Z",
    time_publish: "2023-04-10T12:00:00Z",
    time_signup_release: "2023-03-15T12:00:00Z",
    time_signup_deadline: "2023-04-13T12:00:00Z",
    time_updated: "2023-03-01T12:00:00Z",
    duration_type: "Long",
    canceled: false,
    digital: false,
    capacity_reached: true,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/oslofilharmonien",
    link_discord: "",
    link_signup: "https://oslokonserthus.no/konsert-med-oslo-filharmonien",
    link_stream: "",
    category_id: 1,
    rule_id: 2,
    host_shortname: "oslokonserthus",
    cohost_shortname: "",
    location_id: 5,
    parent: undefined
  },
  {
    id: 18,
    name_no: "Boklansering: En ny roman av Jo Nesbø",
    name_en: "Book Launch: A new novel by Jo Nesbø",
    description_no: "Boklansering med Jo Nesbø i samtale med Kulturhusets litteraturkritiker.",
    description_en: "Book launch with Jo Nesbø in conversation with Kulturhuset's literary critic.",
    informational_no: "Arrangementet varer i en time og inkluderer signering av boken.",
    informational_en: "The event lasts for one hour and includes a book signing.",
    time_start: "2023-05-01T18:00:00Z",
    time_end: "2023-05-01T19:00:00Z",
    time_publish: "2023-04-15T12:00:00Z",
    time_signup_release: "2023-04-15T12:00:00Z",
    time_signup_deadline: "2023-04-15T12:00:00Z",
    time_updated: "2023-03-02T12:00:00Z",
    duration_type: "Short",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/jonesboofficial",
    link_discord: "",
    link_signup: "",
    link_stream: "",
    category_id: 3,
    rule_id: 2,
    host_shortname: "bokormene",
    cohost_shortname: "",
    location_id: 12,
    parent: undefined
  },
  {
    id: 19,
    name_no: "Familiedag på Tusenfryd",
    name_en: "Family Day at Tusenfryd",
    description_no: "En dag med aktiviteter og moro for hele familien på Tusenfryd.",
    description_en: "A day of activities and fun for the whole family at Tusenfryd.",
    informational_no: "Arrangementet inkluderer adgang til parken og utvalgte attraksjoner.",
    informational_en: "The event includes admission to the park and selected attractions.",
    time_start: "2023-06-10T10:00:00Z",
    time_end: "2023-06-10T18:00:00Z",
    time_publish: "2023-05-20T12:00:00Z",
    time_signup_release: "2023-05-01T12:00:00Z",
    time_signup_deadline: "2023-06-08T12:00:00Z",
    time_updated: "2023-03-05T12:00:00Z",
    duration_type: "Long",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/tusenfryd",
    link_discord: "",
    link_signup: "https://tusenfryd.no/familiedag",
    link_stream: "",
    category_id: 3,
    rule_id: 5,
    host_shortname: "tusenfryd",
    cohost_shortname: "",
    location_id: 6,
    parent: undefined
  },
  {
    id: 20,
    name_no: "Skogstur og bålpanne",
    name_en: "Forest Walk and Campfire",
    description_no: "En tur i skogen med bålpanne, pølser og marshmallows.",
    description_en: "A walk in the forest with a campfire, sausages, and marshmallows.",
    informational_no: "Arrangementet passer for både voksne og barn.",
    informational_en: "The event is suitable for both adults and children.",
    time_start: "2023-07-01T16:00:00Z",
    time_end: "2023-07-01T19:00:00Z",
    time_publish: "2023-06-15T12:00:00Z",
    time_signup_release: "2023-06-15T12:00:00Z",
    time_signup_deadline: "",
    time_updated: "2023-03-10T12:00:00Z",
    duration_type: "Short",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "",
    link_facebook: "",
    link_discord: "",
    link_signup: "https://skogstur-og-balpanne.eventbrite.no",
    link_stream: "",
    category_id: 4,
    rule_id: 5,
    host_shortname: "Skogsmennene",
    cohost_shortname: "",
    location_id: 6,
    parent: undefined
  },
  {
    id: 21,
    name_no: "Dummy Event (Norwegian)",
    name_en: "Dummy Event (English)",
    description_no: "Dette er en testarrangement.",
    description_en: "This is a test event.",
    informational_no: "Informasjon om arrangementet på norsk.",
    informational_en: "Information about the event in English.",
    time_start: "2023-03-10T12:00:00Z",
    time_end: "2023-03-10T14:00:00Z",
    time_publish: "2023-03-09T12:00:00Z",
    time_signup_release: "2023-03-05T12:00:00Z",
    time_signup_deadline: "2023-03-08T12:00:00Z",
    time_updated: "2023-03-03T12:00:00Z",
    duration_type: "Short",
    canceled: false,
    digital: true,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/dummyevent",
    link_discord: "https://discord.gg/dummyevent",
    link_signup: "https://dummyevent.com/signup",
    link_stream: "https://dummyevent.com/stream",
    category_id: 2,
    rule_id: 3,
    host_shortname: "dummyhost",
    cohost_shortname: "dummycohost",
    location_id: 4,
    parent: undefined
  },
  {
    id: 22,
    name_no: "Konsert med Oslo Filharmonien",
    name_en: "Concert with Oslo Philharmonic Orchestra",
    description_no: "Konsert med Oslo Filharmonien i Oslo Konserthus.",
    description_en: "Concert with Oslo Philharmonic Orchestra at Oslo Concert Hall.",
    informational_no: "Konserten varer i to timer og har to pauser.",
    informational_en: "The concert lasts for two hours and has two intermissions.",
    time_start:"2023-04-15T19:30:00Z",
    time_end: "2023-04-15T21:30:00Z",
    time_publish: "2023-04-10T12:00:00Z",
    time_signup_release: "2023-03-15T12:00:00Z",
    time_signup_deadline: "2023-04-13T12:00:00Z",
    time_updated: "2023-03-01T12:00:00Z",
    duration_type: "Long",
    canceled: false,
    digital: false,
    capacity_reached: true,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/oslofilharmonien",
    link_discord: "",
    link_signup: "https://oslokonserthus.no/konsert-med-oslo-filharmonien",
    link_stream: "",
    category_id: 1,
    rule_id: 2,
    host_shortname: "oslokonserthus",
    cohost_shortname: "",
    location_id: 5,
    parent: undefined
  },
  {
    id: 23,
    name_no: "Boklansering: En ny roman av Jo Nesbø",
    name_en: "Book Launch: A new novel by Jo Nesbø",
    description_no: "Boklansering med Jo Nesbø i samtale med Kulturhusets litteraturkritiker.",
    description_en: "Book launch with Jo Nesbø in conversation with Kulturhuset's literary critic.",
    informational_no: "Arrangementet varer i en time og inkluderer signering av boken.",
    informational_en: "The event lasts for one hour and includes a book signing.",
    time_start: "2023-05-01T18:00:00Z",
    time_end: "2023-05-01T19:00:00Z",
    time_publish: "2023-04-15T12:00:00Z",
    time_signup_release: "2023-04-15T12:00:00Z",
    time_signup_deadline: "2023-04-15T12:00:00Z",
    time_updated: "2023-03-02T12:00:00Z",
    duration_type: "Short",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/jonesboofficial",
    link_discord: "",
    link_signup: "",
    link_stream: "",
    category_id: 3,
    rule_id: 2,
    host_shortname: "bokormene",
    cohost_shortname: "",
    location_id: 12,
    parent: undefined
  },
  {
    id: 24,
    name_no: "Familiedag på Tusenfryd",
    name_en: "Family Day at Tusenfryd",
    description_no: "En dag med aktiviteter og moro for hele familien på Tusenfryd.",
    description_en: "A day of activities and fun for the whole family at Tusenfryd.",
    informational_no: "Arrangementet inkluderer adgang til parken og utvalgte attraksjoner.",
    informational_en: "The event includes admission to the park and selected attractions.",
    time_start: "2023-06-10T10:00:00Z",
    time_end: "2023-06-10T18:00:00Z",
    time_publish: "2023-05-20T12:00:00Z",
    time_signup_release: "2023-05-01T12:00:00Z",
    time_signup_deadline: "2023-06-08T12:00:00Z",
    time_updated: "2023-03-05T12:00:00Z",
    duration_type: "Long",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/tusenfryd",
    link_discord: "",
    link_signup: "https://tusenfryd.no/familiedag",
    link_stream: "",
    category_id: 3,
    rule_id: 5,
    host_shortname: "tusenfryd",
    cohost_shortname: "",
    location_id: 6,
    parent: undefined
  },
  {
    id: 25,
    name_no: "Skogstur og bålpanne",
    name_en: "Forest Walk and Campfire",
    description_no: "En tur i skogen med bålpanne, pølser og marshmallows.",
    description_en: "A walk in the forest with a campfire, sausages, and marshmallows.",
    informational_no: "Arrangementet passer for både voksne og barn.",
    informational_en: "The event is suitable for both adults and children.",
    time_start: "2023-07-01T16:00:00Z",
    time_end: "2023-07-01T19:00:00Z",
    time_publish: "2023-06-15T12:00:00Z",
    time_signup_release: "2023-06-15T12:00:00Z",
    time_signup_deadline: "",
    time_updated: "2023-03-10T12:00:00Z",
    duration_type: "Short",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "",
    link_facebook: "",
    link_discord: "",
    link_signup: "https://skogstur-og-balpanne.eventbrite.no",
    link_stream: "",
    category_id: 4,
    rule_id: 5,
    host_shortname: "Skogsmennene",
    cohost_shortname: "",
    location_id: 6,
    parent: undefined
  },
  {
    id: 26,
    name_no: "Familiedag på Tusenfryd",
    name_en: "Family Day at Tusenfryd",
    description_no: "En dag med aktiviteter og moro for hele familien på Tusenfryd.",
    description_en: "A day of activities and fun for the whole family at Tusenfryd.",
    informational_no: "Arrangementet inkluderer adgang til parken og utvalgte attraksjoner.",
    informational_en: "The event includes admission to the park and selected attractions.",
    time_start: "2023-06-10T10:00:00Z",
    time_end: "2023-06-10T18:00:00Z",
    time_publish: "2023-05-20T12:00:00Z",
    time_signup_release: "2023-05-01T12:00:00Z",
    time_signup_deadline: "2023-06-08T12:00:00Z",
    time_updated: "2023-03-05T12:00:00Z",
    duration_type: "Long",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/tusenfryd",
    link_discord: "",
    link_signup: "https://tusenfryd.no/familiedag",
    link_stream: "",
    category_id: 3,
    rule_id: 5,
    host_shortname: "tusenfryd",
    cohost_shortname: "",
    location_id: 6,
    parent: undefined
  },
  {
    id: 27,
    name_no: "Skogstur og bålpanne",
    name_en: "Forest Walk and Campfire",
    description_no: "En tur i skogen med bålpanne, pølser og marshmallows.",
    description_en: "A walk in the forest with a campfire, sausages, and marshmallows.",
    informational_no: "Arrangementet passer for både voksne og barn.",
    informational_en: "The event is suitable for both adults and children.",
    time_start: "2023-07-01T16:00:00Z",
    time_end: "2023-07-01T19:00:00Z",
    time_publish: "2023-06-15T12:00:00Z",
    time_signup_release: "2023-06-15T12:00:00Z",
    time_signup_deadline: "",
    time_updated: "2023-03-10T12:00:00Z",
    duration_type: "Short",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "",
    link_facebook: "",
    link_discord: "",
    link_signup: "https://skogstur-og-balpanne.eventbrite.no",
    link_stream: "",
    category_id: 4,
    rule_id: 5,
    host_shortname: "Skogsmennene",
    cohost_shortname: "",
    location_id: 6,
    parent: undefined
  },
  {
    id: 28,
    name_no: "Skogstur og bålpanne",
    name_en: "Forest Walk and Campfire",
    description_no: "En tur i skogen med bålpanne, pølser og marshmallows.",
    description_en: "A walk in the forest with a campfire, sausages, and marshmallows.",
    informational_no: "Arrangementet passer for både voksne og barn.",
    informational_en: "The event is suitable for both adults and children.",
    time_start: "2023-07-01T16:00:00Z",
    time_end: "2023-07-01T19:00:00Z",
    time_publish: "2023-06-15T12:00:00Z",
    time_signup_release: "2023-06-15T12:00:00Z",
    time_signup_deadline: "",
    time_updated: "2023-03-10T12:00:00Z",
    duration_type: "Short",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "",
    link_facebook: "",
    link_discord: "",
    link_signup: "https://skogstur-og-balpanne.eventbrite.no",
    link_stream: "",
    category_id: 4,
    rule_id: 5,
    host_shortname: "Skogsmennene",
    cohost_shortname: "",
    location_id: 6,
    parent: undefined
  },
  {
    id: 29,
    name_no: "Familiedag på Tusenfryd",
    name_en: "Family Day at Tusenfryd",
    description_no: "En dag med aktiviteter og moro for hele familien på Tusenfryd.",
    description_en: "A day of activities and fun for the whole family at Tusenfryd.",
    informational_no: "Arrangementet inkluderer adgang til parken og utvalgte attraksjoner.",
    informational_en: "The event includes admission to the park and selected attractions.",
    time_start: "2023-06-10T10:00:00Z",
    time_end: "2023-06-10T18:00:00Z",
    time_publish: "2023-05-20T12:00:00Z",
    time_signup_release: "2023-05-01T12:00:00Z",
    time_signup_deadline: "2023-06-08T12:00:00Z",
    time_updated: "2023-03-05T12:00:00Z",
    duration_type: "Long",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "https://dummyimage.com/1200x400/000/fff",
    link_facebook: "https://www.facebook.com/tusenfryd",
    link_discord: "",
    link_signup: "https://tusenfryd.no/familiedag",
    link_stream: "",
    category_id: 3,
    rule_id: 5,
    host_shortname: "tusenfryd",
    cohost_shortname: "",
    location_id: 6,
    parent: undefined
  },
  {
    id: 30,
    name_no: "Skogstur og bålpanne",
    name_en: "Forest Walk and Campfire",
    description_no: "En tur i skogen med bålpanne, pølser og marshmallows.",
    description_en: "A walk in the forest with a campfire, sausages, and marshmallows.",
    informational_no: "Arrangementet passer for både voksne og barn.",
    informational_en: "The event is suitable for both adults and children.",
    time_start: "2023-07-01T16:00:00Z",
    time_end: "2023-07-01T19:00:00Z",
    time_publish: "2023-06-15T12:00:00Z",
    time_signup_release: "2023-06-15T12:00:00Z",
    time_signup_deadline: "",
    time_updated: "2023-03-10T12:00:00Z",
    duration_type: "Short",
    canceled: false,
    digital: false,
    capacity_reached: false,
    image_small: "https://dummyimage.com/300x200/000/fff",
    image_banner: "",
    link_facebook: "",
    link_discord: "",
    link_signup: "https://skogstur-og-balpanne.eventbrite.no",
    link_stream: "",
    category_id: 4,
    rule_id: 5,
    host_shortname: "Skogsmennene",
    cohost_shortname: "",
    location_id: 6,
    parent: undefined
  }
];
