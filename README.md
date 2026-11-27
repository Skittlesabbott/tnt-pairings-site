# TnT Pairings website

A plain HTML site with a tiny Node.js server so it can run on Laravel Cloud.

```
public/            ← the website itself
  index.html
  favicon.svg
  images/          ← the 7 photos
server.js          ← serves the public/ folder (no dependencies)
package.json       ← tells Laravel Cloud this is a Node.js app ("npm start")
package-lock.json
```

To edit the site, change `public/index.html` or swap photos in `public/images/`
(keep the same file names, or update the names in index.html).

## 1. Put it on GitHub

1. Go to github.com/new, name the repo `tnt-pairings-site`, set it to **Private**, and create it.
2. On the empty repo page, click **uploading an existing file**.
3. Drag in **everything inside this folder** (not the folder itself): `public`, `server.js`,
   `package.json`, `package-lock.json`, `README.md`, `.gitignore`.
   `package.json` must end up at the top level of the repo.
4. Click **Commit changes**.

Tip: `.gitignore` starts with a dot, so your computer may hide it. It's optional, so skipping it is fine.

## 2. Deploy on Laravel Cloud

1. Laravel Cloud dashboard → **+ New application**.
2. Connect GitHub and give Laravel Cloud access to the `tnt-pairings-site` repo.
3. Pick the repo, name the app, pick a US region → **Create application**.
4. It should detect a **Node.js** app. Check:
   - Build command: `npm ci --audit false`
   - Start command: `npm start` (or `node server.js`)
5. **Deploy**. Open the free URL Cloud gives you and check every section on desktop and phone.

Every later change to the GitHub repo can redeploy the site (turn on push-to-deploy
in the environment settings, or click Deploy).

## 3. Point tntpairings.com at it (only once step 2 looks right)

1. **Before changing anything**, screenshot every DNS record for tntpairings.com where the
   domain is managed. The **MX** and **TXT** records are what make troy@tntpairings.com
   email work. Don't delete them.
2. In Laravel Cloud, add `tntpairings.com` (and `www.tntpairings.com`) as a custom domain
   on the environment. It will show the DNS records to add.
3. Add those records at your DNS provider, replacing only the records that currently point
   the website at Lovable.
4. Remove the custom domain from the Lovable project so the two hosts don't conflict.
5. Wait for DNS and HTTPS to finish (minutes, sometimes a few hours).

## The booking form

Right now the form opens the visitor's email app with their answers addressed to
troy@tntpairings.com. That works, but it isn't seamless. To receive submissions directly,
sign up for a form service such as Formspree, then replace the `action="mailto:..."` on the
`<form>` tag in `public/index.html` with the URL it gives you, and remove
`enctype="text/plain"`.
