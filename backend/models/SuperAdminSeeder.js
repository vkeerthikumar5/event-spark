import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./User.js"; // adjust path

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/event-spark");

    const existing = await User.findOne({ email: "superadmin@example.com" });
    if (existing) {
      console.log("Superadmin already exists ✅");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("1234", 10);

    const superAdmin = new User({
      name: "Super Admin",
      email: "superadmin@example.com",
      password: hashedPassword,
      role: "super-admin",
    });

    await superAdmin.save();
    console.log("Superadmin created ✅ Email: superadmin@site.com Password: Super@123");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedSuperAdmin();
