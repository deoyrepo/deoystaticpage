const https = require('https');

//const unplashApi = 'https://source.unsplash.com/1600x900?laptop';
const unplashApi = 'https://images.unsplash.com/photo-1515343480029-43cdfe6b6aae?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFwdG9wfHx8fHx8MTY2NzkyNjIyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600';

const quotes = [
    'Market Place -',
    'Services & Consulting -',
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
  const text = quotes[0] + <br/> + quotes[1] + <br/> + quotes[2];
  

  context.res = {
    body: {
      image,
      text
    }
  };
};
