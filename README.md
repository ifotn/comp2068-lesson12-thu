# comp2068-lesson12-thu
<h1>Full MEAN Stack SPA</h1>
<p>This app was built in COMP2068's Thursday class.</p>
<h3>Changes made to unbind the form from the Data List</h3>
<ul>
<li>The form and table are bound to different ng-models: <em>currentGame</em> and <em>games</em> respectively.</li>
<li>The Angular controller <em>selectGame</em> method, rather than binding to $scope.games, now calls a Factory method to look up 
the selected game from MongoDB.</li>
<li>Both the Angular factory and the Express controller now have methods that accept the _id of the selected game, query the database,
and pass back the result to the ng-model <em>currentGame</em>.</li>
<li>This way the form and table models are not directly bound.</li>
