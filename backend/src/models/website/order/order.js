const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userr:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    proo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productmodels',
    },
    color:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'colors',
    },
    size:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'size_models',
    },
    quantity:{
        type: Number,
        default: 1
    },
    created_at:{
        type: Date,
    },
    updated_at:{
        type: Date
    },
    status:{
        type: String,
        default: true
    }
});

orderSchema.pre('save', (next)=>{
    const now = new Date();
    this.created_at = now;
    next();
});

orderSchema.pre('updateOne', (next)=>{
    const now = new Date();
    this.updated_at = now;
    next();
});


orderSchema.pre('findByIdAndUpdate', (next)=>{
    const now = new Date();
    this.updated_at = now;
    next();
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;