// Get apiKey from https://www.yelp.com/developers/v3/manage_app;
const apiKey = 'Bqw9DcGp31OLXAjRz93Rx8TqMDP6HiFQ0lxIRZMk6x53kzarAMFL8hQtatVzUCxSSSs0RvDSTJhOEO5z7IPSgqDilMifA6LliLZoGuwZRGgdUSxYGYknlk68hZGMYHYx';
const yelp = {
    searchYelp(term = 'icecream', location = 'alpharetta, ga', limit = 5) 
    {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=rating&limit=${limit}`, 
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
                    console.log(business)
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.display_address.join("\n"),
                        // address: business.location.address1 + "\n" + business.location.address2 + " " + business.location.address3 + "\n" + business.location.city + " " + business.location.state + "-" + business.location.zip_code
                        phone: business.phone,
                        rating: business.rating,
                        reviewCount: business.review_count
                        // reviewComment: this.review.text,
                        // reviewRating: this.review.rating,
                        // reviewer: this.review.user.name
                    }
                })
            }
        }).catch(error => {
            console.error(error);
            throw Error(error);
        })
    },

    getReviews(businessid, limit = 1){
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${businessid}/reviews`, 
        {       
            headers: { 
                Accept: "application/json",
                Authorization: `Bearer ${apiKey}`
            }
        }).then((res) => {
            return res.json()
        }).then(data => {
            if(data.reviews) {
                return data.reviews.slice(0, limit);
            }
        }).catch(error => {
            console.log(error);
            throw Error(error);
        })
    }
}

export default yelp;