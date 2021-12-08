const EntitySchema = require('typeorm').EntitySchema //<== to use EntitySchema

//to export our module as EnitytySchema
module.exports = new EntitySchema({
    name: "Users", //module name
    //our columns/object format for our database
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true //to automatically generate id number every successful registration
        },
        username: {
            type: "varchar"
        },
        password:{
            type: "varchar"
        },
        firstname:{
            type: "varchar"
        },
        lastname:{
            type: "varchar"
        },
        birthdate:{
            type: "varchar"
        },
    }
})
