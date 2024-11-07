function fileAttendanceByPhone(phone) {
  var sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("attendance");
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == phone) {
      // Assuming phone number is in the first column
      var attendance = data[i][1]; // Assuming attendance is in the second column
      var prompt = data[i][3]; // Assuming prompt is in the fourth column
      if (!data[i][5]) {
        var result = curlOpenAI(prompt);
        sheet.getRange(i + 1, 5).setValue(result); // Set result to fifth column in sheet
      }

      return data[i][5];
    }
  }
}

function curlOpenAI(message) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer APIKEY",
    },
    payload: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    }),
  };
  var response = UrlFetchApp.fetch(
    "https://api.openai.com/v1/chat/completions",
    options
  );
  var result = JSON.parse(response.getContentText()).choices[0].message.content;
  return result;
}
