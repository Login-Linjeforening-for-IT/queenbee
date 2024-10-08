# QueenBee

This is the repo for QueenBee, the admin tool for Beehive. This tool will be used for managing events and job ads that Login display on Beehive.
In addition, it will be capable of managing other information relevant to the events and job ads, such as locations, rules and organizations.

Visit [dbdiagram.io](https://dbdiagram.io/d/BeehiveDB-63d03590296d97641d7bdaa1) to see the database design.

# General Angular Information

This project has been updated to [Angular CLI](https://github.com/angular/angular-cli) version 16.0.2.

## Development server
### Angular frontend
You might have to use `npm --force install` to install the dependencies in the application. 

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### API integrations
The website can be run without APIs, but then the functionality is naturally limited. To connect to the Admin API and database, look at the respective repositories.

The website is connected to a S3 bucket in Digital Ocean, to use that you respective secret keys. This is not vital for development, since it only affects image selection and other image interactions. If you need keys contact a TekKom member with "verv".

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

Also, Angular Material is widely used in the application, check out [https://material.angular.io/](https://material.angular.io/) for docs. 
