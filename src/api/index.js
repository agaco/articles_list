import axios from 'axios';

const apiKEY = 'f3907ccd45504feea10309a6931c52d8';
const apiURL = 'ssss';
const apiKeyHeader = {
  'X-Api-Key': 'f3907ccd45504feea10309a6931c52d8',
};

export {
  apiKEY,
  apiKeyHeader,
  apiURL,

};

const getDataByHeadline = async (source) => {
  const response = await fetch(
   `${apiURL}top-headlines?sources=${source}`,
   {
     headers: { 'X-Api-Key': apiKEY },
   },
  );

  return response;
};

export default {
  getDataByHeadline,
};
