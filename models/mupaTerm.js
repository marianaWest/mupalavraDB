const mongoose = require('mongoose');

const mupaTermSchema = new mongoose.Schema({
    term: {
        type: String,
        required: true,
    },
    description: {
        type: String,  
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }   
}  
)
module.exports = mongoose.model('MupaTerm', mupaTermSchema, 'mupaTerms')

