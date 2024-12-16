import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: false
    },
    description:{
        type: String,
        required: false
    },
}, 
    {timestamps: true}
);

const Product = mongoose.model('Product', productSchema);

export default Product;