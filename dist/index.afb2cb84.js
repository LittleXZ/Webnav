// 网址正则匹配
function isURL(url) {
    const strRegex = "^((https|http|ftp)://)?(([\\w_!~*'()\\.&=+$%-]+: )?[\\w_!~*'()\\.&=+$%-]+@)?(([0-9]{1,3}\\.){3}[0-9]{1,3}|(localhost)|([\\w_!~*'()-]+\\.)*\\w+\\.[a-zA-Z]{1,6})(:[0-9]{1,5})?((/?)|(/[\\w_!~*'()\\.;?:@&=+$,%#-]+)+/?)$"; //请求参数结尾- 英文或数字和[]内的各种字符
    const re = new RegExp(strRegex, 'i'); // 大小写不敏感
    if (re.test(encodeURI(url))) return true;
    return false;
}
const local = localStorage.getItem(`cache`);
const localObj = JSON.parse(local);
let $tagAdd = $(`.tagAdd`);
let i = 0;
let hashMap = localObj;
if (hashMap === undefined || hashMap === null) hashMap = [
    {
        logo: `https://github.com`,
        url: `github.com`
    }
];
function repaint() {
    $(`
            <li class="tag tagStyle">
                <div class="starLogo"><img src="https://favicon.cccyun.cc/${hashMap[i].logo}" alt=""></div>
                <div class="webUrl">${hashMap[i].url}</div>
                <div class="close"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-close"></use></svg></div>
            </li>`).insertBefore($tagAdd);
    i++;
}
hashMap.forEach(()=>{
    repaint();
});
$('.tagAdd').on('click', ()=>{
    let url = window.prompt(`请输入你要添加的网址`);
    let completeUrl;
    if (url.indexOf(`http` || `https`) === -1) completeUrl = `https://` + url;
    else if (url.indexOf(`https`) === -1) completeUrl = url.replace(`http://`, `https://`);
    else completeUrl = url;
    let shortUrl = url.replace(`https://`, ``).replace(`http://`, ``).replace(`www.`, ``);
    if (isURL(url)) {
        hashMap.push({
            logo: completeUrl,
            url: shortUrl
        });
        repaint();
    } else alert('请输入正确的网址');
});
// 手机端长按
let timer = null;
let startTime = ``;
let endTime = ``;
let tag = Array.from(document.querySelectorAll(`.tag`));
tag.forEach((e)=>{
    e.addEventListener(`touchstart`, ()=>{
        startTime = +new Date();
        timer = setTimeout(()=>{
            $(`.tagStyle .close`).css(`display`, `block`);
        }, 500);
    });
    e.addEventListener(`touchend`, (ele)=>{
        endTime = +new Date();
        clearTimeout(timer);
        if (endTime - startTime < 700) {
            if ($(`.tagStyle .close`).css(`display`) === `none`) {
                window.location = `https://` + ele.currentTarget.children[1].innerText;
                console.log(`打开网站`);
            }
        }
    });
});
let $tag = $(`.tag`);
$tag.on(`click`, (e)=>{
    if (e.target.tagName.toLowerCase() === `svg` || e.target.tagName.toLowerCase() === `use` || e.target.className.toLowerCase() === `close`) {
        e.currentTarget.setAttribute(`style`, `display:none`);
        let i1 = 0; // 遍历看自己是第几个儿子来删除对应的缓存
        while((e.currentTarget = e.currentTarget.previousSibling) != null)i1++;
        hashMap.splice(i1 - 1, 1);
        e.stopPropagation();
    }
    e.isPropagationStopped();
});
$(`.webStyle`).on(`click`, (e)=>{
    console.log(e.currentTarget);
    let webUrl = e.currentTarget.children[0].children[0].src.replace(`https://favicon.cccyun.cc/`, ``);
    window.location = webUrl;
    if (e.target.className.toLowerCase() === `webStyle`) console.log(`open`);
});
// localStorage
window.onbeforeunload = ()=>{
    const local1 = JSON.stringify(hashMap);
    localStorage.setItem(`cache`, local1);
};
$(`html`).on(`click`, (e)=>{
    if (e.target.className.toLowerCase() !== `tagstyle`) $(`.close`).css(`display`, `none`);
});

//# sourceMappingURL=index.afb2cb84.js.map
