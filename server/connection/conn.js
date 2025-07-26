const mongoose = require('mongoose');

const conn = async () => {
   try {
     await mongoose.connect(
       `${process.env.MONGO_URI}`,
    );
    console.log(" connected successfully database");
   } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    
   }
};

conn();
