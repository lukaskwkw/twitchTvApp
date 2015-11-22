var streamsArr =  
["freecodecamp", "storbeck", "terakilobyte",
"habathcx","medrybw","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"]

var query = "https://api.twitch.tv/kraken/streams/"
	var totalUsers=0;
	var onlineUsers=0;
	var offlineUsers=0;
$(document).ready(function(){

	for (var i= 0; i<streamsArr.length; i++)
		$.getJSON(query+streamsArr[i],populateLists);
});

function populateLists(json)
{
	var tabAll = $('.js-tab-all');
	var tabOnline = $('.js-tab-online');
	var tabOffline = $('.js-tab-offline');
	var html='';
	console.log(json);
		if (json.stream!==null)
		{	
			totalUsers++;
			onlineUsers++;
			var logo = getProperty(json.stream.channel,'logo');
			if (logo=="")
				logo = "http://placehold.it/64x64";
			var display_name = getProperty(json.stream.channel,'display_name');
			var status = getProperty(json.stream.channel,'status');
			var url = getProperty(json.stream.channel,'url');
			html="";
			html+='<a href="'+url+'" target="_blank"><li class="user list-group-item" id="'+display_name+'"><img class="user__img img img-circle" src="'
			+logo+'"/>'+
			'<span class="user__name">'
			+display_name+'</span><i class="user__status text-success glyphicon glyphicon-ok-circle"></i>'+
			'<span class="text-info user_info glyphicon glyphicon-exclamation-sign" data-toggle="tooltip" title="'
			+status+'"/>'+
			'</li></span>';
			$(tabAll).children().append(html);
			$(tabOnline).children().append(html);
			$('.js-all-count').html(totalUsers);
			$('.js-online-count').html(onlineUsers);
		}
		else
		{
			$.getJSON(json._links.channel+"?callback=?", function(json2){
				totalUsers++;
				offlineUsers++;
				var logo =  getProperty(json2,'logo');
				if (logo=="")
				logo = "http://placehold.it/64x64";
				var display_name = getProperty(json2,'display_name');
				var url = getProperty(json2,'url');
				html="";
				html+='<a href="'+url+'" target="_blank"><li class="user list-group-item" id="'+display_name+'"><img class="user__img img img-circle" src="'
				+logo+'"></img>'+
				'<span class="user__name">'
				+display_name+'</span><i class="user__status text-danger glyphicon glyphicon-minus-sign"></i>'+
				'</li></a>';
				$(tabAll).children().append(html);
				$(tabOffline).children().append(html);
				$('.js-all-count').html(totalUsers);
				$('.js-offline-count').html(offlineUsers);
		
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
			return '';}
		}
