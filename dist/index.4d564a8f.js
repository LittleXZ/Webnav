// 网址正则匹配
function isURL(url) {
    const strRegex = "^((https|http|ftp)://)?(([\\w_!~*'()\\.&=+$%-]+: )?[\\w_!~*'()\\.&=+$%-]+@)?(([0-9]{1,3}\\.){3}[0-9]{1,3}|(localhost)|([\\w_!~*'()-]+\\.)*\\w+\\.[a-zA-Z]{1,6})(:[0-9]{1,5})?((/?)|(/[\\w_!~*'()\\.;?:@&=+$,%#-]+)+/?)$"; //请求参数结尾- 英文或数字和[]内的各种字符
    const re = new RegExp(strRegex, 'i'); // 大小写不敏感
    if (re.test(encodeURI(url))) return true;
    return false;
}
// localStorage
let hashMap = [];
$('.tagAdd').on('click', ()=>{
    let url = window.prompt(`请输入你要添加的网址`);
    let longurl;
    let shorturl;
    if (url.indexOf(`http` || `https` || `ftp`) !== 0) {
        longurl = `https://` + url;
        shorturl = url;
    } else {
        shorturl = url.replace(`https://`, ``).replace(`http://`, ``).replace(`www.`, ``);
        console.log(shorturl + `333`);
    }
    if (isURL(url)) {
        let $tagAdd = $(`.tagAdd`);
        let $tagList = $(`.tagList`);
        $tagList.find(`.tag:not(.last)`).remove();
        hashMap.push({
            logo: longurl,
            url: shorturl
        });
        hashMap.forEach((node)=>{
            let $tag = $(`
                <li class="tag tagStyle">
                    <div class="webLogo">
                    <img src="chrome://favicon/${node.logo}" alt="">
                    </div>
                    <div class="webUrl">
                        ${node.url}
                    </div>
                    <div class="close">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </li>`).insertBefore($tagAdd);
        });
    } else alert('请输入正确的网址');
});

//# sourceMappingURL=index.4d564a8f.js.map
