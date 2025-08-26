import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import User from "./models/User.js";
import Events from "./models/Events.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",  // your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running...");
});

const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => console.log("Server is running on port " + PORT));
    })
    .catch((err) => console.log(err));


app.get("/admins",async(req,res)=>{
    try{
        const admins = await User.find({ role: "admin" }); // fetch only admins
    
        res.json(admins);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
})

// Activate admin
app.put("/activate/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const admin = await User.findById(id);
  
      if (!admin) return res.status(404).json({ msg: "Admin not found" });
  
      admin.status = "activated"; // or true if you want boolean
      await admin.save();
  
      res.json({ msg: "Admin activated successfully", admin });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
// Count organizers and pending activations
app.get("/sa/stats", async (req, res) => {
    try {
      const organizersCount = await User.countDocuments({ role: "admin" }); 
      const pendingCount = await User.countDocuments({ role: "admin", status: { $ne: "activated" } });
  
      // later you can also add events count
      const totalEvents = 0; // replace with your Events model count if you have one
  
      res.json({
        organizersCount,
        pendingCount,
        totalEvents
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.post('/events', async(req,res)=>{
    try{
        const { title, desc, date, location, organizerId } = req.body;

        const NewEvent = new Events({
          title,
          desc,
          date,
          location,
          organizer: organizerId,  // track organizer who created it
        });
            await NewEvent.save()
            res.status(201).json({msg:"Event Created Succesfully",NewEvent});
    }
    catch(err){
        res.status(500).json({error:err.message})
    }

})

app.get('/get_events/:adminId',async(req,res)=>{
    try {
        const { adminId } = req.params; // take adminId from URL
        const events = await Events.find({ organizer:adminId }); // filter events by adminId
        const count=await Events.countDocuments({organizer:adminId})
        res.json({events,count});
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
})

app.get('/get_info/:adminId', async (req, res) => {
    try {
      const { adminId } = req.params;
  
      // Make sure adminId is passed correctly
      console.log("AdminId received:", adminId);
  
      // Find user by _id
      const info = await User.findById(adminId);
  
      if (!info) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json(info);
    } catch (err) {
      console.error("Error fetching user:", err.message);
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/browse_events/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      console.log("Received userId:", userId);
  
      const events = await Events.find().populate("registrations", "_id").lean();
  
      const eventsWithStatus = events.map(event => {
        const isRegistered = event.registrations?.some(
          reg => reg._id.toString() === userId
        );
        return { ...event, isRegistered };
      });
  
      res.json({ events: eventsWithStatus });
    } catch (err) {
      console.error("Error in /browse_events:", err);  // 🔥 log full error
      res.status(500).json({ error: err.message });
    }
  });
  
  
  
  app.get("/get_user_events/:userId", async (req, res) => {
    try {
      console.log("called")
      const { userId } = req.params;
  
      // Get all events with registrations populated
      const events = await Events.find()
        .populate("registrations", "name email mobile")
        .lean();
  
      // Total number of events in the system
      const totalEvents = events.length;
  
      // Filter only events where user is registered
      const registeredEvents = events.filter(event =>
        (event.registrations || []).some(
          reg => reg._id.toString() === userId
        )
      );
  
      res.json({
        events: registeredEvents,              // only user's registered events
        totalRegisteredEvents: registeredEvents.length,  // how many user registered
        totalEvents                            // how many events exist overall
      });
    } catch (err) {
      console.error("Error fetching user events:", err.message);
      res.status(500).json({ error: err.message });
    }
  });
  

  // Cancel registration
app.delete("/events/:eventId/cancel", async (req, res) => {
    try {
      const { eventId } = req.params;
      const { userId } = req.body;
  
      const event = await Events.findByIdAndUpdate(
        eventId,
        { $pull: { registrations: userId } }, // remove userId from array
        { new: true }
      );
  
      if (!event) return res.status(404).json({ message: "Event not found" });
  
      res.json({ message: "Registration cancelled", event });
    } catch (err) {
      console.error("Cancel registration error:", err.message);
      res.status(500).json({ error: err.message });
    }
  });
  
  
  

app.post("/events/:id/register", async (req, res) => {
    try {
      const { id } = req.params;         // event id
      const { userId } = req.body;       // from frontend
  
      if (!userId) {
        return res.status(400).json({ error: "User ID required" });
      }
  
      // Add user to registrations if not already registered
      const event = await Events.findByIdAndUpdate(
        id,
        { $addToSet: { registrations: userId } }, // $addToSet avoids duplicates
        { new: true }
      ).populate("registrations", "name email mobile");
  
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
  
      res.json({ message: "Registered successfully", event });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ error: err.message });
    }
  });
  
  app.get("/events/:id/registrations", async (req, res) => {
    try {
      const event = await Events.findById(req.params.id).populate("registrations", "name email m_no");
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event.registrations); // return only the registrations
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // get all organizers with their event counts
app.get("/organizers", async (req, res) => {
    try {
      // find all admins
      const admins = await User.find({ role: "admin" }).lean();
  
      // fetch all events grouped by organizer
      const events = await Events.aggregate([
        { $group: { _id: "$organizer", count: { $sum: 1 } } }
      ]);
  
      // map counts to admins
      const eventsMap = {};
      events.forEach(ev => {
        eventsMap[ev._id.toString()] = ev.count;
      });
  
      const result = admins.map(admin => ({
        name: admin.name,
        email: admin.email,
        m_no: admin.m_no,
        noe: eventsMap[admin._id.toString()] || 0 // number of events
      }));
  
      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  });
  
  