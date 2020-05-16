var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};Module.checkABI(1);if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0;Module.finishedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="python-dateutil.data";var REMOTE_PACKAGE_BASE="python-dateutil.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata.remote_package_size;var PACKAGE_UUID=metadata.package_uuid;function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.7",true,true);Module["FS_createPath"]("/lib/python3.7","site-packages",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages","dateutil",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/dateutil","tz",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/dateutil","parser",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/dateutil","zoneinfo",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages","python_dateutil-2.8.1-py3.7.egg-info",true,true);function DataRequest(start,end,audio){this.start=start;this.end=end;this.audio=audio}DataRequest.prototype={requests:{},open:function(mode,name){this.name=name;this.requests[name]=this;Module["addRunDependency"]("fp "+this.name)},send:function(){},onload:function(){var byteArray=this.byteArray.subarray(this.start,this.end);this.finish(byteArray)},finish:function(byteArray){var that=this;Module["FS_createPreloadedFile"](this.name,null,byteArray,true,true,function(){Module["removeRunDependency"]("fp "+that.name)},function(){if(that.audio){Module["removeRunDependency"]("fp "+that.name)}else{err("Preloading file "+that.name+" failed")}},false,true);this.requests[this.name]=null}};function processPackageData(arrayBuffer){Module.finishedDataFileDownloads++;assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:304767,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1361,2503,3536,4541,5746,7090,8185,9365,10556,11324,12241,12984,13854,14851,15913,16862,17589,18416,19231,20464,21795,22766,23620,24575,25582,26511,27672,28709,29745,30846,31835,32577,33449,34884,36295,37287,38342,39158,40284,40893,41802,42596,43201,43934,44818,46156,47630,49078,50367,51589,52826,54012,55164,56226,57198,58597,59756,60976,62107,63071,64255,65617,66763,67919,69045,70143,71236,72460,73593,74829,75966,76997,78422,79486,80680,81913,83056,83927,84727,85787,87045,88039,88765,89869,91231,92619,94036,95151,96319,97631,98945,100095,101616,103038,104210,104835,105970,107164,108119,109113,110252,111062,112288,113467,114618,115578,116554,117516,118578,119442,120555,121754,122954,124019,125208,126532,127771,128786,129550,130486,131305,132468,133828,135097,136127,137101,138187,139409,140675,142045,143303,145104,147152,149200,151248,153296,155351,157399,159447,161495,163543,165591,167639,169684,171732,173781,175829,177886,179934,181982,184030,186078,188126,190148,192202,194250,196298,198346,200394,202442,204490,206538,208586,210634,212682,214730,216778,218826,220874,222922,224970,227009,229028,231076,233124,235172,237220,239268,241316,243364,245412,247460,249517,251565,253621,255669,257717,259768,261816,263864,265912,267960,270008,272056,274111,276159,278207,280255,282303,284351,286399,288456,290504,292552,294609,296657,298162,299280,300277,301446,302733,304106],sizes:[1361,1142,1033,1005,1205,1344,1095,1180,1191,768,917,743,870,997,1062,949,727,827,815,1233,1331,971,854,955,1007,929,1161,1037,1036,1101,989,742,872,1435,1411,992,1055,816,1126,609,909,794,605,733,884,1338,1474,1448,1289,1222,1237,1186,1152,1062,972,1399,1159,1220,1131,964,1184,1362,1146,1156,1126,1098,1093,1224,1133,1236,1137,1031,1425,1064,1194,1233,1143,871,800,1060,1258,994,726,1104,1362,1388,1417,1115,1168,1312,1314,1150,1521,1422,1172,625,1135,1194,955,994,1139,810,1226,1179,1151,960,976,962,1062,864,1113,1199,1200,1065,1189,1324,1239,1015,764,936,819,1163,1360,1269,1030,974,1086,1222,1266,1370,1258,1801,2048,2048,2048,2048,2055,2048,2048,2048,2048,2048,2048,2045,2048,2049,2048,2057,2048,2048,2048,2048,2048,2022,2054,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2039,2019,2048,2048,2048,2048,2048,2048,2048,2048,2048,2057,2048,2056,2048,2048,2051,2048,2048,2048,2048,2048,2048,2055,2048,2048,2048,2048,2048,2048,2057,2048,2048,2057,2048,1505,1118,997,1169,1287,1373,661],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,1,1,1,1,1,1,1]};compressedData.data=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData});Module["removeRunDependency"]("datafile_python-dateutil.data")}Module["addRunDependency"]("datafile_python-dateutil.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.7/site-packages/dateutil/rrule.py",start:0,end:66739,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/_common.py",start:66739,end:67671,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/relativedelta.py",start:67671,end:92575,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/__init__.py",start:92575,end:92797,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/utils.py",start:92797,end:94756,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/_version.py",start:94756,end:94872,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/tzwin.py",start:94872,end:94931,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/easter.py",start:94931,end:97615,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/tz/_common.py",start:97615,end:110592,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/tz/_factories.py",start:110592,end:113161,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/tz/__init__.py",start:113161,end:113605,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/tz/tz.py",start:113605,end:176537,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/tz/win.py",start:176537,end:189472,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/parser/_parser.py",start:189472,end:248276,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/parser/__init__.py",start:248276,end:250042,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/parser/isoparser.py",start:250042,end:263140,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/zoneinfo/__init__.py",start:263140,end:269029,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/zoneinfo/dateutil-zoneinfo.tar.gz",start:269029,end:422344,audio:0},{filename:"/lib/python3.7/site-packages/dateutil/zoneinfo/rebuild.py",start:422344,end:424063,audio:0},{filename:"/lib/python3.7/site-packages/python_dateutil-2.8.1-py3.7.egg-info/zip-safe",start:424063,end:424064,audio:0},{filename:"/lib/python3.7/site-packages/python_dateutil-2.8.1-py3.7.egg-info/SOURCES.txt",start:424064,end:426132,audio:0},{filename:"/lib/python3.7/site-packages/python_dateutil-2.8.1-py3.7.egg-info/top_level.txt",start:426132,end:426141,audio:0},{filename:"/lib/python3.7/site-packages/python_dateutil-2.8.1-py3.7.egg-info/dependency_links.txt",start:426141,end:426142,audio:0},{filename:"/lib/python3.7/site-packages/python_dateutil-2.8.1-py3.7.egg-info/requires.txt",start:426142,end:426151,audio:0},{filename:"/lib/python3.7/site-packages/python_dateutil-2.8.1-py3.7.egg-info/PKG-INFO",start:426151,end:435470,audio:0}],remote_package_size:308863,package_uuid:"deea783a-49f0-43d8-806d-93b7856f0cbb"})})();