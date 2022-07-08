function formatReport() {
  let sheet= SpreadsheetApp.getActiveSpreadsheet();
  let headers=sheet.getRange('A1:V1');
  let data=sheet.getDataRange();
  headers.setFontWeight('bold');
  headers.setFontColor('black');
  headers.setBackground('white');
  data.setFontFamily('Arial');
  data.setHorizontalAlignment('left');
  data.setBorder(true,null,true,null,true,false,'white',SpreadsheetApp.BorderStyle.DASHED);
  data.createFilter();
}
function onOpen() {
  let ui=SpreadsheetApp.getUi();
  ui.createMenu('Lead Formatter').addItem('Format Lead Sheets','formatReport').addToUi();
}
