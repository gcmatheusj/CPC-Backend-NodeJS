const moongose = require('../../database')

const VoteSchema = new moongose.Schema({
    categoryMovie: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    movieName: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Vote = moongose.model('Vote', VoteSchema)

module.exports = Vote