const Profile = require('../mongoDB/profileModel')
const auth = require('../middleware/authMiddleware')

module.exports = (app) => {
    app.get('/profile',auth,async (req, res) => {
        try{
            const {email} = req.user.email;
            const fetchedData = await Profile.find({email})
            res.status(200).json({
                message : 'Profile data fetched successfully',
                data : fetchedData
            })
        } catch (error){
            console.log('There was an error in fetching the profile details');
            res.status(500).json({
                message : 'There was an error in getting all the progress data',
                error : error.message
            })
        }
    })

    app.put('/profile',async (req, res) => {
        try {
            const {email, ...data} = req.body;
            const profile = await Profile.findOneAndUpdate({email}, data, {
                new : true,
                runValidators : true,
                upsert : true
            })
            res.status(200).json({
                message : 'profile updated successfully',
                profile
            })
        } catch (error){
            console.log('There was an error in updating the data');
            res.status(500).json({
                message : 'There was an error in updating the profile',
                error : error.message
            })
        }
    })  
}