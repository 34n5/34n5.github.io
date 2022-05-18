console.log("2022-0518-1841");

function hp() { //……プレビュー書式設定
	var s = document.getElementById("vff").value; //フォントファミリー
	s += ":" + document.getElementById("vft").value; //フォントサイズ(px)
	s += ":" + document.getElementById("vls").value; //字間(px)
	s += ":" + document.getElementById("vlh").value; //行間(%)
	s += ":" + document.getElementById("vfc").value; //文字色
	s += ":" + document.getElementById("vbc").value; //背景色
	s += ":" + document.getElementById("vem").checked; //置換
	localStorage.setItem('pps',s);
	hpr(s);
	s = document.getElementById("vsw").value; //置換ルール
	var a = "", b = "", c = "", i = 0;
	if(s != "" && s != null){ 
		var t = s.split("\n");
		for(i in t){
			if(/^\/\//.test(t[i]) || t[i] == ""){ //コメントと空行はスキップ
				continue;
			}
			a = t[i].split("\t");
			if(a.length < 3){
				i -= 0;
				c = c + (i + 1) + ",";
				continue;
			}
		}
		if(c != ""){
			c = c.slice(0,-1);
			if(window.confirm(c + "行目は要素が不足しています。\nこのまま設定しますか？")){
				localStorage.setItem('ppv',s);
			}
		}else{
			localStorage.setItem('ppv',s);
		}
	}
	
	mp("設定を保存しました");
}

function hpr(s) { //……プレビュー設定反映
	var s = s.split(":");
	pst = ' style="';
	if(s[0] - 0){
		pst += "font-family:serif;";
	}
	pst += "font-size:" + s[1] + "px;letter-spacing:" + s[2] + "px;line-height:" + s[3] + '%;"';
	w.style.color = s[4];
	w.style.backgroundColor = s[5];
	pln = Math.ceil(s[1] * s[3] * 0.02) + 52;
}

function fn() { //……webフォント適用切り替え
	var s = document.getElementById("wf").textContent;
	if(s =="終了"){
		p.style.fontFamily = '"emj","NasuM",monospace,monospace';
		document.getElementById("wf").textContent = "開始";
		localStorage.setItem('wfl',0);
		mp("終了しました");
	}else{
		p.style.fontFamily = '"emj","mies","webnasm"';
		document.getElementById("wf").textContent = "終了";
		localStorage.setItem('wfl',1);
		mp("開始しました");
	}
}

function mp(s) { //……メッセージポップ
	document.getElementById("me").textContent = s;
	document.getElementById("me").classList.toggle("age");
	setTimeout(function() {
		document.getElementById("me").classList.toggle("age");
	},1000);
}

function csp(s) { //……文字数表示
	document.getElementById("cs").textContent = s;
	document.getElementById("cs").classList.toggle("o");
	setTimeout(function() {
		document.getElementById("cs").classList.toggle("o");
	},200);
}

function adel() { //……ストレージ全削除
	if(window.confirm("本当に全削除しますか？")){
		localStorage.clear();
		mp("削除しました");
	}
}

function b() { //……範囲選択モード
	if(bb){
		bb = 0;
	}else{
		bb = 1;
	}
	document.getElementById("bm").classList.toggle("o");
	p.focus();
}

