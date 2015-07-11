  'use strict';
  // ---------------------------------
  // コントローラー AppCtrl
  // ---------------------------------
  app.controller('AppCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {

    $scope.MessageList = [];



    $scope.init = function init() {
      console.log("AppCtrl init");

    $("#sideMenu").w2destroy("sidebar");
    $('#sideMenu').w2sidebar({
    	name: 'sidebar',
    	img: null,
    	nodes: [ 
    		{ id: 'level-1', text: 'Level 1', img: 'icon-folder', expanded: true, group: true,
    		  nodes: [ { id: 'level-1-1', text: 'ホーム', icon: 'glyphicon glyphicon-home', state: 'home.portal' },
    				   { id: 'level-1-2', text: 'Level 1.2', icon: 'fa-star', state: 'home.portal'  },
    				   { id: 'level-1-3', text: 'Level 1.3', icon: 'fa-check', state: 'home.null' },
    				   { id: 'level-1-4', text: 'Level 1.4', icon: 'fa-check', state: 'home.null' },
    				 ]
    		},
    	],
    	onClick: function (event) {
    	    console.dir(event);
            console.log(event.target);
            $state.go(event.node.state);
    	}
    });

    };

    // 日付編集		
    $scope.editDate = function editDate(datetime) {
      var m = moment(datetime);
      var formatDate = m.format('YYYY/MM/DD HH:mm:ss.SSS');
      return formatDate;
    };

  }]);