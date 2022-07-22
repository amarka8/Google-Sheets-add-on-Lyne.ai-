function onOpen() {
  interface();
}

function interface() {
  SpreadsheetApp.getUi()
  .createMenu('Another Lead Formatter')
  .addItem('Format sheets','formatSheetsPrompt')
  .addToUi();
}

function formatSheetsPrompt() {
  removeEmptyNames();
  modifyCompanyNames();
}

function letterToColumn(letter)
{
  var column = 0, length = letter.length;
  for (var i = 0; i < length; i++)
  {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
}

function containsAny(str, items){
    for(var i in items){
        var item = items[i];
        if (str.indexOf(item) > -1){
            return true;
        }
    }
    return false;
}

// Removes leads with empty first or last names
function removeEmptyNames() {
  var app = SpreadsheetApp;
  var ui = SpreadsheetApp.getUi();
  //var sheet = SpreadsheetApp.getActiveSheet();
  var sheets = SpreadsheetApp.getActive().getSheets();

  var input = ui.prompt('Enter Column Letter with First Names:',ui.ButtonSet.OK_CANCEL);
  if (input.getSelectedButton() == ui.Button.OK) {
    var col = letterToColumn(input.getResponseText().toUpperCase());
    sheets.forEach(sheet=> {
      var data = sheet.getDataRange().getValues();
      for (var i = 1; i < data.length; i++) {
        if (sheet.getRange(i, col).isBlank()) {
          sheet.deleteRow(i);
        }
      }
    });
  }

  var input = ui.prompt('Enter Column Letter with Last Names:',ui.ButtonSet.OK_CANCEL);
  if (input.getSelectedButton() == ui.Button.OK) {
    var col = letterToColumn(input.getResponseText().toUpperCase());
    sheets.forEach(sheet=> {
      var data = sheet.getDataRange().getValues();
      for (var i = 1; i < data.length; i++) {
        if (sheet.getRange(i, col).isBlank()) {
          sheet.deleteRow(i);
        }
      }
    });
  }

}

// Highlights leads with long company names and appends uneccesary endings
function modifyCompanyNames() {
  var app = SpreadsheetApp;
  var ui = SpreadsheetApp.getUi();
  //var sheet = SpreadsheetApp.getActiveSheet();
  var sheets = SpreadsheetApp.getActive().getSheets();
  

  var input = ui.prompt('Enter Column Letter with Company Names:',ui.ButtonSet.OK_CANCEL);
  if (input.getSelectedButton() == ui.Button.OK) {
    var col = letterToColumn(input.getResponseText().toUpperCase());
    sheets.forEach(sheet=>{
      var data = sheet.getDataRange().getValues();
      var i = 1;
      while (i < data.length) {
        //Logger.log(data[i][col - 1]);
        sheet.getRange(i, col).setValue(sheet.getRange(i, col).getValue().replaceAll(/.co|.io|.net|LLC|.com|.ai|.org|, Inc./gi, ""));
        i++
      }
      i = 1;
      while (i < data.length) {
        if (data[i][col - 1].length > 17) {
          Logger.log(data[i][col-1] + " : too long");
          sheet.getRange(i + 1, col).setBackground('red');
        }
        i++
      }
    });
  }
}
