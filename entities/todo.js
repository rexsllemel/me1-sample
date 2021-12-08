const EntitySchema = require('typeorm').EntitySchema //<== to use EntitySchema

//to export our module as EnitytySchema
module.exports = new EntitySchema({
    name: "model", //module name
    //our columns/object format for our database
    columns:{
        id: {
            primary: true,
            type: "int",
            generated: true //to automatically generate id number every successful registration
        },
        date_created:{
            type: "varchar"
        },
        date_end:{
            type: "varchar"
        },
        description:{
            type: "varchar"
        },
        user_id:{
            type: "int"
        },
    },

})