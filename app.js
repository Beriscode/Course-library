// Updated JavaScript with Drive Picker and Upload
function handleCredentialResponse(response) {
  console.log("User signed in:", response);
}

window.onload = () => {
  google.accounts.id.initialize({
    client_id: "335136086233-b5tvv7va336fh9638cvttm94bhitsou1.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("signin"),
    { theme: "outline", size: "large" }
  );
};

function handleDriveUpload() {
  alert("Drive Upload clicked (placeholder) — Google Drive upload will go here.");
}

function openDrivePicker() {
  alert("Drive Picker opened (placeholder) — Drive file selector will go here.");
}