function st() { //……設定変更
	if(document.getElementById("bh").value < 20){
		document.getElementById("bh").value = 20;
		alert("ボタンの高さは 20 以上にしてください");
		return;
	}
	var s = document.getElementById("cr").value; //[0]テキストエリア高さ(vh)
	s += ":" + document.getElementById("ft").value; //[1]フォントサイズ(px)
	s += ":" + document.getElementById("ls").value; //[2]字間(px)
	s += ":" + document.getElementById("lh").value; //[3]行間(%)
	s += ":" + document.getElementById("fc").value; //[4]文字色
	s += ":" + document.getElementById("bc").value; //[5]背景色
	s += ":" + document.getElementById("bh").value; //[6]ボタン高さ(px)
	s += ":" + document.getElementById("em").checked; //[7]拡張スイッチ
	s += ":" + document.getElementById("sc").checked; //[8]定型文スイッチ
	sh(s);
	localStorage.setItem('pss',s);
	s = document.getElementById("sw").value; //定型文内容
	localStorage.setItem('psw',s);
	s = s.replace(/</g,"&lt;");
	s = s.replace(/>/g,"&gt;");
	s = s.replace(/^(.+)$/gm,"<option>$1</option>");
	r.innerHTML = s;
	mp("設定しました");
}

function sh(s) { //……設定反映
	var s = s.split(":");
	p.style.height = s[0] + "vh"; //テキストエリア高さ(vh)
	p.style.fontSize = s[1] + "px"; //フォントサイズ(px)
	n.style.fontSize = s[1] + "px"; //フォントサイズ(px)
	y.style.fontSize = s[1] + "px"; //フォントサイズ(px)
	p.style.letterSpacing = s[2] + "px"; //字間(px)
	n.style.letterSpacing = s[2] + "px"; //字間(px)
	y.style.letterSpacing = s[2] + "px"; //字間(px)
	p.style.lineHeight = s[3] + "%"; //行間(%)
	p.style.color = s[4]; //文字色
	p.style.backgroundColor = s[5]; //背景色
	var t = document.querySelectorAll("#cn button");
	for (let i = 0; i < t.length; i++) {//ボタン高さ(px)
		t[i].style.height = s[6] + "px";
	}
	r.style.height = s + "px"; //定型文セレクトボックス
	if(s[7] == true || s[7] == "true"){ //拡張スイッチ
		document.getElementById("cf").style.display = "block";
		document.getElementById("cm").style.display = "none";
	}else{
		document.getElementById("cm").style.display = "block";
		document.getElementById("cf").style.display = "none";
	}
	if(s[8] == true || s[8] == "true"){ //定型文スイッチ
		document.getElementById("swg").style.display = "inline";
	}else{
		document.getElementById("swg").style.display = "none";
	}
	fl = (s[1] - 0) + (s[2] -0 );
	fl /= 2;
}

function i() { //……定型文挿入
	var s = r.value;
	s = s.replace(/&lt;/g,"<");
	s = s.replace(/&gt;/g,">");
	s = s.replace(/\\n/g,"\n");
	var a = document.execCommand('insertText', false, s);
	if(!a){
		var s1 = p.value;
		var q = p.selectionStart;
		var q1 = p.selectionEnd;
		p.value = s1.slice(0,q);
		p.value += s;
		p.value += s1.slice(q1);
		p.selectionEnd = q + s.length;
		p.selectionStart = p.selectionEnd;
	}
	/*
	try{
		document.execCommand('insertText', false, s);
	}catch(e){
		var s1 = p.value;
		var q = p.selectionStart;
		var q1 = p.selectionEnd;
		p.value = s1.slice(0,q);
		p.value += s;
		p.value += s1.slice(q1);
		p.selectionEnd = q + s.length;
		p.selectionStart = p.selectionEnd;
	}
	*/
}

function v() { //……鳩
	var a = document.execCommand("insertText", false, "♡");
	if(!a){
		s = p.value;
		var q = p.selectionStart;
		var q1 = p.selectionEnd;
		p.value = s.slice(0,q);
		p.value += "♡";
		p.value += s.slice(q1);
		p.selectionEnd = q + 1;
		p.selectionStart = p.selectionEnd;
	}
	
	/*
	try{
		document.execCommand('insertText', false, str);
	}catch(e){
		s = p.value;
		var q = p.selectionStart;
		var q1 = p.selectionEnd;
		p.value = s.slice(0,q);
		p.value += "♡";
		p.value += s.slice(q1);
		p.selectionEnd = q + 1;
		p.selectionStart = p.selectionEnd;
	}
	*/
}

