s = "2022_0925_1902"; //＊＊＊更新日時＊＊＊
document.getElementById("jsdate").textContent = s;
/*
0922 全文コピー後ジャンプ追加
0925 すべて選択追加
	 ボタン配置変更・コピペセット廃止
	 保存エラーチェック追加

*/


// ***オブジェクトセット
p = document.getElementById("pr"); //メインtextarea
n = document.getElementById("rn"); //ダミーdiv
y = document.getElementById("wi"); //ダミーspan
w = document.getElementById("vw"); //プレビューdiv
wp = document.getElementById("pp"); //プレビューp
r = document.getElementById("swl"); //定型文select

// ***初期値セット
pst = ""; //プレビューcss
pln = 85; //プレビュースクロール余白
fl = 7; //フォント+字間
bb = 0; //範囲選択モード
us = []; //undo用ログ
ut = []; //redo用ログ
uq = 0; //undo用ログ容量
jf = false; //コピー後ジャンプフラグ

function c1() { //……📑copy
	p.focus();
	var s = getSelection();
	if(s == "") return;
	navigator.clipboard.writeText(s).then(function(){
		mp("コピーしました");
		return;
	},function(){
		alert("コピーできませんでした");
		return;
	});
}

function c2() { //……✂cut
	p.focus();
	var s = getSelection();
	if(s == "") return;
	ur();
	navigator.clipboard.writeText(s).then(function(){
		p.setRangeText("");
		//mp("カットしました");
		return;
	},function(){
		alert("カットできませんでした");
		return;
	});
}

function c3() { //……📋paste
	var s = "";
	navigator.clipboard.readText().then(function(s){
		if(s == "") return;
		ur();
		p.setRangeText(s,p.selectionStart,p.selectionEnd,"end");
		p.focus();
	},function(){
		alert("クリップボードを取得できませんでした");
		return;
	});
}

function ud() { //……↲undo
	p.focus();
	if(!(us.length > 0)) return;
	ut.unshift([p.value,p.selectionEnd]);
	p.value = us[0][0];
	p.setSelectionRange(us[0][1],us[0][1]);
	us.shift();
}

function rd() { //……↳redo
	p.focus();
	if(!(ut.length > 0)) return;
	us.unshift([p.value,p.selectionEnd]);
	p.value = ut[0][0];
	p.setSelectionRange(ut[0][1],ut[0][1]);
	ut.shift()
}

function ur() { //……undo用ログ記録
	var s = p.value;
	var l = 999999; //総文字数リミット
	var q = p.selectionEnd;
	uq += s.length;
	if(uq > l){
		while(uq > l){
			let a = us.pop();
			uq -= a[0].length;
		}
		//console.log(us);
	}
	us.unshift([s,q]);
	ut = [];
}

p.addEventListener('compositionstart', () => {// ログ拾いイベント1
	ur();
});

p.addEventListener('beforeinput', () => {// ログ拾いイベント2
	if(event.isComposing) return;
	if(event.data == "") return;
	ur();
});

function ls(k,s) { //……保存エラーチェック
	try{
		localStorage.setItem(k,s);
	}catch{
		alert("保存できませんでした");
		return true;
	}
	return;
}

