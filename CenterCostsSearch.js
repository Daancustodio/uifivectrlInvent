sap.ui.define([
    "sap/m/SearchField",
    "ExemploJacob/model/formatter"
], function (SearchField, formatter) {
	"use strict";
	return SearchField.extend("ExemploJacob.controls.CenterCostsSearch", {
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