import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./User.js"; // adjust path

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect("mongodb+srv://vkeerthikumar04:1234@cluster0.e7ywss0.mongodb.net/event-spark?retryWrites=true&w=majority&appName=Cluster0");

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
      m_no:"979126122",
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
