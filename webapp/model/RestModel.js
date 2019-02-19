jQuery.sap.require("sap.ui.model.json.JSONModel");

sap.ui.model.json.JSONModel.extend("InventCustomControls.model.RestModel", {	
		
	loadDataNew: function(sURL, fnSuccess, fnError, oParameters, bAsync, sType,dataType, bMerge, bCache){
			
			var that = this;

			if (bAsync !== false) {
				bAsync = true;
			}
			if (!sType)	{
				sType = "GET";
			}
			if (bCache === undefined) {
				bCache = this.bCache;
			}

			if(!dataType){
				dataType = 'application/json';
			}
			
			this.fireRequestSent({url : sURL, type : sType, async : bAsync, info : "cache="+bCache+";bMerge=" + bMerge});

			jQuery.ajax({
			  url: sURL,
			  async: bAsync,
			  dataType: dataType,
			  cache: bCache,
			  data: oParameters,
			  type: sType,
			  success: function(oData) {
				if (!oData) {
					jQuery.sap.log.fatal("Aconteceu um problema: O serviço não retornou nenhum dado: " + sURL);
				}
				that.oDataOrig = {};
				that.oDataOrig = jQuery.extend(true,{},that.oDataOrig, oData); // Holds a copy of the original data   
				that.setData(oData, bMerge);
				that.fireRequestCompleted({url : sURL, type : sType, async : bAsync, info : "cache=false;bMerge=" + bMerge});
				// call the callback success function if informed
				if (typeof fnSuccess === 'function') {
                    fnSuccess(oData);
                }

			  },
			  error: function(XMLHttpRequest, textStatus, errorThrown){
				
				jQuery.sap.log.fatal("Aconteceu um problema: " + textStatus, XMLHttpRequest.responseText + ","
							+ XMLHttpRequest.status + "," + XMLHttpRequest.statusText);
				that.fireRequestCompleted({url : sURL, type : sType, async : bAsync, info : "cache=false;bMerge=" + bMerge});
				that.fireRequestFailed({message : textStatus,
					statusCode : XMLHttpRequest.status, statusText : XMLHttpRequest.statusText, responseText : XMLHttpRequest.responseText});
			  	// call the callback error function if informed
				if (typeof fnError === 'function') {
                    fnError({message : textStatus, statusCode : XMLHttpRequest.status, statusText : XMLHttpRequest.statusText, responseText : XMLHttpRequest.responseText, response: XMLHttpRequest.responseJSON});
                }
			  }
			});

	},
	
	getOrigData: function(){
		return this.oDataOrig; 
	},
	
	discardChanges: function(){
		this.setData(this.oDataOrig); 
	},
	
	commitChanges: function(){
		this.oDataOrig = this.getData();
    },
    
    post:function(url, fnSuccess, fnerror){
		let data =this.getData();
       	this.loadDataNew(url, fnSuccess, fnerror, data, true, 'POST');
    },
    
    put:function(url, fnSuccess, fnerror){
		let data = JSON.stringify(this.getData());
        this.loadDataNew(url, fnSuccess , fnerror, data, true, 'PUT');        
	},
	
    get:function(url, fnSuccess, fnerror, dataType="json"){		
        this.loadDataNew(url, fnSuccess , fnerror, null, true, 'GET', dataType);        
	},  
	
    delete:function(url, fnSuccess, fnerror, dataType="json"){
        this.loadDataNew(url, fnSuccess , fnerror, null, true, 'DELETE', dataType);        
	},

	request: function(url, data, fnSuccess, fnError, method, dataType){		
		this.loadDataNew(url, fnSuccess, fnError,  data, true, method, dataType);
		
	}
});