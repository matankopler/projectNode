import mongoose from "mongoose";
import initDB from "./init_db";
import chalk from "chalk";

const connect = async () => {
    const connectionString = process.env.DB_CONNECTION_STRING;

    if (!connectionString) {
        console.log("DB_CONNECTION_STRING is not defined in your .env file");
        return;
    }

    try {
        await mongoose.connect(connectionString);
        await initDB();
        console.log(chalk.green("Database Connected"))
    } catch (e) {
        console.log(e)
    }
};

export default connect;