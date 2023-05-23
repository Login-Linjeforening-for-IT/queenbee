/**
 * File containing a load of constants used on the different pages. Much of it will be removed when data retrieval
 * from the API is implemented!
 */
interface DropDownMenu {
    value: string;
    viewValue: string;
}

export const TableConstants = {
    PAGE_SIZE: "10",
    PAGE_SIZE_OPTIONS: [10, 25, 50],
}

export const EventConstants = {
    TITLE_NEW: "Create New Event",
    SUBMIT_NEW: "Create Event",

    TITLE_EDIT: "Edit Event",
    SUBMIT_EDIT: "Update Event",

    CATEGORIES: [
        {value: 'LOGIN', viewValue: 'LOGIN'},
        {value: 'TEKKOM', viewValue: 'TEKKOM'},
        {value: 'CTF', viewValue: 'CTF'},
        {value: 'SOCIAL', viewValue: 'SOCIAL'},
        {value: 'BEDPRES', viewValue: 'BEDPRES'},
        {value: 'KARRIEREDAG', viewValue: 'KARRIEREDAG'},
        {value: 'FADDERUKA', viewValue: 'FADDERUKA'},
        {value: 'ANNET', viewValue: 'ANNET'},
    ] as DropDownMenu[],

    ORGANIZATIONS: [
        {value:'tekkom',viewValue:'TekKom'},
        {value:'social',viewValue:'EventKom'},
        {value:'ctfkom',viewValue:'CTFkom'},
        {value:'huset',viewValue:'Huset'},
    ] as DropDownMenu[],
}

export const EventsConstants = {
    TITLE: "Events"
}

export const JobadConstants = {
    TITLE_NEW: "Create New Job Ad",
    SUBMIT_NEW: "Create Job Ad",

    TITLE_EDIT: "Edit Job Ad",
    SUBMIT_EDIT: "Update Job Ad",

    TYPES: [
        {value:'full-time',viewValue:'Full Time'},
        {value:'part-time',viewValue:'Part Time'},
        {value:'summer-job',viewValue:'Summer Job'},
        {value:'internship',viewValue:'Internship'},
    ] as DropDownMenu[],

    PRIORITIES: [
        {value:'default',viewValue:'Default'},
        {value:'high',viewValue:'High'},
        {value:'medium',viewValue:'Medium'},
        {value:'low',viewValue:'Low'},
    ] as DropDownMenu[],
}

