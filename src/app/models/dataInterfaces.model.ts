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

export interface EventData {
  id: number;
  visible: boolean;
  name_no: string;
  name_en: string;
  description_no: string;
  description_en: string;
  informational_no: string;
  informational_en: string;
  time_type: string;
  time_start: string;
  time_end: string;
  time_publish: string;
  time_signup_release: string;
  time_signup_deadline: string;
  canceled: boolean;
  digital: boolean;
  highlight: boolean;
  image_small: string;
  image_banner: string;
  link_facebook: string;
  link_discord: string;
  link_signup: string;
  link_stream: string;
  capacity: number;
  full: boolean;
  category: number;
  location: number;
  parent: number;
  rule: number;
  audience: number[];
  organization: string;
  updated_at: string;
  created_at: string;
  deleted_at: string;
}

interface CategoryData {
  id: number;
  color: string;
  name_no: string;
  name_en: string;
  description_no: string;
  description_en: string;
  updated_at: string;
  created_at: string;
}

interface RuleData {
  id: number;
  name_no: string;
  name_en: string;
  description_no: string;
  description_en: string;
  updated_at: string;
  created_at: string;
  deleted_at: string;
}

interface LocationData {
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

interface OrganizationData {
  shortname: string;
  name_no: string;
  name_en: string;
  description_no: string;
  description_en: string;
  link_homepage: string;
  link_linkedin: string;
  link_facebook: string;
  link_instagram: string;
  logo: string;
  updated_at: string;
  created_at: string;
  deleted_at: string;
  is_deleted: boolean;
}

export interface Audience {
  id: number;
  name_no: string;
  name_en: string;
  description_no: string;
  description_en: string;
  updated_at: string;
  created_at: string;
  deleted_at: string;
}

export interface FullEvent {
  event: EventData;
  category: CategoryData;
  rule: RuleData;
  location: LocationData;
  organizations: OrganizationData[];
  audiences: number[];
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
  organization: string,
  time_publish: string,
  application_deadline: string,
  updated_at: string,
  application_url: string,
  banner_image: string,
  job_type: string,
  highlight: boolean,
  visible: boolean,
  skills: string[],
  cities: string[]
}

export interface JobadShort {
  id: number;
  title_no: string;
  title_en: string;
  position_title_no: string;
  position_title_en: string;
  job_type: string;
  time_publish: string;
  application_deadline: string;
  application_url: string;
  updated_at: string;
  visible: boolean;
  deleted_at: string;
  is_deleted: boolean;
  name_no: string;
  name_en: string;
}

export interface JobadTableItem {
  id: number;
  title: string;
  position_title: string;
  job_type: string;
  time_publish: string;
  application_deadline: string;
  application_url: string;
  updated_at: string;
  visible: boolean;
  deleted_at: string;
  is_deleted: boolean;
  company_name: string;
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

/*export interface Audience {
  id: number;
  name_no: string;
  name_en: string;
  description_no: string;
  description_en: string;
}*/

export interface AudienceChip {
  id: number;
  name: string;
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
  id: string;
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
  updated_at: string;
  created_at: string;
  deleted_at: string;
}

export interface RulesTableItem {
  id: number;
  name_no: string;
  name_en: string;
  is_deleted: boolean;
}

export interface Rule {
  id: number;
  name_no: string;
  name_en: string;
  description_no: string;
  description_en: string;
  updated_at: string;
  created_at: string;
  deleted_at: string;
  is_deleted: boolean;
}

export interface DropDownFileItem {
  name: string;
  size: string;
  filepath: string;
}

export interface DropDownItem {
  id: number;
  name: string;
  details: string;
}
