sap.ui.define([
    "InventCustomControls/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "sap/m/MessageToast",	
    "sap/m/MessageBox",
    "sap/ui/core/BusyIndicator",
    "InventCustomControls/model/formatter",
    'sap/ui/model/Filter',
    "sap/ui/model/resource/ResourceModel"	
], 

function (BaseController, JSONModel, Device, MessageToast, MessageBox, BusyIndicator, formatter, Filter,ResourceModel) {
    "use strict";

    return BaseController.extend("InventCustomControls.controller.settings.Edit", {

        onInit : function () {							
            
            this
            .getRouter()
            .getRoute('settings')
            .attachPatternMatched(this._onRouteMatched, this);          
            
            var model = {Theme : ''}
            this.oModel = new JSONModel();
            this.oModel.setData(model);
            this.setModel(this.oModel);
            this._loadThemes();

        }, 
        formatter : formatter,    
        _loadThemes : function(){            
            var themes = this.getOwnerComponent().getMetadata().getManifest()["sap.ui"].supportedThemes;            
            var oViewModelSelections = new JSONModel({themes : themes});
			this.setModel(oViewModelSelections,"oViewModelSelections");		
        },

        _loadSettings : function(){
            this.byId('idIconTabBar').setBusy(true);
            let serverURL = this.getServerUrl(this.api.settings);
            let model = new JSONModel(serverURL);
            
            this.setModel(model,"Settings");            
            this.byId('idIconTabBar').setBusy(false);

        },
        _onRouteMatched : function(oEvent){            
            this._loadSettings();
        },
        
        applyConfig : function(oEvent){            
			var newConfig = this.getModel("Settings").getProperty("/Theme");
            sap.ui.getCore().applyTheme(newConfig);   
            this.Save(oEvent)         
        },
        
        Save : function(oEvent)     {
            
        },
        _onNavRouter:function(oEvent){
            let Router = oEvent.getSource().data("router");
            return;

            this.getRouter().navTo(Router);
        }
    });
});