function oo() { //……メニュー
	document.getElementById('mu').classList.toggle('nu');
}
function o(a) { //……設定画面
	var sb = document.getElementById("stab");
	var pb = document.getElementById("ptab");
	var ab = document.getElementById("atab");
	var st = document.getElementById("sbt");
	var pt = document.getElementById("pbt");
	var at = document.getElementById("abt");
	if(a == 1){
		sb.style.display = "block";
		pb.style.display = "none";
		ab.style.display = "none";
		st.disabled = true;
		pt.disabled = false;
		at.disabled = false;
		window.scrollTo(0,0);
	}else if(a == 2){
		sb.style.display = "none";
		pb.style.display = "block";
		ab.style.display = "none";
		st.disabled = false;
		pt.disabled = true;
		at.disabled = false;
		window.scrollTo(0,0);
	}else if(a == 3){
		sb.style.display = "none";
		pb.style.display = "none";
		ab.style.display = "block";
		st.disabled = false;
		pt.disabled = false;
		at.disabled = true;
		window.scrollTo(0,0);
	}else{
		var s = document.getElementById("pn").style.display;
		if(s == "block"){
			p.style.display = "block";
			document.getElementById("cn").style.display = "block";
			document.getElementById("pn").style.display = "none";
			localStorage.setItem('pn',0);
		}else{
			document.getElementById("pn").style.display = "block";
			oo();
			p.style.display = "none";
			document.getElementById("cn").style.display = "none";
			localStorage.setItem('pn',1);
		}
	}
}

function si() { //……保存
	var s = p.value;
	if(s == ""){
		mp("内容がありません");
	}else{
		if(window.confirm("保存しますか？")){
			localStorage.setItem('pvalue',s);
			bu();
			mp("保存しました");
		}
	}
	p.focus();
}

function gi() { //……復帰
	var s = localStorage.getItem('pvalue');
	if(s == "" || s ==null){
		mp("保存されていません");
	}else{
		if (window.confirm("復帰しますか？")) {
			s = p.value;
			p.value = localStorage.getItem('pvalue');
			if(s == ""){
				mp("復帰しました");
			}else{
				localStorage.setItem('pvalue',s);
				mp("内容を入れ替えました");
			}
			csp(p.value.length);
		}
	}
	oo();
	p.focus();
}

function cc(a) { //……全文コピー旧
	var q = p.selectionEnd;
	p.select();
	try{
		document.execCommand('copy');
		mp("コピーしました" + a);
	}catch(e){
		alert("実行できませんでした\n" + e);
	}
	p.setSelectionRange(q,q);
	p.blur();
}

function c() { //……全文コピー
	if(confirm("全文コピーしますか？")){
		if (typeof navigator.clipboard === 'object'){
			navigator.clipboard.writeText(p.value).then(function(){
				mp("コピーしました");
			}, function() {
				cc(0);
			});
			return;
		}
		result = cc(1);
		/*
		try{
			navigator.clipboard.writeText(p.value).then(function() {
				mp("コピーしました");
			}, function() {
				alert("実行できませんでした");
			});
		}catch(e){
			var q = p.selectionEnd;
			p.select();
			try{
				document.execCommand('copy');
				mp("コピーしました.");
			}catch(e){
				alert("実行できませんでした\n" + e);
			}
			p.setSelectionRange(q,q);
			p.blur();
		}
		*/
	}
}

function t() { //……左端
	p.focus();
	var s = p.value;
	var q = p.selectionEnd;
	if(bb && p.selectionDirection == "backward"){
		q = p.selectionStart;
	}
	
	var s1 = s.slice(0,q);
	s1 = s1.split("\n");
	s1.reverse();
	s1 = ar(s1[0]); //キャレット行
	q -= s1[0].length;
	
	if(bb){
		if(p.selectionDirection == "backward"){
			p.selectionStart = q;
		}else{
			if(q < p.selectionStart){
				p.setSelectionRange(q,p.selectionStart,"backward");
			}else{
				p.selectionEnd = q;
			}
		}
	}else{
		p.setSelectionRange(q,q);
	}
}

