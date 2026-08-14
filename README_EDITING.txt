CRAFTY DAZZLE — EDITING GUIDE
==============================

THERE ARE NOW TWO WAYS TO EDIT THIS SITE
-----------------------------------------
1) THE ADMIN PANEL (recommended — no code, works from your phone or laptop)
2) EDITING THE FILES DIRECTLY (the old way, still works)


===========================================================
PART 1 — SET UP THE ADMIN PANEL (ONE-TIME, ~10 MINUTES)
===========================================================

This site now has a built-in admin editor at:  yoursite.com/admin

You'll log in there and change any text or photo. Saving updates the live
site automatically within about a minute. To turn this on:

STEP 1 — Make sure the site is connected to a Git repository (GitHub,
GitLab or Bitbucket), not just a manually dragged-and-dropped folder.
  - In Netlify: Site settings → Build & deploy → check it's linked to a repo.
  - If your site was uploaded as a plain folder, create a free GitHub
    repository, push these files to it, then in Netlify choose
    "Import an existing project" and connect that repo. (Ask me and I can
    walk you through this step by step.)

STEP 2 — Turn on Netlify Identity (this is what powers your admin login):
  - In your Netlify dashboard, open this site.
  - Go to: Site configuration → Identity → Enable Identity.
  - Under Registration preferences, set it to "Invite only" (so strangers
    can't sign themselves up).

STEP 3 — Turn on Git Gateway (this lets Identity save changes back to
your site's files):
  - Still in Identity settings, scroll to Services → Git Gateway → Enable.

STEP 4 — Invite yourself as the admin:
  - Identity tab → Invite users → enter your email.
  - You'll get an email invite — click it, set a password.

STEP 5 — Log in:
  - Go to yoursite.com/admin
  - Log in with the email + password you just set.

That's it. From then on:
  - Click any section (Hero, About, Products, Collections, Gallery,
    Services, Contact, Footer) to edit its text.
  - Click an image field to upload a NEW photo straight from your device —
    it replaces the old one automatically.
  - Click "Publish" (or "Save") and the live site updates itself shortly
    after — no file uploads, no code, no Netlify redeploy button needed.

A LINK TO THE ADMIN PANEL is also in the site's footer ("Site Admin"),
so you can always find your way back in.


===========================================================
PART 2 — EDITING THE FILES DIRECTLY (fallback / advanced)
===========================================================

FILES
-----
index.html            = page structure (rarely needs touching now)
styles.css             = colours, layout, fonts, animations
script.js               = loads content, builds the page, handles the
                          lightbox, mobile menu and animations
content/site-content.json = ALL editable text + image filenames in one
                          place — the admin panel edits this file for you
images/                = your product photographs
admin/                 = the admin panel (config.yml + index.html)

HOW TO CHANGE A PRODUCT (by hand)
----------------------------------
Open content/site-content.json, find the "products" list, and edit any
product's "name", "category", "description" or "image" value.

HOW TO ADD A PRODUCT (by hand)
--------------------------------
Copy one product block inside "products" (the part between { and }),
add a comma after it, paste your new block, and change its four values.
Put the new photo in the images folder and point "image" at it, e.g.
"images/your-new-photo.jpg".

HOW TO CHANGE THE HERO IMAGE (by hand)
-----------------------------------------
Open content/site-content.json → "hero" → "image" and point it at a
different file in the images folder.

HOW TO CHANGE THE GALLERY PHOTOS (by hand)
---------------------------------------------
Open content/site-content.json → "gallery" → "images" and edit the list
the same way as products.

IMPORTANT: The website uses full natural images and a click-to-view
lightbox. Do not crop the source photos — the site displays the whole
image and scales it to fit.

HOW TO CHANGE WHATSAPP / INSTAGRAM (by hand)
------------------------------------------------
In content/site-content.json, edit "whatsapp" (country code + number,
no + or spaces) and "instagram".

HOW TO UPDATE NETLIFY (by hand, no admin panel)
----------------------------------------------------
1. Edit the files.
2. Keep index.html, styles.css, script.js, content/, admin/ and images/
   together.
3. Upload/redeploy the whole folder to Netlify.

NO PAID SOFTWARE REQUIRED FOR EITHER METHOD.
