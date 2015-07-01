angular.module('petroApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/account/login/login.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><div class=col-md-3></div><div class=\"row login-row col-md-6\"><h1>Login</h1><!-- <p>Accounts are reset on server restart from <code>server/config/seed.js</code>. Default account is <code>test@test.com</code> / <code>test</code></p>\n" +
    "    <p>Admin account is <code>admin@admin.com</code> / <code>admin</code></p> --><form class=form name=form ng-submit=login(form) novalidate><div class=form-group><input type=email name=email class=form-control ng-model=user.email placeholder=\"Email address\" required></div><div class=form-group><input type=password name=password class=form-control ng-model=user.password placeholder=Password required></div><div class=\"form-group has-error\"><p class=help-block ng-show=\"form.email.$error.required && form.password.$error.required && submitted\">Please enter your email and password.</p><p class=help-block ng-show=\"form.email.$error.email && submitted\">Please enter a valid email.</p><p class=help-block>{{ errors.other }}</p></div><div><button class=\"btn btn-primary btn-lg btn-login\" type=submit>Login</button><!-- <a class=\"btn btn-default btn-lg btn-register\" href=\"/signup\">\n" +
    "          Register\n" +
    "        </a> --></div><!--\n" +
    "        <hr>\n" +
    "        <div>\n" +
    "          <a class=\"btn btn-facebook\" href=\"\" ng-click=\"loginOauth('facebook')\">\n" +
    "            <i class=\"fa fa-facebook\"></i> Connect with Facebook\n" +
    "          </a>\n" +
    "          <a class=\"btn btn-google-plus\" href=\"\" ng-click=\"loginOauth('google')\">\n" +
    "            <i class=\"fa fa-google-plus\"></i> Connect with Google+\n" +
    "          </a>\n" +
    "          <a class=\"btn btn-twitter\" href=\"\" ng-click=\"loginOauth('twitter')\">\n" +
    "            <i class=\"fa fa-twitter\"></i> Connect with Twitter\n" +
    "          </a>\n" +
    "        </div> --></form><hr></div><div class=col-md-3></div></div>"
  );


  $templateCache.put('app/account/settings/settings.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><div class=row><div class=col-sm-12><h1>Change Password</h1></div><div class=col-sm-12><form class=form name=form ng-submit=changePassword(form) novalidate><div class=form-group><label>Current Password</label><input type=password name=password class=form-control ng-model=user.oldPassword mongoose-error><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.other }}</p></div><div class=form-group><label>New Password</label><input type=password name=newPassword class=form-control ng-model=user.newPassword ng-minlength=3 required><p class=help-block ng-show=\"(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || submitted)\">Password must be at least 3 characters.</p></div><p class=help-block>{{ message }}</p><button class=\"btn btn-lg btn-primary\" type=submit>Save changes</button></form></div></div></div>"
  );


  $templateCache.put('app/account/signup/signup.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><div class=col-md-3></div><div class=\"row col-md-6\"><div class=col-sm-12><h1>Sign up</h1></div><div class=col-sm-12><form class=form name=form ng-submit=register(form) novalidate><div class=form-group ng-class=\"{ 'has-success': form.name.$valid && submitted,\n" +
    "                                            'has-error': form.name.$invalid && submitted }\"><input name=name class=form-control ng-model=user.name placeholder=\"Your Name\" required><p class=help-block ng-show=\"form.name.$error.required && submitted\">A name is required</p></div><div class=form-group ng-class=\"{ 'has-success': form.email.$valid && submitted,\n" +
    "                                            'has-error': form.email.$invalid && submitted }\"><input type=email name=email class=form-control ng-model=user.email placeholder=\"Email address\" required mongoose-error><p class=help-block ng-show=\"form.email.$error.email && submitted\">Doesn't look like a valid email.</p><p class=help-block ng-show=\"form.email.$error.required && submitted\">What's your email address?</p><p class=help-block ng-show=form.email.$error.mongoose>{{ errors.email }}</p></div><div class=form-group ng-class=\"{ 'has-success': form.password.$valid && submitted,\n" +
    "                                            'has-error': form.password.$invalid && submitted }\"><input type=password name=password class=form-control ng-model=user.password ng-minlength=3 placeholder=Password required mongoose-error><p class=help-block ng-show=\"(form.password.$error.minlength || form.password.$error.required) && submitted\">Password must be at least 3 characters.</p><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.password }}</p></div><div><button class=\"btn btn-primary btn-lg btn-login\" type=submit>Sign up</button> <a class=\"btn btn-default btn-lg btn-register\" href=/login>Login</a></div><!-- <hr>\n" +
    "        <div>\n" +
    "          <a class=\"btn btn-facebook\" href=\"\" ng-click=\"loginOauth('facebook')\">\n" +
    "            <i class=\"fa fa-facebook\"></i> Connect with Facebook\n" +
    "          </a>\n" +
    "          <a class=\"btn btn-google-plus\" href=\"\" ng-click=\"loginOauth('google')\">\n" +
    "            <i class=\"fa fa-google-plus\"></i> Connect with Google+\n" +
    "          </a>\n" +
    "          <a class=\"btn btn-twitter\" href=\"\" ng-click=\"loginOauth('twitter')\">\n" +
    "            <i class=\"fa fa-twitter\"></i> Connect with Twitter\n" +
    "          </a>\n" +
    "        </div> --></form></div></div><div class=col-md-3></div><hr></div>"
  );


  $templateCache.put('app/admin/admin.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><p>The delete user and user index api routes are restricted to users with the 'admin' role.</p><ul class=list-group><li class=list-group-item ng-repeat=\"user in users\"><strong>{{user.name}}</strong><br><span class=text-muted>{{user.email}}</span> <a ng-click=delete(user) class=trash><span class=\"glyphicon glyphicon-trash pull-right\"></span></a></li></ul></div>"
  );


  $templateCache.put('app/chart/chart.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div ng-include=\"'components/sidebar/sidebar.html'\"></div><div id=wrapper><div id=page-wrapper><div ng-show=isLoading class=\"col-sm-12 text-center\"><div class=progress><div class=progress-bar role=progressbar aria-valuenow={{progress}} aria-valuemin=0 aria-valuemax=100 style=\"{{'width: '+ progress + '%'}}\"></div></div><button ng-click=generateCharts() type=button class=\"btn btn-primary\">Calculate data</button></div><div class=row ng-if=!isLoading><!--Submissoins--><div class=\"col-lg-6 col-sm-12\"><div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-pie-chart fa-fw\"></i> Submission of Oil, Water and Gas</div><div class=panel-body><canvas class=\"chart chart-doughnut chart-xs\" data=sumission.data labels=sumission.labels legend=true></canvas></div></div></div><!--Highest Oil--><div class=\"col-lg-6 col-sm-12\"><div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-pie-chart fa-fw\"></i> Highest Oil</div><div class=panel-body><canvas class=\"chart chart-doughnut chart-xs\" data=highestOil.data labels=highestOil.labels legend=true></canvas></div></div></div><!--Bar Chart--><div class=\"col-lg-6 col-sm-12\"><div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-bar-chart fa-fw\"></i> Bar Chart</div><div class=panel-body><canvas id=bar class=\"chart chart-bar\" data=barChartData.data labels=barChartData.labels series=barChartData.series></canvas></div></div></div><!--Line Chart--><div class=\"col-lg-6 col-sm-12\"><div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-line-chart fa-fw\"></i> Line Chart</div><div class=panel-body><canvas id=line class=\"chart chart-line\" data=lineChartData.data labels=lineChartData.labels series=lineChartData.series></canvas></div></div></div><!--Line Chart--><!-- <div class=\"col-lg-6 col-sm-12\">\n" +
    "      <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">Line Chart</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "          <canvas class=\"chart chart-bar\" data=\"barChartData.data\" labels=\"barChartData.labels\" series=\"barChartData.series\"\n" +
    "              ></canvas>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>--><!--<div class=\"col-lg-6 col-sm-12\" id=\"radar-chart\">\n" +
    "      <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">Radar Chart</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "          <canvas id=\"area\" class=\"chart chart-radar\" data=\"radar.data\" labels=\"radar.labels\" click=\"onClick\"></canvas>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-6 col-sm-12\" id=\"pie-chart\">\n" +
    "      <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">Pie Chart</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "          <canvas id=\"pie\" class=\"chart chart-pie chart-xs\" data=\"pie.data\" labels=\"pie.labels\"></canvas>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-6 col-sm-12\" id=\"polar area-chart\">\n" +
    "      <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">Polar Area Chart</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "          <canvas id=\"polar\" class=\"chart chart-polar-area\" data=\"polar.data\" labels=\"polar.labels\"></canvas>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-lg-6 col-sm-12\" id=\"base-chart\">\n" +
    "      <div class=\"panel panel-default\">\n" +
    "        <div class=\"panel-heading\">Dynamic Chart</div>\n" +
    "        <div class=\"panel-body\">\n" +
    "          <canvas id=\"base\" class=\"chart chart-base\" chart-type=\"dynamic.type\" data=\"dynamic.data\"\n" +
    "                  labels=\"dynamic.labels\" legend=\"true\"></canvas>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <button type=\"button\" class=\"btn btn-primary pull-right\" ng-click=\"dynamic.toggle()\">Toggle</button>\n" +
    "    </div>--></div></div></div>"
  );


  $templateCache.put('app/dashboard/comment/comment.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><iframe width=100% height=410 src=//www.youtube.com/embed/DcJFdCmN98s frameborder=0></iframe><form class=comment-form ng-submit=addComment() name=commentForm><textarea class=form-control ng-model=newComment rows=3 placeholder=\"Enter a new comment\" required></textarea><input class=\"btn btn-primary\" type=submit ng-disabled=commentForm.$invalid value=Post></form><ul class=comment-list><li ng-repeat=\"comment in comments\"><header>{{ comment.author.name }}</header><p>{{ comment.content }}</p></li></ul></div>"
  );


  $templateCache.put('app/dashboard/dashboard.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div ng-include=\"'components/sidebar/sidebar.html'\"></div><div id=wrapper><div id=page-wrapper><!-- /.panel --><div class=row><div class=\"col-sm-12 mapArea\"><div id=map_canvas><map></map></div></div><div class=\"col-lg-12 tableArea\"><div class=\"panel panel-default\"><div class=panel-heading><!--             <i class=\"fa fa-clock-o fa-fw\"></i> Responsive Timeline\n" +
    " --><!-- real time socket.io --><div class=main-box><h2 class=page-header>Import Wells</h2><!-- <ul class=\"nav nav-tabs nav-stacked\" ng-repeat=\"thing in awesomeThings\">\n" +
    "                <li><a href=\"#\" tooltip=\"{{thing.info}}\">{{thing.name}}\n" +
    "                  <button type=\"button\" class=\"close\" ng-click=\"deleteThing(thing)\">&times;</button>\n" +
    "                </a></li>\n" +
    "              </ul> --><form class=thing-form><!-- <label>Table Syncs in realtime</label>\n" +
    "                <p class=\"input-group\">\n" +
    "                  <input type=\"text\" class=\"form-control\" placeholder=\"Enter well name\" ng-model=\"newThing\"/>\n" +
    "                <span class=\"input-group-btn\">\n" +
    "                  <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"addThing()\">Add Well(s)</button>\n" +
    "                </span>\n" +
    "                </p>\n" +
    " --><h5>Import an excel file.</h5><p class=input-group><input type=file class=form-control ngf-select ng-model=\"wellFile\"><!--<div class=\"button btn btn-primary\" ngf-select ng-model=\"wellFile\">upload photo</div>--> <span class=input-group-btn><button type=submit class=\"btn btn-primary\" ng-click=uploadFile()>Import Well(s)</button></span></p></form><!-- importing the table using Smart Table\n" +
    "              <button type=\"button\" ng-click=\"addRandomItem(row)\" class=\"btn btn-sm btn-success\"><i\n" +
    "                  class=\"glyphicon glyphicon-plus\"></i> Add random well\n" +
    "              </button>--><table st-table=displayedCollection st-safe-src=rowCollection class=\"table table-striped col-md-12 table-hover table-bordered\"><thead><tr><th class=center st-sort=wellName>Well Name</th><th class=center st-sort=latitude>Wellhead Latitude</th><th class=center st-sort=longitude>Wellhead Longitude</th><th class=center st-sort=apiNumber>API Number</th><th class=center st-sort=operator>Operator</th><th class=center st-sort=status>Status</th><th class=center st-sort=rsvCat>RSV_CAT</th><th class=center st-sort=latLength>LAT_LENGTH</th><th class=center st-sort=stage>Stages</th><th class=center st-sort=fpd>FPD</th><th class=center st-sort=oil>Total_Oil</th><th class=center st-sort=gas>Total_Gas</th><th class=center st-sort=water>Total_Water</th><!--th st-sort=\"balance\">balance</th> --></tr><tr><th colspan=13><input st-search=\"\" class=form-control placeholder=\"global search ...\"></th></tr></thead><tbody><tr ng-repeat=\"row in displayedCollection | orderBy: 'name'\" class=center><td class=odd><a href=#>{{row.name}}</a></td><td class=even>{{row.latitude}}</td><td class=odd>{{row.longitude}}</td><td class=even>{{row.apiNumber}}</td><td class=odd>{{row.operator}}</td><td class=even>{{row.status}}</td><td class=odd>{{row.rsvCat}}</td><td class=even>{{row.latLength}}</td><td class=odd>{{row.stages}}</td><td class=even>{{row.fpd | date:'EEEE, MMMM d, y'}}</td><td class=odd>{{row.oil}}</td><td class=even>{{row.gas}}</td><td class=odd>{{row.water}}</td><td><button type=button ng-click=removeItem(row) class=\"btn btn-sm btn-danger\"><i class=\"glyphicon glyphicon-remove-circle\"></i></button></td></tr></tbody></table><h5 id=names ng-click=hide()>This is where the names should be appeared!</h5></div><!-- /.panel-heading --><timeline></timeline><!-- /.panel-body --></div><!-- /.panel --></div><!-- /.col-lg-8 --><!--\n" +
    "        <div class=\"col-lg-4\">\n" +
    "          <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "              <i class=\"fa fa-bell fa-fw\"></i> Notifications Panel\n" +
    "                --><!-- Google Maps --><!--\n" +
    "        <div id=\"map\"></div>\n" +
    "          <div id=\"class\" ng-repeat=\"marker in markers | orderBy : 'title'\">\n" +
    "           <a href=\"#\" ng-click=\"openInfoWindow($event, marker)\">{{marker.title}}</a>\n" +
    "          </div>\n" +
    "        </div> --><!-- /.panel-heading --><notifications></notifications><!-- /.panel-body --></div><!-- /.panel --><chat></chat><!-- /.panel .chat-panel --></div></div></div>"
  );


  $templateCache.put('app/main/main.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><!-- <header class=\"hero-unit\" id=\"banner\">\n" +
    "  <div class=\"col-sm-3 col-lg-3 col-md-3\"></div>\n" +
    "  <div class=\"container col-sm-6 col-lg-6 col-md-6\"> --><!-- <h1>We Made <u>Analytics</u> Simple.</h1>\n" +
    "      <p class=\"lead\">A revolution in analyzing data.</p>\n" +
    "      <a href=\"#main_content\" type=\"button\" class=\"btn btn-success\">Learn more</a> --><!-- </div>\n" +
    "  <div class=\"col-sm-3 col-lg-3 col-md-3\"></div>\n" +
    "</header> --><div class=\"container mainContent\"><div class=mainBox><div id=centerMe><div class=floatLeft><div class=title>analytics</div><div id=spinner class=\"title rotate\">+</div></div><div id=textWrapper><div class=\"title live\">advanced visualization</div><div class=\"title bottom hidden\"></div></div></div><hr><form class=box><input class=emailInput type=email placeholder=\"email address\" ng-model=emailInput required><input class=submitButton type=submit value=subscribe ng-click=clearField()></form></div></div><!-- Wrap all page content here --><!-- <div id=\"wrap\">\n" +
    "  <header class=\"masthead\"> --><!-- Begin page content --><!-- <div class=\"divider\" id=\"section1\"></div>\n" +
    "  <div class=\"container\">\n" +
    "    <div class=\"col-sm-10 col-sm-offset-1\">\n" +
    "      <div class=\"page-header text-center\" id=\"main_content\">\n" +
    "        <h1>It's all about <strong>DATA</strong>.</h1>\n" +
    "      </div>\n" +
    "      \n" +
    "      <p class=\"lead text-center\"> \n" +
    "        Petrolytics will help oil and gas industry to analyze data in a more efficent way.\n" +
    "      </p> \n" +
    "      \n" +
    "      <hr>\n" +
    "      \n" +
    "      <div class=\"divider\"></div>\n" +
    "      \n" +
    "    </div>\n" +
    "  </div>\n" +
    "      \n" +
    "  <div class=\"divider\"></div>\n" +
    "    \n" +
    "  <section class=\"bg-1\">\n" +
    "    <div class=\"col-sm-6 col-sm-offset-3 text-center\"></div>\n" +
    "  </section>\n" +
    "    \n" +
    "  <div class=\"divider\" id=\"section2\"></div>\n" +
    "     \n" +
    "  <div class=\"row\">\n" +
    "      <div class=\"col-sm-10 col-sm-offset-1\">\n" +
    "        <h1>Profile</h1>\n" +
    "        \n" +
    "        <hr>\n" +
    "       \n" +
    "        <p>\n" +
    "      The Firm has had a great deal of experience and is highly regarded for its expertise in the areas of design, construction administration, construction management, tight cost control and scheduling.\n" +
    "      </p> \n" +
    "        <p>\n" +
    "      We have been involved in a wide range of building projects, including college facilities, banks, schools, nursing homes, office buildings, churches, industrial buildings and major urban development projects.\n" +
    "        </p> \n" +
    "        <p>\n" +
    "      The various projects have included new construction, renovation and adaptive re-use as a way of providing new space for the various clients. Tessier Associates provides in-house programming, master planning, architectural design, construction documentation, project administration and interior design services. Sustainable design, as appropriate for each client, is incorporated in cost effective ways to benefit the long term value of the buildings created by the firm.\n" +
    "      </p> \n" +
    "        <p>\n" +
    "      Together with selected consultants, The Firm provides complete professional services including landscape architecture, structural engineering, electrical and mechanical engineering and site planning.\n" +
    "      </p> \n" +
    "        \n" +
    "        <hr>\n" +
    "        \n" +
    "        <div class=\"divider\"></div> --><!-- </div> --><!--/col--><!-- </div> --><!--/container--><!-- <div class=\"divider\" id=\"section3\"></div>\n" +
    "  <div class=\"bg-4\">\n" +
    "    <div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "       <div class=\"col-sm-4 col-xs-6\">\n" +
    "        \n" +
    "          <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-thumbnail\"><a href=\"#\" title=\"Renovations\"><img src=\"//placehold.it/600x400/444/F8F8F8\" class=\"img-responsive\"></a></div>\n" +
    "            <div class=\"panel-body\">\n" +
    "              <p>Renovations</p>\n" +
    "              <p></p>\n" +
    "  \n" +
    "            </div> --><!-- </div> --><!--/panel--><!-- </div> --><!--/col--><!-- <div class=\"col-sm-4 col-xs-6\">\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-thumbnail\"><a href=\"#\" title=\"Academic Institutions\"><img src=\"//placehold.it/600x400/454545/FFF\" class=\"img-responsive\"></a></div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <p>Academic Institutions</p>\n" +
    "      <p></p>\n" +
    "      \n" +
    "    </div> --><!-- </div> --><!--/panel--><!-- </div> --><!--/col--><!-- <div class=\"col-sm-4 col-xs-6\">\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-thumbnail\"><a href=\"#\" title=\"Interiors\"><img src=\"//placehold.it/600x400/555/F2F2F2\" class=\"img-responsive\"></a></div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <p>Interiors</p>\n" +
    "      <p></p>\n" +
    "      \n" +
    "    </div> --><!-- </div> --><!--/panel--><!-- </div> --><!--/col--><!-- <div class=\"col-sm-4 col-xs-6\">\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-thumbnail\"><a href=\"#\" title=\"New Construction\"><img src=\"//placehold.it/600x400/555/FFF\" class=\"img-responsive\"></a></div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <p>New Construction</p>\n" +
    "      <p></p>\n" +
    "      \n" +
    "    </div> --><!-- </div> --><!--/panel--><!-- </div> --><!--/col--><!-- <div class=\"col-sm-4 col-xs-6\">\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-thumbnail\"><a href=\"#\" title=\"Site Planning\"><img src=\"//placehold.it/600x400/555/EEE\" class=\"img-responsive\"></a></div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <p>Site Planning</p>\n" +
    "      <p></p>\n" +
    "      \n" +
    "    </div> --><!-- </div> --><!--/panel--><!-- </div> --><!--/col--><!-- <div class=\"col-sm-4 col-xs-6\">\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-thumbnail\"><a href=\"#\" title=\"Churches\"><img src=\"//placehold.it/600x400/666/F4F4F4\" class=\"img-responsive\"></a></div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <p>Churches</p>\n" +
    "      <p></p>\n" +
    "      \n" +
    "    </div> --><!-- </div> --><!--/panel--><!-- </div> --><!--/col--><!-- </div> --><!--/row--><!-- </div> --><!--/container--><!-- <div class=\"divider\"></div>\n" +
    "  <section class=\"bg-3\">\n" +
    "    <div class=\"col-sm-6 col-sm-offset-3 text-center\"><h2 style=\"padding:20px;background-color:rgba(5,5,5,0.5)\">A simple \"Hi\", will break the ices in between.</h2></div>\n" +
    "    <br />\n" +
    "    <a type=\"button\" class=\"btn btn-primary\" href=\"mailto:#first.last@example.com\" class=\"col-sm-3 col-sm-offset-3 text-center btn btn-primary\"><h5 style=\"padding:15px; positions: center;\">Send us a message</h5></a>\n" +
    "  </section>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"divider\" id=\"section4\"></div>\n" +
    "  \n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-md-8 col-md-offset-1\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "    \n" +
    "  <div class=\"row\">\n" +
    "    \n" +
    "    <div class=\"col-sm-10 col-sm-offset-1\">\n" +
    "        <h1>Location</h1>\n" +
    "    </div>   \n" +
    "         \n" +
    "    <div id=\"map-canvas\"></div>\n" +
    "    \n" +
    "    <hr>\n" +
    "    \n" +
    "    <div class=\"col-sm-8\"></div>\n" +
    "    <div class=\"col-sm-3 pull-right\">\n" +
    "  \n" +
    "        <address>\n" +
    "          Petrolytics, Inc.<br>\n" +
    "          <span id=\"map-input\">\n" +
    "          1500 Wynden Street<br>\n" +
    "          Houston, TX 77027</span><br>\n" +
    "          P: (413) 700-5999\n" +
    "        </address>\n" +
    "      \n" +
    "        <p>\n" +
    "          <strong></strong><br>\n" +
    "          <a type=\"button\" class=\"btn btn-primary\" href=\"mailto:#first.last@example.com\">Hi there, ...</a>\n" +
    "        </p>          \n" +
    "    </div> --><!-- </div> --><!--/row--><!-- <div class=\"divider\" id=\"section5\"></div>  \n" +
    "  <div class=\"row\">\n" +
    "    \n" +
    "    <hr>\n" +
    "    \n" +
    "    <div class=\"col-sm-9 col-sm-offset-1\">\n" +
    "        \n" +
    "        <div class=\"row form-group\">\n" +
    "          <div class=\"col-md-12\">\n" +
    "          <h1>Contact Us</h1>        \n" +
    "          </div>\n" +
    "          <div class=\"col-xs-4\">\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"firstName\" name=\"name\" placeholder=\"Your Name\">\n" +
    "          </div>\n" +
    "          <div class=\"col-xs-6\">\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"organization\" name=\"organization\" placeholder=\"Company or Organization\">\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"row form-group\">\n" +
    "            <div class=\"col-xs-5\">\n" +
    "            <input type=\"text\" class=\"form-control\" name=\"email\" placeholder=\"Email\">\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-5\">\n" +
    "            <input type=\"text\" class=\"form-control\" name=\"phone\" placeholder=\"Phone\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row form-group\">\n" +
    "            <div class=\"col-xs-10\">\n" +
    "              <textarea class=\"form-control\" placeholder=\"Comments\"></textarea>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row form-group\">\n" +
    "            <div class=\"col-xs-10\">\n" +
    "              <button class=\"btn btn-default pull-right\">Contact Us</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "      \n" +
    "    </div> --><!-- </div> --><!--/row--><!--\n" +
    "  <ul class=\"list-inline center-block\">\n" +
    "    <li><a href=\"http://facebook.com/petrolytics\"><img src=\"../../assets/images2/soc_fb.png\"></a></li>\n" +
    "    <li><a href=\"http://twitter.com/petrolytics\"><img src=\"../../assets/images2/soc_tw.png\"></a></li>\n" +
    "    <li><a href=\"http://google.com/+petrolytics\"><img src=\"../../assets/images2/soc_gplus.png\"></a></li>\n" +
    "  </ul>\n" +
    "  --><!--  </div> --><!--/col--><!-- </div> --><!--/container--><!-- </div> --><!--/wrap--><!-- <ul class=\"nav pull-right scroll-top\">\n" +
    "  <li><a href=\"#banner\" title=\"Scroll to top\"><i class=\"glyphicon glyphicon-chevron-up\"></i></a></li>\n" +
    "  </ul> --><!-- <div class=\"modal\" id=\"myModal\" role=\"dialog\">\n" +
    "  <div class=\"modal-dialog\">\n" +
    "  <div class=\"modal-content\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <button class=\"close\" type=\"button\" data-dismiss=\"modal\">×</button>\n" +
    "    <h3 class=\"modal-title\"></h3>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div id=\"modalCarousel\" class=\"carousel\">\n" +
    "  \n" +
    "          <div class=\"carousel-inner\">\n" +
    "           \n" +
    "          </div>\n" +
    "          \n" +
    "          <a class=\"carousel-control left\" href=\"#modaCarousel\" data-slide=\"prev\"><i class=\"glyphicon glyphicon-chevron-left\"></i></a>\n" +
    "          <a class=\"carousel-control right\" href=\"#modalCarousel\" data-slide=\"next\"><i class=\"glyphicon glyphicon-chevron-right\"></i></a>\n" +
    "          \n" +
    "        </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n" +
    "  </div>\n" +
    "   </div>\n" +
    "  </div>\n" +
    "  </div> --><footer class=footer><div class=\"col-sm-3 col-lg-3 col-md-3\"><!-- <div class=\"footerLeft\">\n" +
    "      <span href=\"#\">About</span> | Contact Us\n" +
    "    </div> --></div><div class=\"col-sm-3 col-lg-3 col-md-3\"></div><div class=\"col-sm-6 col-lg-6 col-md-6 text-center\"><div class=footerRight>Made with <span><i class=\"fa fa-heart-o heart\"></i></span> in Houston.</div></div></footer>"
  );


  $templateCache.put('app/table/table.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div ng-include=\"'components/sidebar/sidebar.html'\"></div><div id=wrapper><div id=page-wrapper><div class=row><div class=col-lg-12><h2 class=page-header>EUR Chart</h2><form class=thing-form><h5>Import an excel file.</h5><p class=input-group><input type=file ngf-select ngf-change=uploadFile($files) ngf-multiple=multiple class=form-control> <span class=input-group-btn><button type=submit class=\"btn btn-primary\" ng-click=uploadFile()>Import Well(s)</button></span></p></form></div></div><div class=row><div class=col-md-4><div id=map_canvas><map></map></div><div class=\"panel panel-default\"><table class=\"table table-striped table-bordered table-hover\"><tbody><tr class=odd><td>Well Name</td><td>Well A</td></tr><tr class=even><td>API 10</td><td>32132141</td></tr><tr class=odd><td>API 14</td><td>8445437422234</td></tr><tr class=even><td>County</td><td>Karnes</td></tr><tr class=odd><td>District</td><td>7B</td></tr><tr class=even><td>Field</td><td>EF</td></tr><tr class=odd><td>Lease</td><td>Johnson 2B</td></tr><tr class=even><td>Date Drilled</td><td>Jan 05, 2012</td></tr><tr class=odd><td>Completion Date</td><td>Feb 12, 2012</td></tr><tr class=even><td>Current Status</td><td>Producing</td></tr></tbody></table></div></div><div class=col-md-4><div petro-chart state=lineChartState></div><div petro-chart state=barChartState></div></div><div class=col-md-4><div class=row><div class=\"col-md-6 tile\"><h3>LL</h3><h2>5180 <small>R</small></h2></div><div class=\"col-md-6 tile\"><h3>lb/ft</h3><h2>1230 <small>lbs</small></h2></div><div class=\"col-md-6 tile\"><h3>EUR</h3><h2>510 <small>MBOE</small></h2></div><div class=\"col-md-6 tile\"><h3>WC</h3><h2>16%</h2></div></div></div></div><div class=row><div class=col-md-9><div class=\"panel panel-default\"><table class=\"table table-striped table-bordered table-hover\"><thead><tr><th>Date</th><th>Original Gas Rate (MCFD)</th><th>Gas Cum Forecast</th><th>Forecast Rate (MCFD)</th><th>Year</th><th>Cum. Cash 8%</th></tr></thead><tbody><tr ng-repeat=\"row in statistics\"><td ng-bind=\"::row['Date']\"></td><td ng-bind=\"::row['Original Gas Rate (MCFD)']\" class=text-right></td><td ng-bind=\"::row['Gas Cum forecast']\" class=text-right></td><td ng-bind=\"::row['Forecast Rate (MCFD)']\" class=text-right></td><td ng-bind=\"::row['Year']\"></td><td ng-bind=\"::row['Cum. Cash 8%']\" class=text-right></td></tr></tbody></table></div></div><div class=col-md-3><div class=\"panel panel-default\"><table class=\"table table-striped table-bordered table-hover\"><thead><tr><th>Output Result</th><th>Value</th></tr></thead><tbody><tr ng-repeat=\"row in statistics\" ng-if=\"::row['OUTPUT RESULT']\"><td ng-bind=\"::row['OUTPUT RESULT']\"></td><td ng-bind=\"::row['VALUE']\" class=text-right></td></tr></tbody></table></div></div></div></div></div>"
  );


  $templateCache.put('components/modal/modal.html',
    "<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat=\"button in modal.buttons\" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>"
  );


  $templateCache.put('components/navbar/navbar.html',
    "<div class=\"navbar navbar-default navbar-static-top\" ng-controller=NavbarCtrl><div class=container><div class=navbar-header><button class=navbar-toggle type=button ng-click=\"isCollapsed = !isCollapsed\"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a href=\"/\" class=navbar-brand><span><img class=logoImage src=../../assets/images/p2.png></span></a></div><div collapse=isCollapsed class=\"navbar-collapse collapse\" id=navbar-main><ul class=\"nav navbar-nav\"><li ng-repeat=\"item in menu\" ng-class=\"{active: isActive(item.link)}\"><a ng-href={{item.link}}>{{item.title}}</a></li><li ng-show=isLoggedIn() ng-class=\"{active: isActive('/admin')}\"><a href=/admin>Admin</a></li><li ng-show=isLoggedIn() ng-class=\"{active: isActive('/dashboard')}\"><a href=/dashboard>Dashboard</a></li><!-- <li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive('/dashboard/comment')}\"><a href=\"/dashboard/comment\">Comments</a></li> --></ul><ul class=\"nav navbar-nav navbar-right\"><!-- <li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive('/signup')}\"><a href=\"/signup\">Sign up</a></li> --><li ng-hide=isLoggedIn() ng-class=\"{active: isActive('/login')}\"><a href=/login>Login</a></li><li ng-show=isLoggedIn()><p class=navbar-text>Hello {{ getCurrentUser().name }}</p></li><li ng-show=isLoggedIn() ng-class=\"{active: isActive('/settings')}\"><a href=/settings><span class=\"glyphicon glyphicon-cog\"></span></a></li><li ng-show=isLoggedIn() ng-class=\"{active: isActive('/logout')}\"><a href=\"\" ng-click=logout()>Logout</a></li></ul></div></div></div>"
  );


  $templateCache.put('components/sidebar/sidebar.html',
    "<div class=\"navbar-default sidebar\" role=navigation><div class=\"sidebar-nav navbar-collapse\"><ul class=\"nav in\" id=side-menu><sidebar-search></sidebar-search><li class=sidebar-search><div class=\"input-group custom-search-form\"><input class=form-control placeholder=Search...> <span class=input-group-btn><button class=\"btn btn-default\" type=button><i class=\"fa fa-search\"></i></button></span></div></li><li ui-sref-active=active><a href=/dashboard><i class=\"fa fa-dashboard fa-fw\"></i> Dashboard</a></li><li ui-sref-active=active><a href=/chart><i class=\"fa fa-bar-chart-o fa-fw\"></i> Charts<span></span></a></li><li ui-sref-active=active><a href=/table><i class=\"fa fa-table fa-fw\"></i> EUR Data</a></li><!--\n" +
    "            <li ui-sref-active=\"active\">\n" +
    "                <a ui-sref=\"dashboard.form\"><i class=\"fa fa-edit fa-fw\"></i> Forms</a>\n" +
    "            </li>\n" +
    "            <li ng-class=\"{active: collapseVar==1}\">{{dropDown}}\n" +
    "                <a href=\"\" ng-click=\"check(1)\"><i class=\"fa fa-wrench fa-fw\"></i> UI Elements<span\n" +
    "                        class=\"fa arrow\"></span></a>\n" +
    "                <ul class=\"nav nav-second-level\" collapse=\"collapseVar!=1\">\n" +
    "                    <li ui-sref-active=\"active\">\n" +
    "                        <a ui-sref=\"dashboard.panels-wells\">Panels and Wells</a>\n" +
    "                    </li>\n" +
    "                    <li ui-sref-active=\"active\">\n" +
    "                        <a ui-sref=\"dashboard.buttons\">Buttons</a>\n" +
    "                    </li>\n" +
    "                    <li ui-sref-active=\"active\">\n" +
    "                        <a ui-sref=\"dashboard.notifications\">Notifications</a>\n" +
    "                    </li>\n" +
    "                    <li ui-sref-active=\"active\">\n" +
    "                        <a ui-sref=\"dashboard.typography\">Typography</a>\n" +
    "                    </li>\n" +
    "                    <li ui-sref-active=\"active\">\n" +
    "                        <a ui-sref=\"dashboard.icons\"> Icons</a>\n" +
    "                    </li>\n" +
    "                    <li ui-sref-active=\"active\">\n" +
    "                        <a ui-sref=\"dashboard.grid\">Grid</a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                &lt;!&ndash; /.nav-second-level &ndash;&gt;\n" +
    "            </li>\n" +
    "            <li ng-class=\"{active: collapseVar==2}\">\n" +
    "                <a href=\"\" ng-click=\"check(2)\"><i class=\"fa fa-sitemap fa-fw\"></i> Multi-Level Dropdown<span\n" +
    "                        class=\"fa arrow\"></span></a>\n" +
    "                <ul class=\"nav nav-second-level\" collapse=\"collapseVar!=2\">\n" +
    "                    <li>\n" +
    "                        <a href=\"\">Second Level Item</a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a href=\"\">Second Level Item</a>\n" +
    "                    </li>\n" +
    "                    <li ng-init=\"third=!third\" ng-class=\"{active: multiCollapseVar==3}\">\n" +
    "                        <a href=\"\" ng-click=\"multiCheck(3)\">Third Level <span class=\"fa arrow\"></span></a>\n" +
    "                        <ul class=\"nav nav-third-level\" collapse=\"multiCollapseVar!=3\">\n" +
    "                            <li>\n" +
    "                                <a href=\"\">Third Level Item</a>\n" +
    "                            </li>\n" +
    "                            <li>\n" +
    "                                <a href=\"\">Third Level Item</a>\n" +
    "                            </li>\n" +
    "                            <li>\n" +
    "                                <a href=\"\">Third Level Item</a>\n" +
    "                            </li>\n" +
    "                            <li>\n" +
    "                                <a href=\"\">Third Level Item</a>\n" +
    "                            </li>\n" +
    "\n" +
    "                        </ul>\n" +
    "                        &lt;!&ndash; /.nav-third-level &ndash;&gt;\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                &lt;!&ndash; /.nav-second-level &ndash;&gt;\n" +
    "            </li>\n" +
    "            <li ng-class=\"{active:collapseVar==4}\">\n" +
    "                <a href=\"\" ng-click=\"check(4)\"><i class=\"fa fa-files-o fa-fw\"></i> Sample Pages<span\n" +
    "                        class=\"fa arrow\"></span></a>\n" +
    "                <ul class=\"nav nav-second-level\" collapse=\"collapseVar!=4\">\n" +
    "                    <li ng-class=\"{active: selectedMenu=='blank'}\">\n" +
    "                        <a ui-sref=\"dashboard.blank\" ng-click=\"selectedMenu='blank'\">Blank Page</a>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <a ui-sref=\"login\">Login Page</a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                &lt;!&ndash; /.nav-second-level &ndash;&gt;\n" +
    "            </li>--></ul></div><!-- /.sidebar-collapse --></div>"
  );

}]);
