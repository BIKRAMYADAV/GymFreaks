const axios = require('axios')

module.exports = (app) => {
    app.get('/gym',async (req, res) => {
        const {lat, long} = req.body;
        try{
            const response = await axios.get(`https://api.geoapify.com/v2/places`, {
                params : {
                     categories: 'leisure.fitness_centre',
                     filter: `circle:${lng},${lat},5000`,
                     apiKey: process.env.GEOAPIFY_KEY
                }
            });
            res.json(response.data);
        } catch (error){
            console.log('There was an error in fetching the data', error);
            res.status(500).json({
                error : 'failed to fetch gym data'
            })
        }
    })
}