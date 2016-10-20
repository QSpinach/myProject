(function($){
	// $('#div1').velocity({
	// 	width:'300px',
	// 	// height:'300px'
	// },{
	// 	duration:1000
	// });
	//动画序列
	// var seq = [
	// {
	// 	elements:$('#div1'),
	// 	properties:{width:'300px'},
	// 	options:{duration:1000}
	// },
	// {
	// 	elements:$('#div2'),
	// 	properties:{width:'300px'},
	// 	options:{duration:1000}
	// },
	// {
	// 	elements:$('#div3'),
	// 	properties:{width:'300px'},
	// 	options:{duration:1000}
	// },
	// ];
	// $.Velocity.RunSequence(seq);
	//自带的动画效果
	$('#div1').on('mouseover',function(){
		$(this).velocity('callout.shake');
	});
	//自定义动画
	$.Velocity.RegisterEffect('lixin.pulse',{
		defaultDuration:1000,
		calls:[
			[{scaleX:1.5},0.5],
			[{scaleX:1.0},0.5]
		]
	});
	$('#div2').on('mouseover',function(){
		$(this).velocity('lixin.pulse');
	});
})(jQuery);