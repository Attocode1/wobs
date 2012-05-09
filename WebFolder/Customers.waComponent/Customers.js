
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Customers';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var customerDeleteButton = {};	// @button
	var saveCustomerButton = {};	// @button
	// @endregion// @endlock
	$$(getHtmlId("saveCustomerButton")).disable();
	$$(getHtmlId('customerMessage')).setValue('');
	
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
			//combobox doesn't seem to respond to the change event	
			if (value.kind == "combobox"){
				
				value.addListener('click',function(){
					enableButtons();
					 });
				}
		})
    	}
	// eventHandlers// @lock

	customerDeleteButton.click = function customerDeleteButton_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('customerMessage')).setValue('');
		var name = sources.customer.name;
		
		
		if (confirm('Really delete ' + name + ' ?' )){
			sources.customer.removeCurrent({
				'onSuccess' : function(event){
					$$(getHtmlId('customerMessage')).setValue('Customer was deleted');
				},
				onError: function(error) {
					alert(error['error'][0]);
				}	
			});
		}
		
	};// @lock

	saveCustomerButton.click = function saveCustomerButton_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('customerMessage')).setValue('');
		sources.customer.save({
		'onSuccess' : function(event){
			
			$$(getHtmlId("saveCustomerButton")).disable();
			$$(getHtmlId('customerMessage')).setValue('Customer Saved');
		},
		onError: function(error) {
				alert(error['error'][0]);
			}	
		});
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_customerDeleteButton", "click", customerDeleteButton.click, "WAF");
	WAF.addListener(this.id + "_saveCustomerButton", "click", saveCustomerButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
