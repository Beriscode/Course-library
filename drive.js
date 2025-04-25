// Google Drive integration logic here
// Placeholder setup for Google Drive API
const CLIENT_ID = "335136086233-b5tvv7va336fh9638cvttm94bhitsou1.apps.googleusercontent.com";
const API_KEY = "AIzaSyDzCh1U3XcioELvANvf7ODZKDDoZ3rJ32E"; // Replace this with your real API key
const SCOPES = "https://www.googleapis.com/auth/drive.file";

let tokenClient;
let accessToken = null;

function initDriveAPI() {
  gapi.load("client", async () => {
    await gapi.client.init({ apiKey: API_KEY });
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (tokenResponse) => {
        accessToken = tokenResponse.access_token;
        alert("Google Drive authenticated.");
      },
    });
    tokenClient.requestAccessToken();
  });
}

function handleDriveUpload() {
  if (!accessToken) {
    initDriveAPI();
    return;
  }
  const fileContent = new Blob(["Hello from Course Library!"], { type: "text/plain" });
  const metadata = { name: "CourseFile.txt", mimeType: "text/plain" };

  const form = new FormData();
  form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
  form.append("file", fileContent);

  fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
    method: "POST",
    headers: new Headers({ Authorization: `Bearer ${accessToken}` }),
    body: form,
  })
    .then((res) => res.json())
    .then((data) => {
      alert("File uploaded: " + data.name);
    })
    .catch((err) => {
      console.error("Upload error:", err);
      alert("Upload failed.");
    });
}

function openDrivePicker() {
  if (!accessToken) {
    initDriveAPI();
    return;
  }
  alert("Drive Picker UI coming soon.");
}
