# Join LAB form — Google Apps Script setup (~10 minutes, free)

After this setup, every application submitted on the website lands in:
- **Google Drive** → folder "AgriMechatronics Applications" → one subfolder per applicant with their CV / GRE / IELTS files
- **Google Sheet** → "AgriMechatronics Applications" → one row per applicant with all details + links to their files

## Steps

1. Go to **script.google.com** (signed into your Google account) → **New project**.
2. Delete the placeholder code and paste in the entire contents of **`apps-script/Code.gs`** (in this folder). Save (Ctrl/Cmd+S), name it e.g. "AgriMech Applications".
3. Click **Deploy → New deployment**.
4. Click the gear icon next to "Select type" → choose **Web app**.
5. Set:
   - Description: anything
   - **Execute as: Me**
   - **Who has access: Anyone**
6. Click **Deploy** → authorize when prompted (Advanced → Go to project if Google warns; it's your own script) → copy the **Web app URL** (looks like `https://script.google.com/macros/s/AKfy.../exec`).
7. Open **`index.html`** in this folder, find this line near the top of the script section:

   ```js
   APPS_SCRIPT_URL = "";
   ```

   Paste your URL between the quotes:

   ```js
   APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfy.../exec";
   ```

8. Commit/upload the updated `index.html` to your GitHub repo. Done.

## Notes

- Until the URL is pasted in, the form falls back to opening the applicant's email app (mailto) — nothing breaks.
- File limit is 10 MB per document (enforced by the form).
- To change where things are stored, edit `FOLDER_NAME` / `SHEET_NAME` at the top of Code.gs.
- If you later edit Code.gs, use **Deploy → Manage deployments → ✏️ → New version** so the same URL keeps working.
