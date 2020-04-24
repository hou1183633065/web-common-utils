/*
 * @Author: houzhiqiag
 * @Date: 2019-12-09 10:57:37
 * @Last Modified by: houzhiqiag
 * @Last Modified time: 2019-12-17 16:32:12
 */

const UA = navigator.userAgent.toLowerCase();

const test_UA = regexp => regexp.test(UA);

const getVersion = regexp =>
  (UA.match(regexp) + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, ".");

// 系统
let system = "unknown";
if (test_UA(/windows|win32|win64|wow32|wow64/gi)) {
  system = "windows"; // window系统
} else if (test_UA(/macintosh|macintel/gi)) {
  system = "osx"; // osx系统
} else if (test_UA(/x11/gi)) {
  system = "linux"; // linux系统
} else if (test_UA(/android|adr/gi)) {
  system = "android"; // android系统
} else if (test_UA(/ios|iphone|ipad|ipod|iwatch/gi)) {
  system = "ios"; // ios系统
}

// 系统版本
let system_v = "unknown";
if (system === "windows") {
  if (test_UA(/windows nt 5.0|windows 2000/gi)) {
    system_v = "2000";
  } else if (test_UA(/windows nt 5.1|windows xp/gi)) {
    system_v = "xp";
  } else if (test_UA(/windows nt 5.2|windows 2003/gi)) {
    system_v = "2003";
  } else if (test_UA(/windows nt 6.0|windows vista/gi)) {
    system_v = "vista";
  } else if (test_UA(/windows nt 6.1|windows 7/gi)) {
    system_v = "7";
  } else if (test_UA(/windows nt 6.2|windows 8/gi)) {
    system_v = "8";
  } else if (test_UA(/windows nt 6.3|windows 8.1/gi)) {
    system_v = "8.1";
  } else if (test_UA(/windows nt 10.0|windows 10/gi)) {
    system_v = "10";
  }
} else if (system === "osx") {
  system_v = getVersion(/os x [\d._]+/gi);
} else if (system === "android") {
  system_v = getVersion(/android [\d._]+/gi);
} else if (system === "ios") {
  system_v = getVersion(/os [\d._]+/gi);
}

let platform = "unknow";
if (system === "windows" || system === "osx" || system === "linux") {
  platform = "desktop"; // 桌面端
} else if (system === "android" || system === "ios" || test_UA(/mobile/gi)) {
  platform = "mobile"; // 移动端
}

let engine = "unknow";
let supporter = "unknow";
if (test_UA(/applewebkit/gi) && test_UA(/safari/gi)) {
  engine = "webkit"; // webkit内核
  if (test_UA(/edge/gi)) {
    supporter = "edge"; // edge浏览器
  } else if (test_UA(/opr/gi)) {
    supporter = "opera"; // opera浏览器
  } else if (test_UA(/chrome/gi)) {
    supporter = "chrome"; // chrome浏览器
  } else {
    supporter = "safari"; // safari浏览器
  }
} else if (test_UA(/gecko/gi) && test_UA(/firefox/gi)) {
  engine = "gecko"; // gecko内核
  supporter = "firefox"; // firefox浏览器
} else if (test_UA(/presto/gi)) {
  engine = "presto"; // presto内核
  supporter = "opera"; // opera浏览器
} else if (test_UA(/trident|compatible|msie/gi)) {
  engine = "trident"; // trident内核
  supporter = "iexplore"; // iexplore浏览器
}
// 内核版本
let engine_v = "unknow";
if (engine === "webkit") {
  engine_v = getVersion(/applewebkit\/[\d.]+/gi);
} else if (engine === "gecko") {
  engine_v = getVersion(/gecko\/[\d.]+/gi);
} else if (engine === "presto") {
  engine_v = getVersion(/presto\/[\d.]+/gi);
} else if (engine === "trident") {
  engine_v = getVersion(/trident\/[\d.]+/gi);
}

// 载体版本
let supporter_v = "unknow";
if (supporter === "chrome") {
  supporter_v = getVersion(/chrome\/[\d.]+/gi);
} else if (supporter === "safari") {
  supporter_v = getVersion(/version\/[\d.]+/gi);
} else if (supporter === "firefox") {
  supporter_v = getVersion(/firefox\/[\d.]+/gi);
} else if (supporter === "opera") {
  supporter_v = getVersion(/opr\/[\d.]+/gi);
} else if (supporter === "iexplore") {
  supporter_v = getVersion(/(msie [\d.]+)|(rv:[\d.]+)/gi);
} else if (supporter === "edge") {
  supporter_v = getVersion(/edge\/[\d.]+/gi);
}

let shell = "none";
let shell_v = "unknow";
if (test_UA(/micromessenger/gi)) {
  shell = "wechat"; // 微信浏览器
  shell_v = getVersion(/micromessenger\/[\d.]+/gi);
} else if (test_UA(/qqbrowser/gi)) {
  shell = "qq"; // QQ浏览器
  shell_v = getVersion(/qqbrowser\/[\d.]+/gi);
} else if (test_UA(/ubrowser/gi)) {
  shell = "uc"; // UC浏览器
  shell_v = getVersion(/ubrowser\/[\d.]+/gi);
} else if (test_UA(/2345explorer/gi)) {
  shell = "2345"; // 2345浏览器
  shell_v = getVersion(/2345explorer\/[\d.]+/gi);
} else if (test_UA(/metasr/gi)) {
  shell = "sougou"; // 搜狗浏览器
} else if (test_UA(/lbbrowser/gi)) {
  shell = "liebao"; // 猎豹浏览器
} else if (test_UA(/maxthon/gi)) {
  shell = "maxthon"; // 遨游浏览器
  shell_v = getVersion(/maxthon\/[\d.]+/gi);
} else if (test_UA(/bidubrowser/gi)) {
  shell = "baidu"; // 百度浏览器
  shell_v = getVersion(/bidubrowser [\d.]+/gi);
}

/**
* 解析浏览器系统信息
* 
  system: "系统",
  system_v: "系统版本",
  platform: "平台",
  engine: "内核",
  engine_v: "内核版本",
  supporter: "载体",
  supporter_v: "载体版本",
  shell: "外壳",
  shell_v: "外壳版本"
*/
export default {
  system,
  system_v,
  platform,
  engine,
  engine_v,
  supporter,
  supporter_v,
  shell,
  shell_v
};
