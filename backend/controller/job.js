const Job = require("../models/job");

const createJobPost = async (req, res) => {
  try {
    const {
      companyName,
      logoUrl,
      title,
      description,
      salary,
      location,
      duration,
      locationtype,
      skills,
    } = req.body;

    if (
      !companyName ||
      !logoUrl ||
      !title ||
      !description ||
      !salary ||
      !location ||
      !duration ||
      !locationtype ||
      !skills
    ) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    const jobDetails = new Job({
      companyName,
      logoUrl,
      title,
      description,
      salary,
      location,
      duration,
      locationtype,
      skills,
    });

    await jobDetails.save();
    res.json({ message: "Job created successfully" });
  } catch (error) {
    next(error);
  }
};

const getJobDetailsById = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;

    if (!jobId) {
      return res.status(404).json({
        errorMessage: "Bad Request",
      });
    }
    const jobDetails = await Job.findById(jobId);
    res.json({ data: jobDetails });
  } catch (error) {
    next(error);
  }
};

const updateJobDetailsById = async (req, res, next) => {
  try {
    const {
      companyName,
      logoUrl,
      title,
      description,
      salary,
      location,
      duration,
      locationtype,
    } = req.body;

    if (
      !companyName ||
      !logoUrl ||
      !title ||
      !description ||
      !salary ||
      !location ||
      !duration ||
      !locationtype
    ) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }
    const jobId = req.params.jobId;
    await Job.updateOne(
      ///filter on the field you want to update
      { _id: jobId },
      {
        ///fields which are to be updated
        $set: {
          companyName,
          logoUrl,
          title,
          description,
          salary,
          location,
          duration,
          locationtype,
        },
      }
    );
    res.json({ message: "Job details updated successfully" });
  } catch (error) {
    next(error);
  }
};

const getAllJobs = async (req, res, next) => {
  try {
    const skills = req.query.skills;
    const title = req.query.title || "";

    let formattedSkills;
    if (skills) {
      formattedSkills = skills.split(",");
    }

    const jobList = await Job.find(
      {
        title: { $regex: title, $options: "i" },
        skills: { $in: formattedSkills }, //in operator
      },
      { title: 1, salary: 1, logoUrl: 1, location: 1 }
    );

    res.json({ data: jobList });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createJobPost,
  getJobDetailsById,
  updateJobDetailsById,
  getAllJobs,
};