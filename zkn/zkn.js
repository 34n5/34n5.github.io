const hana = [
["アジサイ","3","2","3","6(1)","50","12","00"],
["キク","3","4","3","8(1)","40","12","00"],
["コスモス","1","4","1","7(2)","3","-","10"],
["スイセン","2","8","2","4(2)","16","-","-"],
["チューリップ","2","6","3","10(2)","24","10","00"],
["ツバキ","2","8","3","5(2)","16","10","00"],
["ヒガンバナ","3","4","3","5","50","-","-"],
["プリムラ","1","8","2","6","3","-","10"],
["ランタナ","2","4","2","6","16","-","10"],
["リンドウ","2","4","2","4","16","-","-"],
["バラ","3","6","3","9","50","12","00"],
["フジ","4","6","4","3","100","48","00"],
["ヒヤシンス","2","6","3","8","24","10","00"],
["カーネーション","1","6","2","9(2)","3","-","10"],
["サクラ","4","6","4","4(1)","100","48","00"],
["シロツメクサ","1","6","2","2","3","-","10"],
["タンポポ","1","6","1","2","3","-","10"],
["アサガオ","2","2","3","7(2)","16","10","00"],
["キキョウ","2","2","2","5(2)","16","4","00"],
["ジニア","2","2","2","9(2)","16","4","00"],
["プルメリア","3","2","2","5(1)","35","-","-"],
["ペチュニア","1","2","2","11(3)","3","-","10"],
["ユリ","3","2","3","10(3)","40","12","00"],
["ラベンダー","1","2","1","3","10","2","00"],
["-","-","-","-","-","-","-","-"],
["ケイトウ","2","4","3","5","24","10","00"],
["パンジー","2","4","2","8","16","-","-"],
["ウメ","4","8","4","4(1)","65","48","00"],
["サザンカ","2","8","2","4(1)","16","4","00"],
["シクラメン","2","8","2","7(2)","16","4","00"],
["スノードロップ","1","8","1","2","10","2","00"],
["ホウセンカ","1","2","1","4","3","-","-"],
["ダリア","3","2","3","8","50","12","00"],
["マツ","4","2468","4","1","65","48","00"],
["-","-","-","-","-","-","-","-"],
["タケ","2","2468","3","1","12","10","00"],
["-","-","-","-","-","-","-","-"],
["-","-","-","-","-","-","-","-"],
["モミ","4","2468","4","1","65","48","00"],
["-","-","-","-","-","-","-","-"],
["ほそい草","1","2468","1","1","2","-","05"],
["ひらたい草","1","2468","1","1","2","2","00"],
["つんつん草","1","2468","1","1","2","2","00"],
["もさもさ草","1","2468","1","1","2","2","00"],
["ミツバのクローバー","1","2468","1","2","2","1","00"],
["ヨツバのクローバー","1","2468","5","2","12","1","00"],
["ヘビイチゴ","1","2468","1","1","2","-","10"],
["ハコベ","1","2468","1","1","2","-","10"],
["アオイゴケ","1","2468","1","1","2","-","10"],
["オオバコ","1","2468","1","1","5","-","05"],
["ギシギシ","1","2468","1","1","12","-","-"],
["ノゲシ","1","2468","1","1","5","-","05"],
["エノコログサ","1","2468","1","2","12","-","-"],
["ツクシ","1","6","1","1","3","-","30"],
["オオイヌノフグリ","1","6","1","1","3","-","30"],
["ドクダミ","1","2","1","1","3","-","-"],
["ツユクサ","1","2","1","1","3","-","-"],
["イヌタデ","1","4","1","1","-","-","-"],
["スズメノカタビラ","1","8","1","1","3","-","-"],
["-","-","-","-","-","-","-","-"],
["-","-","-","-","-","-","-","-"],
["-","-","-","-","-","-","-","-"],
["-","-","-","-","-","-","-","-"],
["おおきなサクラ","A","6","5","1","150","60","00"],
["-","-","-","-","-","-","-","-"],
["リボンむすびカーネーション","1","6","4","6","5","-","30"],
["リボンむすびローズ","3","6","4","6","15","6","40"]
];
var s = "";
for(let i = 0; i < hana.length; i++){
	var a = hana[i];
	if(a[7] != "-" && a[6] == "-") a[6] = "0";
	s += "<tr><td>" + a[0];
	s += "</td><td>" + a[1];
	s += "</td><td>" + a[2];
	s += "</td><td>" + a[3];
	s += "</td><td>" + a[4];
	s += "</td><td>" + a[5];
	s += "</td><td>" + a[6];
	if(a[7] != "-") s += ":" + a[7];
	s += "</td></tr>";
}

var l = document.getElementsByTagName("tbody")[0];
l.innerHTML = s;
l = document.getElementsByTagName("thead")[0];
l.innerHTML = "<tr><th>名前</th><th>::</th><th>季節</th><th>★</th><th>色数<br><small>(交配)</small></th><th>売価</th><th>時間</th></tr>";
