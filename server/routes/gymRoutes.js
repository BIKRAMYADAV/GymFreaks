const axios = require('axios')

module.exports = (app) => {
    app.get('/gym',async (req, res) => {
      
        const {lat, long} = req.query;
    //    const lat = 28.6315;
    //    const long = 77.2167;

        try{   
    if (!lat || !long) {
        return res.status(400).json({ error: 'Missing lat or long' });
    }
    
            const response = await axios.get(`https://api.geoapify.com/v2/places`, {
                params : {
                     categories: 'sport.fitness.fitness_centre',
                     filter: `circle:${long},${lat},5000`,
                     apiKey: process.env.GEOAPIFY_KEY
                }
            });
            res.json(response.data);
        } catch (error){

            res.status(500).json({
                error : 'failed to fetch gym data'
            })
        }
    })
}