// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production  :  false,
  servidor    :   /*'http://10.45.5.3:8000/api/'*/ 'http://localhost:8000/api/',
  url_login   :  '/seguridad/login',
  url_home    :  '/clientes', //todo cambiar a home
  no_image    :  'assets/images/no-image.png'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
