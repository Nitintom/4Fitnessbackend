import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    productCode: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    specifications: {
        type: String,
        trim: true,
    },
    images: [
        {
           imageUrl: { type: String }
           // Add other properties as needed
        }
     ],
     pdf: {
        fileUrl: { type: String },
        originalname: { type: String },
        // Add other properties as needed
      },
    category: {
        type: String,
        enum: ['Commercial Equipments', 'Domestic Equipments', 'Service', 'Sports Equipments', 'Gym Setups'],
        required: true,
    },
    subcategory: {
        type: String,
        enum: ['Trademills', 'Cross Training', 'Elliptical Trainers', 'Bikes', 'Rowers', 'Step Mill', 'Unique Products', 'Strengths', 'Pilates'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
