const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const GeoPoint = require('geopoint');

const preTravelCost = 25;
const perKilometerCost = 12;

const storeLat = 33.5651;
const storeLong = 73.0169;

router.get('/', (req, res) => {
    const userLat = +req.body.userLat;
    const userLong = +req.body.userLong;
    point1 = new GeoPoint(storeLat,storeLong);
    point2 = new GeoPoint(userLat, userLong);
    var distance = point1.distanceTo(point2, true)//output in kilometers

    const fare = preTravelCost+(perKilometerCost*distance);
    res.json(fare);
})

module.exports=router;