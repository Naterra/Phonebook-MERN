# Phonebook - MERN App 

<b><a target="_blank" href="https://phonebook-mern.herokuapp.com">Demo</a></b>


<img width="1075" alt="screen shot 2018-01-12 at 2 30 03 pm" src="https://user-images.githubusercontent.com/8204364/34891950-6b17fe48-f7a5-11e7-9e6e-ad14e68b0cf9.png">


This App was build using MERN stack (Mongo/Express/React/Node).

## How to start

1. Clone App to your working directory
<pre>
<code>git clone https://github.com/Naterra/phonebook_mern.git && cd phonebook_mern
</code></pre>

2. Install modules
<pre>
<code>npm install
cd client && npm install
cd ..
</code></pre>

3. Edit config file.<br>
Rename config/dev.dist.js to be dev.js and insert you database settings

4. Run App on Dev Server

<pre>
<code>npm run dev
</code></pre>
Your App will be automatically opened at localhost:3000

## Deployment

1. Download and install the <a href="https://devcenter.heroku.com/articles/heroku-command-line">Heroku CLI</a>.

<pre>
<code>heroku login</code>
</pre>

2. Initialize a git repository 
<pre>
<code>cd my-project-name/
git init
heroku git:remote -a my-project-name</code>
</pre>
 
3. Deploy your changes
 
<pre>
<code>git add .
git commit -am "make it better"
git push heroku master
heroku open</code>
</pre>

## Generate data
Refill your database with data using Faker API.
Open http://yourapp.com/api/generate-fake-data and get 50 records in DB.

