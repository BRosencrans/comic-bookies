const {Model, DataTypes}= require('sequelize');
const sequelize= require('../config/connection');

class Comment extends Model{}

Comment.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autonIncrement: true

    },
    post_id:{
        
    }
})



// Pk id int AI
// post id fk ref postid
// username fk ref username
// comment VARCHAR