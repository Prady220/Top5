// Got bearer apiKey from https://www.yelp.com/developers/v3/manage_app;
const apiKey = process.env.REACT_APP_YELP_API_KEY;
const yelp = {
  searchInYelp(term = 'icecream', location = 'alpharetta, ga', limit = 5) {
    return fetch(
      `/businesses/search?term=${term}&location=${location}&sort_by=rating&limit=${limit}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.businesses) {
          return data.businesses.map(business => {
            return fetch(`/businesses/${business.id}/reviews`, {
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
              },
            })
              .then(res => {
                return res.json();
              })
              .then(data => {
                if (data.reviews) {
                  const review = data.reviews[0];
                  const businessObj = {
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.display_address.join(', '),
                    phone: business.phone,
                    rating: business.rating,
                    reviewCount: business.review_count,
                    reviewer: review.user.name,
                    reviewerComment: review.text,
                    reviewerRating: review.rating,
                  };
                  return businessObj;
                }
              })
              .catch(error => {
                return error;
              });
          });
        }
      })
      .catch(error => {
        console.error(error);
        return error;
      });
  },
};

export default yelp;
