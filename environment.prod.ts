export const environment = {
    OAUTH_URL: '__OAUTH_URL_PLACEHOLDER__',
}

export const BeehiveAPI = {
    BASE_URL: '__BASE_URL_PLACEHOLDER__',
    EVENTS_PATH: '/events/',
    JOBADS_PATH: '/jobs/',
    CATEGORIES_PATH: '/categories/',
    AUDIENCES_PATH: '/audiences/',
    ORGANIZATIONS_PATH: '/organizations/',
    RULES_PATH: '/rules/',
    LOCATIONS_PATH: '/locations/',
    SKILLS_PATH: 'skills',
    CITIES_PATH: 'cities',
    IMAGES_PATH: '/images',
    SECRET: 'secret', // Cosmic secret, quite strong password
    AUDIENCES_PATH_2: 'audiences',
}

export const TIME = {
    TIME_UNSET: '0001-01-01T00:00:00Z',
    TIME_UNSET_START: '00:00:01',
    TIME_UNSET_END: '23:59:59'
}

export const TIME_TYPE = {
    DEFAULT: 'default',
    NO_END: 'no_end',
    WHOLE_DAY: 'whole_day',
    TO_BE_DETERMINED: 'tbd'
  } as const;

export const JOB_TYPE = {
  FULL_TIME: 'full',
  PART_TIME: 'part',
  SUMMER: 'summer',
  VERV: 'verv'
} as const;

export default environment