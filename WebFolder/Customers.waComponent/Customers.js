
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
	var button9 = {};	// @button
	var button8 = {};	// @button
	var saveCustomerButton = {};	// @button
	// @endregion// @endlock
	$$(getHtmlId("saveCustomerButton")).disable();
	$$(getHtmlId('companyMessage')).setValue('');
	//$(getHtmlId('error')).setValue('hallo');
	//add listener to the input fields
	addListenerToInputFields(getHtmlId("tabView1"));
	var datasourceForRemove = '';
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
		var name = sources.customer.name;
		console.log(name);
		$$(getHtmlId('dialog1Text')).setValue('Really delete ' + name + ' ?');
		datasourceForRemove = sources.customer;
		WAF.widgets[getHtmlId('dialog1')].displayDialog();
	};// @lock

	button9.click = function button9_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('dialog1')).closeDialog(); //cancel button
	};// @lock

	button8.click = function button8_click (event)// @startlock
	{// @endlock
		//TODO asynchronous removal
		datasourceForRemove.removeCurrent();
		$$(getHtmlId('companyMessage')).setValue('Customer was deleted');
		datasourceForRemove = '';
		$$(getHtmlId('dialog1')).closeDialog(); //ok button
	};// @lock

	saveCustomerButton.click = function saveCustomerButton_click (event)// @startlock
	{// @endlock
		sources.customer.save({
		'onSuccess' : function(event){
			console.log("saved");
			$$(getHtmlId("saveCustomerButton")).disable();
			$$(getHtmlId('companyMessage')).setValue('Saved');
		},
		onError: function(error) {
				var myError = error['error'][0];
			//	$("#errorDiv1").html(myError.message);
				$$(getHtmlId('companyMessage')).setValue('Saved');
			}	
		});
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_customerDeleteButton", "click", customerDeleteButton.click, "WAF");
	WAF.addListener(this.id + "_button9", "click", button9.click, "WAF");
	WAF.addListener(this.id + "_button8", "click", button8.click, "WAF");
	WAF.addListener(this.id + "_saveCustomerButton", "click", saveCustomerButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
