function todoCtrl($scope, $http){

	$scope.thingstodo = {};
	$scope.response = {};
	$scope.list = {};
	

	$http.get('/getdata')
		.success(function(data){
			$scope.list = data;
		});


	

	$scope.createTodo = function(){
	
		var posting = $http({
			method: 'POST',
			url: '/add_data',
			data: $scope.thingstodo
		});

		posting.success(function(response){
			if(response.status == 'Fail') {
				$scope.response.text = "Failed to add to the list.";
			}
			else if(response.status == 'Success'){
				$scope.response.text = "";
				window.location = '/';
			}
		});
	};

	$scope.deleteTodo = function(desc){
		$http.delete('/delete_data/' + desc)
			.success(function(data) {
				if(data.status == 'Deleted'){
					window.location = '/';
				}
			});
	};
}