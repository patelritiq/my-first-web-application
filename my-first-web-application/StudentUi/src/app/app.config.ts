//Defines app setup structure
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; 
import { routes } from './app.routes';

// Package sent to main.ts for startup
export const appConfig: ApplicationConfig = {

  // Wires services, routing, HTTP (like module imports)
  providers: [
    provideBrowserGlobalErrorListeners(),

    //Registers your pages/navigation
    provideRouter(routes),
    provideHttpClient()  // Enables HTTP calls everywhere
  ]
};