function m() { //……右端
	p.focus();
	var s = p.value;
	var q = p.selectionEnd;
	if(bb && p.selectionDirection == "backward"){
		q = p.selectionStart;
	}
	
	var s1 = s.slice(0,q);
	s1 = s1.split("\n");
	s1.reverse();
	var s0 = ar(s1[0]); //行頭～キャレット
	var q1 = q - s0[0].length //左端～キャレット
	s1 = s.slice(q1);
	s1 = s1.split("\n");
	s1 = ar(s1[0],1); //左端～行末
	q1 += s1[0].length; //左端～右端
	if(q == q1 && 1 in s1){
		q1 += s1[1].length; 
	}
	q = q1;
	
	if(bb){
		if(p.selectionDirection == "backward"){
			if(q > p.selectionEnd){
				p.setSelectionRange(p.selectionEnd,q,"forward");
			}else{
				p.selectionStart = q;
			}
		}else{
			p.selectionEnd = q;
		}
	}else{
		p.setSelectionRange(q,q);
	}
}

function a() { //……文頭
	p.focus();
	if(bb){
		if(p.selectionDirection == "backward"){
			p.selectionStart = 0;
		}else{
			p.setSelectionRange(0,p.selectionStart,"backward");
		}
	}else{
		p.setSelectionRange(0,0);
	}
	p.scrollTop = 0;
}

function l() { //……左
	p.focus();
	if(bb){
		if(p.selectionDirection == "backward"){
				p.selectionStart--;
		}else{
			if(p.selectionStart == p.selectionEnd){
				p.selectionStart--;
				p.selectionDirection = "backward";
			}else{
				p.selectionEnd--;
			}
		}
	}else{
		p.selectionEnd--;
	}
}

function g() { //……右
	p.focus();
	if(bb){
		if(p.selectionDirection == "backward"){
			if(p.selectionStart == p.selectionEnd){
				p.selectionEnd++;
				p.selectionDirection = "forward";
			}else{
				p.selectionStart++;
			}
		}else{
			p.selectionEnd++;
		}
	}else{
		p.selectionStart++;
	}
}

function z() { //……文末
	p.focus();
	var s = p.value;
	var q = s.length;
	if(bb){
		if(p.selectionDirection == "backward"){
			p.setSelectionRange(p.selectionEnd,q,"forward");
		}else{
			p.selectionEnd = q;
		}
	}else{
		p.setSelectionRange(q,q);
	}
	p.scrollTop = p.scrollHeight;
}

function al(s1) { //……文字数カウント
	var s = s1.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g)||[];
	s = s.length;
	return(s);
}

function ar(s1,a) { //……改行配列作成
	
	n.style.width = (p.clientWidth - 10) + "px";
	n.textContent = s1;
	var p0 = n.clientHeight;
	var s1 = s1.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g)||[];
	var s2, s3 = s2 = [""], p1, p2 = p1 = s1.length, i = p3 = 0;
	if(a == 1){
		p1 = p2 = 0;
		for(i in s1){
			p1++;
			s2 = s1.slice(0,p1);
			n.textContent = s2.join("");
			if(p0 < n.clientHeight){
				p3++;
				if(p3 == 2){
					break;
				} 
				p2 = p1 - 1;
			}
			s3[p3] = s1.slice(p2,p1).join("");
			p0 = n.clientHeight;
		}
	}else{
		for(i in s1){
			p1--;
			s2 = s1.slice(0,p1);
			n.textContent = s2.join("");
			if(p0 > n.clientHeight){
				s3[p3] = s1.slice(p1,p2).join("");
				if(p3 == 1){
					break;
				} 
				p0 = n.clientHeight;
				p2 = p1;
				p3++;
			}
		}
	}
	n.textContent = "";
	return(s3);
}

