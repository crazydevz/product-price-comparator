const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const storeSchema = new Schema({
    id:Number,
    name: String,
    address: String,
    latLong: String,
    products: [Schema.Types.Mixed],
});

module.exports= mongoose.model('store', storeSchema,'stores');