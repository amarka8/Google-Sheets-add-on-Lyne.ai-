function removeDups () {
  var app=SpreadsheetApp;
  var spreadsheet=app.getActiveSpreadsheet().getSheets().length;
  for (i=0;i<spreadsheet;i++){
    // Logger.log(i);
    var shts=app.getActiveSpreadsheet().getSheets()[i];
    var vals=shts.getDataRange().getValues();
    for (z=0;z<vals.length;z++){
      vals[z]=JSON.stringify(vals[z]);
    }
    // Logger.log(vals);
    var noDups=vals.filter((val,idx) => vals.indexOf(val)===idx);
    // Logger.log(noDups.length);
    for (a=0;a<noDups.length;a++){
      noDups[a]=JSON.parse(noDups[a]);
    }
    var deleter=vals.length-noDups.length;
    if (deleter!=0){
      // Logger.log('duplicates')
      // Logger.log(deleter);
      // var begin=vals.length;
      // PROBLEMS-different row lengths? test it out.
      shts.getRange(1,1,noDups.length,noDups[0].length).setValues(noDups);
      // shts.getRange(1,1,newDataEmail.length,newDataEmail[0].length).setValues(newDataEmail);
      shts.deleteRows(noDups.length,deleter);
    }
  }
}
  
