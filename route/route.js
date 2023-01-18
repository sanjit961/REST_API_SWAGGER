const express = require("express");
const Model = require("../Model/model");
const router = express.Router();
function paginatedResults() {
  return async (req, res, next) => {
    const page = req.query.page;
    const limit = req.query.limit;
    const skipIndex = (page - 1) * limit;
    const data = {};
    try {
      data.results = await Model.find()
        .sort({ _id: 1 })
        .limit(limit)
        .skip(skipIndex)
        .exec();
      res.paginatedResults = { page_no: page, data };
      next();
    } catch (e) {
      res.status(500).json({ message: "Error Occured" });
    }
  };
}
router.get("/users", paginatedResults(), (req, res) => {
  const result = res.paginatedResults;
  res.json({ Total: result.data.results.length, result });
});
router.post("/post", async (req, res) => {
  let email = req.query.email;
  let phone = req.query.phone;
  let hobby = req.query.hobby;
  let name = req.query.name;
  let username = req.query.username;
  let address = {
    city: req.query.city,
    street: req.query.street,
    pin: req.query.pin,
  };

  let skills = {
    softSkill: {
      softSkillOne: req.query.softSkillOne,
      softSkillTwo: req.query.softSkillTwo,
      softSkillThree: req.query.softSkillThree,
    },
    hardSkill: {
      hardSkillOne: req.query.hardSkillOne,
      hardSkillTwo: req.query.hardSkillTwo,
      hardSkillThree: req.query.hardSkillThree,
    },
  };

  let qualifications = {
    education: {
      school: req.query.school,
      diploma: req.query.diploma,
      degree: req.query.degree,
      masters: req.query.masters,
    },
    others: {
      sports: req.query.sports,
      extraCurricular: req.query.extraCurricular,
    },
  };
  let marksObtained = {
    HighSchoolExam: {
      MIL: req.query.MIL,
      English: req.query.English,
      Mathematics: req.query.Mathematics,
      AdvancedMaths: req.query.AdvancedMaths,
      SocialScience: req.query.SocialScience,
      GeneralScience: req.query.GeneralScience,
    },
  };
  const data = new Model({
    username: username,
    email: email,
    phone: phone,
    name: name,
    hobby: hobby,
    address: address,
    qualifications: qualifications,
    skills: skills,
    marksObtained: marksObtained,
  });

  try {
    const results = await data.save();
    res
      .status(200)
      .json({ Message: "User has been registered successfully!", results });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/comment", async (req, res) => {
  const comment = new Model({
    comment: req.body.comment,
  });
  try {
    const saveComment = await comment.save();
    res.status(200).json({ Message: "Comment posted success", saveComment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/getAllUsers", async (req, res) => {
  try {
    const data = await Model.find();
    const totalCounts = data.length;
    // res.json({ total: totalCounts, data });
    res.status(200).json({
      Message: "The data has been fetched successfully!",
      total: totalCounts,
      results: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/getById/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const data = await Model.findById(id);
    res.status(200).json({ results: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.patch("/update/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let email = req.query.email;
    let phone = req.query.phone;
    let hobby = req.query.hobby;
    let name = req.query.name;
    let username = req.query.username;
    let address = {
      city: req.query.city,
      street: req.query.street,
      pin: req.query.pin,
    };

    const updatedData = {
      username: username,
      email: email,
      phone: phone,
      name: name,
      hobby: hobby,
      address: address,
    };
    // const id = req.params.id;
    // const updatedData = req.body;
    const options = { new: true };
    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    res
      .status(200)
      .json({ Message: "The data has been updated!", results: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    // let id = req.query.id;
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send({message:`The user ${data.username} has been deleted!`});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/deleteAll", async (req, res) => {
  try {
    await Model.deleteMany();
    res.status(200).json({ message: "All the users have been deleted!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/filter", async (req, res) => {
  try {
    const data = await Model.find();
    const filter = req.query;
    const results = data.filter((user) => {
      let isValid = true;
      for (key in filter) {
        // isValid = isValid && user[key] == filters[key];
        isValid =
          isValid &&
          user[key]
            ?.toLocaleLowerCase()
            .includes(filter[key].toLocaleLowerCase());
      }
      return isValid;
    });
    res.send({
      Items_found: results.length,
      results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/sort", async (req, res) => {
  try {
    const sort = req.query.sort;
    const data = await Model.find();
    if (sort.toLocaleLowerCase() === "ascending") {
      res.json({ Total: data.length, data });
    } else if (sort.toLocaleLowerCase() === "descending") {
      const descending_order = data.reverse();
      res.json({ Total: descending_order.length, descending_order });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
