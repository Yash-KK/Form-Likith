import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma.js";
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

app.get("/health", (req, res) => {
  res.json({
    status: true,
    message: "all good",
  });
});

app.post("/submit-form", async (req, res) => {
  try {
    const { formData } = req.body;
    await prisma.voterDetails.create({
      data: { ...formData },
    });

    res.json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ success: false, message: "Submission failed." });
  }
});

app.get("/find-form", async (req, res) => {
  const { acno } = req.query;
  try {
    const formData = await prisma.voterDetails.findMany({
      where: { acno: acno },
    });

    if (formData.length > 0) {
      res.json({ success: true, formData });
    } else {
      res.json({ success: false, message: "No data found." });
    }
  } catch (error) {
    console.error("Error fetching form data:", error);
    res.status(500).json({ success: false, message: "Fetch failed." });
  }
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
