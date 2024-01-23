function doGet(e) {
  var x = HtmlService.createTemplateFromFile("index");
  var y = x.evaluate();
  var z = y.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return z;
}

function checkLogin(username, password) {
  var url = '//// Paste Here you Google Sheet Complete URL/////';
  var ss = SpreadsheetApp.openByUrl(url);
  var webAppSheet = ss.getSheetByName("DATA");
  var getLastRow = webAppSheet.getLastRow();
  var found_record = '';

  for (var i = 1; i <= getLastRow; i++) {
    if (webAppSheet.getRange(i, 1).getValue().toUpperCase() == username.toUpperCase() && 
        webAppSheet.getRange(i, 2).getValue().toUpperCase() == password.toUpperCase()) {
      var userRecord = webAppSheet.getRange(i, 5).getValue(); // Assuming URL is in column E
      if (userRecord) {
        return { result: 'TRUE', url: userRecord };
      }
    }
  }

  return { result: 'FALSE', url: '' };
}

function AddRecord(usernamee, passwordd, email, phone) {
  var url = '//// Paste Here you Google Sheet Complete URL/////';
  var ss = SpreadsheetApp.openByUrl(url);
  var webAppSheet = ss.getSheetByName("DATA");
  webAppSheet.appendRow([usernamee, passwordd, email, phone, '']); // Empty URL initially
}

function doPost(e) {
  var formData = JSON.parse(e.postData.contents);
  var username = formData.username;
  var password = formData.password;
  var email = formData.email;
  var phone = formData.phone;

  AddRecord(username, password, email, phone);

  return ContentService.createTextOutput("Record added successfully.");
}
