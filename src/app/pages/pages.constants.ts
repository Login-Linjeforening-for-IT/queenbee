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

export const JobadConstants = {
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

export const LocationsConstants = {
    TITLE: "Locations"
}