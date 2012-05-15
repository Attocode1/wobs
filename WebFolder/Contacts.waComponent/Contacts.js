
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Customers';
	// @endregion// @endlock
	this.name = 'Contacts';
	this.load = function (data) {// @lock
    
	// @region namespaceDeclaration// @startlock
	var searchContactTextfield = {};	// @textField
	var button8 = {};	// @button
	var button7 = {};	// @button
	var button6 = {};	// @button
	var nextContactbutton = {};	// @button
	var deleteContactButton = {};	// @button
	var saveContactButton = {};	// @button
	// @endregion// @endlock
	$$(getHtmlId("saveContactButton")).disable();
	$$(getHtmlId('contactMessage')).setValue('');
	WOBS.changedDatasource = null;
	
	//add listener to the input fields
	addListenerToInputFields(getHtmlId("tabView1"));
	
	function enableButtons(source){
		if (source.getClassTitle() == 'Contact'){
			$$(getHtmlId("saveContactButton")).enable();
			WOBS.changedDatasource = source;
		}
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
					enableButtons(value.source);
					 });
				}
			//combobox doesn't seem to respond to the change event	
			if (value.kind == "combobox"){
				
				value.addListener('click',function(){
					enableButtons(value.source);
					 });
				}
		})
    }

	// eventHandlers// @lock

	searchContactTextfield.keyup = function searchContactTextfield_keyup (event)// @startlock
	{// @endlock
		
		var theName = $$(getHtmlId('searchContactTextfield')).getValue();;
		
		sources.contact.query('name = :1',	{
			
			onSuccess : function(event){},
			onError: function(error) {
				alert(error['error'][0]);
			},
			params: [theName + WAF.wildchar]
			,orderBy: 'name'	
		});


	};// @lock
	
	//don't save 
	button8.click = function button8_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('dialog1')).closeDialog(); 
		if(WOBS.action == 'selectNext'){
			WOBS.changedDatasource.selectNext();
			if(changedDatasource.getClassTitle() == 'Contact'){
				$$(getHtmlId("saveContactButton")).disable();
			}
			WOBS.changedDatasource = null;
		}
	};// @lock
	
	
	
	function showConfirmationDialog (action){
		
		$$(getHtmlId('saveConfirmationText')).setValue('Save changes ?');
		WOBS.action = action;
		$$(getHtmlId('dialog1')).displayDialog();
		
		
	}

	//cancel button
	button7.click = function button7_click (event)// @startlock
	{// @endlock

		$$(getHtmlId('dialog1')).closeDialog(); 
		
	};// @lock

	//ok button
	button6.click = function button6_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('dialog1')).closeDialog(); 
		
		WOBS.changedDatasource.save({
			'onSuccess' : function(event){
				if(WOBS.changedDatasource.getClassTitle() == 'Contact'){
					$$(getHtmlId("saveContactButton")).disable();
					$$(getHtmlId('contactMessage')).setValue('Contact Saved');
				}
				WOBS.changedDatasource = null;
			},
			onError: function(error) {
				alert(error['error'][0]);
			}	
		});
		
		if(WOBS.action == 'selectNext'){
			WOBS.changedDatasource.selectNext();
		}
		
	};// @lock

	nextContactbutton.click = function nextContactbutton_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('contactMessage')).setValue('');
		if (WOBS.changedDatasource == null){
			sources.contact.selectNext();
		}else {
		showConfirmationDialog('selectNext');
		}
	};// @lock

	deleteContactButton.click = function deleteContactButton_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('contactMessage')).setValue('');
		var name = sources.contact.name;
		
		
		if (confirm('Really delete ' + name + ' ?' )){
			sources.Contact.removeCurrent({
				'onSuccess' : function(event){
					$$(getHtmlId('contactMessage')).setValue('Contact was deleted');
				},
				onError: function(error) {
					alert(error['error'][0]);
				}	
			});
		}
		
	};// @lock

	saveContactButton.click = function saveContactButton_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('contactMessage')).setValue('');
		sources.contact.save({
		'onSuccess' : function(event){
			WOBS.changedDatasource = null;
			$$(getHtmlId("saveContactButton")).disable();
			
			$$(getHtmlId('contactMessage')).setValue('Contact Saved');
		},
		onError: function(error) {
				alert(error['error'][0]);
			}	
		});
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_searchContactTextfield", "keyup", searchContactTextfield.keyup, "WAF");
	WAF.addListener(this.id + "_button8", "click", button8.click, "WAF");
	WAF.addListener(this.id + "_button7", "click", button7.click, "WAF");
	WAF.addListener(this.id + "_button6", "click", button6.click, "WAF");
	WAF.addListener(this.id + "_nextContactbutton", "click", nextContactbutton.click, "WAF");
	WAF.addListener(this.id + "_deleteContactButton", "click", deleteContactButton.click, "WAF");
	WAF.addListener(this.id + "_saveContactButton", "click", saveContactButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
