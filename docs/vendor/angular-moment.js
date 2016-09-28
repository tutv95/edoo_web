
'format amd';(function(){'use strict';function angularMoment(angular,moment){return angular.module('angularMoment',[]).constant('angularMomentConfig',{preprocess:null,timezone:'',format:null,statefulFilters:true}).constant('moment',moment).constant('amTimeAgoConfig',{withoutSuffix:false,serverTime:null,titleFormat:null,fullDateThreshold:null,fullDateFormat:null}).directive('amTimeAgo',['$window','moment','amMoment','amTimeAgoConfig','angularMomentConfig',function($window,moment,amMoment,amTimeAgoConfig,angularMomentConfig){return function(scope,element,attr){var activeTimeout=null;var currentValue;var currentFormat=angularMomentConfig.format;var withoutSuffix=amTimeAgoConfig.withoutSuffix;var titleFormat=amTimeAgoConfig.titleFormat;var fullDateThreshold=amTimeAgoConfig.fullDateThreshold;var fullDateFormat=amTimeAgoConfig.fullDateFormat;var localDate=new Date().getTime();var preprocess=angularMomentConfig.preprocess;var modelName=attr.amTimeAgo;var currentFrom;var isTimeElement=('TIME'===element[0].nodeName.toUpperCase());function getNow(){var now;if(currentFrom){now=currentFrom;}else if(amTimeAgoConfig.serverTime){var localNow=new Date().getTime();var nowMillis=localNow-localDate+amTimeAgoConfig.serverTime;now=moment(nowMillis);}
else{now=moment();}
return now;}
function cancelTimer(){if(activeTimeout){$window.clearTimeout(activeTimeout);activeTimeout=null;}}
function updateTime(momentInstance){var daysAgo=getNow().diff(momentInstance,'day');var showFullDate=fullDateThreshold&&daysAgo>=fullDateThreshold;if(showFullDate){element.text(momentInstance.format(fullDateFormat));}else{element.text(momentInstance.from(getNow(),withoutSuffix));}
if(titleFormat&&!element.attr('title')){element.attr('title',momentInstance.local().format(titleFormat));}
if(!showFullDate){var howOld=Math.abs(getNow().diff(momentInstance,'minute'));var secondsUntilUpdate=3600;if(howOld<1){secondsUntilUpdate=1;}else if(howOld<60){secondsUntilUpdate=30;}else if(howOld<180){secondsUntilUpdate=300;}
activeTimeout=$window.setTimeout(function(){updateTime(momentInstance);},secondsUntilUpdate*1000);}}
function updateDateTimeAttr(value){if(isTimeElement){element.attr('datetime',value);}}
function updateMoment(){cancelTimer();if(currentValue){var momentValue=amMoment.preprocessDate(currentValue,preprocess,currentFormat);updateTime(momentValue);updateDateTimeAttr(momentValue.toISOString());}}
scope.$watch(modelName,function(value){if((typeof value==='undefined')||(value===null)||(value==='')){cancelTimer();if(currentValue){element.text('');updateDateTimeAttr('');currentValue=null;}
return;}
currentValue=value;updateMoment();});if(angular.isDefined(attr.amFrom)){scope.$watch(attr.amFrom,function(value){if((typeof value==='undefined')||(value===null)||(value==='')){currentFrom=null;}else{currentFrom=moment(value);}
updateMoment();});}
if(angular.isDefined(attr.amWithoutSuffix)){scope.$watch(attr.amWithoutSuffix,function(value){if(typeof value==='boolean'){withoutSuffix=value;updateMoment();}else{withoutSuffix=amTimeAgoConfig.withoutSuffix;}});}
attr.$observe('amFormat',function(format){if(typeof format!=='undefined'){currentFormat=format;updateMoment();}});attr.$observe('amPreprocess',function(newValue){preprocess=newValue;updateMoment();});attr.$observe('amFullDateThreshold',function(newValue){fullDateThreshold=newValue;updateMoment();});attr.$observe('amFullDateFormat',function(newValue){fullDateFormat=newValue;updateMoment();});scope.$on('$destroy',function(){cancelTimer();});scope.$on('amMoment:localeChanged',function(){updateMoment();});};}]).service('amMoment',['moment','$rootScope','$log','angularMomentConfig',function(moment,$rootScope,$log,angularMomentConfig){this.preprocessors={utc:moment.utc,unix:moment.unix};this.changeLocale=function(locale,customization){var result=moment.locale(locale,customization);if(angular.isDefined(locale)){$rootScope.$broadcast('amMoment:localeChanged');}
return result;};this.changeTimezone=function(timezone){angularMomentConfig.timezone=timezone;$rootScope.$broadcast('amMoment:timezoneChanged');};this.preprocessDate=function(value,preprocess,format){if(angular.isUndefined(preprocess)){preprocess=angularMomentConfig.preprocess;}
if(this.preprocessors[preprocess]){return this.preprocessors[preprocess](value,format);}
if(preprocess){$log.warn('angular-moment: Ignoring unsupported value for preprocess: '+preprocess);}
if(!isNaN(parseFloat(value))&&isFinite(value)){return moment(parseInt(value,10));}
return moment(value,format);};this.applyTimezone=function(aMoment,timezone){timezone=timezone||angularMomentConfig.timezone;if(!timezone){return aMoment;}
if(timezone.match(/^Z|[+-]\d\d:?\d\d$/i)){aMoment=aMoment.utcOffset(timezone);}else if(aMoment.tz){aMoment=aMoment.tz(timezone);}else{$log.warn('angular-moment: named timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js?');}
return aMoment;};}]).filter('amCalendar',['moment','amMoment','angularMomentConfig',function(moment,amMoment,angularMomentConfig){function amCalendarFilter(value,preprocess,timezone){if(typeof value==='undefined'||value===null){return'';}
value=amMoment.preprocessDate(value,preprocess);var date=moment(value);if(!date.isValid()){return'';}
return amMoment.applyTimezone(date,timezone).calendar();}
amCalendarFilter.$stateful=angularMomentConfig.statefulFilters;return amCalendarFilter;}]).filter('amDifference',['moment','amMoment','angularMomentConfig',function(moment,amMoment,angularMomentConfig){function amDifferenceFilter(value,otherValue,unit,usePrecision,preprocessValue,preprocessOtherValue){if(typeof value==='undefined'||value===null){return'';}
value=amMoment.preprocessDate(value,preprocessValue);var date=moment(value);if(!date.isValid()){return'';}
var date2;if(typeof otherValue==='undefined'||otherValue===null){date2=moment();}else{otherValue=amMoment.preprocessDate(otherValue,preprocessOtherValue);date2=moment(otherValue);if(!date2.isValid()){return'';}}
return amMoment.applyTimezone(date).diff(amMoment.applyTimezone(date2),unit,usePrecision);}
amDifferenceFilter.$stateful=angularMomentConfig.statefulFilters;return amDifferenceFilter;}]).filter('amDateFormat',['moment','amMoment','angularMomentConfig',function(moment,amMoment,angularMomentConfig){function amDateFormatFilter(value,format,preprocess,timezone,inputFormat){var currentFormat=inputFormat||angularMomentConfig.format;if(typeof value==='undefined'||value===null){return'';}
value=amMoment.preprocessDate(value,preprocess,currentFormat);var date=moment(value);if(!date.isValid()){return'';}
return amMoment.applyTimezone(date,timezone).format(format);}
amDateFormatFilter.$stateful=angularMomentConfig.statefulFilters;return amDateFormatFilter;}]).filter('amDurationFormat',['moment','angularMomentConfig',function(moment,angularMomentConfig){function amDurationFormatFilter(value,format,suffix){if(typeof value==='undefined'||value===null){return'';}
return moment.duration(value,format).humanize(suffix);}
amDurationFormatFilter.$stateful=angularMomentConfig.statefulFilters;return amDurationFormatFilter;}]).filter('amTimeAgo',['moment','amMoment','angularMomentConfig',function(moment,amMoment,angularMomentConfig){function amTimeAgoFilter(value,preprocess,suffix,from){var date,dateFrom;if(typeof value==='undefined'||value===null){return'';}
value=amMoment.preprocessDate(value,preprocess);date=moment(value);if(!date.isValid()){return'';}
dateFrom=moment(from);if(typeof from!=='undefined'&&dateFrom.isValid()){return amMoment.applyTimezone(date).from(dateFrom,suffix);}
return amMoment.applyTimezone(date).fromNow(suffix);}
amTimeAgoFilter.$stateful=angularMomentConfig.statefulFilters;return amTimeAgoFilter;}]).filter('amSubtract',['moment','angularMomentConfig',function(moment,angularMomentConfig){function amSubtractFilter(value,amount,type){if(typeof value==='undefined'||value===null){return'';}
return moment(value).subtract(parseInt(amount,10),type);}
amSubtractFilter.$stateful=angularMomentConfig.statefulFilters;return amSubtractFilter;}]).filter('amAdd',['moment','angularMomentConfig',function(moment,angularMomentConfig){function amAddFilter(value,amount,type){if(typeof value==='undefined'||value===null){return'';}
return moment(value).add(parseInt(amount,10),type);}
amAddFilter.$stateful=angularMomentConfig.statefulFilters;return amAddFilter;}]);}
if(typeof define==='function'&&define.amd){define(['angular','moment'],angularMoment);}else if(typeof module!=='undefined'&&module&&module.exports){angularMoment(angular,require('moment'));module.exports='angularMoment';}else{angularMoment(angular,(typeof global!=='undefined'?global:window).moment);}})();