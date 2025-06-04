const mongoose = require('mongoose');
const ProductReviewSchema = new mongoose.Schema({
    productId : String,
    userId : String,
    userName : String,
    reviewMessage : String,
    reviewValue : Number

},{
    timestamps : true
});
//timestamps: true in a schema automatically adds and maintains two special fields in your documents:
// createdAt – the date and time when the document was first created.
// updatedAt – the date and time when the document was last updated.
const Review = mongoose.model('ProductReview' , ProductReviewSchema);
module.exports = Review;