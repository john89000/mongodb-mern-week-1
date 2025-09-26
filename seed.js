const { connectDB, mongoose } = require('./db');
const { User } = require('./Models/User');
const { Task } = require('./Models/Task');


async function main(){
    await connectDB();

    await User.deleteMany({});
    await Task.deleteMany({});

    await User.insertMany([
        { name: "Alice Kariuki", email: "alice@example.com", role: "admin" },
        { name: "Dedan Okware", email: "dedan@plp.com" }
    ]);

    await Task.insertMany([
        { title: "Write Proposal", status: "todo", owner: "Alice" },
        { title: "Design Schema", status: "in_progress", owner: "Dedan" }
    ]);

    console.log("Data populated");
    await mongoose.disconnect();
}

main();