/* GET 'home' page */
const homelist = function(req, res) {
    res.render('locations-list', {
        title: 'Loc8r - Save and discover great places',
        pageHeader: {
            title: 'My Places',
            strapline: 'Organize your favorite locations'
        },
        sidebar: "Search for cafes, restaurants, co-working spaces, and more. Save your favorite places and keep them organized in one place.",
        locations: [
            {
                name: 'The Daily Grind',
                address: '42 Oak Avenue, Dublin 2, Ireland',
                rating: 4,
                facilities: ['Hot drinks', 'Food', 'Premium wifi'],
                category: 'Cafe',
                image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=150&h=150&fit=crop',
                reviewCount: 128
            },
            {
                name: 'Urban Workspace',
                address: '15 Tech Park, Silicon Docks, Dublin',
                rating: 5,
                facilities: ['Hot drinks', 'Food', 'Premium wifi'],
                category: 'Co-working Space',
                image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=150&h=150&fit=crop',
                reviewCount: 89
            },
            {
                name: 'Green Garden Library',
                address: '8 College Road, Cork, Ireland',
                rating: 4,
                facilities: ['Food', 'Premium wifi'],
                category: 'Library',
                image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=150&h=150&fit=crop',
                reviewCount: 54
            }
        ]
    });
};

/* GET 'Location info' page */
const locationInfo = function(req, res) {
    res.render('location-info', {
        title: 'Starcups',
        pageHeader: {
            title: 'Starcups'
        },
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
        },
        location: {
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            coords: {lat: 51.455041, lng: -0.9690884},
            openingTimes: [
                {
                    days: 'Monday - Friday',
                    opening: '7:00am',
                    closing: '7:00pm',
                    closed: false
                },
                {
                    days: 'Saturday',
                    opening: '8:00am',
                    closing: '5:00pm',
                    closed: false
                },
                {
                    days: 'Sunday',
                    closed: true
                }
            ],
            reviews: [
                {
                    author: 'Simon Holmes',
                    rating: 5,
                    timestamp: '16 July 2013',
                    reviewText: 'What a great place. I can\'t say enough good things about it.'
                },
                {
                    author: 'Charlie Chaplin',
                    rating: 3,
                    timestamp: '16 June 2013',
                    reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
                }
            ]
        }
    });
};

/* GET 'Add review' page */
const addReview = function(req, res) {
    res.render('location-review-form', {
        title: 'Add review'
    });
};

module.exports = {
    homelist,
    locationInfo,
    addReview
};
