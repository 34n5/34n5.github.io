const lastMod = "2022_0806_2016...1.3.0";
const hana = [
['アジサイ','3','夏','3','赤桃青紫白混','50','12:00'],
['キク','3','秋','3','赤桃紫黄橙白緑混','40','12:00'],
['コスモス','1','秋','1','赤桃紫黄橙白黒混混','3','0:10'],
['スイセン','2','冬','2','黄白混混','16','4:00'],
['チューリップ','2','春','3','赤桃紫黄橙白黒緑混混','24','10:00'],
['ツバキ','2','冬','3','赤桃白混混','16','10:00'],
['ハイビスカス','3','夏','3','赤桃青黄橙白混','50','12:00'],
['ヒガンバナ','3','秋','3','赤桃黄橙白','50','12:00'],
['ヒマワリ','3','夏','3','赤黄白黒','50','12:00'],
['プリムラ','1','冬','2','赤桃紫黄橙白','3','0:10'],
['ランタナ','2','秋','2','赤桃紫黄橙白','16','0:10'],
['リンドウ','2','秋','2','桃青紫白','16','4:00'],
['バラ','3','春','3','赤桃青紫黄橙白黒緑','50','12:00'],
['フジ','4','春','4','桃紫白','100','48:00'],
['ヒヤシンス','2','春','3','赤桃青紫黄橙白黒','24','10:00'],
['カーネーション','1','春','2','赤桃青黄橙白緑混混','3','0:10'],
['サクラ','4','春','4','赤桃白混','100','48:00'],
['シロツメクサ','1','春','2','桃白','3','0:10'],
['タンポポ','1','春','1','黄白','3','0:10'],
['アサガオ','2','夏','3','赤桃青紫白混混','16','10:00'],
['キキョウ','2','夏','2','桃紫白混混','16','4:00'],
['ジニア','2','夏','2','赤桃紫黄橙白緑混混','16','4:00'],
['プルメリア','3','夏','2','赤桃黄白混','35','6:00'],
['ペチュニア','1','夏','2','赤桃青紫黄橙白黒混混混','3','0:10'],
['ユリ','3','夏','3','赤桃紫黄橙白黒混混混','40','12:00'],
['ラベンダー','1','夏','1','桃紫白','10','2:00'],
['キンモクセイ','4','秋','4','黄','100','48:00'],
['ケイトウ','2','秋','3','赤桃黄橙緑','24','10:00'],
['パンジー','2','秋','2','赤桃青紫黄橙白黒','16','4:00'],
['ウメ','4','冬','4','赤桃白混','65','48:00'],
['サザンカ','2','冬','2','赤桃白混','16','4:00'],
['シクラメン','2','冬','2','赤桃紫黄白混混','16','4:00'],
['スノードロップ','1','冬','1','白緑','10','2:00'],
['ホウセンカ','1','夏','1','赤桃紫白','3','0:10'],
['ダリア','3','夏','3','赤桃紫黄橙白黒緑','50','12:00'],
['サルビア','2','夏','2','赤桃青白黒','16','4:00'],
['バーベナ','1','夏','2','赤桃紫白','3','0:10'],
['カンナ','3','夏','3','赤桃黄橙白','50','12:00'],
['マツ','4','通','4','緑','65','48:00'],
['シラカンバ','4','通','4','緑','65','48:00'],
['タケ','2','通','3','緑','12','10:00'],
['スギ','4','通','4','緑','65','48:00'],
['ヒノキ','4','通','4','緑','65','48:00'],
['モミ','4','通','4','緑','65','48:00'],
['ヤナギ','4','夏','4','緑','65','48:00'],
['ヤシ','4','夏','4','緑','65','48:00'],
['ほそい草','1','通','1','緑','2','0:05'],
['ひらたい草','1','通','1','緑','2','2:00'],
['つんつん草','1','通','1','緑','2','2:00'],
['もさもさ草','1','通','1','緑','2','2:00'],
['ミツバの クローバー','1','通','1','黒緑','2','1:00'],
['ヨツバの クローバー','1','通','5','黒緑','12','1:00'],
['ヘビイチゴ','1','通','1','赤','2','0:10'],
['ハコベ','1','通','1','緑','2','0:10'],
['アオイゴケ','1','通','1','緑','2','0:10'],
['オオバコ','1','通','1','緑','5','0:05'],
['ギシギシ','1','通','1','緑','12','0:15'],
['ノゲシ','1','通','1','緑','5','0:05'],
['エノコログサ','1','通','1','黄緑','12','0:15'],
['ツクシ','1','春','1','橙','3','0:30'],
['オオイヌノフグリ','1','春','1','青','3','0:30'],
['ドクダミ','1','夏','1','白','3','0:30'],
['ツユクサ','1','夏','1','青','3','0:30'],
['イヌタデ','1','秋','1','赤','3','0:30'],
['ヒメオドリコソウ','1','冬','1','緑','3','0:30'],
['スズメノカタビラ','1','冬','1','緑','3','0:30'],
['ハギ','1','秋','1','青','3','0:30'],
['おおきな フジ','A','春','5','紫','150','60:00'],
['おおきな キンモクセイ','A','秋','5','橙','150','60:00'],
['おおきな サクラ','A','春','5','桃','150','60:00'],
['おおきな ウメ','A','冬','5','桃','150','60:00'],
['おおきな ヤシ','A','夏','5','緑','150','60:00'],
['ササかざり','2','夏','4','赤桃青紫黄橙','10','5:00'],
['ごうかな ササかざり','4','夏','4','緑','25','24:00'],
['リボンむすび カーネーション','1','春','4','赤桃青黄橙緑','5','0:30'],
['リボンむすび ローズ','3','春','4','赤桃青黄橙緑','15','6:40'],
];