function u() { //……上キー
	p.focus();
	var s = p.value, q = p.selectionEnd, s3 = 0, s4 = 0;
	if(bb && p.selectionDirection == "backward"){
		q = p.selectionStart;
	}
	var s1 = s.slice(0,q);
	s1 = s1.split("\n");
	s1.reverse();
	var s0 = ar(s1[0]); //前段左端～キャレット文字列
	if(1 in s1){
		s1 = ar(s1[1]);
		s1 = s1[0]; //前行最下段
	}else{
		s1 = -1; //1行目
	}
	y.textContent = s0[0];
	var s2 = y.offsetWidth - fl; //左端～キャレット幅px
	var s5 = s.slice(0,q + 1);
	if(s.charAt(q) != "\n"){
		s5 = s5.split("\n");
		s5.reverse();
		s5 = ar(s5[0]);
		s5 = s5[0].length - s0[0].length; //マイナスなら左端
	}
	if(s5 < 0){ //キャレットが左端だった場合
		s0.unshift("");
		s2 = 0;
	}
	var a1 = 0;
	if(1 in s0){ //行内で移動可能
		s3 = s0[1].match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g)||[];
		for(let i = 0; i <= s3.length; i++){
			s4 = s3.slice(0,i).join("");
			y.textContent = s4;
			if(y.offsetWidth >= s2){
				break;
			}
		}
		q -= s3.length - s4.length + s0[0].length;
	}else if(s1 == -1){ //キャレット行が1行目
		q = 0;
	}else if(s1 == ""){ //前行が空行
		q -= s0[0].length + 1;
	}else{
		s3 = s1.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g)||[];
		for(let i = 0; i <= s3.length; i++){
			s4 = s3.slice(0,i).join("");
			y.textContent = s4;
			if(y.offsetWidth >= s2){
				break;
			}
		}
		q -= s3.length - s4.length + s0[0].length + 1;
	}
	y.textContent = "";
	if(bb){
		if(p.selectionDirection == "backward"){
			p.selectionStart = q;
		}else{
			if(q < p.selectionStart){
				p.setSelectionRange(q,p.selectionStart,"backward");
			}else{
				p.selectionEnd = q;
			}
		}
	}else{
		p.setSelectionRange(q,q);
	}
}

function d() { //……下キー
	p.focus();
	var s = p.value, q = p.selectionEnd, s3 = 0, s4 = 0;
	if(bb && p.selectionDirection == "backward"){
		q = p.selectionStart;
	}
	var s1 = s.slice(0,q);
	s1 = s1.split("\n");
	s1.reverse();
	var s0 = ar(s1[0]); //左端～キャレット
	y.textContent = s0[0];
	var s2 = y.offsetWidth - fl; //左端～キャレット幅px
	var s5 = s.slice(0,q + 1);
	if(s.charAt(q) != "\n"){
		s5 = s5.split("\n");
		s5.reverse();
		s5 = ar(s5[0]);
		s5 = s5[0].length - s0[0].length; //マイナスなら左端
	}
	if(s5 < 0){
		s2 = 0;
	}else{
		q -= s0[0].length //キャレット行左端
	}
	s1 = s.slice(q);
	s1 = s1.split("\n"); //～文末
	s0 = ar(s1[0],1); //～次段右端
	if(1 in s0){ //行内で移動可能
		s3 = s0[1].match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g)||[];
		for(let i = 0; i <= s3.length; i++){
			s4 = s3.slice(0,i).join("");
			y.textContent = s4;
			if(y.offsetWidth >= s2){
				break;
			}
		}
		q += s4.length + s0[0].length;
	}else if(1 in s1){ //次行が存在する
		if(s1[1] == ""){ //次行が空行
			q += s1[0].length + 1;
		}else{ //次行が空行ではない
			s3 = s1[1].match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g)||[];
			for(let i = 0; i <= s3.length; i++){
				s4 = s3.slice(0,i).join("");
				y.textContent = s4;
				if(y.offsetWidth >= s2){
					break;
				}
			}
			q += s4.length + s1[0].length + 1;
		}
	}else{ //キャレット行が最終
		q = s.length;
	}
	y.textContent = "";
	if(bb){
		if(p.selectionDirection == "backward"){
			if(q > p.selectionEnd){
				p.setSelectionRange(p.selectionEnd,q,"forward");
			}else{
				p.selectionStart = q;
			}
		}else{
			p.selectionEnd = q;
		}
	}else{
		p.setSelectionRange(q,q);
	}
}

