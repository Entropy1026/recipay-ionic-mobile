// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBPVjsxZ_7zFEKrl4B4yh79-7TvkzpByac',
    authDomain: 'recipaymobile.firebaseapp.com',
    databaseURL: 'https://recipaymobile.firebaseio.com',
    projectId: 'recipaymobile',
    storageBucket: 'recipaymobile.appspot.com',
    messagingSenderId: '509103223362',
    appId: '1:509103223362:web:e8d9623a00aa3f24e533db'
  },
  pusher: {
    key: '3a8fcc2e92f13b706864',
    cluster: 'ap1',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
