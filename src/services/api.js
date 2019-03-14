
import axios from 'axios';
import {baseUrl} from './baseUrl';

const BASE_URL = baseUrl();

/**
 * Base API class
 */
export class Api {
  state;

  baseUrl;

  /**
   * @constructor
   * @param state - Redux state
   */
  constructor (state) {
    this.state = state;
    this.baseUrl = BASE_URL;
  }

  /**
   * HTTP GET
   * @param url
   * @returns {AxiosPromise}
   */
  get (url: string): Promise<any> {
    const absoluteUrl = this.buildAbsoluteUrl(url);
    return axios(absoluteUrl);
  }

  /**
   * HTTP POST
   * @param url
   * @param data
   * @param headers
   * @returns {AxiosPromise}
   */
  async post (url, data, headers) {
    let request = {
      method: 'post',
      url: this.buildAbsoluteUrl(url),
      data: data,
      headers: headers
    };

    try {
      return await axios(request);
    } catch (e) {
        throw e;
    }
  }

  /**
   * HTTP PUT
   * @param url
   * @param data
   * @param columns
   * @returns {AxiosPromise}
   */
  put (url, data){
    return axios({
      method: 'put',
      url: this.buildAbsoluteUrl(url),
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * HTTP DELETE
   * @param url
   * @returns {AxiosPromise}
   */
  delete (url){
    return axios({
      method: 'delete',
      url: this.buildAbsoluteUrl(url)
    });
  }

  /**
   * Build absolute url by appending Application.baseUrl to url
   * @param {string} url
   * @returns {string} absoluteUrl
   */
  buildAbsoluteUrl (url) {
    // return `${this.baseUrl}/${apiUrl}/${url}`;
    return `${this.baseUrl}/${url}`;
  }

}