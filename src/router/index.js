const riotRouter = require('./riot');

module.exports = function(app){
    app.use(riotRouter);
}