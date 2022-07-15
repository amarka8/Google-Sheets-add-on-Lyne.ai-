//PROBLEM- need user input when u access menu  (maybe add a prompt thing in the menu and call it "email?")

function interface() {
  var ui=SpreadsheetApp.getUi();
  var leadFormatter=ui.createMenu('Lead Formatter');
  leadFormatter.addItem('Create new sheet for rows with no email', 'emailEditor' );
  leadFormatter.addToUi();
}

function onOpen(){
  interface();
}

function emailEditor() {
  var ui=SpreadsheetApp.getUi();
  var input=ui.prompt('Enter Column Letter with Email data: ');
  // if (input.getSelectedButton()== ui.Button.OK){
  //ask them if they want u to add a cancel option
  var colDict={ "A":0,"B":1,"C":2,"D":3,"E":4,"F":5,"G":6,"H":7,"I":8,"J":9,"K":10,"L":11,"M":12,"N":13,"O":14,"P":15,"Q":16,"R":17,"S":18,"T":19,"U":20,"V":21,"W":22,"X":23,"Y":24,"Z":25};
  var app=SpreadsheetApp;
  var sht1=app.getActiveSpreadsheet().getSheets()[0];
  var spreadsheet=app.getActiveSpreadsheet().getSheets().length;
  var row1=[sht1.getDataRange().getValues()[0]];
  var newSht=app.getActiveSpreadsheet().insertSheet('Linkedin Only',spreadsheet+1);
  //PROBLEMS-different columns in each? and why do u need this? use a filter.
  newSht.getRange(1,1,1,row1[0].length).setValues(row1);
  for (i=0;i<spreadsheet;i++){
    var shts=app.getActiveSpreadsheet().getSheets()[i];
    var originalData=shts.getDataRange().getValues();
    var newDataNoEmail=originalData.filter(function(item){
      return item[colDict[input.getResponseText().toUpperCase()]]==='' ; //input here
      });
    var newDataEmail=originalData.filter(function(item){
      return item[colDict[input.getResponseText()]]!=''; //input here
      });
    if (newDataNoEmail.length!=0){
      var deleter=originalData.length-newDataEmail.length;
      var begin=newSht.getDataRange().getValues().length;
      //PROBLEMS-different row lengths? test it out.
      newSht.getRange(begin+1,1,newDataNoEmail.length,newDataNoEmail[0].length).setValues(newDataNoEmail);
      shts.getRange(1,1,newDataEmail.length,newDataEmail[0].length).setValues(newDataEmail);
      shts.deleteRows(newDataEmail.length+1,deleter);
    }
  }
  //shouldn't need this if u have a filter
  var ss=app.getActiveSpreadsheet();
  var sht2=ss.getSheets()[4];
  if (sht2.getDataRange().getValues().length===1){
    ss.deleteSheet(sht2);
  }
  // }
}