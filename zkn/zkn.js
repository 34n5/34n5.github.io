//初期設定
//const hana(from hana.js)
let r0 = hana; //mで記憶したリスト
let r = r0; //使用中のリスト
let s = ""; //汎用文字列
let n; //検索ターゲット（列）

//オブジェクトセット
const _bset = document.getElementsByTagName("div")[0];
const _div = document.getElementsByTagName("div")[1];
const _input = document.getElementsByTagName("input")[0];
const _th = document.getElementsByTagName("th");
const _tbody = document.getElementsByTagName("tbody")[0];

//初回作表
td();
document.getElementsByTagName("thead")[0].innerHTML = `<tr><th onclick="t(0);">名前</th><th onclick="t(1);">::</th><th onclick="t(2);">季節</th><th onclick="t(3);">★</th><th onclick="t(4);">色数<br><small>(交配)</small></th><th onclick="t(5);">売価</th><th onclick="t(6);">時間</th></tr>`;

t(0);

//初期作業ここまで

function t(a) { //検索パネルスイッチ
	_div.style.display = "flex";
	_input.value = "";
	thc();
	_th[a].style.backgroundColor = "#717171";
	n = a; //検索ターゲットをセット
}

function thc() { //thクリア
	for(let i = 0; i < _th.length; i++){
		_th[i].style.backgroundColor = "#519121";
	}
}

function u() { //oninputイベント
	let a = new RegExp(_input.value);
	r = r0.filter(c => a.test(c[n]));
	td();
}

function f() { //onfocusイベント
	_bset.style.display = "flex";
}

function b() { //onblurイベント
	_bset.style.display = "none";
}

function td() { //作表
	let s = "";
	for(let i = 0; i < r.length; i++){
		s += `<tr><td>${r[i][0]}</td><td>${r[i][1]}</td><td>${r[i][2]}</td><td>${r[i][3]}</td><td>${r[i][4]}</td><td>${r[i][5]}</td><td>${r[i][6]}</td></tr>`;
	}
	_tbody.innerHTML = s;
}

function kioku() {
	r0 = r;
}

function kuria() {
	r = hana;
	_input.value = "";
	td();
}

function batu() {
	thc();
	_div.style.display = "none";
	b();
}


function i(a) {
	_input.setRangeText(event.target.textContent,_input.selectionStart,_input.selectionEnd,"end");
	_input.focus();
	if(a) _input.selectionEnd -= 1;
	u();
}
