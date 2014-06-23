/*
 * ========================================================================
 * jrs_iframe_helper.js : v0.0.1
 * 
 * ========================================================================
 * Copyright 2014 
 * Author: Gene Arnold 
 *
 * https://github.com/GeneArnold/jrs_iframe_helper
 *
 * Unless you have purchased a commercial license agreement from Jaspersoft Inc., the following license terms apply:
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the 
 * GNU Affero General Public License as published by the Free Software Foundation, either version 3 
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public 
 * License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License 
 * along with this program. If not, see http://www.gnu.org/licenses/.
 * ======================================================================== 
 */

function loadReport(report){

	//Building the string that will be used as the iframe src to launch the JRS item
	var strURL;

	strURL = ((report.host) ? report.host : " Missing Host ");

	strURL += ((report.port) ? ":" + report.port : "");

	strURL += ((report.appPath) ?  "/" + report.appPath : "/" + " Missing appPath ");

	strURL += "/flow.html";

	strURL += ((report._flowId) ?  "?_flowId=" + report._flowId : "?" + " Missing _flowId ");

	strURL += ((report._flowId == "viewReportFlow" && report.reportUnit)  ?  "&reportUnit=" + report.reportUnit : "");

	strURL += ((report.mode) ?  "&mode=" + report.mode : "");

	strURL += ((report.resource) ? "&resource=" + report.resource : "");

	strURL += ((report.dashboardResource) ?  "&dashboardResource=" + report.dashboardResource : "");

	if(report._flowId != "adhocFlow"){
		strURL += ((report.viewAsDashboardFrame.toLowerCase() == "true") ?  "&viewAsDashboardFrame=true" : "&viewAsDashboardFrame=false");
	}

	if(report._flowId == "adhocFlow"){
		strURL += ((report.viewReport) ?  "&viewReport=" + report.viewReport : "");
	}

	strURL += ((report.decorate.toLowerCase() == "yes") ?  "&decorate=yes" : "&decorate=no");

	strURL += ((report.theme) ?  "&theme=" + report.theme : "");

	strURL += ((report.j_username) ?  "&j_username=" + report.j_username : "");

	strURL += ((report.j_password) ?  "&j_password=" + report.j_password : "");

	var pList = report.parameterList;
	var pListStr = "";
	for (var key in pList) 
	{
	    if (pList.hasOwnProperty(key))
	    {
	    	pListStr += key + "=" + pList[key] + "&";
	    }
	}
	pListStr = pListStr.substring(0,pListStr.length - 1);
	strURL += ((pListStr.length > 1) ? "&" + pListStr : "");


	var hpList = report.hidden_parameterList;
	var hpListStr = "";
	for (var key in hpList) 
	{
	    if (hpList.hasOwnProperty(key))
	    {
	    	hpListStr += key + "=" + hpList[key] + "&";
	    }
	}
	hpListStr = hpListStr.substring(0,hpListStr.length - 1);
	strURL += ((hpListStr.length > 1) ? "&" + hpListStr : "");

	strURL += ((report.output) ?  "&output=" + report.output : "");
	
	var frame = document.getElementById(report.htmlContainer);
	frame.src = strURL;

	return strURL;

}