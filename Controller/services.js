const { google } = require("googleapis");

const getPosts = async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1oyv6JmL1S4UL0JJ8ttEh932n54J4qqNXS3Tid4kbZ_4";

  try {
    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Sheet1!A:D",
    });
    res.status(200).json(getRows.data.values);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log("error" + error.message);
  }
};

const createPosts = async (req, res) => {
  const { name, age, salary, hobby } = req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1oyv6JmL1S4UL0JJ8ttEh932n54J4qqNXS3Tid4kbZ_4";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[name, age, salary, hobby]],
    },
  });

  res.send("Successfully submitted! Thank you!");
};
const UpdatePosts = async (req, res) => {
  const { name, age, salary, hobby } = req.body;
  console.log("req.body", req.body);
  const { range } = req.params;
  console.log("range", range);

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1oyv6JmL1S4UL0JJ8ttEh932n54J4qqNXS3Tid4kbZ_4";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: range,
    valueInputOption: "USER_ENTERED",
    resource: {
        majorDimension: "ROWS",
      values: [[name, age, salary, hobby]],
    },
  });

  res.send("Successfully submitted! Thank you!");
};
const clearPosts = async (req, res) => {
  const { range } = req.params;
  console.log("range", range);

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1oyv6JmL1S4UL0JJ8ttEh932n54J4qqNXS3Tid4kbZ_4";

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.clear({
    auth,
    spreadsheetId,
    range: range,
  });

  res.send("Successfully submitted! Thank you!");
};

module.exports = { getPosts, createPosts, clearPosts, UpdatePosts };
