
guidedModel =// @startlock
{
	Contact :
	{
		events :
		{
			onValidate:function()
			{// @endlock
				if(this.isCompany == false){
					this.name = this.lastName;
				}
			}// @startlock
		},
		isCompany :
		{
			events :
			{
				onInit:function(attributeName)
				{// @endlock
					this.isCompany = true;
				}// @startlock
			}
		}
	}
};// @endlock
