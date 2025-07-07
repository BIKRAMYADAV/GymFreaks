const progressModel = require('../mongoDB/progressSchema')

module.exports = (app) => {
    //get all the data
    app.get('/get-data', async (req, res) => {
        try{
            const fetchedData = await progressModel.find();
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
    app.post('/add-data', async (req, res) => {
        try {
            console.log('The req body is: ', req.body);
            const { date, exercises, protein } = req.body;
            const newdata = new progressModel({
                date,
                exercises,
                protein
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
    app.put('/edit-data/:id', (req, res) => {

    })
}