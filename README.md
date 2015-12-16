### Upartner

Navigate to upartner directory
#### packages
Install the required packages
```sh
pip install -r requirements.txt
```

#### database
 - Ensure that you have ``postgresql`` installed
 - Change the db settings specified in settings.py (``USER``, ``PASSWORD`` and ``PORT``) to yours
 - Create database and tables. First navigate to upartner_database
  - If you have ``PGPASSWORD`` env variable set run ``create_all.ba``t or ``create_all.sh`` (in them you also have to modify posgres user and port)
  - Otherwise, create the database from ``create/create_db.sql`` and then run the queries listed in ``create_tables.sql``

#### static files
Ensure that you have bower installed.
Navigate to ``static`` directory and run ``bower install``


---------------------------------------
#### notes
Partners can log in the application only ofter they are activated.
When this event occurs they recieve email with their username and password.
For the test purposes debugging SMTP server is used to send the mails.
In order to start it run the following command:
```sh
python -m smtpd -n -c DebuggingServer localhost:1025
```
