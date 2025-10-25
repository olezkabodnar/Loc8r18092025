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
                placeName: 'The Daily Grind',
                fullAddress: '42 Oak Avenue, Dublin 2, Ireland',
                overallScore: 4,
                features: ['Hot drinks', 'Food', 'Premium wifi'],
                placeType: 'Cafe',
                photoUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=150&h=150&fit=crop',
                contactPhone: '+353 1 234 5678',
                webUrl: 'https://dailygrind.ie',
                reviewCount: 128
            },
            {
                placeName: 'Urban Workspace',
                fullAddress: '15 Tech Park, Silicon Docks, Dublin',
                overallScore: 5,
                features: ['Hot drinks', 'Food', 'Premium wifi'],
                placeType: 'Co-working Space',
                photoUrl: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=150&h=150&fit=crop',
                contactPhone: '+353 1 345 6789',
                webUrl: 'https://urbanworkspace.ie',
                reviewCount: 89
            },
            {
                placeName: 'Green Garden Library',
                fullAddress: '8 College Road, Cork, Ireland',
                overallScore: 4,
                features: ['Food', 'Premium wifi'],
                placeType: 'Library',
                photoUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=150&h=150&fit=crop',
                contactPhone: '+353 21 456 7890',
                reviewCount: 54
            }
        ]
    });
};

/* GET 'Location info' page */
const locationInfo = function(req, res) {
    res.render('location-info', {
        title: 'The Coffee Bean',
        pageHeader: {
            title: 'The Coffee Bean'
        },
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
        },
        location: {
            placeName: 'The Coffee Bean',
            fullAddress: '23 Grafton Street, Dublin 2, Ireland',
            overallScore: 4,
            features: ['Espresso bar', 'Pastries', 'Free WiFi', 'Outdoor seating'],
            contactPhone: '+353 1 678 9012',
            webUrl: 'https://coffeebean.ie',
            geoLocation: {lat: 53.342778, lng: -6.260278},
            openingHours: [
                'Monday - Thursday: 8:00am - 6:00pm',
                'Friday: 8:00am - 8:00pm',
                'Saturday - Sunday: 9:00am - 5:00pm'
            ],
            reviewCount: 23
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
