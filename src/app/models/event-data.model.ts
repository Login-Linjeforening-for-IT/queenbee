/**
 * Specifically named EventData to not conflict with built in ts Event object.
 */
export interface EventData {
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

interface Location {
  id: number;
  name: string;
  name_en: string;
}

interface Category {
  id: number;
  name_no: string;
  name_en: string;
  color: string;
}