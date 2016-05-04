angular.module("researchApp")
	.controller("dashboardController", dashboardController);

	function dashboardController($scope, $http, $rootScope, utilitiesService){
		$scope.gridOptions = {
		    columnDefs: [
				{ field: '_id', visible: false, displayName: 'ID' },
				{ field: 'id', displayName: 'Emp ID' },
				{ field: 'First Name', displayName: 'First name' },
				{ field: 'Last Name', displayName: 'Last name' },
				{ field: 'Manager Name', displayName: 'Manager name' },
				{ field: 'Date of joining', displayName: 'DOJ' },
				{ field: 'Education', displayName: 'Education' },
				{ field: 'Work Experience', displayName: 'Work Exp' },
			],
			paginationPageSizes: [10, 15, 25, 50],
		    paginationPageSize: 10,	
		    enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'employees.csv',
		    exporterPdfDefaultStyle: {fontSize: 9},
		    exporterPdfTableStyle: {margin: [30, 30, 30, -20]},
		    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: false, color: 'red'},
		    exporterPdfHeader: { text: "List of Employees", style: 'headerStyle' },
		    exporterPdfFooter: function ( currentPage, pageCount ) {
		      return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
		    },
		    exporterPdfCustomFormatter: function ( docDefinition ) {
		      docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
		      docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
		      return docDefinition;
		    },
		    exporterPdfOrientation: 'portrait',
		    exporterPdfPageSize: 'LETTER',
		    exporterPdfMaxGridWidth: 500,
		    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
		    onRegisterApi: function(gridApi){
		      $scope.gridApi = gridApi;
		      // gridApi.selection.on.rowSelectionChanged($scope,function(row){
		      //   var msg = 'row selected ' + row.isSelected;
		      //   console.log(msg);
		      // });

		      // gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
		      //   var msg = 'rows changed ' + rows.length;
		      //   console.log(msg);
		      // });
		    }	    
		};
		
		$scope.deleteSelected = function(){
	      angular.forEach($scope.gridApi.selection.getSelectedRows(), function (data, index) {
	      	console.log(data);
	        $scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(data), 1);
	      });
	    }
		var dataPromise = $http.get("http://localhost:3000/employees.json");
		dataPromise.then(function(response){
			$scope.gridOptions.data = response.data;
		})
	}