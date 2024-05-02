const {
  getAllLaunches,
  scheduleNewLaunch,
  existLaunchWithId,
  abortLauchById,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddnewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    console.log(launch, "dddd");
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  //if launch dosen't exist
  if (!existLaunchWithId(launchId)) {
    return res.status(400).json({
      error: "launch not found",
    });
  }

  const aborted = abortLauchById(launchId);

  //if launch dosen't exist
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddnewLaunch,
  scheduleNewLaunch,
  httpAbortLaunch,
};
