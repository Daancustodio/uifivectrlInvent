sap.ui.define(
	[
		"InventCustomControls/controller/BaseController",
		"sap/m/MessageToast",	
		"sap/ui/model/json/JSONModel",	
		"InventCustomControls/model/RestModel",
		"InventCustomControls/model/formatter",
        "InventCustomControls/controller/fragments/Notification.controller",

	],
	function (BaseController, MessageToast, JSONModel, RestModel, formatter,NotificationController) {
	"use strict";

	return BaseController.extend("InventCustomControls.controller.App", {
		fmt:formatter,

		onInit : function(){			
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());			
		},		
	});
});