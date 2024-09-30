const express = require('express');
const verifyAuth = require('../../../middleware/verifyJwt');
const { addProductToWish, viewWish, deleteWish } = require('../../../controller/controller');

const wishRouter = express.Router();

wishRouter.post('/wish-product/:_id?', addProductToWish);
wishRouter.get('/view-wish/:_id' , viewWish);
wishRouter.delete('/delete-wish-item/:_id', deleteWish);

module.exports = wishRouter;