function hp() { //……プレビュー書式設定
	var s = document.getElementById("vff").value; //フォントファミリー
	s += ":" + document.getElementById("vft").value; //フォントサイズ(px)
	s += ":" + document.getElementById("vls").value; //字間(px)
	s += ":" + document.getElementById("vlh").value; //行間(%)
	s += ":" + document.getElementById("vfc").value; //文字色
	s += ":" + document.getElementById("vbc").value; //背景色
	s += ":" + document.getElementById("vem").checked; //置換
	//localStorage.setItem('pps',s);
	if(ls('pps',s)) return;
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
				//localStorage.setItem('ppv',s);
				if(ls('ppv',s)) return;
			}
		}else{
			//localStorage.setItem('ppv',s);
			if(ls('ppv',s)) return;
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
		//localStorage.setItem('wfl',0);
		if(ls('wfl',0)) return;
		p.style.fontFamily = '"emj","NasuM",monospace,monospace';
		n.style.fontFamily = '"emj","NasuM",monospace,monospace';
		y.style.fontFamily = '"emj","NasuM",monospace,monospace';
		document.getElementById("wf").textContent = "開始";
		mp("終了しました");
	}else{
		//localStorage.setItem('wfl',1);
		if(ls('wfl',1)) return;
		p.style.fontFamily = '"emj","mies","webnasm"';
		n.style.fontFamily = '"emj","mies","webnasm"';
		y.style.fontFamily = '"emj","mies","webnasm"';
		document.getElementById("wf").textContent = "終了";
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

function b() { //……～
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
	if(!document.getElementById("ju").validity.valid){
		document.getElementById("ju").reportValidity();
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
	s += ":" + document.getElementById("rc").checked; //[9]文末キャレット
	jf = document.getElementById("uj").checked; //[10]コピー後ジャンプ
	s += ":" + jf;
	//localStorage.setItem('pss',s);
	if(ls('pss',s)) return;
	sh(s);
	s = document.getElementById("ju").value; //ジャンプ先
	//localStorage.setItem('pju',s);
	if(ls('pju',s)) return;
	s = document.getElementById("sw").value; //定型文内容
	//localStorage.setItem('psw',s);
	if(ls('psw',s)) return;
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
	r.style.height = s[6] + "px"; //定型文セレクトボックス
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
	ur();
	var s = r.value;
	s = s.replace(/&lt;/g,"<");
	s = s.replace(/&gt;/g,">");
	s = s.replace(/\\n/g,"\n");
	p.setRangeText(s,p.selectionStart,p.selectionEnd,"end");
	p.focus();
}

function v() { //……鳩
	ur();
	p.setRangeText("♡",p.selectionStart,p.selectionEnd,"end");
	p.focus();
}

function oo() { //……▼
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
			//localStorage.setItem('pn',0);
			if(ls('pn',0)) return;
		}else{
			document.getElementById("pn").style.display = "block";
			oo();
			p.style.display = "none";
			document.getElementById("cn").style.display = "none";
			//localStorage.setItem('pn',1);
			if(ls('pn',1)) return;
		}
	}
}

function si() { //……📁
	var s = p.value;
	if(s == ""){
		if(!window.confirm("内容がありません。\n本当に保存しますか？")) return;
	}else{
		if(!window.confirm("保存しますか？")) return;
	}
	//localStorage.setItem('pvalue',s);
	if(ls('pvalue',s)) return;
	bu();
	mp("保存しました");
	p.focus();
}

function gi() { //……復帰
	var s = localStorage.getItem('pvalue');
	if(s == "" || s ==null){
		mp("保存されていません");
	}else{
		s = al(s);
		if (window.confirm("復帰しますか？ (" + s + ")")) {
			csp(s);
			s = p.value;
			p.value = localStorage.getItem('pvalue');
			if(s == ""){
				mp("復帰しました");
			}else{
				//localStorage.setItem('pvalue',s);
				if(ls('pvalue',s)) return;
				mp("内容を入れ替えました");
			}
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
		oo();
	}catch(e){
		alert("実行できませんでした\n" + e);
	}
	p.setSelectionRange(q,q);
	p.blur();
}

function ll() { //……■
	p.select();
}

function c() { //……全文コピー
	if(confirm("全文コピーしますか？")){
		if (typeof navigator.clipboard === 'object'){
			navigator.clipboard.writeText(p.value).then(function(){
				mp("コピーしました");
				oo();
				if(jf){
					var s = localStorage.getItem('pju');
					if(confirm("次のURLを開きます : " + s)){
						window.open(s,"_blank");
					}
				}
			}, function() {
				cc(0);
			});
			return;
		}
		result = cc(1);
	}
}

function t() { //……≪
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

function m() { //……≫
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

function a() { //……「
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

function lg(a,b) { //……サロゲートペアチェック
	var s = p.value;
	var q = [a, a + b]
	q.sort();
	s = s.slice(q[0],q[1]);
	return(/[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(s));
}

function l() { //…… ←
	p.focus();
	var a,b,c;
	a = p.selectionStart;
	b = p.selectionEnd;
	c = p.selectionDirection;
	if(bb){
		if(a == b) c = "backward";
		if(c == "backward"){
			if(lg(a,-2)) a--;
			a--;
		}else{
			if(lg(b,-2)) b--;
			b--;
		}
	}else{
		if(lg(b,-2)) b--;
		b--;
		a = b;
	}
	p.setSelectionRange(a,b,c);
}

function g() { //……→
	p.focus();
	var a,b,c;
	a = p.selectionStart;
	b = p.selectionEnd;
	c = p.selectionDirection;
	if(bb){
		//if(a == b) c = "forward";
		if(c == "backward"){
			if(lg(a,2)) a++;
			a++;
		}else{
			if(lg(b,2)) b++;
			b++;
		}
	}else{
		if(lg(a,2))a++;
		a++;
		b = a;
	}
	p.setSelectionRange(a,b,c);
}

function z() { //……」
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
				if(p3 == 2) break;
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
				if(p3 == 1) break;
				p0 = n.clientHeight;
				p2 = p1;
				p3++;
			}
		}
	}
	n.textContent = "";
	return(s3);
}

function u() { //……↑
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
			if(y.offsetWidth >= s2) break;
		}
		q -= s3.length - s4.length + s0[0].length;
	}else if(s1 == -1){ //キャレット行が1行目
		q = 0;
//	}else if(s1 == ""){ //前行が空行
//		q -= s0[0].length + 1;
	}else{ //内容あり
		s3 = s1.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g)||[];
		for(let i = 0; i <= s3.length; i++){
			s4 = s3.slice(0,i).join("");
			y.textContent = s4;
			if(y.offsetWidth >= s2) break;
		}
		q -= s1.length - s4.length + s0[0].length + 1;
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

function d() { //……↓
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
			if(y.offsetWidth >= s2) break;
		}
		q += s4.length + s0[0].length;
	}else if(1 in s1){
//		if(s1[1] == ""){ //次行が空行
//			q += s1[0].length + 1;
//		}else{ //内容あり
			s3 = s1[1].match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g)||[];
			for(let i = 0; i <= s3.length; i++){
				s4 = s3.slice(0,i).join("");
				y.textContent = s4;
				if(y.offsetWidth >= s2) break;
			}
			q += s4.length + s1[0].length + 1;
