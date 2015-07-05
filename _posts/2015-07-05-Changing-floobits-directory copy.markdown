---
layout: post
title:  "Changing a local floobits workspace directory"
date:   2015-07-05
categories: floobits directory
---
<p>When you first connect to a floobits workspace, you get the option to select the directory that the files will download to.
</p>
![sublime-floobits-directory](/assets/01/sublime-floobits-directory.png)

<p class="body">
Once you choose this directory, the files will automatically be downloaded there every time you reconnect to the workspace.  To change this directory, you'll have to go into the floobits system files.  For me, these were located at /Users/ericking/floobits.
</p>
![finder-floobits-directory](/assets/01/finder-floobits-directory.png)

<p class="body">
You <em>can</em> delete the persistent.json file: floobits will generate a new persistent.json when you reconnect and will then ask you for a new directory.  This isn't the best option if you have many workspaces, because you'll have to reconfigure each one when you connect to it.  Just open up the persistent.json file in your editor and you can change the path.
</p>
![sublime-persistent-json](/assets/01/sublime-persistent-json.png)

<p class="body">
Summary: To change a floobits workspace directory.
<ol>
<li>Find your floobits system file directory /Users/yourUserName/floobits (could be different for you).</li>
<li>Either</li>
<ul>
<li>Delete persistent.json   OR:</li>
<li>Change the path: for the workspace within the persistent.json file</li>
</ul>
</ol>
</p>