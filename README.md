# Your Scanned Document
![Kunst scanning](https://img.shields.io/badge/kunst-scanning-green.svg)
[![Build Status](https://travis-ci.org/ollelauribostrom/your-scanned-document.svg?branch=master)](https://travis-ci.org/ollelauribostrom/your-scanned-document)
[![Coverage Status](https://coveralls.io/repos/github/ollelauribostrom/your-scanned-document/badge.svg?branch=master)](https://coveralls.io/github/ollelauribostrom/your-scanned-document?branch=master)

My friend [Felix Dahlström Persson](http://felixdahlstrom.com/) attends the Oslo National Academy of the Arts (Kunstakademiet). He sometimes uses the school's scanner to scan drawings that he makes. This repo contains a Node.js application that automatically recives and uploads these scanned drawings to [Felix portfolio](https://github.com/ollelauribostrom/dahlstrom).

**🖨️ Find out what is currently being scanned at [felixdahlstrom.com/scanned](https://felixdahlstrom.com/scanned-documents/)**

How does it work?
-----------------
Step 1. Felix makes a drawing.   
Step 2. Felix scans the drawing using the school's scanner.   
Step 3. The scanner sends the scanned document to a Gmail adress.   
Step 4. The application listens for new emails via [Google Cloud Pub/Sub](https://cloud.google.com/pubsub/).   
Step 5. The incoming email and the attached document is fetched using the [Gmail API](https://developers.google.com/gmail/api/).   
Step 6. The attached document is uploaded to [DatoCMS](datocms.com) to be displayed in Felix portfolio.  

Contributing
------------
All contributions are very much welcome. Feel free to [open an issue](https://github.com/ollelauribostrom/your-scanned-document/issues/new) or submit a PR if you can think of any way to improve this project.

License
-------
MIT