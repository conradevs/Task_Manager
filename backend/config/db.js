import mongoose from "mongoose";

const conectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(`MongoDB connnected to: ${url}`)
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }

}

export default conectDB;