function doGet(e){
  var mo = e.parameter.func;
  if(mo == "addData"){
    var stat = addData(e);
    if(stat == 1){
      var result = {
        status: true,
        name: e.parameter.name,
        email: e.parameter.email,
      };
    return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
    }
  }
}

function addData(e){
  var sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1ZhxO6mMSA3O9XLujLZ5ML4q6TV-_C-7T12cSyLY_qOs/edit#gid=0');
  
  var lastVal = sheet.getRange("A1:A").getValues();
  var id = lastVal.filter(String).length;
  
  var CurrentDate = new Date() ;  
  var Date_ = Utilities.formatDate(CurrentDate, "IST", "dd/MM/yyyy") ;
  var Time_ = Utilities.formatDate(CurrentDate, "IST", "HH:mm:ss") ;
 
  sheet.appendRow([id,Date_,Time_,e.parameter.email]);  

  return 1;
}
