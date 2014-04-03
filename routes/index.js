
/*
 * GET home page.
 */

/*exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};*/

// 检索数据库取得
var arr = [
	{
		name : 'a',
		facts : 'aaaa'
	},
	{
		name : 'b',
		facts : 'bbbb'
	}
];

module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index', { title: 'Express'});
	});
	app.get('/infoList', function(req, res){
		var name = req.query.name;
		var facts = ''; 
		for (var i = 0; i < arr.length; i++) {
			if(arr[i].name == name){
				facts = arr[i].facts;
			}
		}
		if(!facts){
			name = '404';
		}
		res.json({name: name, facts: facts});
	});
};