

function interface() {
  var ui=SpreadsheetApp.getUi();
  var leadFormatter=ui.createMenu('Lead Formatter');
  leadFormatter.addItem('Format sheets','both');
  leadFormatter.addToUi();
}

function onOpen(){
  interface();
}

function both(){
  removeDups();
  emailEditor();
}

function removeDups () {
  var app=SpreadsheetApp;
  var spreadsheet=app.getActiveSpreadsheet().getSheets().length;
  for (i=0;i<spreadsheet;i++){
    var shts=app.getActiveSpreadsheet().getSheets()[i];
    var vals=shts.getDataRange().getValues();
    for (z=0;z<vals.length;z++){
      vals[z]=JSON.stringify(vals[z]);
    }
    var noDups=vals.filter((val,idx) => vals.indexOf(val)===idx);
    for (a=0;a<noDups.length;a++){
      noDups[a]=JSON.parse(noDups[a]);
    }
    var deleter=vals.length-noDups.length;
    if (deleter!=0){
      shts.getRange(1,1,noDups.length,noDups[0].length).setValues(noDups);
      shts.deleteRows(noDups.length+1,deleter);
    }
  }
}

function emailEditor() {
  var ui=SpreadsheetApp.getUi();
  var input=ui.prompt('Enter Column Letter with Email data or press cancel: ',ui.ButtonSet.OK_CANCEL);


  if (input.getSelectedButton()== ui.Button.OK){
  var column = 0;
  var colLetter=input.getResponseText().toUpperCase();
  for (var i = 0; i < colLetter.length; i++)
  {
    column += ((colLetter.charCodeAt(i) - 64) * Math.pow(26,i));
  }
  column=column-1;


  var app=SpreadsheetApp;
  var sht1=app.getActiveSpreadsheet().getSheets()[0];
  var spreadsheet=app.getActiveSpreadsheet().getSheets().length;
  var row1=[sht1.getDataRange().getValues()[0]];
  var newSht=app.getActiveSpreadsheet().insertSheet('Linkedin Only',spreadsheet+1);
  newSht.getRange(1,1,1,row1[0].length).setValues(row1);


  for (i=0;i<spreadsheet;i++){
    var shts=app.getActiveSpreadsheet().getSheets()[i];
    var originalData=shts.getDataRange().getValues();
    var newDataNoEmail=originalData.filter(item => item[column]==='');
    var newDataEmail=originalData.filter(item => item[column]!='');
    if (newDataNoEmail.length!=0){
      
    }
    if (newDataNoEmail.length!=0){
      var deleter=originalData.length-newDataEmail.length;
      var begin=newSht.getDataRange().getValues().length;
      newSht.getRange(begin+1,1,newDataNoEmail.length,newDataNoEmail[0].length).setValues(newDataNoEmail);
      shts.getRange(1,1,newDataEmail.length,newDataEmail[0].length).setValues(newDataEmail);
      shts.deleteRows(newDataEmail.length+1,deleter);
    }
  }

  
  var ss=app.getActiveSpreadsheet();
  var sht2=ss.getSheetByName("Linkedin Only");
  if (sht2.getDataRange().getValues().length===1){
    ss.deleteSheet(sht2);
  }
  }
}