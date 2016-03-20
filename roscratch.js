(function (ext) {
    //Event emitter and ROSLIB
    !function(e){function r(){this._events={};if(this._conf){i.call(this,this._conf)}}function i(e){if(e){this._conf=e;e.delimiter&&(this.delimiter=e.delimiter);e.maxListeners&&(this._events.maxListeners=e.maxListeners);e.wildcard&&(this.wildcard=e.wildcard);e.newListener&&(this.newListener=e.newListener);if(this.wildcard){this.listenerTree={}}}}function s(e){this._events={};this.newListener=false;i.call(this,e)}function o(e,t,n,r){if(!n){return[]}var i=[],s,u,a,f,l,c,h,p=t.length,d=t[r],v=t[r+1];if(r===p&&n._listeners){if(typeof n._listeners==="function"){e&&e.push(n._listeners);return[n]}else{for(s=0,u=n._listeners.length;s<u;s++){e&&e.push(n._listeners[s])}return[n]}}if(d==="*"||d==="**"||n[d]){if(d==="*"){for(a in n){if(a!=="_listeners"&&n.hasOwnProperty(a)){i=i.concat(o(e,t,n[a],r+1))}}return i}else if(d==="**"){h=r+1===p||r+2===p&&v==="*";if(h&&n._listeners){i=i.concat(o(e,t,n,p))}for(a in n){if(a!=="_listeners"&&n.hasOwnProperty(a)){if(a==="*"||a==="**"){if(n[a]._listeners&&!h){i=i.concat(o(e,t,n[a],p))}i=i.concat(o(e,t,n[a],r))}else if(a===v){i=i.concat(o(e,t,n[a],r+2))}else{i=i.concat(o(e,t,n[a],r))}}}return i}i=i.concat(o(e,t,n[d],r+1))}f=n["*"];if(f){o(e,t,f,r+1)}l=n["**"];if(l){if(r<p){if(l._listeners){o(e,t,l,p)}for(a in l){if(a!=="_listeners"&&l.hasOwnProperty(a)){if(a===v){o(e,t,l[a],r+2)}else if(a===d){o(e,t,l[a],r+1)}else{c={};c[a]=l[a];o(e,t,{"**":c},r+1)}}}}else if(l._listeners){o(e,t,l,p)}else if(l["*"]&&l["*"]._listeners){o(e,t,l["*"],p)}}return i}function u(e,r){e=typeof e==="string"?e.split(this.delimiter):e.slice();for(var i=0,s=e.length;i+1<s;i++){if(e[i]==="**"&&e[i+1]==="**"){return}}var o=this.listenerTree;var u=e.shift();while(u){if(!o[u]){o[u]={}}o=o[u];if(e.length===0){if(!o._listeners){o._listeners=r}else if(typeof o._listeners==="function"){o._listeners=[o._listeners,r]}else if(t(o._listeners)){o._listeners.push(r);if(!o._listeners.warned){var a=n;if(typeof this._events.maxListeners!=="undefined"){a=this._events.maxListeners}if(a>0&&o._listeners.length>a){o._listeners.warned=true;console.error("(node) warning: possible EventEmitter memory "+"leak detected. %d listeners added. "+"Use emitter.setMaxListeners() to increase limit.",o._listeners.length);console.trace()}}}return true}u=e.shift()}return true}var t=Array.isArray?Array.isArray:function(t){return Object.prototype.toString.call(t)==="[object Array]"};var n=10;s.prototype.delimiter=".";s.prototype.setMaxListeners=function(e){this._events||r.call(this);this._events.maxListeners=e;if(!this._conf)this._conf={};this._conf.maxListeners=e};s.prototype.event="";s.prototype.once=function(e,t){this.many(e,1,t);return this};s.prototype.many=function(e,t,n){function i(){if(--t===0){r.off(e,i)}n.apply(this,arguments)}var r=this;if(typeof n!=="function"){throw new Error("many only accepts instances of Function")}i._origin=n;this.on(e,i);return r};s.prototype.emit=function(){this._events||r.call(this);var e=arguments[0];if(e==="newListener"&&!this.newListener){if(!this._events.newListener){return false}}if(this._all){var t=arguments.length;var n=new Array(t-1);for(var i=1;i<t;i++)n[i-1]=arguments[i];for(i=0,t=this._all.length;i<t;i++){this.event=e;this._all[i].apply(this,n)}}if(e==="error"){if(!this._all&&!this._events.error&&!(this.wildcard&&this.listenerTree.error)){if(arguments[1]instanceof Error){throw arguments[1]}else{throw new Error("Uncaught, unspecified 'error' event.")}return false}}var s;if(this.wildcard){s=[];var u=typeof e==="string"?e.split(this.delimiter):e.slice();o.call(this,s,u,this.listenerTree,0)}else{s=this._events[e]}if(typeof s==="function"){this.event=e;if(arguments.length===1){s.call(this)}else if(arguments.length>1)switch(arguments.length){case 2:s.call(this,arguments[1]);break;case 3:s.call(this,arguments[1],arguments[2]);break;default:var t=arguments.length;var n=new Array(t-1);for(var i=1;i<t;i++)n[i-1]=arguments[i];s.apply(this,n)}return true}else if(s){var t=arguments.length;var n=new Array(t-1);for(var i=1;i<t;i++)n[i-1]=arguments[i];var a=s.slice();for(var i=0,t=a.length;i<t;i++){this.event=e;a[i].apply(this,n)}return a.length>0||!!this._all}else{return!!this._all}};s.prototype.on=function(e,i){if(typeof e==="function"){this.onAny(e);return this}if(typeof i!=="function"){throw new Error("on only accepts instances of Function")}this._events||r.call(this);this.emit("newListener",e,i);if(this.wildcard){u.call(this,e,i);return this}if(!this._events[e]){this._events[e]=i}else if(typeof this._events[e]==="function"){this._events[e]=[this._events[e],i]}else if(t(this._events[e])){this._events[e].push(i);if(!this._events[e].warned){var s=n;if(typeof this._events.maxListeners!=="undefined"){s=this._events.maxListeners}if(s>0&&this._events[e].length>s){this._events[e].warned=true;console.error("(node) warning: possible EventEmitter memory "+"leak detected. %d listeners added. "+"Use emitter.setMaxListeners() to increase limit.",this._events[e].length);console.trace()}}}return this};s.prototype.onAny=function(e){if(typeof e!=="function"){throw new Error("onAny only accepts instances of Function")}if(!this._all){this._all=[]}this._all.push(e);return this};s.prototype.addListener=s.prototype.on;s.prototype.off=function(e,n){if(typeof n!=="function"){throw new Error("removeListener only takes instances of Function")}var r,i=[];if(this.wildcard){var s=typeof e==="string"?e.split(this.delimiter):e.slice();i=o.call(this,null,s,this.listenerTree,0)}else{if(!this._events[e])return this;r=this._events[e];i.push({_listeners:r})}for(var u=0;u<i.length;u++){var a=i[u];r=a._listeners;if(t(r)){var f=-1;for(var l=0,c=r.length;l<c;l++){if(r[l]===n||r[l].listener&&r[l].listener===n||r[l]._origin&&r[l]._origin===n){f=l;break}}if(f<0){continue}if(this.wildcard){a._listeners.splice(f,1)}else{this._events[e].splice(f,1)}if(r.length===0){if(this.wildcard){delete a._listeners}else{delete this._events[e]}}return this}else if(r===n||r.listener&&r.listener===n||r._origin&&r._origin===n){if(this.wildcard){delete a._listeners}else{delete this._events[e]}}}return this};s.prototype.offAny=function(e){var t=0,n=0,r;if(e&&this._all&&this._all.length>0){r=this._all;for(t=0,n=r.length;t<n;t++){if(e===r[t]){r.splice(t,1);return this}}}else{this._all=[]}return this};s.prototype.removeListener=s.prototype.off;s.prototype.removeAllListeners=function(e){if(arguments.length===0){!this._events||r.call(this);return this}if(this.wildcard){var t=typeof e==="string"?e.split(this.delimiter):e.slice();var n=o.call(this,null,t,this.listenerTree,0);for(var i=0;i<n.length;i++){var s=n[i];s._listeners=null}}else{if(!this._events[e])return this;this._events[e]=null}return this};s.prototype.listeners=function(e){if(this.wildcard){var n=[];var i=typeof e==="string"?e.split(this.delimiter):e.slice();o.call(this,n,i,this.listenerTree,0);return n}this._events||r.call(this);if(!this._events[e])this._events[e]=[];if(!t(this._events[e])){this._events[e]=[this._events[e]]}return this._events[e]};s.prototype.listenersAny=function(){if(this._all){return this._all}else{return[]}};if(typeof define==="function"&&define.amd){define(function(){return s})}else if(typeof exports==="object"){exports.EventEmitter2=s}else{window.EventEmitter2=s}}()
    !function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(a){if(null==a)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}b.exports=Object.assign||function(a,b){for(var c,e,f=d(a),g=1;g<arguments.length;g++){c=arguments[g],e=Object.keys(Object(c));for(var h=0;h<e.length;h++)f[e[h]]=c[e[h]]}return f}},{}],2:[function(a,b,c){c.XMLSerializer=XMLSerializer,c.DOMParser=DOMParser,c.implementation=document.implementation},{}],3:[function(a,b,c){var d=this.ROSLIB||{REVISION:"0.16.0"},e=a("object-assign");e(d,a("./core")),e(d,a("./actionlib")),e(d,a("./math")),e(d,a("./tf")),e(d,a("./urdf")),b.exports=d},{"./actionlib":8,"./core":17,"./math":22,"./tf":25,"./urdf":37,"object-assign":1}],4:[function(a,b,c){(function(b){b.ROSLIB=a("./RosLib")}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./RosLib":3}],5:[function(a,b,c){function d(a){var b=this;a=a||{},this.ros=a.ros,this.serverName=a.serverName,this.actionName=a.actionName,this.timeout=a.timeout,this.goals={};var c=!1,d=new e({ros:this.ros,name:this.serverName+"/feedback",messageType:this.actionName+"Feedback"}),f=new e({ros:this.ros,name:this.serverName+"/status",messageType:"actionlib_msgs/GoalStatusArray"}),g=new e({ros:this.ros,name:this.serverName+"/result",messageType:this.actionName+"Result"});this.goalTopic=new e({ros:this.ros,name:this.serverName+"/goal",messageType:this.actionName+"Goal"}),this.cancelTopic=new e({ros:this.ros,name:this.serverName+"/cancel",messageType:"actionlib_msgs/GoalID"}),this.goalTopic.advertise(),this.cancelTopic.advertise(),f.subscribe(function(a){c=!0,a.status_list.forEach(function(a){var c=b.goals[a.goal_id.id];c&&c.emit("status",a)})}),d.subscribe(function(a){var c=b.goals[a.status.goal_id.id];c&&(c.emit("status",a.status),c.emit("feedback",a.feedback))}),g.subscribe(function(a){var c=b.goals[a.status.goal_id.id];c&&(c.emit("status",a.status),c.emit("result",a.result))}),this.timeout&&setTimeout(function(){c||b.emit("timeout")},this.timeout)}var e=a("../core/Topic"),f=a("../core/Message"),g=a("./../util/shim/EventEmitter2.js").EventEmitter2;d.prototype.__proto__=g.prototype,d.prototype.cancel=function(){var a=new f;this.cancelTopic.publish(a)},b.exports=d},{"../core/Message":9,"../core/Topic":16,"./../util/shim/EventEmitter2.js":38}],6:[function(a,b,c){function d(a){var b=this;this.actionClient=a.actionClient,this.goalMessage=a.goalMessage,this.isFinished=!1;var c=new Date;this.goalID="goal_"+Math.random()+"_"+c.getTime(),this.goalMessage=new e({goal_id:{stamp:{secs:0,nsecs:0},id:this.goalID},goal:this.goalMessage}),this.on("status",function(a){b.status=a}),this.on("result",function(a){b.isFinished=!0,b.result=a}),this.on("feedback",function(a){b.feedback=a}),this.actionClient.goals[this.goalID]=this}var e=a("../core/Message"),f=a("./../util/shim/EventEmitter2.js").EventEmitter2;d.prototype.__proto__=f.prototype,d.prototype.send=function(a){var b=this;b.actionClient.goalTopic.publish(b.goalMessage),a&&setTimeout(function(){b.isFinished||b.emit("timeout")},a)},d.prototype.cancel=function(){var a=new e({id:this.goalID});this.actionClient.cancelTopic.publish(a)},b.exports=d},{"../core/Message":9,"./../util/shim/EventEmitter2.js":38}],7:[function(a,b,c){function d(a){var b=this;a=a||{},this.ros=a.ros,this.serverName=a.serverName,this.actionName=a.actionName,this.feedbackPublisher=new e({ros:this.ros,name:this.serverName+"/feedback",messageType:this.actionName+"Feedback"}),this.feedbackPublisher.advertise();var c=new e({ros:this.ros,name:this.serverName+"/status",messageType:"actionlib_msgs/GoalStatusArray"});c.advertise(),this.resultPublisher=new e({ros:this.ros,name:this.serverName+"/result",messageType:this.actionName+"Result"}),this.resultPublisher.advertise();var d=new e({ros:this.ros,name:this.serverName+"/goal",messageType:this.actionName+"Goal"}),g=new e({ros:this.ros,name:this.serverName+"/cancel",messageType:"actionlib_msgs/GoalID"});this.statusMessage=new f({header:{stamp:{secs:0,nsecs:100},frame_id:""},status_list:[]}),this.currentGoal=null,this.nextGoal=null,d.subscribe(function(a){b.currentGoal?(b.nextGoal=a,b.emit("cancel")):(b.statusMessage.status_list=[{goal_id:a.goal_id,status:1}],b.currentGoal=a,b.emit("goal",a.goal))});var h=function(a,b){return a.secs>b.secs?!1:a.secs<b.secs?!0:a.nsecs<b.nsecs?!0:!1};g.subscribe(function(a){0===a.stamp.secs&&0===a.stamp.secs&&""===a.id?(b.nextGoal=null,b.currentGoal&&b.emit("cancel")):(b.currentGoal&&a.id===b.currentGoal.goal_id.id?b.emit("cancel"):b.nextGoal&&a.id===b.nextGoal.goal_id.id&&(b.nextGoal=null),b.nextGoal&&h(b.nextGoal.goal_id.stamp,a.stamp)&&(b.nextGoal=null),b.currentGoal&&h(b.currentGoal.goal_id.stamp,a.stamp)&&b.emit("cancel"))});setInterval(function(){var a=new Date,d=Math.floor(a.getTime()/1e3),e=Math.round(1e9*(a.getTime()/1e3-d));b.statusMessage.header.stamp.secs=d,b.statusMessage.header.stamp.nsecs=e,c.publish(b.statusMessage)},500)}var e=a("../core/Topic"),f=a("../core/Message"),g=a("./../util/shim/EventEmitter2.js").EventEmitter2;d.prototype.__proto__=g.prototype,d.prototype.setSucceeded=function(a){var b=new f({status:{goal_id:this.currentGoal.goal_id,status:3},result:a});this.resultPublisher.publish(b),this.statusMessage.status_list=[],this.nextGoal?(this.currentGoal=this.nextGoal,this.nextGoal=null,this.emit("goal",this.currentGoal.goal)):this.currentGoal=null},d.prototype.sendFeedback=function(a){var b=new f({status:{goal_id:this.currentGoal.goal_id,status:1},feedback:a});this.feedbackPublisher.publish(b)},d.prototype.setPreempted=function(){this.statusMessage.status_list=[];var a=new f({status:{goal_id:this.currentGoal.goal_id,status:2}});this.resultPublisher.publish(a),this.nextGoal?(this.currentGoal=this.nextGoal,this.nextGoal=null,this.emit("goal",this.currentGoal.goal)):this.currentGoal=null},b.exports=d},{"../core/Message":9,"../core/Topic":16,"./../util/shim/EventEmitter2.js":38}],8:[function(a,b,c){var d=a("../core/Ros"),e=a("../mixin"),f=b.exports={ActionClient:a("./ActionClient"),Goal:a("./Goal"),SimpleActionServer:a("./SimpleActionServer")};e(d,["ActionClient","SimpleActionServer"],f)},{"../core/Ros":11,"../mixin":23,"./ActionClient":5,"./Goal":6,"./SimpleActionServer":7}],9:[function(a,b,c){function d(a){e(this,a)}var e=a("object-assign");b.exports=d},{"object-assign":1}],10:[function(a,b,c){function d(a){a=a||{},this.ros=a.ros,this.name=a.name}var e=a("./Service"),f=a("./ServiceRequest");d.prototype.get=function(a){var b=new e({ros:this.ros,name:"/rosapi/get_param",serviceType:"rosapi/GetParam"}),c=new f({name:this.name});b.callService(c,function(b){var c=JSON.parse(b.value);a(c)})},d.prototype.set=function(a,b){var c=new e({ros:this.ros,name:"/rosapi/set_param",serviceType:"rosapi/SetParam"}),d=new f({name:this.name,value:JSON.stringify(a)});c.callService(d,b)},d.prototype["delete"]=function(a){var b=new e({ros:this.ros,name:"/rosapi/delete_param",serviceType:"rosapi/DeleteParam"}),c=new f({name:this.name});b.callService(c,a)},b.exports=d},{"./Service":12,"./ServiceRequest":13}],11:[function(a,b,c){function d(a){a=a||{},this.socket=null,this.idCounter=0,this.isConnected=!1,this.groovyCompatibility="undefined"==typeof a.groovyCompatibility?!0:a.groovyCompatibility,this.setMaxListeners(0),a.url&&this.connect(a.url)}var e=a("./../util/shim/WebSocket.js"),f=a("./SocketAdapter.js"),g=a("./Service"),h=a("./ServiceRequest"),i=a("object-assign"),j=a("./../util/shim/EventEmitter2.js").EventEmitter2;d.prototype.__proto__=j.prototype,d.prototype.connect=function(a){this.socket=i(new e(a),f(this))},d.prototype.close=function(){this.socket&&this.socket.close()},d.prototype.authenticate=function(a,b,c,d,e,f,g){var h={op:"auth",mac:a,client:b,dest:c,rand:d,t:e,level:f,end:g};this.callOnConnection(h)},d.prototype.callOnConnection=function(a){var b=this,c=JSON.stringify(a);this.isConnected?b.socket.send(c):b.once("connection",function(){b.socket.send(c)})},d.prototype.getTopics=function(a,b){var c=new g({ros:this,name:"/rosapi/topics",serviceType:"rosapi/Topics"}),d=new h;"function"==typeof b?c.callService(d,function(b){a(b.topics)},function(a){b(a)}):c.callService(d,function(b){a(b.topics)})},d.prototype.getTopicsForType=function(a,b,c){var d=new g({ros:this,name:"/rosapi/topics_for_type",serviceType:"rosapi/TopicsForType"}),e=new h({type:a});"function"==typeof c?d.callService(e,function(a){b(a.topics)},function(a){c(a)}):d.callService(e,function(a){b(a.topics)})},d.prototype.getServices=function(a,b){var c=new g({ros:this,name:"/rosapi/services",serviceType:"rosapi/Services"}),d=new h;"function"==typeof b?c.callService(d,function(b){a(b.services)},function(a){b(a)}):c.callService(d,function(b){a(b.services)})},d.prototype.getServicesForType=function(a,b,c){var d=new g({ros:this,name:"/rosapi/services_for_type",serviceType:"rosapi/ServicesForType"}),e=new h({type:a});"function"==typeof c?d.callService(e,function(a){b(a.services)},function(a){c(a)}):d.callService(e,function(a){b(a.services)})},d.prototype.getNodes=function(a,b){var c=new g({ros:this,name:"/rosapi/nodes",serviceType:"rosapi/Nodes"}),d=new h;"function"==typeof b?c.callService(d,function(b){a(b.nodes)},function(a){b(a)}):c.callService(d,function(b){a(b.nodes)})},d.prototype.getParams=function(a,b){var c=new g({ros:this,name:"/rosapi/get_param_names",serviceType:"rosapi/GetParamNames"}),d=new h;"function"==typeof b?c.callService(d,function(b){a(b.names)},function(a){b(a)}):c.callService(d,function(b){a(b.names)})},d.prototype.getTopicType=function(a,b,c){var d=new g({ros:this,name:"/rosapi/topic_type",serviceType:"rosapi/TopicType"}),e=new h({topic:a});"function"==typeof c?d.callService(e,function(a){b(a.type)},function(a){c(a)}):d.callService(e,function(a){b(a.type)})},d.prototype.getMessageDetails=function(a,b,c){var d=new g({ros:this,name:"/rosapi/message_details",serviceType:"rosapi/MessageDetails"}),e=new h({type:a});"function"==typeof c?d.callService(e,function(a){b(a.typedefs)},function(a){c(a)}):d.callService(e,function(a){b(a.typedefs)})},d.prototype.decodeTypeDefs=function(a){var b=this,c=function(a,d){for(var e={},f=0;f<a.fieldnames.length;f++){var g=a.fieldarraylen[f],h=a.fieldnames[f],i=a.fieldtypes[f];if(-1===i.indexOf("/"))e[h]=-1===g?i:[i];else{for(var j=!1,k=0;k<d.length;k++)if(d[k].type.toString()===i.toString()){j=d[k];break}if(j){var l=c(j,d);e[h]=-1===g?l:[l]}else b.emit("error","Cannot find "+i+" in decodeTypeDefs")}}return e};return c(a[0],a)},b.exports=d},{"./../util/shim/EventEmitter2.js":38,"./../util/shim/WebSocket.js":39,"./Service":12,"./ServiceRequest":13,"./SocketAdapter.js":15,"object-assign":1}],12:[function(a,b,c){function d(a){a=a||{},this.ros=a.ros,this.name=a.name,this.serviceType=a.serviceType}var e=a("./ServiceResponse");d.prototype.callService=function(a,b,c){var d="call_service:"+this.name+":"+ ++this.ros.idCounter;(b||c)&&this.ros.once(d,function(a){void 0!==a.result&&a.result===!1?"function"==typeof c&&c(a.values):"function"==typeof b&&b(new e(a.values))});var f={op:"call_service",id:d,service:this.name,args:a};this.ros.callOnConnection(f)},b.exports=d},{"./ServiceResponse":14}],13:[function(a,b,c){function d(a){e(this,a)}var e=a("object-assign");b.exports=d},{"object-assign":1}],14:[function(a,b,c){function d(a){e(this,a)}var e=a("object-assign");b.exports=d},{"object-assign":1}],15:[function(a,b,c){(function(c){"use strict";function d(a,b){var c=new g;c.onload=function(){var a=new f,d=a.getContext("2d");a.width=c.width,a.height=c.height,d.imageSmoothingEnabled=!1,d.webkitImageSmoothingEnabled=!1,d.mozImageSmoothingEnabled=!1,d.drawImage(c,0,0);for(var e=d.getImageData(0,0,c.width,c.height).data,g="",h=0;h<e.length;h+=4)g+=String.fromCharCode(e[h],e[h+1],e[h+2]);b(JSON.parse(g))},c.src="data:image/png;base64,"+a.data}function e(a){function b(b){"publish"===b.op?a.emit(b.topic,b.msg):"service_response"===b.op&&a.emit(b.id,b)}return{onopen:function(b){a.isConnected=!0,a.emit("connection",b)},onclose:function(b){a.isConnected=!1,a.emit("close",b)},onerror:function(b){a.emit("error",b)},onmessage:function(a){if("undefined"!=typeof Blob&&a.data instanceof Blob){if(!h)throw"Cannot process BSON encoded message without BSON header.";var c=new FileReader;c.onload=function(){var a=new Uint8Array(this.result),c=h.deserialize(a);"png"===c.op?d(c,b):b(c)},c.readAsArrayBuffer(a.data)}else{var e=JSON.parse("string"==typeof a?a:a.data);"png"===e.op?d(e,b):b(e)}}}}var f=a("./../util/shim/canvas.js"),g=f.Image||c.Image,h=(a("./../util/shim/WebSocket.js"),null);"undefined"!=typeof bson&&(h=bson().BSON),b.exports=e}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./../util/shim/WebSocket.js":39,"./../util/shim/canvas.js":40}],16:[function(a,b,c){function d(a){a=a||{},this.ros=a.ros,this.name=a.name,this.messageType=a.messageType,this.isAdvertised=!1,this.compression=a.compression||"none",this.throttle_rate=a.throttle_rate||0,this.latch=a.latch||!1,this.queue_size=a.queue_size||100,this.queue_length=a.queue_length||0,this.compression&&"png"!==this.compression&&"none"!==this.compression&&this.emit("warning",this.compression+" compression is not supported. No compression will be used."),this.throttle_rate<0&&(this.emit("warning",this.throttle_rate+" is not allowed. Set to 0"),this.throttle_rate=0);var b=this;this._messageCallback=function(a){b.emit("message",new f(a))}}var e=a("./../util/shim/EventEmitter2.js").EventEmitter2,f=a("./Message");d.prototype.__proto__=e.prototype,d.prototype.subscribe=function(a){"function"==typeof a&&this.on("message",a),this.subscribeId||(this.ros.on(this.name,this._messageCallback),this.subscribeId="subscribe:"+this.name+":"+ ++this.ros.idCounter,this.ros.callOnConnection({op:"subscribe",id:this.subscribeId,type:this.messageType,topic:this.name,compression:this.compression,throttle_rate:this.throttle_rate,queue_length:this.queue_length}))},d.prototype.unsubscribe=function(a){a&&(this.off("message",a),this.listeners("message").length)||this.subscribeId&&(this.ros.off(this.name,this._messageCallback),this.emit("unsubscribe"),this.ros.callOnConnection({op:"unsubscribe",id:this.subscribeId,topic:this.name}),this.subscribeId=null)},d.prototype.advertise=function(){this.isAdvertised||(this.advertiseId="advertise:"+this.name+":"+ ++this.ros.idCounter,this.ros.callOnConnection({op:"advertise",id:this.advertiseId,type:this.messageType,topic:this.name,latch:this.latch,queue_size:this.queue_size}),this.isAdvertised=!0)},d.prototype.unadvertise=function(){this.isAdvertised&&(this.emit("unadvertise"),this.ros.callOnConnection({op:"unadvertise",id:this.advertiseId,topic:this.name}),this.isAdvertised=!1)},d.prototype.publish=function(a){this.isAdvertised||this.advertise(),this.ros.idCounter++;var b={op:"publish",id:"publish:"+this.name+":"+this.ros.idCounter,topic:this.name,msg:a,latch:this.latch};this.ros.callOnConnection(b)},b.exports=d},{"./../util/shim/EventEmitter2.js":38,"./Message":9}],17:[function(a,b,c){var d=a("../mixin"),e=b.exports={Ros:a("./Ros"),Topic:a("./Topic"),Message:a("./Message"),Param:a("./Param"),Service:a("./Service"),ServiceRequest:a("./ServiceRequest"),ServiceResponse:a("./ServiceResponse")};d(e.Ros,["Param","Service","Topic"],e)},{"../mixin":23,"./Message":9,"./Param":10,"./Ros":11,"./Service":12,"./ServiceRequest":13,"./ServiceResponse":14,"./Topic":16}],18:[function(a,b,c){function d(a){a=a||{},this.position=new e(a.position),this.orientation=new f(a.orientation)}var e=a("./Vector3"),f=a("./Quaternion");d.prototype.applyTransform=function(a){this.position.multiplyQuaternion(a.rotation),this.position.add(a.translation);var b=a.rotation.clone();b.multiply(this.orientation),this.orientation=b},d.prototype.clone=function(){return new d(this)},b.exports=d},{"./Quaternion":19,"./Vector3":21}],19:[function(a,b,c){function d(a){a=a||{},this.x=a.x||0,this.y=a.y||0,this.z=a.z||0,this.w="number"==typeof a.w?a.w:1}d.prototype.conjugate=function(){this.x*=-1,this.y*=-1,this.z*=-1},d.prototype.norm=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},d.prototype.normalize=function(){var a=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);0===a?(this.x=0,this.y=0,this.z=0,this.w=1):(a=1/a,this.x=this.x*a,this.y=this.y*a,this.z=this.z*a,this.w=this.w*a)},d.prototype.invert=function(){this.conjugate(),this.normalize()},d.prototype.multiply=function(a){var b=this.x*a.w+this.y*a.z-this.z*a.y+this.w*a.x,c=-this.x*a.z+this.y*a.w+this.z*a.x+this.w*a.y,d=this.x*a.y-this.y*a.x+this.z*a.w+this.w*a.z,e=-this.x*a.x-this.y*a.y-this.z*a.z+this.w*a.w;this.x=b,this.y=c,this.z=d,this.w=e},d.prototype.clone=function(){return new d(this)},b.exports=d},{}],20:[function(a,b,c){function d(a){a=a||{},this.translation=new e(a.translation),this.rotation=new f(a.rotation)}var e=a("./Vector3"),f=a("./Quaternion");d.prototype.clone=function(){return new d(this)},b.exports=d},{"./Quaternion":19,"./Vector3":21}],21:[function(a,b,c){function d(a){a=a||{},this.x=a.x||0,this.y=a.y||0,this.z=a.z||0}d.prototype.add=function(a){this.x+=a.x,this.y+=a.y,this.z+=a.z},d.prototype.subtract=function(a){this.x-=a.x,this.y-=a.y,this.z-=a.z},d.prototype.multiplyQuaternion=function(a){var b=a.w*this.x+a.y*this.z-a.z*this.y,c=a.w*this.y+a.z*this.x-a.x*this.z,d=a.w*this.z+a.x*this.y-a.y*this.x,e=-a.x*this.x-a.y*this.y-a.z*this.z;this.x=b*a.w+e*-a.x+c*-a.z-d*-a.y,this.y=c*a.w+e*-a.y+d*-a.x-b*-a.z,this.z=d*a.w+e*-a.z+b*-a.y-c*-a.x},d.prototype.clone=function(){return new d(this)},b.exports=d},{}],22:[function(a,b,c){b.exports={Pose:a("./Pose"),Quaternion:a("./Quaternion"),Transform:a("./Transform"),Vector3:a("./Vector3")}},{"./Pose":18,"./Quaternion":19,"./Transform":20,"./Vector3":21}],23:[function(a,b,c){b.exports=function(a,b,c){b.forEach(function(b){var d=c[b];a.prototype[b]=function(a){return a.ros=this,new d(a)}})}},{}],24:[function(a,b,c){function d(a){a=a||{},this.ros=a.ros,this.fixedFrame=a.fixedFrame||"/base_link",this.angularThres=a.angularThres||2,this.transThres=a.transThres||.01,this.rate=a.rate||10,this.updateDelay=a.updateDelay||50;var b=a.topicTimeout||2,c=Math.floor(b),d=Math.floor(1e9*(b-c));this.topicTimeout={secs:c,nsecs:d},this.currentGoal=!1,this.currentTopic=!1,this.frameInfos={},this.republisherUpdateRequested=!1,this.actionClient=this.ros.ActionClient({serverName:"/tf2_web_republisher",actionName:"tf2_web_republisher/TFSubscriptionAction"}),this.serviceClient=this.ros.Service({name:"/republish_tfs",serviceType:"tf2_web_republisher/RepublishTFs"})}var e=(a("../actionlib/ActionClient"),a("../actionlib/Goal")),f=(a("../core/Service.js"),a("../core/ServiceRequest.js")),g=a("../math/Transform");d.prototype.processTFArray=function(a){a.transforms.forEach(function(a){var b=a.child_frame_id;"/"===b[0]&&(b=b.substring(1));var c=this.frameInfos[b];c&&(c.transform=new g({translation:a.transform.translation,rotation:a.transform.rotation}),c.cbs.forEach(function(a){a(c.transform)}))},this)},d.prototype.updateGoal=function(){var a={source_frames:Object.keys(this.frameInfos),target_frame:this.fixedFrame,angular_thres:this.angularThres,trans_thres:this.transThres,rate:this.rate};if(this.ros.groovyCompatibility)this.currentGoal&&this.currentGoal.cancel(),this.currentGoal=new e({actionClient:this.actionClient,goalMessage:a}),this.currentGoal.on("feedback",this.processTFArray.bind(this)),this.currentGoal.send();else{a.timeout=this.topicTimeout;var b=new f(a);this.serviceClient.callService(b,this.processResponse.bind(this))}this.republisherUpdateRequested=!1},d.prototype.processResponse=function(a){this.currentTopic&&this.currentTopic.unsubscribe(),this.currentTopic=this.ros.Topic({name:a.topic_name,messageType:"tf2_web_republisher/TFArray"}),this.currentTopic.subscribe(this.processTFArray.bind(this))},d.prototype.subscribe=function(a,b){"/"===a[0]&&(a=a.substring(1)),this.frameInfos[a]?this.frameInfos[a].transform&&b(this.frameInfos[a].transform):(this.frameInfos[a]={cbs:[]},this.republisherUpdateRequested||(setTimeout(this.updateGoal.bind(this),this.updateDelay),this.republisherUpdateRequested=!0)),this.frameInfos[a].cbs.push(b)},d.prototype.unsubscribe=function(a,b){"/"===a[0]&&(a=a.substring(1));for(var c=this.frameInfos[a],d=c&&c.cbs||[],e=d.length;e--;)d[e]===b&&d.splice(e,1);b&&0!==d.length||delete this.frameInfos[a]},b.exports=d},{"../actionlib/ActionClient":5,"../actionlib/Goal":6,"../core/Service.js":12,"../core/ServiceRequest.js":13,"../math/Transform":20}],25:[function(a,b,c){var d=a("../core/Ros"),e=a("../mixin"),f=b.exports={TFClient:a("./TFClient")};e(d,["TFClient"],f)},{"../core/Ros":11,"../mixin":23,"./TFClient":24}],26:[function(a,b,c){function d(a){this.dimension=null,this.type=f.URDF_BOX;var b=a.xml.getAttribute("size").split(" ");this.dimension=new e({x:parseFloat(b[0]),y:parseFloat(b[1]),z:parseFloat(b[2])})}var e=a("../math/Vector3"),f=a("./UrdfTypes");b.exports=d},{"../math/Vector3":21,"./UrdfTypes":35}],27:[function(a,b,c){function d(a){var b=a.xml.getAttribute("rgba").split(" ");this.r=parseFloat(b[0]),this.g=parseFloat(b[1]),this.b=parseFloat(b[2]),this.a=parseFloat(b[3])}b.exports=d},{}],28:[function(a,b,c){function d(a){this.type=e.URDF_CYLINDER,this.length=parseFloat(a.xml.getAttribute("length")),this.radius=parseFloat(a.xml.getAttribute("radius"))}var e=a("./UrdfTypes");b.exports=d},{"./UrdfTypes":35}],29:[function(a,b,c){function d(a){this.name=a.xml.getAttribute("name"),this.type=a.xml.getAttribute("type");var b=a.xml.getElementsByTagName("limit");b.length>0&&(this.minval=parseFloat(b[0].getAttribute("lower")),this.maxval=parseFloat(b[0].getAttribute("upper")))}b.exports=d},{}],30:[function(a,b,c){function d(a){this.name=a.xml.getAttribute("name"),this.visuals=[];for(var b=a.xml.getElementsByTagName("visual"),c=0;c<b.length;c++)this.visuals.push(new e({xml:b[c]}))}var e=a("./UrdfVisual");b.exports=d},{"./UrdfVisual":36}],31:[function(a,b,c){function d(a){this.textureFilename=null,this.color=null,this.name=a.xml.getAttribute("name");var b=a.xml.getElementsByTagName("texture");b.length>0&&(this.textureFilename=b[0].getAttribute("filename"));var c=a.xml.getElementsByTagName("color");c.length>0&&(this.color=new e({xml:c[0]}))}var e=a("./UrdfColor");d.prototype.isLink=function(){return null===this.color&&null===this.textureFilename};var f=a("object-assign");d.prototype.assign=function(a){return f(this,a)},b.exports=d},{"./UrdfColor":27,"object-assign":1}],32:[function(a,b,c){function d(a){this.scale=null,this.type=f.URDF_MESH,this.filename=a.xml.getAttribute("filename");var b=a.xml.getAttribute("scale");if(b){var c=b.split(" ");this.scale=new e({x:parseFloat(c[0]),y:parseFloat(c[1]),z:parseFloat(c[2])})}}var e=a("../math/Vector3"),f=a("./UrdfTypes");b.exports=d},{"../math/Vector3":21,"./UrdfTypes":35}],33:[function(a,b,c){function d(a){a=a||{};var b=a.xml,c=a.string;if(this.materials={},this.links={},this.joints={},c){var d=new h;b=d.parseFromString(c,"text/xml")}var j=b.evaluate("//robot",b,null,i,null).singleNodeValue;this.name=j.getAttribute("name");for(var k=j.childNodes,l=0;l<k.length;l++){var m=k[l];if("material"===m.tagName){var n=new e({xml:m});void 0!==this.materials[n.name]?this.materials[n.name].isLink()?this.materials[n.name].assign(n):console.warn("Material "+n.name+"is not unique."):this.materials[n.name]=n}else if("link"===m.tagName){var o=new f({xml:m});if(void 0!==this.links[o.name])console.warn("Link "+o.name+" is not unique.");else{for(var p=0;p<o.visuals.length;p++){var q=o.visuals[p].material;null!==q&&(void 0!==this.materials[q.name]?o.visuals[p].material=this.materials[q.name]:this.materials[q.name]=q)}this.links[o.name]=o}}else if("joint"===m.tagName){var r=new g({xml:m});this.joints[r.name]=r}}}var e=a("./UrdfMaterial"),f=a("./UrdfLink"),g=a("./UrdfJoint"),h=a("xmlshim").DOMParser,i=9;b.exports=d},{"./UrdfJoint":29,"./UrdfLink":30,"./UrdfMaterial":31,xmlshim:2}],34:[function(a,b,c){function d(a){this.type=e.URDF_SPHERE,this.radius=parseFloat(a.xml.getAttribute("radius"))}var e=a("./UrdfTypes");b.exports=d},{"./UrdfTypes":35}],35:[function(a,b,c){b.exports={URDF_SPHERE:0,URDF_BOX:1,URDF_CYLINDER:2,URDF_MESH:3}},{}],36:[function(a,b,c){function d(a){var b=a.xml;this.origin=null,this.geometry=null,this.material=null;var c=b.getElementsByTagName("origin");if(0===c.length)this.origin=new e;else{var d=c[0].getAttribute("xyz"),m=new f;d&&(d=d.split(" "),m=new f({x:parseFloat(d[0]),y:parseFloat(d[1]),z:parseFloat(d[2])}));var n=c[0].getAttribute("rpy"),o=new g;if(n){n=n.split(" ");var p=parseFloat(n[0]),q=parseFloat(n[1]),r=parseFloat(n[2]),s=p/2,t=q/2,u=r/2,v=Math.sin(s)*Math.cos(t)*Math.cos(u)-Math.cos(s)*Math.sin(t)*Math.sin(u),w=Math.cos(s)*Math.sin(t)*Math.cos(u)+Math.sin(s)*Math.cos(t)*Math.sin(u),x=Math.cos(s)*Math.cos(t)*Math.sin(u)-Math.sin(s)*Math.sin(t)*Math.cos(u),y=Math.cos(s)*Math.cos(t)*Math.cos(u)+Math.sin(s)*Math.sin(t)*Math.sin(u);o=new g({x:v,y:w,z:x,w:y}),o.normalize()}this.origin=new e({position:m,orientation:o})}var z=b.getElementsByTagName("geometry");if(z.length>0){for(var A=z[0],B=null,C=0;C<A.childNodes.length;C++){var D=A.childNodes[C];if(1===D.nodeType){B=D;break}}var E=B.nodeName;"sphere"===E?this.geometry=new l({xml:B}):"box"===E?this.geometry=new i({xml:B}):"cylinder"===E?this.geometry=new h({xml:B}):"mesh"===E?this.geometry=new k({xml:B}):console.warn("Unknown geometry type "+E)}var F=b.getElementsByTagName("material");F.length>0&&(this.material=new j({xml:F[0]}))}var e=a("../math/Pose"),f=a("../math/Vector3"),g=a("../math/Quaternion"),h=a("./UrdfCylinder"),i=a("./UrdfBox"),j=a("./UrdfMaterial"),k=a("./UrdfMesh"),l=a("./UrdfSphere");b.exports=d},{"../math/Pose":18,"../math/Quaternion":19,"../math/Vector3":21,"./UrdfBox":26,"./UrdfCylinder":28,"./UrdfMaterial":31,"./UrdfMesh":32,"./UrdfSphere":34}],37:[function(a,b,c){b.exports=a("object-assign")({UrdfBox:a("./UrdfBox"),UrdfColor:a("./UrdfColor"),UrdfCylinder:a("./UrdfCylinder"),UrdfLink:a("./UrdfLink"),UrdfMaterial:a("./UrdfMaterial"),UrdfMesh:a("./UrdfMesh"),UrdfModel:a("./UrdfModel"),UrdfSphere:a("./UrdfSphere"),UrdfVisual:a("./UrdfVisual")},a("./UrdfTypes"))},{"./UrdfBox":26,"./UrdfColor":27,"./UrdfCylinder":28,"./UrdfLink":30,"./UrdfMaterial":31,"./UrdfMesh":32,"./UrdfModel":33,"./UrdfSphere":34,"./UrdfTypes":35,"./UrdfVisual":36,"object-assign":1}],38:[function(a,b,c){(function(a){b.exports={EventEmitter2:a.EventEmitter2}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],39:[function(a,b,c){(function(a){b.exports=a.WebSocket}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],40:[function(a,b,c){b.exports=function(){return document.createElement("canvas")}},{}]},{},[4]);

    /*******************************************************************

     Setup everything for ROS

     ******************************************************************/


    //Create a ROS node object, used to communicate with rosbridge
    var ros;

    var connected = false;
    
    //Prompt the user for the IP Address to connect to, and setup the topics
    var IP = prompt("Please enter the IP Address of the robot to connect to:", "192.168.0.");
    createTopics(IP);
    
    /*******************************************************************

     Required functions for scratch extension

     ******************************************************************/
    //Cleanup function for unloading extension
    ext._shutdown = function () {


    };

    //Status reporting,
    //Report missing hardware/plugin etc
    ext._getStatus = function () {
        if (connected) {
            return {
                status: 2,
                msg: 'Robot connected'
            };
        } else {
            return {
                status: 1,
                msg: 'No connection to robot'
            };
        }


    };

    //The descriptor and menus describe what will load as blocks

    var descriptor = {
        blocks: [
            [' ', 'Reconnect', 'reconnect'],
            ['w', 'Move %m.moveDirection', 'move', 'Forward'],
            ['w', 'Rotate %m.rotateDirection', 'rotate', 'Left'],
            ['w', 'Move %m.moveDirection for %n seconds', 'move_for_time', 'Forward', 1],
            ['w', 'Rotate %m.rotateDirection for %n degrees', 'rotate_deg', 'Left', 90],
            [' ', 'Set rotate speed %n %', 'set_rotate_speed', 50],
            [' ', 'Set movement speed %n %', 'set_movement_speed', 50],
            ['r', 'Laser Data at position %n', 'get_laser_array'],
            ['r', 'Laser Array Length', 'get_laser_array_length', 230],
            ['r', 'Front Laser Distance', 'front_laser_distance'],
            ['r', 'Current Rotation', 'current_rotation'],
            [' ', 'Stop', 'stop']
        ],
        menus: {
            moveDirection: ['Forward', 'Backward'],
            rotateDirection: ['Left', 'Right']
        }
    };

    //Register the extension
    ScratchExtensions.register('Easy ROS', descriptor, ext);

    /*******************************************************************

     The implementation for the blocks
     should match up with the descriptor

     ******************************************************************/
    //Intervals for the stop block
    var move_for_time_interval;
    var roate_left_interval;
    var rotate_right_interval;


    //Used to reconnect if disconnected at any point
    ext.reconnect = function () {
        createTopics(prompt("Please enter the IP Address of the robot to connect to:", "192.168.0."));
    };
    
    
    //Move forward/backwards (Just send it once)
    ext.move = function (direction, callback) {
        if (direction == 'Forward') {
            if (forward_twist.linear.x < 0) {
                forward_twist.linear.x *= -1;
            }
        } else if (direction == 'Backward') {
            if (forward_twist.linear.x > 0) {
                forward_twist.linear.x *= -1;
            }
        }
        cmdVel.publish(forward_twist);
        setTimeout(callback, 500);
    };
    
    //Rotate left/right (Just send it once)
    ext.rotate = function (direction, callback) {
        if (direction == 'Left') {
            if (rotate_twist.angular.z < 0) {
                rotate_twist.angular.z *= -1;
            }
        } else if (direction == 'Right') {
            if (rotate_twist.angular.z > 0) {
                rotate_twist.angular.z *= -1;
            }
        }
        cmdVel.publish(rotate_twist);
        setTimeout(callback, 500);
    };

    //Set the movement (Forward/Reverse) speed for the robot
    //Given as a percentage
    ext.set_movement_speed = function (speed) {
        forward_twist.linear.x = (speed) / 100;
    };
    

    
    //Move the robot /direction/ at the current forward speed
    //for /seconds/ amount of time.
    ext.move_for_time = function (direction, seconds, callback) {
        if (direction == 'Forward' && forward_twist.linear.x < 0) {
            forward_twist.linear.x *= -1;
        } else if (direction == 'Backward' && forward_twist.linear.x > 0) {
            forward_twist.linear.x *= -1;
        } else if (direction != 'Forward' && direction != 'Backward') {
            window.alert("Illegal direction given to the move function.");
        }
        console.log('About to move ' + direction + '  for ' + seconds + ' seconds.');
        var start_time = new Date();
        move_for_time_interval = window.setInterval(function () {
            if (new Date() - start_time >= seconds * 1000) {
                clearInterval(move_for_time_interval);
                callback();
            }
            cmdVel.publish(forward_twist);
        }, delay);
    };
    ext.set_rotate_speed = function (speed) {
        rotate_twist.angular.z = (speed) / 100;
    };
    
    //Rotate left /degreees/ ammount of degrees
    ext.rotate_deg = function (direction, degrees, callback) {
        //Limit the user to a 360 turn
        if (degrees > 360) {
            degrees = 360;
        }
        console.log("About to rotate " + direction + " " + degrees + " degrees.");
        //Handle the desired direction
        if (direction == 'Left') {
            if (rotate_twist.angular.z < 0) {
                rotate_twist.angular.z *= -1;
            }
            rotate_left_deg(degrees, callback);
        } else if (direction == 'Right') {
            if (rotate_twist.angular.z > 0) {
                rotate_twist.angular.z *= -1;
            }
            rotate_right_deg(degrees, callback);
        } else if (direction != 'Left' && direction != 'Right') {
            window.alert("Illegal direction given to the rotate function.");
        }
    }
    

    //Helper function for the above
    function rotate_left_deg(degrees, callback) {
        var overlap = false;
        var desired = robot_rotation + degrees;
        if (desired > 360) {
            overlap = true;
            desired -= 360;
        }
        var current = robot_rotation;
        var prev = robot_rotation;
        roate_left_interval = window.setInterval(function () {
            if (overlap) {
                if (prev > current) {
                    overlap = false;
                    prev = current;
                } else {
                    cmdVel.publish(rotate_twist);
                    prev = current;
                    current = robot_rotation;
                }
            } else {
                if (robot_rotation >= desired || robot_rotation < prev) {
                    clearInterval(rotate_left_interval);
                    callback();
                } else {
                    cmdVel.publish(rotate_twist);
                    prev = current;
                    current = robot_rotation;
                }
            }
        }, delay);
    }
    
            
    
    //Helper function for the above
    function rotate_right_deg(degrees, callback) {
        var overlap = false;
        var desired = robot_rotation - degrees;
        if (desired < 0) {
            overlap = true;
            desired += 360;
        }
        //Set the rotation speed for the robot
        //Given as a percentage

        //Handle the desired direction

        var current = robot_rotation;
        var prev = robot_rotation;

        rotate_right_interval = window.setInterval(function () {
            if (overlap) {
                if (prev < current) {
                    overlap = false;
                    prev = current;
                } else {
                    cmdVel.publish(rotate_twist);
                    prev = current;
                    current = robot_rotation;
                }
            } else {
                if (robot_rotation <= desired || robot_rotation > prev) {
                    clearInterval(rotate_right_interval);
                    callback();
                } else {
                    cmdVel.publish(rotate_twist);
                    prev = current;
                    current = robot_rotation;
                }
            }
        }, delay);
    }

    ext.stop = function() {
        clearInterval(move_for_time_interval);
        clearInterval(roate_left_interval);
        clearInterval(rotate_right_interval);
    }


    /************************************

     Reporter blocks

     ************************************/

    //Get the current rotation of the robot
    ext.current_rotation = function () {
        return robot_rotation;
    };

    //Get an item from index *position* in the
    //Array of laser data
    ext.get_laser_array = function (position) {
        if(laser_array[position]==0){
            return 90;
        }
        return laser_array[position];
    };

    //Get the length of the laser array
    ext.get_laser_array_length = function () {
        return laser_array.length;
    };


    //Get the distance to an object from the central laser of the robot
    ext.front_laser_distance = function () {
    	console.log(laser_array[laser_array.length/2]);
    	if(laser_array[laser_array.length/2 == null]){
    		console.log("OK");
    	}	
	    if(laser_array[laser_array.length/2] == 0 || laser_array[laser_array.length/2] == null){
		    return 90;
	    }
        return laser_array[laser_array.length / 2];
    };
    


    /*******************************************************************

     Global variables for use in the
     javascript, such as different twists

     ******************************************************************/



    //MS delay for intervals (used for publishing topics)
    var delay = 500;
    
    //Create Topics and listeners
    var cmdVel;
    var forward_twist;
    var rotate_twist;
    var odom_listener;
    var distance_listener;
    var leg_listener;

    //Variable to hold the robots current rotation in degrees
    var robot_rotation = 0;
    var legTracker = [];
    var robotX = 0;
    var robotY = 0;
    //Variable to hold the laser scans of the robot
    var laser_array = [];


    function createTopics(ip) {
        console.log('Creating');
        ros = new ROSLIB.Ros({
            url: 'ws://' + ip + ':9090' //Currently local host, will be changeable
        });

        //Listener for connection
        ros.on('connection', function () {
            connected = true;
            console.log('Connected to websocket');
        });

        //Error listener
        ros.on('error', function (error) {
            connected = false;
        });

        //Connecting close listener
        ros.on('close', function () {
            if (ros) {
                ros.close();
            }
            connected = false;
            console.log('Connection to websocket closed');
        });

        
        cmdVel = new ROSLIB.Topic({
            ros: ros,
            name: '/cmd_vel_mux/input/teleop',
            messageType: 'geometry_msgs/Twist'
        });

        forward_twist = new ROSLIB.Message({
            linear: {
                x: 0.5,
                y: 0,
                z: 0
            },
            angular: {
                x: 0,
                y: 0,
                z: 0
            }
        });

        rotate_twist = new ROSLIB.Message({
            linear: {
                x: 0,
                y: 0,
                z: 0
            },
            angular: {
                x: 0,
                y: 0,
                z: 0.5
            }
        });
        
        leg_listener = new ROSLIB.Topic({
            ros: ros,
            name: '/leg_tracker_measurements',
            messageType: 'people_msgs/PositionMeasurementArray'
        });
        
        odom_listener = new ROSLIB.Topic({
            ros: ros,
            name: '/odom',
            messageType: 'nav_msgs/Odometry'
        });

        distance_listener = new ROSLIB.Topic({
            ros: ros,
            name: '/scan',
            messageType: 'sensor_msgs/LaserScan'
        });
        
        leg_listener.subscribe(function (message) {
                legTracker = message;
        });

        odom_listener.subscribe(function (message) {
            robot_rotation = (360 / Math.PI) * Math.atan(message.pose.pose.orientation.z / message.pose.pose.orientation.w);
            if (robot_rotation < 0) {
                robot_rotation += 360;
            }
            robotX = message.pose.pose.position.x;
            robotY = message.pose.pose.position.y;
            //console.log(message.pose.pose.orientation.w);
        });

        distance_listener.subscribe(function (message) {
            //console.log(laser_array[0]);
            laser_array = message.ranges;
        });
    }

})({});

