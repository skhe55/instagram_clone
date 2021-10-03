<h1>Instagram Clone</h1>
<p>I created my first application similar to the social network instagram, the entire interface was written in react native, for storing data I chose firebase - a cloud database and redux.</p>
<h1>Features</h1>
<li>Authorize system</li>
<li>Post Images with descriptions.
  <ul>
    <ul>
      <li>Take pictures directly in application</li>
      <li>Choose from gallery</li>
    </ul>
  </ul>
</li>
<li>Profile page</li>
<li>Feed page</li>
<li>Follow/Unfollow users</li>
<li>Search users</li>
<li>Comment posts</li>
<li>Like posts</li>
<li>expo boilerplate</li>
<h1>Installation</h1>
<p>Install expo, if it fails run you might need to run this with sudo</p>
<li>npm install expo-cli --global</li><br>
<p>Install the needed packages while in the root folder of the project</p>
<li>npm install</li><br>
<p>Install firebase tools</p>
<li>npm install -g firebase-tools</li><br>
<p>Deploy the project to yout firebase projhect (make sure to have billing enabled for that project). copy the backend/functions/index.js into a different place</p>
<li>cd backend</li>
<li>firebase login</li>
<li>firebase init (choose functions, javascript, EsLint and install deplendencies)</li><br>
<p>Copy the index.js into the place of the new index.js</p>
<li>firebase deploy</li>
<h1>Usage</h1>
<p>To Start expo all you have to do is run this line</p>
<li>expo start</li>
<h1>Preview</h1>
![AuthorizateScreen](https://user-images.githubusercontent.com/72722478/135751046-b71655e3-8795-4c34-89fa-fbcea86400a7.png)
