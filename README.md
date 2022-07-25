# Google-Sheets-add-on-Lyne.ai
A google sheets add on that formats lead sheets using Google Apps Script

## Script contains 4 main functions
- removeDups() removes duplicates in a sheet with the filter, indexOf, and JSON.stringify array methods
- emailEditor() moves rows with no email into a separate sheet titled "Linkedin Only" with filter array method
- removeEmptyNames() deletes rows with empty first names
- modifyCompanyNames() highlights rows with company names greater than X characters (21 by default) and removes unneccessary company endings (LLC, .co, .ai, etc.)
