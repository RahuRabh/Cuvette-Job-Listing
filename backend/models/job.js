// const mongoose = require("mongoose");

// const jobSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   companyName: {
//     type: String,
//     required: true,
//   },
//   logoUrl: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   salary: {
//     type: String,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//   },
//   duration: {
//     type: String,
//     required: true,
//   },
//   locationtype: {
//     type: String,
//     required: true,
//   },
//   skills:{
//     type: Array,
//     required: true,
//   },
// },
//   { timestamps: {createdAt: "createdAt", updatedAt: "updatedAt" }}
// );

// module.exports = mongoose.model("Job", jobSchema);

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        logoUrl: {
            type: String,
            required: true,
        },
        salary: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        locationType: {
            type: String,
            required: true,
        },
        skills: {
            type: Array,
            required: true,
        },
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Job", jobSchema);