function h() { //……プレビュー表示
	var s = rg(1);
	var s1 = al(s);
	s = s.replace(/</gm,"&lt;");
	s = s.replace(/>/gm,"&gt;");
	s = s.replace(/\n/gm,"<br>");
	s = "<header><span>Preview[" + s1 
	+ ']</span><button type=button onclick="pc()">■</button><button type=button onclick="x()">×</button></header><p id="pid" onclick="pd()"' + pst + ">" + s + '</p><footer><button type=button onclick="hm()">「</button><button type=button onclick="pu()">↑</button><button type=button onclick="pd()">↓</button><button type=button onclick="ed()">」</button></footer>';
	w.innerHTML = s;
	w.style.display = "block";
	p.style.display = "none";
	document.getElementById("cn").style.display = "none";
	oo();
}

function pcc(a) { //……プレビューコピー
	p.style.display = "block";
	var s = rg(), a = p.value, q = p.selectionEnd;
	p.value = s;
	p.select();
	try{
		document.execCommand('copy');
		mp("コピーしました" + a);
	}catch(e){
		alert("実行できませんでした\n" + e);
	}
	p.value = a;
	p.setSelectionRange(q,q);
	p.blur();
	p.style.display = "none";

}

function pc() { //……プレビューコピー
	if(window.confirm("プレビューをコピーしますか？")){
		if (typeof navigator.clipboard === 'object'){
			navigator.clipboard.writeText(rg()).then(function(){
				mp("コピーしました");
			}, function() {
				pcc(0);
			});
			return;
		}
		result = pcc(1);
	}
}

function rg(u) { //……置換処理（エラー表示）
	var t = p.value;
	var s = localStorage.getItem('pps'); //プレビュー設定
	if(s != "" && s != null){
		s = s.split(":");
		if(s[6] == "true"){
			s = localStorage.getItem('ppv'); ///置換ルール
			var a = "", b = "", c = "", i = 0;
			if(s != "" && s != null){ //置換処理
				s = s.split("\n");
				for(i in s){
					if(/^\/\//.test(s[i]) || s[i] == ""){ //コメントと空行はスキップ
						continue;
					}
					a = s[i].split("\t");
					if(a.length < 3){ //要素不足は記録してスキップ
						i -= 0;
						c = c + (i + 1) + ",";
						continue;
					}
					b = new RegExp(a[0],a[1]);
					t = t.replace(b,a[2]);
				}
				if(c != "" && u == 1){
					c = c.slice(0,-1);
					alert(c + "行目をスキップしました。");
				}
			}
		}
	}
	return(t);
}

function hm() { //……プレビューhome
	window.scrollTo(0,0);
}

function pu() { //……プレビューpageup
	var s = window.innerHeight;
	s -= pln;
	window.scrollBy(0,s * -1);
}

function pd() { //……プレビューpagedown
	var s = window.innerHeight;
	s -= pln;
	window.scrollBy(0,s);
}

function ed() { //……プレビューend
	var s = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	window.scrollTo(0,s);
}

function x() { //……プレビューを閉じる
	p.style.display = "block";
	document.getElementById("cn").style.display = "block";
	w.textContent = "";
	w.style.display = "none";
}

