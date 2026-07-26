/**
 * AgriMechatronics Lab — Join LAB application receiver
 * Receives applications from the website form (GitHub Pages),
 * stores documents in Google Drive and details in a Google Sheet.
 *
 * Deploy: Extensions ▸ Apps Script is NOT needed — create at script.google.com.
 * See APPS-SCRIPT-SETUP.md for step-by-step instructions.
 */

var FOLDER_NAME = "AgriMechatronics Applications";
var SHEET_NAME = "AgriMechatronics Applications";

function doPost(e) {
  try {
    var p = e.parameter;
    var stamp = new Date();

    // 1. Drive folder (one subfolder per applicant)
    var root = getOrCreateFolder_(FOLDER_NAME);
    var sub = root.createFolder(
      (p.name || "Applicant") + " — " +
      Utilities.formatDate(stamp, Session.getScriptTimeZone(), "yyyy-MM-dd HH.mm")
    );

    // 2. Save uploaded documents
    var links = { cv: "", gre: "", ielts: "" };
    ["cv", "gre", "ielts"].forEach(function (k) {
      var data = p[k + "Data"], name = p[k + "Name"], type = p[k + "Type"];
      if (data && name) {
        var blob = Utilities.newBlob(
          Utilities.base64Decode(data),
          type || "application/octet-stream",
          name
        );
        links[k] = sub.createFile(blob).getUrl();
      }
    });

    // 3. Append a row to the spreadsheet
    var ss = getOrCreateSpreadsheet_(SHEET_NAME);
    var sheet = ss.getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Position", "Portfolio", "GitHub",
        "Research Interest Statement", "CV", "GRE", "IELTS", "Drive Folder"]);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([stamp, p.name || "", p.email || "", p.position || "",
      p.portfolio || "", p.github || "", p.statement || "",
      links.cv, links.gre, links.ielts, sub.getUrl()]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateFolder_(name) {
  var it = DriveApp.getFoldersByName(name);
  return it.hasNext() ? it.next() : DriveApp.createFolder(name);
}

function getOrCreateSpreadsheet_(name) {
  var files = DriveApp.getFilesByName(name);
  while (files.hasNext()) {
    var f = files.next();
    if (f.getMimeType() === MimeType.GOOGLE_SHEETS) return SpreadsheetApp.open(f);
  }
  return SpreadsheetApp.create(name);
}
