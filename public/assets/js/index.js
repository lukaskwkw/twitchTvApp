var streamsArr =  
["freecodecamp", "storbeck", "terakilobyte",
"habathcx","medrybw","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"]

var query = "https://api.twitch.tv/kraken/streams/"

$(document).ready(function(){
	for (var i= 0; i<streamsArr.length; i++)
		$.getJSON(query+streamsArr[i],populateLists);
$(function () { $("[data-toggle='tooltip']").tooltip(); });
});

function populateLists(json)
{
	var tabAll = $('.js-tab-all');
	var tabOnline = $('.js-tab-online');
	var tabOffline = $('.js-tab-offline');
	var html='';
	console.log(json);
		// $(tabAll).append('<ul class="user list-group">');
		if (json.stream!==null)
		{	

			var logo = getProperty(json.stream.channel,'logo');
			var display_name = getProperty(json.stream.channel,'display_name');
			var status = getProperty(json.stream.channel,'status');

			//html='<ul class="user list-group">';
			html+='<li class="list-group-item list-group-item-success" id="'+display_name+'" ><img class="user__img img img-circle" src="'
			+logo+'"></img>'+
			'<span class="user__name">'
			+display_name+'  </span>'+
			'<a href="#" class="user_info label label-info" data-toggle="tooltip" title="'
			+status+'">info</a>'+
			'</div>'+
			'</li>';
			// $('#'+display_name).effect("bounce");
			$(tabAll).children().append(html);
			$(tabOnline).children().append(html);
		}
		else
		{
			// console.log(json._links.channel);
			$.getJSON(json._links.channel+"?callback=?", function(json2){
				// console.log(json2);
				var logo =  getProperty(json2,'logo');
				var display_name = getProperty(json2,'display_name');
				// html='<ul class="user list-group">';
				html+='<li class="list-group-item list-group-item-danger" id="'+display_name+'"><img class="user__img img img-circle" src="'
				+logo+'"></img>'+
				'<span class="user__name">'
				+display_name+'</span>'+
				'</div>'+
				'</li>';
				// html+='</ul>';
				$(tabAll).children().append(html);
				$(tabOffline).children().append(html)		
			})
		}		
$('[data-toggle="tooltip"]').tooltip({
    'placement': 'top'
});

	}

	function getProperty(obj, prop)
	{
			console.log(obj,obj[prop],prop);
		if(obj.hasOwnProperty(prop) && Boolean(obj[prop])){
			console.log(obj[prop]);
			return obj[prop];
		}
		else
		{
			console.log('nic');
			return '';}
	}
	function populateOffline(argument) {
	// body...
}


/*

if (stream!==null)

preview.small
channel.status

else

.getJSON(_links.channel)
display_name
logo

*/