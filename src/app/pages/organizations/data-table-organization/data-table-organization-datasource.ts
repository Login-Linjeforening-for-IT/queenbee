import { BaseDataSource } from 'src/app/common/base-data-source';
import { compare } from 'src/app/common/utils';

// Interface for the data expected in an event.
export interface DataTableOrganizationItem {
  id: number;
  shortname: string;
  name_no: string;
  name_en?: string;
  description_no?: string;
  description_en?: string;
  url_homepage: string;
  url_linkedin: string;
  url_facebook: string;
  url_instagram: string;
  logo: string;
}

/**
 * Data source for the DataTableEvent view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableOrganizationDataSource extends BaseDataSource<DataTableOrganizationItem> {
  constructor() {
    super();
    this.data.next(EXAMPLE_DATA);
  }

  override getItemId(item: DataTableOrganizationItem): number {
    return item.id;
  }
  
  /**
   * Sort the data (client-side).
   */
  override getSortedData(data: DataTableOrganizationItem[]): DataTableOrganizationItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'shortname': return compare(a.shortname, b.shortname, isAsc);
        case 'url_homepage': return compare(a.url_homepage, b.url_homepage, isAsc);
        case 'url_linkedin': return compare(a.url_linkedin, b.url_linkedin, isAsc);
        case 'url_facebook': return compare(a.url_facebook, b.url_facebook, isAsc);
        case 'url_instagram': return compare(a.url_instagram, b.url_instagram, isAsc);
        case 'logo': return compare(a.logo, b.logo, isAsc);
        default: return 0;
      }
    });
  }
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableOrganizationItem[] = [
  {
    id: 1,
    shortname: "Login",
    name_no: "Login - Linjeforeningen for IT",
    name_en: "Login - Student Organization for IT",
    description_no: "Top linjeforening.",
    description_en: "Simply the best.",
    url_homepage: "https://login.no",
    url_linkedin: "https://www.linkedin.com/company/linjeforeningen-login/",
    url_facebook: "https://www.facebook.com/LogNTNU",
    url_instagram: "https://www.instagram.com/login_linjeforening/",
    logo: "dummy_logo.png"
  },
  {
    id: 2,
    shortname: "Webkom",
    name_no: "Webkom - Linjeforeningen for IT",
    name_en: "Webkom - Student Organization for IT",
    description_no: "Top linjeforening for webutvikling.",
    description_en: "Top student organization for web development.",
    url_homepage: "https://webkom.it.ntnu.no/",
    url_linkedin: "https://www.linkedin.com/company/ntnu-webkom",
    url_facebook: "https://www.facebook.com/NTNUWebkom",
    url_instagram: "https://www.instagram.com/ntnuwebkom/",
    logo: "dummy_logo.png"
  },
  {
    id: 3,
    shortname: "Huset",
    name_no: "Huset - Linjeforeningen for IT",
    name_en: "Huset - Student Organization for IT",
    description_no: "Linjeforeningen for studenter som er interessert i alt som har med lyd og bilde å gjøre.",
    description_en: "Student organization for students interested in everything related to sound and image.",
    url_homepage: "https://www.huset.it.ntnu.no/",
    url_linkedin: "https://www.linkedin.com/company/ntnu-huset",
    url_facebook: "https://www.facebook.com/NTNUHuset",
    url_instagram: "https://www.instagram.com/ntnuhuset/",
    logo: "dummy_logo.png"
  },
  {
    id: 4,
    shortname: "Dataill",
    name_no: "Dataill - Linjeforeningen for IT",
    name_en: "Dataill - Student Organization for IT",
    description_no: "Linjeforeningen for de som har en lidenskap for gaming og IT.",
    description_en: "Student organization for those who have a passion for gaming and IT.",
    url_homepage: "https://dataill.no/",
    url_linkedin: "https://www.linkedin.com/company/ntnu-dataill",
    url_facebook: "https://www.facebook.com/NTNUDataill",
    url_instagram: "https://www.instagram.com/ntnudataill/",
    logo: "dummy_logo.png"
  },
  {
    id: 5,
    shortname: "Abakus",
    name_no: "Abakus - Linjeforeningen for Teknologi og Naturvitenskap",
    name_en: "Abakus - Student Organization for Technology and Natural Sciences",
    description_no: "Largest and oldest student organization for technology and natural sciences at NTNU.",
    description_en: "The largest and oldest student organization for technology and natural sciences at NTNU.",
    url_homepage: "https://abakus.no/",
    url_linkedin: "https://www.linkedin.com/company/abakus-ntnu/",
    url_facebook: "https://www.facebook.com/abakusntnu/",
    url_instagram: "https://www.instagram.com/abakusntnu/",
    logo: "dummy_logo.png"
  },

  {
    id: 6,
    shortname: "Omega",
    name_no: "Omega - Linjeforeningen for Industriell Økonomi og Teknologiledelse",
    name_en: "Omega - Student Organization for Industrial Economics and Technology Management",
    description_no: "Student organization for students in the Industrial Economics and Technology Management program at NTNU.",
    description_en: "Student organization for students in the Industrial Economics and Technology Management program at NTNU.",
    url_homepage: "https://omegait.no/",
    url_linkedin: "https://www.linkedin.com/company/linjeforeningen-omega/",
    url_facebook: "https://www.facebook.com/omegaitntnu/",
    url_instagram: "https://www.instagram.com/omegaitntnu/",
    logo: "dummy_logo.png"
  },

  {
    id: 7,
    shortname: "Cyb",
    name_no: "Cyb - Linjeforeningen for Cybernetikk og Robotikk",
    name_en: "Cyb - Student Organization for Cybernetics and Robotics",
    description_no: "Student organization for students in the Cybernetics and Robotics program at NTNU.",
    description_en: "Student organization for students in the Cybernetics and Robotics program at NTNU.",
    url_homepage: "https://cyb.no/",
    url_linkedin: "https://www.linkedin.com/company/cyb-ntnu/",
    url_facebook: "https://www.facebook.com/CybNTNU/",
    url_instagram: "https://www.instagram.com/cybertekno/",
    logo: "dummy_logo.png"
  }
];