function bu() { //……自動バックアップ
	var s = p.value;
	if(s != ""){
			localStorage.setItem('pvalue_bu',s);
			s = al(s);
			csp(s);
	}
}

/* ここから読込時処理 */

p = document.getElementById("pr"); //テキストエリアオブジェクト
n = document.getElementById("rn"); //ダミーブロックオブジェクト
y = document.getElementById("wi"); //ダミーインラインオブジェクト
w = document.getElementById("vw"); //プレビュー用オブジェクトdiv
wp = document.getElementById("pp"); //プレビュー用オブジェクトp
r = document.getElementById("swl"); //定型文選択用オブジェクト
pst = ""; //プレビューcss初期値
pln = 85; //プレビュースクロール余白初期値
fl = 7; //フォント+字間初期値
bb = 0; //範囲選択モード初期値

s = localStorage.getItem('pss');
if(s != "" && s != null){
	sh(s);
	s = s.split(":");
	document.getElementById("cr").value = s[0]; //テキストエリア高さ(vh)
	document.getElementById("ft").value = s[1]; //フォントサイズ(px)
	document.getElementById("ls").value = s[2]; //字間(px)
	document.getElementById("lh").value = s[3]; //行間(%)
	document.getElementById("fc").value = s[4]; //文字色
	document.getElementById("bc").value = s[5]; //背景色
	document.getElementById("bh").value = s[6]; //ボタン高さ(px)
	if(s[7] == "true"){ //拡張スイッチ
		document.getElementById("em").checked = 1;
	}
	if(s[8] == "true"){ //定型文スイッチ
		document.getElementById("sc").checked = 1;
	}
}else{
	document.getElementById("cm").style.display = "block"; //初期値は最小セット
	document.getElementById("cf").style.display = "none";
}
s = localStorage.getItem('psw'); //定型文内容
if(s != "" && s != null){
	document.getElementById("sw").value = s;
	s = s.replace(/</g,"&lt;");
	s = s.replace(/>/g,"&gt;");
	s = s.replace(/^(.+)$/gm,"<option>$1</option>");
	r.innerHTML = s;
}

s = localStorage.getItem('pps'); //プレビュー設定
if(s != "" && s != null){
	hpr(s);
	s = s.split(":");
	document.getElementById("vff").value = s[0]; //フォントファミリー
	document.getElementById("vft").value = s[1]; //フォントサイズ(px)
	document.getElementById("vls").value = s[2]; //字間(px)
	document.getElementById("vlh").value = s[3]; //行間(%)
	document.getElementById("vfc").value = s[4]; //文字色
	document.getElementById("vbc").value = s[5]; //背景色
	if(s[6] == "true"){
		document.getElementById("vem").checked = 1; //置換
	}
}
s = localStorage.getItem('ppv'); ///置換ルール
if(s != null){
	document.getElementById("vsw").value = s;
}

s = localStorage.getItem('pn'); //メニュー状態復帰
if(s > 0){
	document.getElementById("pn").style.display = "block";
	document.getElementById("cn").style.display = "none";
}else{
	p.style.display = "block";
}

s = localStorage.getItem('pvalue_bu'); //自動バックアップから復帰
if(p.value == "" && s != null && s != ""){
		p.value = s;
		s = al(s);
		csp(s);
}else{
	s = localStorage.getItem('pvalue'); //保存から復帰
	if(p.value == "" && s != null && s != ""){
		p.value = s;
		s = al(s);
		csp(s);
	}
}

s = localStorage.getItem('wfl'); //webフォント使用状態
if(s > 0){
	p.style.fontFamily = '"emj","mies","webnasm"';
	document.getElementById("wf").textContent = "終了";
}

/*	サービスワーカーの登録
if('serviceWorker' in navigator){
	navigator.serviceWorker.register('/txe_sw.js');
}
*/
