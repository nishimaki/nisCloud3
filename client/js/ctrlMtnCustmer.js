	'use strict';
	// ---------------------------------
	// コントローラー MtnCustmerCtrl
	// ---------------------------------
	app.controller('MtnCustmerCtrl', function($rootScope, $scope, $http, $controller, SharedService) {

		// MntCtrlから継承
		// $controller('MtnCtrl', {
		//     $rootScope: $rootScope,
		//     $scope: $scope
		// });

		$scope.custmerList = {};

		$scope.init = function init() {
			console.log("MtnCustmerCtrl init");

			SharedService.SetTitle("顧客メンテナンス");

			$http.get('/custmer').success(function(data) {
				var cnt = 0;
				_.each(data, function(dat) {
					dat["recid"] = cnt++;
					// console.log("dat:" + angular.toJson(dat) );
				});
				// console.log("data length:" + data.length);

				$scope.custmerList = data;

				// ---------------------------------
				// グリッド表示
				// ---------------------------------
				$("#myGridCust").w2destroy("myGridCust");
				$('#myGridCust').w2grid({
					name: 'myGridCust',
					columns: [{
							field: 'code',
							caption: 'code',
							size: '50px'
		                }, {
							field: 'name_sei',
							caption: '姓',
							size: '100px'
		                }, {
							field: 'name_mei',
							caption: '名',
							size: '100px'
		                }, {
							field: 'kananame_sei',
							caption: 'かな(姓)',
							size: '120px'
		                }, {
							field: 'kananame_mei',
							caption: 'かな(名)',
							size: '120px'
		                }, {
							field: 'birthday',
							caption: '誕生日',
							size: '120px'
		                }, {
							field: 'yuubin_no',
							caption: '郵便番号',
							size: '120px'
		                }, {
							field: 'addr',
							caption: '住所',
							size: '120px'
	    	            }, ],
					records: $scope.custmerList,
					// ---------------------------------
					// 行クリック
					// ---------------------------------
					onClick: function(event) {
						// console.log(event);
						MakeForm(event, $scope.custmerList[event.recid]);
					}
				});

			});

		};
	});

	// ---------------------------------
	// フォーム表示
	// ---------------------------------
	function MakeForm(event, data) {
		// console.log(event);
		// console.log(data);

		$("#myForm").w2destroy("myForm");
		$('#myForm').w2form({ 
	        name  : 'myForm',
	        url   : 'custmer',
	        fields: [
	            { field: 'code', type: 'text', required: true, html: { caption: 'コード', attr: 'style="" maxlength="3" size="3"' }},
	            { field: 'name_sei',  type: 'text', required: true, html: { caption: '姓', attr: 'style="" size="20"' }},
	            { field: 'name_mei',  type: 'text', required: true, html: { caption: '名', attr: 'style="" size="20"' }},
	            { field: 'kananame_sei',  type: 'text', required: true, html: { caption: 'かな(姓)', attr: 'style="" size="20"' }},
	            { field: 'kananame_mei',  type: 'text', required: true, html: { caption: 'かな(名)', attr: 'style="" size="20"' }},
	            { field: 'birthday',  type: 'date', format: 'yyyy/m/d', required: true, html: { caption: '誕生日', attr: 'style="" size="20"'}},
	            { field: 'yuubin_no',  type: 'text', required: true, html: { caption: '郵便番号', attr: 'style="" maxlength="8" size="8"' }},
	            { field: 'addr',  type: 'text', required: true, html: { caption: '住所', attr: 'style="" size="40"' }},
	            { field: 'tel',  type: 'text', required: true, html: { caption: '電話番号', attr: 'style="" size="20"' } },
	            { field: 'email',  type: 'email', required: true, html: { caption: 'EMAIL', attr: 'style="" size="40"' } },
	        ],
	        record: data,
	        actions: {
	            reset: function () {
	                this.clear();
	            },
	            save: function () {
	                this.save();
	            }
	        }
	    });

	};