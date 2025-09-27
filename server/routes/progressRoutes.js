const progressModel = require('../mongoDB/progressSchema')
const auth = require('../middleware/authMiddleware')

module.exports = (app) => {
    //get all the data
    app.get('/get-data',auth, async (req, res) => {
        try{
            const userEmail = req.user.email;
            const fetchedData = await progressModel.find({user : userEmail});
            //successful get request code is 200, for created it is 201
            res.status(200).json({
                message: 'successfully retrieved data',
                data: fetchedData
            })
        }catch(error){
            console.error('There was an error in getting all progress data: ', error)
            res.status(500).json({
                message: 'there was an error in getting all the progress data',
                error:error.message
            })
        }
    });

   
    //add a new data
    app.post('/add-data',auth, async (req, res) => {
        console.log('add data is hit');
        try {
            console.log('The req body is: ', req.body);
            const { date, exercises, protein } = req.body;
            const newdata = new progressModel({
                date,
                exercises,
                protein,
                user: req.user.email
            })
            const savedData = await newdata.save();
            console.log('latest progress data was added ', savedData);
            res.status(201).json({
                message: 'progress data saved successfully',
                data: savedData
            })
        } catch (error) {
            console.error('There was an error in saving the data', error);
            res.status(500).json({
                message: 'failed to save progress data',
                error: error.message
            })
        }
    })

    //update an existing data
    app.put('/edit-data/:id',auth, async (req, res) => {
        try{
 const progressId = req.params.id;
        const {date, exercises, protein} = req.body;

        const progressData = await progressModel.findOne({_id: progressId, user: req.user.email});
        if(!progressData){
            return res.status(404).json({
                message: 'progress data not found'
            })
        }
        //update the fields
        // progressData.date = date;
        progressData.exercises = exercises;
        progressData.protein = protein;

        const updatedData = progressData.save();
        res.status(200).json({
            message : 'Progress data updated successfully',
            data : updatedData
        })
        } catch(error){
            console.error('There was an error in updating the progress data', error);
            res.status(500).json({
                message : 'failed to update progress data',
                error : error.message
            })
        }
       
    })
}