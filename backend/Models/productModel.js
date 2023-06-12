const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true,"please enter product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true,"please enter product Description"]
    },
    price: {
        type: Number,
        required: [true,"please enter product Price"],
        maxLength:[8,"price cannot exceed 8 digits"]
    },
    rating: {
        type: String,
        default: 0
    },
    image: [
        {
            public_id:{
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true,"Please enter Product Category"]
    },
    stock: {
        type: Number,
        required: [true,"Please enter Product Stock"],
        maxLength: [4,"Stock cannot exceed digits"],
        default: 1
    },
    numsOfReviews: {
        type: Number,
        default:0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("product",productSchema);