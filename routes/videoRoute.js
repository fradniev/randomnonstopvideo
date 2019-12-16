const mongoose = require('mongoose');
const Video = mongoose.model('videos');

module.exports = (app) => {
    app.get('/api/video', async(req, res) => {
        let videos = await Video.find();
        return res.status(200).send(videos);
    });

    app.post(`/api/video`, async(req, res) => {
        let video = await Video.create(req.body);
        return res.status(201).send({
            error: false,
            video
        });
    });

    app.put(`/api/video/:id`, async(req, res) => {
        const {id} = req.params;
        console.log(id)
        let video = await Video.findByIdAndUpdate(id, req.body);

        return res.status(202).send({
            error: false,
            video
        });
    });

    app.delete(`/api/video/:id`, async (req, res) => {
        const {id} = req.params;

        let video = await Video.findByIdAndDelete(id);

        return res.status(202).send({
            error: false,
            video
        });
    });
}