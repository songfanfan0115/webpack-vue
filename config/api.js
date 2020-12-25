const NODE_ENV = process.env.NODE_ENV;

const config = {
    "development":{
        baseUrl: "1",
    },
    "production": {
        baseUrl: "2",
    },
    "test": {
        baseUrl: "3",
    }
}
console.log(process.env.NODE_ENV);
module.exports = config[NODE_ENV];