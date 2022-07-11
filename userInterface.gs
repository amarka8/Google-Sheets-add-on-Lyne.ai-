function interface() {
  let ui=SpreadsheetApp.getUi();
  ui.createMenu('Lead Formatter').addItem('Format Lead Sheets', 'emailEditor' ).addToUi();
  ///user input into item from new data
}
function emailEditor() {
  var app=SpreadsheetApp;
  var spreadsheet=app.getActiveSpreadsheet().getSheets().length;
  var newSht=app.getActiveSpreadsheet().insertSheet('Linkedin Only',spreadsheet+1);
  ///insert columns into this sheet
  // Logger.log(newSht.getDataRange().getValues().length)
  // Logger.log(begin);
  // Logger.log(spreadsheet)
  for (i=0;i<spreadsheet;i++){
    var shts=app.getActiveSpreadsheet().getSheets()[i];
    var originalData=shts.getDataRange().getValues();
    // Logger.log(originalData)
    var newDataNoEmail=originalData.filter(function(item){
      return item[5]===''; //user declared input here
      });
    // Logger.log(newData.length);
    ///delete rows with that criteria and reformat
    var newDataEmail=originalData.filter(function(item){
      return item[5]!=''; //user declared input here
      });
    if (newDataNoEmail.length!=0){
      var deleter=originalData.length-newDataEmail.length;
      // Logger.log(deleter)
      var begin=newSht.getDataRange().getValues().length;
      newSht.getRange(begin+1,1,newDataNoEmail.length,newDataNoEmail[0].length).setValues(newDataNoEmail);
      shts.getRange(1,1,newDataEmail.length,newDataEmail[0].length).setValues(newDataEmail);
      shts.deleteRows(newDataEmail.length+1,deleter)
      //delete rest of shts (use newDataEmail.length and deleter)
    }
  }
///check if newSHt actually has values otherwise delete
}