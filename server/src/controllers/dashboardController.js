// Dashboard controller logic goes here
const getDashboardData = async (req, res) => {
  try {
    return res.status(200).json({ message: "Dashboard data" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  getDashboardData,
};
