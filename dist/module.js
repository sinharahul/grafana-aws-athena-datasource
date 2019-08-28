define(["lodash","app/core/table_model","app/plugins/sdk"],function(e,t,r){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=3)}([function(t,r){t.exports=e},function(e,r){e.exports=t},function(e,t){e.exports=r},function(e,t,r){"use strict";r.r(t);var n,a=r(0),i=r.n(a),u=r(1),o=r.n(u),s=function(){function e(e,t,r,n,a){this.type=e.type,this.url=e.url,this.name=e.name,this.id=e.id,this.defaultRegion=e.jsonData.defaultRegion,this.q=t,this.backendSrv=r,this.templateSrv=n,this.timeSrv=a}return e.$inject=["instanceSettings","$q","backendSrv","templateSrv","timeSrv"],e.prototype.query=function(e){var t=this.buildQueryParameters(e);return t.targets=t.targets.filter(function(e){return!e.hide}),t.targets.length<=0?this.q.when({data:[]}):this.doRequest({data:t})},e.prototype.testDatasource=function(){var e=this;return this.doMetricQueryRequest("named_query_names",{region:this.defaultRegion}).then(function(t){return e.q.when({status:"success",message:"Data source is working",title:"Success"})}).catch(function(e){return{status:"error",message:e.message,title:"Error"}})},e.prototype.doRequest=function(e){return this.backendSrv.datasourceRequest({url:"/api/tsdb/query",method:"POST",data:{from:e.data.range.from.valueOf().toString(),to:e.data.range.to.valueOf().toString(),queries:e.data.targets}}).then(function(t){for(var r=[],n=0,a=e.data.targets;n<a.length;n++){var u=a[n],s=t.data.results[u.refId];i.a.isEmpty(s.series)||i.a.forEach(s.series,function(e){r.push({target:e.name,datapoints:e.points})}),i.a.isEmpty(s.tables)||i.a.forEach(s.tables,function(e){var t=new o.a;t.columns=e.columns,t.rows=e.rows,r.push(t)})}return t.data=r,t})},e.prototype.buildQueryParameters=function(e){var t=this,r=i.a.map(e.targets,function(r){return{refId:r.refId,hide:r.hide,datasourceId:t.id,queryType:"timeSeriesQuery",format:r.format||"timeserie",region:t.templateSrv.replace(r.region,e.scopedVars)||t.defaultRegion,timestampColumn:r.timestampColumn,valueColumn:r.valueColumn,legendFormat:r.legendFormat||"",inputs:t.templateSrv.replace(r.queryExecutionId,e.scopedVars).split(/,/).map(function(e){return{queryExecutionId:e}})}});return e.targets=r,e},e.prototype.metricFindQuery=function(e){var t,r=e.match(/^named_query_names\(([^\)]+?)\)/);if(r)return t=r[1],this.doMetricQueryRequest("named_query_names",{region:this.templateSrv.replace(t)});var n=e.match(/^named_query_queries\(([^,]+?),\s?(.+)\)/);if(n){t=n[1];var a=n[2];return this.doMetricQueryRequest("named_query_queries",{region:this.templateSrv.replace(t),pattern:this.templateSrv.replace(a,{},"regex")})}var i=e.match(/^query_execution_ids\(([^,]+?),\s?([^,]+?),\s?([^,]+)(,\s?.+)?\)/);if(i){t=i[1];var u=i[2],o=(a=i[3],i[4]);return o=o?(o=o.substr(1)).trim():null,this.doMetricQueryRequest("query_execution_ids",{region:this.templateSrv.replace(t),limit:parseInt(this.templateSrv.replace(u),10),pattern:this.templateSrv.replace(a,{},"regex"),work_group:this.templateSrv.replace(o)})}return this.q.when([])},e.prototype.doMetricQueryRequest=function(e,t){var r=this,n=this.timeSrv.timeRange();return this.backendSrv.datasourceRequest({url:"/api/tsdb/query",method:"POST",data:{from:n.from.valueOf().toString(),to:n.to.valueOf().toString(),queries:[i.a.extend({refId:"metricFindQuery",datasourceId:this.id,queryType:"metricFindQuery",subtype:e},t)]}}).then(function(e){return r.transformSuggestDataFromTable(e.data)})},e.prototype.transformSuggestDataFromTable=function(e){return i.a.map(e.results.metricFindQuery.tables[0].rows,function(e){return{text:e[0],value:e[1]}})},e}(),c=r(2),l=(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),p=function(e){function t(t,r){var n=e.call(this,t,r)||this;return n.scope=t,n.target.format=n.target.format||n.target.type||"timeserie",n.target.region=n.target.region||"",n.target.timestampColumn=n.target.timestampColumn||"",n.target.valueColumn=n.target.valueColumn||"",n.target.legendFormat=n.target.legendFormat||"",n.target.queryExecutionId=n.target.queryExecutionId||"",n}return t.$inject=["$scope","$injector"],l(t,e),t.prototype.onChangeInternal=function(){this.panelCtrl.refresh()},t.templateUrl="partials/query.editor.html",t}(c.QueryCtrl),d=function(){function e(e,t){this.current.jsonData.authType=this.current.jsonData.authType||"credentials",this.accessKeyExist=this.current.secureJsonFields.accessKey,this.secretKeyExist=this.current.secureJsonFields.secretKey,this.datasourceSrv=t,this.authTypes=[{name:"Access & secret key",value:"keys"},{name:"Credentials file",value:"credentials"},{name:"ARN",value:"arn"}]}return e.$inject=["$scope","datasourceSrv"],e.prototype.resetAccessKey=function(){this.accessKeyExist=!1},e.prototype.resetSecretKey=function(){this.secretKeyExist=!1},e.templateUrl="partials/config.html",e}();r.d(t,"Datasource",function(){return s}),r.d(t,"QueryCtrl",function(){return p}),r.d(t,"ConfigCtrl",function(){return d})}])});