export const JobadsConstants = {
    TITLE: "Job Ads",

    DUMMY_DATA: [
        {
          id: 1,
          title_no: "SOC Analytiker",
          title_en: "SOC Analyst",
          position_title_no: "SOC Analytiker",
          position_title_en: "SOC Analyst",
          description_short_no: "Kul relevant jobb!",
          description_short_en: "Cool relevant Job!",
          description_long_no: "Kul relevant jobb!2222",
          description_long_en: "Cool relevant Job!2222",
          time_publish: "2023-06-06 20:00:00",
          time_deadline: "2023-12-06 23:59:59",
          time_updated: "",
          application_url: "https://localhost",
          application_email: "example@email.com",
          contact_email: "contact.example@email.com",
          contact_phone: "9749283",
          image_small: "http://localhost",
          image_banner: "http://localhost",
          remote: false,
          type: "Deltid",
          priority: 1
        },
        {
          id: 2,
          title_no: "SOC Analytiker2",
          title_en: "SOC Analyst2",
          position_title_no: "SOC Analytiker",
          position_title_en: "SOC Analyst",
          description_short_no: "Kul relevant jobb!",
          description_short_en: "Cool relevant Job!",
          description_long_no: "Kul relevant jobb!2222",
          description_long_en: "Cool relevant Job!2222",
          time_publish: "",
          time_deadline: "",
          time_updated: "2023-04-03 16:34:23",
          application_url: "https://localhost",
          application_email: "example@email.com",
          contact_email: "contact.example@email.com",
          contact_phone: "9749283",
          image_small: "http://localhost",
          image_banner: "http://localhost",
          remote: true,
          type: "Deltid",
          priority: 1
        },
        {
          id: 3,
          title_no: "Full Stack Developer",
          title_en: "Full Stack Developer",
          position_title_no: "Full Stack Developer",
          position_title_en: "Full Stack Developer",
          description_short_no: "Spennende jobb i teknologibransjen",
          description_short_en: "Exciting job in the technology industry",
          description_long_no: "Vi søker en dyktig Full Stack Developer til å jobbe med utvikling av innovative løsninger.",
          description_long_en: "We are looking for a skilled Full Stack Developer to work on developing innovative solutions.",
          time_publish: "",
          time_deadline: "",
          time_updated: "",
          application_url: "https://localhost",
          application_email: "careers@company.com",
          contact_email: "contact@company.com",
          contact_phone: "12345678",
          image_small: "http://localhost",
          image_banner: "http://localhost",
          remote: false,
          type: "Heltid",
          priority: 2
        },
        {
          id: 4,
          title_no: "Markedsfører",
          title_en: "Marketer",
          position_title_no: "Markedsfører",
          position_title_en: "Marketer",
          description_short_no: "Jobb innen markedsføring",
          description_short_en: "Job in marketing",
          description_long_no: "Vi søker en erfaren Markedsfører til å jobbe med strategisk markedsføring og salg.",
          description_long_en: "We are looking for an experienced Marketer to work on strategic marketing and sales.",
          time_publish: "",
          time_deadline: "",
          time_updated: "",
          application_url: "https://localhost",
          application_email: "careers@company.com",
          contact_email: "contact@company.com",
          contact_phone: "12345678",
          image_small: "http://localhost",
          image_banner: "http://localhost",
          remote: true,
          type: "Heltid",
          priority: 3
        },
        {
          id: 5,
          title_no: "Prosjektleder",
          title_en: "Project Manager",
          position_title_no: "Prosjektleder",
          position_title_en: "Project Manager",
          description_short_no: "Jobb som prosjektleder",
          description_short_en: "Job as a project manager",
          description_long_no: "Vi søker en erfaren Prosjektleder til å lede prosjekter innenfor ulike bransjer.",
          description_long_en: "We are looking for an experienced Project Manager to lead projects across different industries.",
          time_publish: "",
          time_deadline: "",
          time_updated: "",
          application_url: "https://localhost",
          application_email: "careers@company.com",
          contact_email: "contact@company.com",
          contact_phone: "12345678",
          image_small: "http://localhost",
          image_banner: "http://localhost",
          remote: false,
          type: "Heltid",
          priority: 4
        },
        {
          id: 6,
          title_no: "Teknisk forfatter",
          title_en: "Technical Writer",
          position_title_no: "Teknisk forfatter",
          position_title_en: "Technical Writer",
          description_short_no: "Spennende jobb innen teknisk skriving",
          description_short_en: "Exciting job in technical writing",
          description_long_no: "Vi søker en dyktig Teknisk forfatter til å skrive teknisk dokumentasjon og brukerveiledninger.",
          description_long_en: "We are looking for a skilled Technical Writer to write technical documentation and user manuals.",
          time_publish: "",
          time_deadline: "",
          time_updated: "",
          application_url: "https://localhost",
          application_email: "careers@company.com",
          contact_email: "contact@company.com",
          contact_phone: "12345678",
          image_small: "http://localhost",
          image_banner: "http://localhost",
          remote: false,
          type: "Heltid",
          priority: 2
        },
        {
          id: 7,
          title_no: "UI/UX-designer",
          title_en: "UI/UX Designer",
          position_title_no: "UI/UX-designer",
          position_title_en: "UI/UX Designer",
          description_short_no: "Jobb innen design av brukeropplevelse og brukergrensesnitt",
          description_short_en: "Job in user experience and interface design",
          description_long_no: "Vi søker en kreativ UI/UX-designer til å utvikle brukeropplevelser og brukergrensesnitt for vår programvare.",
          description_long_en: "We are looking for a creative UI/UX Designer to develop user experiences and interfaces for our software.",
          time_publish: "",
          time_deadline: "",
          time_updated: "2022-09-30 05:32:12",
          application_url: "https://localhost",
          application_email: "careers@company.com",
          contact_email: "contact@company.com",
          contact_phone: "12345678",
          image_small: "http://localhost",
          image_banner: "http://localhost",
          remote: true,
          type: "Heltid",
          priority: 3
        },
        {
          id: 8,
          title_no: "Nettverksadministrator",
          title_en: "Network Administrator",
          position_title_no: "Nettverksadministrator",
          position_title_en: "Network Administrator",
          description_short_no: "Jobb innen nettverksadministrasjon",
          description_short_en: "Job in network administration",
          description_long_no: "Vi søker en erfaren Nettverksadministrator til å administrere og vedlikeholde vårt nettverk.",
          description_long_en: "We are looking for an experienced Network Administrator to administer and maintain our network.",
          time_publish: "",
          time_deadline: "",
          time_updated: "",
          application_url: "https://localhost",
          application_email: "careers@company.com",
          contact_email: "contact@company.com",
          contact_phone: "12345678",
          image_small: "http://localhost",
          image_banner: "http://localhost",
          remote: false,
          type: "Heltid",
          priority: 4
        },
        {
          id: 9,
          title_no: "Data Scientist",
          title_en: "Data Scientist",
          position_title_no: "Data Scientist",
          position_title_en: "Data Scientist",
          description_short_no: "Jobb innen data science",
          description_short_en: "Job in data science",
          description_long_no: "Vi søker en dyktig Data Scientist til å arbeide med dataanalyse og modellering for å løse komplekse problemer.",
          description_long_en: "We are looking for a skilled Data Scientist to work on data analysis and modeling to solve complex problems.",
          time_publish: "",
          time_deadline: "",
          time_updated: "",
          application_url: "https://localhost",
          application_email: "careers@company.com",
          contact_email: "contact@company.com",
          contact_phone: "12345678",
          image_small: "http://localhost",
          image_banner: "http://localhost",
          remote: true,
          type: "Heltid",
          priority: 2
        }
      ]
}

export const OrganizationConstants = {
    TITLE_NEW: "Create New Organization",
    SUBMIT_NEW: "Create Organization",

    TITLE_EDIT: "Edit Organization",
    SUBMIT_EDIT: "Update Organization",

    ORG_TYPES: [
        {value:'login',viewValue:'Login (TekKom, BroomBroom etc.)'},
        {value:'student',viewValue:'Student Organization'},
        {value:'ntnu',viewValue:'NTNU'},
        {value:'complany',viewValue:'Company'},
    ] as DropDownMenu[],
}

export const OrganizationsConstants = {
    TITLE: "Organizations"
}

export const LocationConstants = {
    TITLE_NEW: "Create New Location",
    SUBMIT_NEW: "Create Location",

    TITLE_EDIT: "Edit Location",
    SUBMIT_EDIT: "Update Location",

    LOC_TYPES: [
        {value:'none',viewValue:'None'},
        {value:'address',viewValue:'Address'},
        {value:'coords',viewValue:'Coordinates'},
        {value:'mazemap',viewValue:'MazeMap'},
    ] as DropDownMenu[],
}

export const LocationsConstants = {
    TITLE: "Locations"
}