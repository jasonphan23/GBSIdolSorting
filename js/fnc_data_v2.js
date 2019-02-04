// 2008/7/3 Scripted by K-Factory@migiwa
// 2009/1/27 Modified by K-Factory@migiwa

// *****************************************************************************
str_CenterT = 'Tie!';
str_CenterB = 'Undo last choice';

str_ImgPath = 'img/';
// 0:順番に　1:昔の
var bln_ResultMode = 1;
// 0:テキスト　1:イラスト　2:テキスト＋イラスト
var int_ResultImg = 2;
// イラスト表示時、何位までをイラスト表示にするか。
var int_ResultRank = 3;

// ソート用のテーブルを
// 0:残す　1:消す
var bln_ResultStyle = 0;

// ソート進捗バーの表示
// 0:表示　1:消す
var bln_ProgessBar = 1;

// Maximum number of result rows before being broken off into another table.
var maxRows = 35;

// * タイトル情報（編集可能。最後の行に”,”を付けないようにしてください）
var int_Colspan = 3;
var ary_TitleData = [
  "Dempagumi.inc",
  "=LOVE",
  "Maneki Kecha",
  "KissBee",
  "CY8ER",
  "KMYD",
  "A応P",
  "Akishibu Project",
  "Luce Twinkle Wink ☆",
  "LOVELY☆DOLL",
  "Nanaland",
  "Ange☆Reve",
  "amiinA",
  "Chu☆Oh!Dolly",
  "Yamakatsu",
  "Jewel☆Neige",
  "26 Ji No Masquerade",
  "Niji no Conquistador",
  "FES☆TIVE",
  "Wasuta"
];

