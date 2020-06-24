if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: "mongodb+srv://wiem:0000@cluster0-ufuvx.mongodb.net/test",
        secretOrKey: 'yoursecret'
    };
} else {
    module.exports = {
        mongoURI: "mongodb://localhost:27017/test",
        secretOrKey: 'yoursecret'
    };
}