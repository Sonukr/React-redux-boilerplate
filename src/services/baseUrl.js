// @flow

import {
    isApiStubbed
  } from './api/stubSwitch';
  import { isEmpty } from 'lodash/isEmpty';
  import { FIRST_INDEX, TWO } from '../utilities/constants';
  
  /**
   * Get base url of the application
   * To set local backend server url\
   *   Set REACT_APP_BACKEND_SERVER_URL=<BASE URL FOR your server>
   *     eg REACT_APP_BACKEND_SERVER_URL=http://google.com
   * and restart server with `npm start`
   * In production, this value is automatically set
   *
   * @returns {string}
   */
  export function baseUrl (): string {
    if (
      process.env.NODE_ENV === 'development' &&
      !isEmpty(process.env.REACT_APP_BACKEND_SERVER_URL) &&
      process.env.REACT_APP_BACKEND_SERVER_URL
    ) {
      return process.env.REACT_APP_BACKEND_SERVER_URL;
    }else if(process.env.NODE_ENV === 'production'){
       return process.env.REACT_APP_BACKEND_SERVER_URL;
    }else{
        throw new Error(
            'Backend server or REACT_APP_BACKEND_SERVER_URL IS NOT SPECIFIED'
        );
    }
  }
  