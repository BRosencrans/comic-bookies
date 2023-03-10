const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Post extends Model {}

Post.init({
  //sets up the post table
  username:{
    type: DataTypes.STRING,
  references: {
    model: 'Users',
    key: 'username'
  }},
  title: {
    type:  DataTypes.STRING,
    allowNull: false,
    // validate:{
      // len:[4]
  },
  text: {
    type:  DataTypes.STRING,
    allowNull: false,
    // validate:{
      // len:[4]
}, 
image: {
  type:DataTypes.STRING,
  allowNull:true,

}},
   //add media share

   
    {
      sequelize,
    }
  );
  
  module.exports = Post;
