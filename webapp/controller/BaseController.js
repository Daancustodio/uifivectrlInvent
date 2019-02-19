sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"InventCustomControls/controller/fragments/Exeption.controller",
		"InventCustomControls/model/formatter",
		"sap/ui/model/json/JSONModel",	
		"sap/m/MessageToast",			
	], function (Controller, Exeption, formatter, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("InventCustomControls.controller.BaseController", {		
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
			
		},

		setUserTheme : function(){
			var user = this.getUserSession();
			if(!user)
				return;
			
			if(user.UserSettings == undefined) 
				return;
				
			if(!user.UserSettings.Theme)
				return;

			var theme = sap.ui.getCore().getConfiguration().getTheme();
			
			if(theme != user.UserSettings.Theme)
				sap.ui.getCore().applyTheme(user.UserSettings.Theme); 
		},

		api :{
			token : 'tokenEndPoint',
			user: 'User.json',
			notification: 'Notifications.json',
			settings:'Settings.json'
		},

		getServerUrl(){			
			let base = [];
			let serve = this.getOwnerComponent().getMetadata().getConfig().serviceUrl;
			base.push(serve);

			for (let index = 0; index < arguments.length; index++) {
				const element = arguments[index];
				base.push(element);
			}

			return base.join('/');
		},

		getModel : function (sName) {
			return this.getView().getModel(sName);
		},		
		
		setModel : function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},
		
		getText: function(sKey){
			return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sKey);
		},

		onNavBack : function(sRoute, mData) {
				window.history.go(-1);				
		},	
		
		getIndexOfPath : function(sPath){
			var pathArray = sPath.split("/");
			var sIndex = pathArray[pathArray.length - 1];
			var index = Number.parseInt(sIndex);
			return index;
		},	

		
		
		showExeption(exeption, button){
			let ctrl =new Exeption();
			ctrl.show(exeption, button);
		}
	});
});