const https = require('https');

const unplashApi = 'https://source.unsplash.com/1600x900?laptop';

const quotes = [
    'Market Place                      ',
    'Services & Consulting             ',
    'Business Process Automation'
];

async function getImage() {
  return new Promise((resolve, reject) => {
    https.get(unplashApi, (response) => {
      // API returns a HTTP 302 code, we only want the final image URL
      resolve(response.headers.location);
    }).on('error', (error) => {
      reject(error.message);
    });
  });
}

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const image = await getImage();
  //const text = quotes[Math.floor(Math.random() * quotes.length)];
  const text = quotes[0] + quotes[1] + quotes[2];
  

  context.res = {
    body: {
      image,
      text
    }
  };
};
