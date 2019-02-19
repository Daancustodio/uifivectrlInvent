sap.ui.define([
    "sap/m/SearchField",
    "InventCustomControls/model/formatter"
], function (SearchField, formatter) {
	"use strict";
	return SearchField.extend("InventCustomControls.controls.CenterCostsSearch", {
		metadata : {
            properties : {
				dimension: 	{type : "int", defaultValue :-1}
			}
        },

		init : function () {
            
        },
        renderer : {}
	});
});