// * キャラクター情報（編集可能。最後の行に”,”を付けないようにしてください）
// * 使用フラグ（0にするとソートに入りません）, 
//   "タイトルID"（先頭から0, 1, 2...）, 
//   {タイトル別参加フラグ}（1を入れると対象タイトルに入ります）,
//   "キャラクター名", "画像（空白の場合、キャラクター名が使用されます）"
//                                      [1,2,3,4,5,6,7,8,9,
var ary_CharacterData = [
  [1, "Aizawa Risa",        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "denpagumi/aizawarisa.jpg"],
  [1, "Furukawa Mirin",     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "denpagumi/furukawamirin.jpg"],
  [1, "Yumemi Nemu",        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "denpagumi/yumeninemu.jpg"],
  [1, "Naruse Eimi ",       [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "denpagumi/naruseeimi.jpg"],
  [1, "Fujisaki Ayane",     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "denpagumi/fujisakiayane.jpg"],
  [1, "Kaname Rin",         [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "denpagumi/kanamerin.jpg"],

  [1, "Otani Emiri",        [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "love/otaniemiri.jpg"],
  [1, "Oba Hana",           [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "love/obahana.jpg"],
  [1, "Otoshima Risa",      [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "love/otoshimarisa.jpg"],
  [1, "Saito Kiara",        [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "love/saitokiara.jpg"],
  [1, "Saito Nagisa",       [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "love/saitonagisa.jpg"],
  [1, "Sasaki Maika",       [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "love/sasakimaika.jpg"],
  [1, "Satake Nonno",       [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "love/satakenonno.jpg"],
  [1, "Takamatsu Hitomi",   [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "love/takamatsuhitomi.jpg"],
  [1, "Takiwaki Shoko",     [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "love/takiwakishoko.jpg"],
  [1, "Noguchi Iori",       [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "love/noguchiiori.jpg"],
  [1, "Morohashi Sana",     [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "love/morohashisana.jpg"],
  [1, "Yamamoto Anna",      [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "love/yamamotoanna.jpg"],

  [1, "Nakagawa Miyuu",     [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "maneki/nakagawamiyuu.jpg"],
  [1, "Miyauchi Rin",       [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "maneki/miyauchirin.jpg"],
  [1, "Matsushita Reona",   [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "maneki/matsushitareona.jpg"],
  [1, "Fukase Mio",         [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "maneki/fukasemio.jpg"],
  [1, "Shinohara Aoi",      [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "maneki/shinoharaaoi.jpg"],
 
  [1, "Takano Hina",        [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "kissbee/takanohina.jpg"],
  [1, "Tanifuji Misaki",    [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "kissbee/tanifujimisaki.jpg"],
  [1, "Otawa Sakura",       [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "kissbee/otawasakura.jpg"],
  [1, "Nakayama Seika",     [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "kissbee/nakayamaseika.jpg"],
  [1, "Ooe Rena",           [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "kissbee/ooerena.jpg"],
  [1, "Fuiji Yui",          [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "kissbee/fuijiyui.jpg"],
  [1, "Shinohara Nonoka",   [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "kissbee/shinoharanonoka.jpg"],

  [1, "Ichigo Rinahamu",    [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "cy8er/ichigorinahamu.jpg"],
  [1, "Koinumaru Pochi",    [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "cy8er/koinumarupochi.jpg"],
  [1, "Suzukawa Mashiro",   [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "cy8er/suzukawamashiro.jpg"],
  [1, "Yamiyume Yamii",     [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "cy8er/yamiyumeyamii.jpg"],
  [1, "Fujishiro Anna",     [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "cy8er/fujishiroanna.jpg"],

  [1, "Ichinose Mika",      [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "kmyd/ichinosemika.jpg"],
  [1, "Hashima Mei",        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "kmyd/hashimamei.jpg"],
  [1, "Hashima Miki",       [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "kmyd/hashimamiki.jpg"],
  [1, "Sekiguchi Naho",     [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "kmyd/sekiguchinaho.jpg"],
  [1, "Koyama Hina",        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "kmyd/koyamahina.jpg"],

  [1, "Asahi Yuuna",        [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "ap/asahiyuuna.jpg"],
  [1, "Kudou Hinaki",       [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "ap/kudouhinaki.jpg"],
  [1, "Majima Rin",         [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "ap/majimarin.jpg"],
  [1, "Tsusumi Yukina",     [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "ap/tsusumiyukina.jpg"],
  [1, "Tomoe Mei",          [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "ap/tomoemei.jpg"],
  [1, "Harusaki Non",       [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "ap/harusakinon.jpg"],
  [1, "Hirose Yuuki",       [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "ap/hiroseyuuki.jpg"],
  [1, "Kudou Hinaki",       [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "ap/kudouhinaki.jpg"],
  [1, "Majima Rin",         [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "ap/majimarin.jpg"],
  [1, "Tsusumi Yukina",     [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "ap/tsusumiyukina.jpg"],
  [1, "Tomoe Mei",          [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "ap/tomoemei.jpg"],
  [1, "Hoseki Sena",        [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "ap/hosekisena.jpg"],
  [1, "Mizuki Aoi",         [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "ap/mizukiaoi.jpg"],

  [1, "Okonogi Ruka",       [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "aksb/okonogiruka.jpg"],
  [1, "Kanno Serina",       [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "aksb/kannoserina.jpg"],
  [1, "Kera Hinako",        [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "aksb/kerahinako.jpg"],
  [1, "Taguchi Miiro",      [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "aksb/taguchimiiro.jpg"],
  [1, "Tsushiro Mizuki",    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "aksb/tsushiromizuki.jpg"],
  [1, "Taguchi Miiro",      [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "aksb/taguchimiiro.jpg"],
  [1, "Fukuyama Rino",      [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "aksb/fukuyamarino.jpg"],
  [1, "Hoshino Mahiro",     [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "aksb/hoshinomahiro.jpg"],
  [1, "Mashiro Riho",       [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "aksb/hoshinoriho.jpg"],
  [1, "Miyatani Yue",       [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "aksb/miyataniyue.jpg"],
  [1, "Morishita Kanon",    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "aksb/morishitakanon.jpg"],

  [1, "Higaki Kaho",        [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "ltw/kaho.jpg"],
  [1, "Usami Yukino",       [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "ltw/yukino.jpg"],
  [1, "Itayama Saori",      [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "ltw/saori.jpg"],
  [1, "Fukasawa Saki",      [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "ltw/saki.jpg"],

  [1, "Aisako Miyu",        [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "lovelydoll/aisakomiyu.jpg"],
  [1, "Sano Yuriko",        [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "lovelydoll/sanoyuriko.jpg"],
  [1, "Haruna",             [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "lovelydoll/haruna.jpg"],
  [1, "Riona Ota",          [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "lovelydoll/riona.jpg"],
  [1, "Miki Sakura",        [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "lovelydoll/mikisakura.jpg"], 

  [1, "Ooba Haruka",        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "7land/oobaharuka.jpg"],
  [1, "Kohinata Mai",       [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "7land/kohinatamai.jpg"],
  [1, "Mineshima Komaki",   [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "7land/mineshimakonami.jpg"],
  [1, "Yukimura Karin",     [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "7land/yukimurakarin.jpg"],
  [1, "Yukine Ando",        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "7land/yukineando.jpg"],
  [1, "Kotone Sasahara",    [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "7land/kotonesasahara.jpg"],
  
  [1, "Sasaki Rika",        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "angereve/sasakirika.jpg"],
  [1, "Yoshihashi Arisa",   [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "angereve/yoshihashiarisa.jpg"],
  [1, "Mizuna Yua",         [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "angereve/mizunoyua.jpg"],
  [1, "Saigo Mizuki",       [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "angereve/saigomizuki.jpg"],
  [1, "Gonda Natsumi",      [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "angereve/gondanatsumi.jpg"],

  [1, "ami",                [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "amiina/ami.jpg"],
  [1, "miyu",               [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "amiina/miyu.jpg"],

  [1, "Osaki Rui",          [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "chuohdolly/osakirui.jpg"],
  [1, "Mashiro Yuuka",      [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "chuohdolly/mashiroyuuka.jpg"],
  [1, "Haruno Emiri",       [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "chuohdolly/harunoemiri.jpg"],
  [1, "Shirosaki Momoka",   [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "chuohdolly/momoka.jpg"],
  [1, "Obu Moe",            [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "chuohdolly/obumoe.jpg"],
  [1, "Tujimura Mitsuki",   [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "chuohdolly/tujimuramitsuki.jpg"],
  [1, "Yoshikawa Yuiri",    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "chuohdolly/yuiri.jpg"],

  [1, "Mugi",               [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0], "yamakatsu/mugi.jpg"],
  [1, "Fuiji Rena",         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0], "yamakatsu/fuijirena.jpg"],
  [1, "Moriwaki Yui",       [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0], "yamakatsu/moriwakiyui.jpg"],
  [1, "Tsuneoka Moi",       [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0], "yamakatsu/moi.jpg"],
  [1, "Yuly",               [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0], "yamakatsu/yuly.jpg"],

  [1, "Sakurai Yui",        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "jewelneige/sakuraiyui.jpg"],
  [1, "Suzukake Rin",       [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "jewelneige/suzukakerin.jpg"],
  [1, "Nakagawa Rira",      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "jewelneige/nakagawarira.jpg"],
  [1, "Matsuda Ayuna",      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "jewelneige/matsudaayuna.jpg"],
  [1, "Kurata Kasumi",      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "jewelneige/kuratakasumi.jpg"],
  [1, "Mawa Honoka",        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "jewelneige/honoka.jpg"],
  [1, "Aoyama Reina",       [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "jewelneige/reina.jpg"],

  [1, "Kurusu Rin",         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "nijimasu/kurusu.jpg"],
  [1, "Eshima Aeri",        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "nijimasu/aeri.jpg"],
  [1, "Daimon Karin",       [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "nijimasu/daimon.jpg"],
  [1, "Yoshii Miyu",        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "nijimasu/yoshii.jpg"],
  [1, "Mori Miharu",        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "nijimasu/mori.jpg"],

  [1, "Okada Ayame",        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "nijicon/okadaayame.jpg"],
  [1, "Kataoka Miyu",       [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "nijicon/kataoka.jpg"],
  [1, "Kumamoto Marina",    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "nijicon/kumamoto.jpg"],
  [1, "Shimizu Riko",       [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "nijicon/shimizu.jpg"],
  [1, "Tsurumi Moe",        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "nijicon/tsurumi.jpg"],
  [1, "Nakamura Akari",     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "nijicon/nakamura.jpg"],
  [1, "Nemoto Nagi",        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "nijicon/nemoto.jpg"],
  [1, "Hiruta Airi",        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "nijicon/hiruta.jpg"],
  [1, "Matoba Karin",       [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "nijicon/matoba.jpg"],
  [1, "Yamasaki Nana",      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "nijicon/yamasaki.jpg"],
  [1, "Yamato Ao",          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "nijicon/yamato.jpg"],
  [1, "Yamamoto Rio",       [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "nijicon/yamamoto.jpg"],

  [1, "Aoba Hinari",        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "festive/aoba.jpg"],
  [1, "Shiraishi Piano",    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "festive/piano.jpg"],
  [1, "Mano Saria",         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "festive/saria.jpg"],
  [1, "Doko Ruriko",        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "festive/ruriko.jpg"],
  [1, "Minami Marika",      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "festive/marika.jpg"],
  [1, "Kondo Saeko",        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "festive/saeko.jpg"],

  [1, "Mishina Ruka",      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "wasuta/ruka.jpg"],  
  [1, "Hirokawa Nanase",   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "wasuta/nanase.jpg"],  
  [1, "Matsuda Miri",      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "wasuta/miri.jpg"],  
  [1, "Kodama Ririka",     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "wasuta/ririka.jpg"],  
  [1, "Sakamoto Hazuki",   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "wasuta/hazuki.jpg"],  
];
