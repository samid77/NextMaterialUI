import axios from 'axios';

export const post = (operation: string, data: object) => axios({
    crossDomain: true,
    method: 'post',
    url: `${"https://api.themoviedb.org/3/"}${operation}`,
    data: {
      ...data,
      api_key: "2cd60e70e23d1aac41f24a242c1e08f8",
    },
    validateStatus: false,
  } as object);
  
  export const get = (operation: any, data: any) => axios({
    crossDomain: true,
    method: 'get',
    url: "https://api.themoviedb.org/3/discover/movie",
    params: {
      'primary_release_date.gte': "2020-06-01",
      'primary_release_date.lte': "2020-08-30",
      api_key: "2cd60e70e23d1aac41f24a242c1e08f8",
    },
    validateStatus: false,
  } as object);