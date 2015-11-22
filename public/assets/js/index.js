var streamsArr =  
["freecodecamp", "storbeck", "terakilobyte",
"habathcx","medrybw","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"]

//names of streamers recived from json
var streamsJson = [];

var query = "https://api.twitch.tv/kraken/streams/"
	var totalUsers=0;
	var onlineUsers=0;
	var offlineUsers=0;
$(document).ready(function(){

	 for (var i= 0; i<streamsArr.length; i++)
		$.getJSON(query+streamsArr[i],populateLists);

console.log(/z/gi.test("RobotCaleb"));

$('.js-search').keyup(search);

});

function search ()
{
	var search = $(this).val();
	if (search=='')
	{
		$(".user").show();
		return;
	}
	var regex = new RegExp(search, "gi");
	for (var i = 0; i < streamsJson.length; i++) {
		if (regex.test(streamsJson[i])===true)
			$('.'+streamsJson[i]).show();
		else
			$('.'+streamsJson[i]).hide();
	};
}

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
			var userName = display_name.toLowerCase();
			streamsJson.push(userName);
			html="";
			html+='<a href="'+url+'" target="_blank"><li class="user list-group-item '+userName+'"><img class="user__img img img-circle" src="'
			+logo+'"/>'+
			'<span class="user__name">'
			+display_name+'</span><i class="user__status text-success glyphicon glyphicon-ok-circle" data-toggle="tooltip" title="Online"></i>'+
			'<span class="text-info user_info glyphicon glyphicon-exclamation-sign"><kbd>'
			+status+'</kbd></span>'+
			'</li></a>';
			$(tabAll).children().append(html);
			$(tabOnline).children().append(html);
			$('.js-all-count').html(totalUsers);
			$('.js-online-count').html(onlineUsers);
			$('[data-toggle="tooltip"]').tooltip({'placement': 'top'});
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
				var userName = display_name.toLowerCase();
				streamsJson.push(userName);
				html="";
				html+='<a href="'+url+'" target="_blank"><li class="user list-group-item '+userName+'"><img class="user__img img img-circle" src="'
				+logo+'"></img>'+
				'<span class="user__name">'
				+display_name+'</span><i class="user__status text-danger glyphicon glyphicon-minus-sign" data-toggle="tooltip" title="Offline"></i>'+
				'</li></a>';
				$(tabAll).children().append(html);
				$(tabOffline).children().append(html);
				$('.js-all-count').html(totalUsers);
				$('.js-offline-count').html(offlineUsers);
				$('[data-toggle="tooltip"]').tooltip({'placement': 'top'});
			})
		}		
		$('.input-group').css('disabled', 'false');
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
