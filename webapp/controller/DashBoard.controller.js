sap.ui.define(
	[
		"InventCustomControls/controller/BaseController",
		"sap/m/MessageToast",   
		"sap/ui/model/json/JSONModel",	
		"sap/m/MessageBox",	
		'InventCustomControls/model/formatter'	,
		'sap/ui/unified/ColorPickerPopover',	
	],
	function (BaseController, MessageToast,JSONModel, MessageBox, Formatter,ColorPickerPopover) {
	"use strict";

	return BaseController.extend("InventCustomControls.controller.DashBoard", {
		fmt:Formatter,
		onInit : function () {			
			this.setModel(new JSONModel(),"signature");
			this.setModel(new JSONModel(),"SelectedCenterCosts");
			this.setModel(new JSONModel(),"htmlEditor");
			this.setModel(new JSONModel(this.getServerUrl("Distribuition.json")), "Dimensions");
			console.log(this.getModel("Dimensions"))
		},
		activateSignature(oEvent){
			let panel = oEvent.getSource().getParent().getParent();
			panel.setExpanded(true);
			console.log(panel)
			this.byId("signature").activate();
		},
		exportSignature(){
			let input = this.byId("signature");
			let img = input.toDataURL();
			this.getModel("signature").setProperty("/signatureIMG", img);
			input.clear()
		},
		clearSignature(oEvent){
			let input = this.byId("signature");
			input.clear();
			this.getModel("signature").setProperty("/signatureIMG", "");

		},
		openDefaultModeSample: function (oEvent) {
			this.inputId = oEvent.getSource().getId();
			if (!this.oColorPickerPopover) {
				this.oColorPickerPopover = new ColorPickerPopover("oColorPickerPopover", {
					colorString: "black",					
					change: this.handlePenColorChanged.bind(this)
				});
			}
			this.oColorPickerPopover.openBy(oEvent.getSource());
		},
		handlePenColorChanged(oEvent){
			let color = oEvent.getParameter("colorString");			
			MessageToast.show("Chosen color string: " + oEvent.getParameter("colorString"));
			let input = this.byId("signature");
			input.setPenColor(color);
			
		},
		openDefaultModeSampleCanvas: function (oEvent) {
			this.inputId = oEvent.getSource().getId();
			if (!this.oColorPickerPopover) {
				this.oColorPickerPopover = new ColorPickerPopover("oColorPickerPopover", {
					colorString: "gray",					
					change: this.handleCanvasColorChanged.bind(this)
				});
			}
			this.oColorPickerPopover.openBy(oEvent.getSource());
		},
		handleCanvasColorChanged(oEvent){
			let color = oEvent.getParameter("colorString");						
			let input = this.byId("signature");
			input.setBgColor(color);
			
		},
		onAfterRendering : function(){
			
		},		
		_onRouteMatched : function (oEvent) {			
			
		},

		onPageChanged(oEvent){
			let params = oEvent.getParameters();
			let msg = "Página atual: " + params.currentPage;
			msg += "\r\nPagina Selecionada: " + params.selectedPage;
			MessageToast.show(msg);
		},

		onSerchDimession : function(oEvent){
            let dimension = oEvent.getSource().getDimension();          
            let model = this.getModel("Dimensions");

            if (!this._oDialogDimensions) {
                this._oDialogDimensions = sap.ui.xmlfragment("InventCustomControls.view.fragments.ChooseFromModal", this);				
                this._oDialogDimensions.addStyleClass(this.getOwnerComponent().getContentDensityClass());
			}
			
			var modelDialog = model.getData()[dimension-1].CenterCosts;
			let modelMapped = modelDialog.map(x=>{
				return {
					Title:x.OcrCode,
					Description: x.OcrName,
					Dimension: x.DimCode
				}
			})			
			
            this._oDialogDimensions.setModel(new JSONModel(modelMapped));                                                	            
            this._oDialogDimensions.setMultiSelect(false);
            this._oDialogDimensions.setRememberSelections(false); 							
            this._oDialogDimensions.open();
            jQuery.sap.syncStyleClass(this.getOwnerComponent().getContentDensityClass(), this.getView(), this._oDialogDimensions);
		},
		
		handleCloseChooseFromModalSelection(oEvent){
			var aContexts = oEvent.getParameter("selectedContexts");
			if (!aContexts || !aContexts.length) 
				return;
			var centerCost = aContexts.map(
				(oContext) => { 
					return oContext.getObject() 
				})[0];
			
			let msg = "Código do Centro de Custo: " + centerCost.Title;
			msg+="\r\nDescrição: " + centerCost.Description;
			let propertyName = "/OcrName";
			if(centerCost.Dimension > 1)
				propertyName+= centerCost.Dimension;

			this.getModel('SelectedCenterCosts').setProperty(propertyName, centerCost.Description);
			MessageToast.show(msg)
	
		},

		fillHtmlValue(){
			this.getModel("htmlEditor").loadData(this.getServerUrl("HtmlEditor.json"));
		}

		
	});

});