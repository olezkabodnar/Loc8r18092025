/* GET 'home' page */
const request = require('request');

const apiOptions = {
  server: process.env.API_URL || 'http://localhost:3000'
};


const _renderHomepage = function(req, res, responseBody) {
  res.render('locations-list', {
    title: 'Loc8r - Save and discover great places',
    pageHeader: {
      title: 'My Places',
      strapline: 'Organize your favorite locations'
    },
    sidebar: "Search for cafes, restaurants, co-working spaces, and more. Save your favorite places and keep them organized in one place.",
    locations: responseBody
  });
};

const homelist = function(req, res) {
  const path = '/api/locations';
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: true
  };

  request(requestOptions, (err, response, body) => {
    if (err) {
      console.error('API Error:', err);
      res.status(500).render('error', {
        message: 'Error connecting to API',
        error: err
      });
    } else if (response.statusCode === 200) {
      console.log('API Response:', body);
      _renderHomepage(req, res, body);
    } else {
      console.error('API Status Code:', response.statusCode);
      res.status(response.statusCode).render('error', {
        message: 'Error retrieving locations',
        error: body
      });
    }
  });
};

/* GET 'Search results' page */
const searchResults = function(req, res) {
  const location = req.query.location || '';
  const type = req.query.type || '';

  const path = `/api/locations/search?location=${encodeURIComponent(location)}&type=${encodeURIComponent(type)}`;
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: true
  };

  request(requestOptions, (err, response, body) => {
    let results = [];

    if (!err && response.statusCode === 200 && body) {
      results = body;
    }

    res.render('search-results', {
      title: 'Search Results',
      pageHeader: {
        title: 'Search Results',
        strapline: `Showing results for "${location}"${type ? ` - ${type}` : ''}`
      },
      searchParams: {
        location: location,
        type: type
      },
      results: results
    });
  });
};

/* GET 'Location info' page */
const locationInfo = function(req, res) {
  const locationId = req.query.id || '';

  if (!locationId) {
    return res.status(400).render('error', {
      message: 'No location selected',
      error: { status: 'Please select a location to view details' }
    });
  }

  const path = `/api/locations/${locationId}`;
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: true
  };

  request(requestOptions, (err, response, body) => {
    if (err) {
      return res.status(500).render('error', {
        message: 'Error retrieving location details',
        error: err
      });
    }

    if (response.statusCode === 200 && body) {
      res.render('location-info', {
        title: body.placeName,
        pageHeader: {
          title: body.placeName
        },
        location: body
      });
    } else {
      res.status(response.statusCode).render('error', {
        message: 'Location not found',
        error: body
      });
    }
  });
};

module.exports = {
    homelist,
    searchResults,
    locationInfo
};
