// Interface for the data expected in an event.
export interface Event {
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