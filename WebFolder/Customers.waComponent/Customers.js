
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Customers';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var saveCustomerButton = {};	// @button
	// @endregion// @endlock
	$$(getHtmlId("saveCustomerButton")).disable();
	
	//add listener to the input fields
	addListenerToInputFields(getHtmlId("tabView1"));
	
	function enableButtons(){
		$$(getHtmlId("saveCustomerButton")).enable();
	}
    
    //The save button will only be enabled after a change in an input field 
    function addListenerToInputFields(childID){
    	
		var a = $$(childID).getChildren();
		a.forEach(function (value){
			if (value.kind == "container"){
				addListenerToInputFields(value.divID);
			}
			if (value.kind == "textField"){
				value.addListener('change',function(){
					enableButtons();
					 });
				}
				
			if (value.kind == "combobox"){
				
				value.addListener('click',function(){
					enableButtons();
					 });
				}
		})
    	}
	// eventHandlers// @lock

	saveCustomerButton.click = function saveCustomerButton_click (event)// @startlock
	{// @endlock
		sources.customer.save({
		'onSuccess' : function(event){
			console.log("saved");
			$$(getHtmlId("saveCustomerButton")).disable();
		},
		'onError': function(event){
			console.log('error');
		}
		});
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_saveCustomerButton", "click", saveCustomerButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
