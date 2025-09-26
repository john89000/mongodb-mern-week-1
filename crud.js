const { connectDB, mongoose } = require('./db');
const { User } = require('./Models/User');
const { Task } = require('./Models/Task');

async function main(){
    await connectDB();

    // CREATE
    const john = await User.create({ name: "John Wachira", email: "john@plp.com" });
    console.log("Created: ", john);


    // READ
    const users = await User.find().select("name email");
    console.log("All Users: ", users);

    // UPDATE
    await User.updateOne({ email: "john@plp.com"}, { role: "admin"});
    console.log("Updated John's role")

    // DELETE
    await User.deleteOne({ email: "john@plp.com"});
    console.log("Bye John")

    // AGGREGATION
    const byStatus = await Task.aggregate([
        { $group: { _id: "$status", total: { $sum: 1 } } }
    ]);
    console.log("Tasks by Status: ", byStatus);

    await mongoose.disconnect();
}

main();