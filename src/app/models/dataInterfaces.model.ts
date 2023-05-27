/**
 * Specifically named EventData to not conflict with built in ts Event object.
 */
export interface EventShort {
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
  time_type: string;
  created_at: string;
  canceled: boolean;
  highlight: boolean;
  image_small: string;
  capacity: number;
  full: boolean;
  location: Location;
  category: Category;
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
  organizations: Organization[];
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

export interface DropDownMenu {
  value: number;
  viewValue: string;
}