export interface EventShort {
  id: number;
  visible: boolean;
  name_no: string;
  name_en: string;
  time_type: string;
  time_start: string;
  time_end: string;
  time_publish: string;
  canceled: boolean;
  link_signup: string;
  capacity: number;
  full: boolean;
  category_name_no: string;
  category_name_en: string;
  location_name_no: string;
  location_name_en: string;
  updated_at: string;
  is_deleted: false;
  audiences: string[];
  organizers: string[];
}

export interface EventTableItem {
  id: number;
  visible: boolean;
  name: string;
  time_type: string;
  time_start: string;
  time_end: string;
  time_publish: string;
  canceled: boolean;
  link_signup: string;
  capacity: number;
  full: boolean;
  category_name: string;
  location_name: string;
  updated_at: string;
  is_deleted: false;
  audiences: string[];
  organizers: string[];
}

export interface EventDetail {
  id: number;
  name_no: string;
  name_en: string;
  description_no: string;
  description_en: string;
  information_no: string;
  information_en: string;
  time_start: string;
  time_end: string;
  time_publish: string;
  time_signup_release: string;
  time_signup_deadline: string;
  time_updated: string;
  time_created: string;
  time_type: string;
  capacity: number;
  full: boolean;
  canceled: boolean;
  digital: boolean;
  highlight: boolean;
  image_small: string;
  image_banner: string;
  link_facebook: string;
  link_discord: string;
  link_signup: string;
  link_stream: string;
  location: Location;
  category: Category;
  rule: Rule;
  audiences: Audience[];
  organizations: OrgTableItem[];
}

export interface JobadDetail {
  id: number,
  title_no: string,
  title_en: string,
  position_title_no: string,
  position_title_en: string,
  description_short_no: string,
  description_short_en: string,
  description_long_no: string,
  description_long_en: string,
  time_publish: string,
  application_deadline: string,
  updated_at: string,
  /*application_url: string,
  application_email: string,
  contact_email: string,
  contact_phone: string,
  image_small: string,
  image_banner: string,
  remote: boolean,
  type: string,
  priority: number*/
}

export interface JobadShort {
  id: number,
  position_title_no: string,
  position_title_en: string,
  description_short_no: string,
  description_short_en: string,
  organization: {
    shortname: string,
    title_no: string,
    title_en: string,
    logo: string
  },
  cities: string[]
}

export interface LocationTableItem {
  id: number;
  name: string;
  mazemap_campus_id: number;
  mazemap_poi_id: number;
  address_street: string;
  address_postcode: number;
  city_name: string;
  coordinate_lat: number;
  coordinate_long: number;
  url: string;
  updated_at: string;
}

export interface Location {
  id: number;
  name_no: string;
  name_en: string;
  type: string;
  mazemap_campus_id: number;
  mazemap_poi_id: number;
  address_street: string;
  address_postcode: number;
  city_name: string;
  coordinate_lat: number;
  coordinate_long: number;
  url: string;
  updated_at: string;
  created_at: string;
  deleted_at: string;
}

export interface Category {
  id: number;
  color: string;
  name_no: string;
  name_en: string;
  description_no: string;
  description_en: string;
}

export interface Rule {
  id: number;
  name_no: string;
  name_en: string;
  description_no: string;
  description_en: string;
  time_updated: string;
}

export interface Audience {
  id: number;
  name_no: string;
  name_en: string;
  description_no: string;
  description_en: string;
}

export interface OrgShort {
  shortname: string;
  name_no: string;
  name_en: string;
  link_homepage: string;
  logo: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface OrgTableItem {
  shortname: string;
  name: string;
  link_homepage: string;
  logo: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface Organization {
  shortname: string;
  name_no: string;
  name_en: string;
  description_no: string;
  description_en: string;
  link_homepage: string;
  link_facebook: string;
  link_instagram: string;
  link_linkedin: string;
  logo: string;
}