const mongoose = require("mongoose");


const workerSchema = new mongoose.Schema({
    name:{String,
        }, 
    field:{String,
    },
    age:{Number},
    salary:{Number},
  })

  module.exports = mongoose.model("Worker", workerSchema );

  