// Get apiKey from https://www.yelp.com/developers/v3/manage_app;
const apiKey = 'Bqw9DcGp31OLXAjRz93Rx8TqMDP6HiFQ0lxIRZMk6x53kzarAMFL8hQtatVzUCxSSSs0RvDSTJhOEO5z7IPSgqDilMifA6LliLZoGuwZRGgdUSxYGYknlk68hZGMYHYx';
const yelp = {
    searchYelp(term = 'icecream', location = 'alpharetta, ga', limit = 5) 
    {
        return fetch(`/businesses/search?term=${term}&location=${location}&sort_by=rating&limit=${limit}`, 
        {       
            headers: { 
                Accept: "application/json",
                Authorization: `Bearer ${apiKey}`
            },
        }).then( (res) => {
            return res.json();
        }).then(data => {
            if(data.businesses) {
                return data.businesses.map((business) => {
                    return fetch(`/businesses/${business.id}/reviews`, 
                    {       
                        headers: { 
                            Accept: "application/json",
                            Authorization: `Bearer ${apiKey}`
                        }
                    }).then((res) => {
                        return res.json()
                    }).then(data => {
                        if(data.reviews) {
                            const review = data.reviews[0];
                            const businessObj = {
                                id: business.id,
                                imageSrc: business.image_url,
                                name: business.name,
                                address: business.location.display_address.join("\n"),
                                phone: business.phone,
                                rating: business.rating,
                                reviewCount: business.review_count,
                                reviewerComment: review.text,
                                reviewRating: review.rating,
                                reviewer: review.user.name
                            }
                            return businessObj;
                        }
                    }).catch(error => {
                        console.log(error);
                        throw Error(error);
                    })
                })
            }
        }).catch(error => {
            console.error(error);
            throw Error(error);
        })
    }
}

export default yelp;