//		}
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
	s = s.replace(/</gm,"&lt;");
	s = s.replace(/>/gm,"&gt;");
	s = s.replace(/\n/gm,"<br>");
	s = `<header><span>Preview[${al(s)}]</span><button type=button onclick="pc()">■</button><button type=button onclick="x()">×</button></header><p id="pid" onclick="pd()"${pst}>${s}</p><footer><button type=button onclick="hm()">「</button><button type=button onclick="pu()">↑</button><button type=button onclick="pd()">↓</button><button type=button onclick="ed()">」</button></footer>`;
	w.innerHTML = s;
	w.style.display = "block";
	p.style.display = "none";
	document.getElementById("cn").style.display = "none";
	oo();
}

function pcc(a) { //……プレビューコピー旧
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

function rg(u) { //……置換処理+エラー表示
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
	//localStorage.setItem('pvalue_bu',s);
	if(ls('pvalue_bu',s)) return;
	s = al(s);
	csp(s);
}

/* ここから読込時処理 */

s = localStorage.getItem('wfl'); //webフォント使用状態
if(s > 0){
	p.style.fontFamily = '"emj","mies","webnasm"';
	n.style.fontFamily = '"emj","mies","webnasm"';
	y.style.fontFamily = '"emj","mies","webnasm"';
	document.getElementById("wf").textContent = "終了";
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
	if(s[9] == "true"){ //文末キャレット
		document.getElementById("rc").checked = 1;
		//z();
	}
	if(s[10] == "true"){ //全文コピー後ジャンプ
		document.getElementById("uj").checked = 1;
		jf = true;
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
s = localStorage.getItem('pju'); //コピー後ジャンプ先
if(s != "" && s != null){
	document.getElementById("ju").value = s;
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
//if(s != null){
if(s != "" && s != null){
	document.getElementById("vsw").value = s;
}

s = localStorage.getItem('pn'); //メニュー状態復帰
if(s > 0){
	document.getElementById("pn").style.display = "block";
	document.getElementById("cn").style.display = "none";
}else{
	p.style.display = "block";
}
/*
if(location.search == "?1"){
	let e = document.createElement("div");
	e.innerHTML = '<a href="/test/tex.html">テスト版</a><br><a href="/tex.html">本番</a>';
	document.getElementById("atab").appendChild(e);
}
*/
// ***サービスワーカーの登録
if('serviceWorker' in navigator){
	navigator.serviceWorker.register('/txe/txe_sw.js').then(function(r){
		document.getElementById("swstate").textContent = "[ok]";
		sut();
		document.getElementById("swstate").onclick = function(){
			if(window.confirm("Service Workerを更新しますか？")){
				r.update();
			}
		}
		r.addEventListener('updatefound', () => {
			document.getElementById("swstate").textContent = "[update]";
			sut();
		});
	}).catch(function(e){
		document.getElementById("swstate").textContent = "[fail]" + e;
	});;
}else{
	document.getElementById("swstate").textContent = "[no support]" + e;
}

function sut() { //……sw更新日時表示
	navigator.serviceWorker.controller.postMessage('getdate');
}

navigator.serviceWorker.addEventListener('message', e =>  {
	document.getElementById("swtime").textContent = e.data;
});

if(document.getElementById("rc").checked == 1){
	z();
}
