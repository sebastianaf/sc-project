import fs from "fs";
import log from "../config/log";

const logCheck = () => {
  try {
    let dir = log.folderPath;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      fs.writeFile(log.filePath, (err) => {
        if (err) throw err;
        console.log("Log file is created successfully.");
      });
    }
  } catch (error) {
    console.log(`Log File is NOT created. ${error}`);
  }
};

export { logCheck };
