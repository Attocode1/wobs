
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var menuItemContacts = {};	// @menuItem
// @endregion// @endlock

// eventHandlers// @lock

	menuItemContacts.click = function menuItemContacts_click (event)// @startlock
	{// @endlock
		WAF.loadComponent ( {
        id:     'component1',
        path:   '/Contacts.waComponent'
     } );
     $$('title').setValue('Contacts');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("menuItemContacts", "click", menuItemContacts.click, "WAF");
// @endregion
};// @endlock
