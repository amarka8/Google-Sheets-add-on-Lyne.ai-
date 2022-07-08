function emailColumn() {
  var mainSheet=SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var linkSheet=SpreadsheetApp.getActiveSpreadsheet().getSheets()[1];
  // Logger.log(' main sheet method result = '+mainSheet.getName());
  var mainLastRow=mainSheet.getLastRow();
  for (var i=2; i<mainLastRow+1;i++) {
    // will need to have a user input here to declare which column string to edit
    var emailVal=mainSheet.getRange('F'+ String(i)).getValue();
      if (emailVal=="") {
        // Logger.log('F'+String(i));
        
      }
  }
}

