# Default Config

This directory contains the default config files.

Copy the files found here to the parent directory [`app/config`](../) and remove `_default_` from the names of the new files. 

Sensitive config settings (database server URL, express session secret, etc.) can then be added to the new files, as they will be ignored by version control. 

Edit `settings.js` and add your VirusTotal API key under the field `apiKey`.
Edit `database.js` and add your MongoDB url to the field `databaseUrl` (replace the local host one if necessary). Then add your database name to the field `databaseName`.