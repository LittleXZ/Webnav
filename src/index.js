// 网址正则匹配
function isURL(url) {
    const strRegex = '^((https|http|ftp)://)?'//(https或http或ftp):// 可有可无
        + '(([\\w_!~*\'()\\.&=+$%-]+: )?[\\w_!~*\'()\\.&=+$%-]+@)?' //ftp的user@ 可有可无
        + '(([0-9]{1,3}\\.){3}[0-9]{1,3}' // IP形式的URL- 3位数字.3位数字.3位数字.3位数字
        + '|' // 允许IP和DOMAIN（域名）
        + '(localhost)|'    //匹配localhost
        + '([\\w_!~*\'()-]+\\.)*' // 域名- 至少一个[英文或数字_!~*\'()-]加上.
        + '\\w+\\.' // 一级域名 -英文或数字 加上.
        + '[a-zA-Z]{1,6})' // 顶级域名- 1-6位英文
        + '(:[0-9]{1,5})?' // 端口- :80 ,1-5位数字
        + '((/?)|' // url无参数结尾 - 斜杆或这没有
        + '(/[\\w_!~*\'()\\.;?:@&=+$,%#-]+)+/?)$';//请求参数结尾- 英文或数字和[]内的各种字符
    const re = new RegExp(strRegex, 'i'); // 大小写不敏感
    if (re.test(encodeURI(url))) {
        return true;
    }
    return false;
}
// 调试器
$(`html`).eq(0).on(`click`, (e) => {
    console.log(e.target)
})
console.log($(`html`).eq(0))
// localstorage
const local = localStorage.getItem(`cache`)
const localObj = JSON.parse(local)
let $tagAdd = $(`.tagAdd`)
let i = 0
let hashMap = localObj
if (hashMap === undefined || hashMap === null) {
    hashMap = [{
        logo: `https://github.com`,
        url: `github.com`
    }]
}
// 通过localstorage 重绘收藏夹
function repaint() {
    $(`
        <li class="tag tagStyle">
            <div class="starLogo"><img src="https://favicon.cccyun.cc/${hashMap[i].logo}" alt=""></div>
            <div class="webUrl">${hashMap[i].url}</div>
            <div class="close"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-close"></use></svg></div>
        </li>`
    ).insertBefore($tagAdd)
    i++
}
//哈希
hashMap.forEach(() => {
    repaint()
})
// 修改弹窗
function newAlert(e) {
    $(`
        <div id="msg">
            <div id="msg_top">${e}<div id="msg_tips"></div></div>
            <div id="msg_cont"><input id="alertValue" type="text"></div>
            <div id="msg_confirm">确定</div>
            <div id="msg_cancel">取消</div>
        </div>`).insertBefore($`body`)
}
// 添加书签
$('.tagAdd').on('click', () => {
    newAlert(`请输入你要收藏的网址`)
    $(`#msg_cancel`).click(() => {
        $(`#msg`).remove();
    })
    $(`#msg_confirm`).on(`click`, () => {
        let url = document.getElementById(`alertValue`).value
        if (url.length > 0) {
            console.log(`>0`)
            let completeUrl
            if (url.indexOf(`http` || `https`) === -1) {
                completeUrl = `https://` + url
            } else if (url.indexOf(`https`) === -1) {
                completeUrl = url.replace(`http://`, `https://`)
            } else {
                completeUrl = url
            }
            let shortUrl = url
                .replace(`https://`, ``)
                .replace(`http://`, ``)
                .replace(`www.`, ``)
            if (isURL(url)) {
                hashMap.push({
                    logo: completeUrl,
                    url: shortUrl
                })
                repaint()
                $(`#msg`).remove()
            }else {
                $(`#msg_top`)[0].children[0].innerText = `请输入正确的网址哦`
            }
        }else {
            $(`#msg_top`)[0].children[0].innerText = `请输入一些东西哦`
        }}
    )
    })
// 手机端长按
    let timer = null
    let startTime = ``
    let endTime = ``
    let tag = Array.from(document.querySelectorAll(`.tag`))
    tag.forEach((e) => {
        e.addEventListener(`touchstart`, () => {
            startTime = +new Date()
            timer = setTimeout(() => {
                $(`.tagStyle .close`).css(`display`, `block`)
            }, 500)
        })
        e.addEventListener(`touchend`, (ele) => {
                endTime = +new Date()
                clearTimeout(timer)
                if (endTime - startTime < 700) {
                    if ($(`.tagStyle .close`).css(`display`) === `none`) {
                        window.location = `https://` + (ele.currentTarget.children[1].innerText)
                    }
                }
            }
        )
    })
    $(`html`).on(`touchstart`, (e) => {
        if (e.target.className.toLowerCase() !== `tagstyle`) {
            $(`.close`).css(`display`, `none`)
        }
    })
// 遍历看自己是第几个儿子来删除对应的缓存
    let $tag = $(`.tag`)
    $tag.on(`click`, (e) => {
        if (e.target.tagName.toLowerCase() === `svg` || e.target.tagName.toLowerCase() === `use` || e.target.className.toLowerCase() === `close`) {  //定位在X上
            e.currentTarget.setAttribute(`style`, `display:none`)
            let i = 0;
            while ((e.currentTarget = e.currentTarget.previousSibling) != null) i++;
            hashMap.splice(i - 1, 1)
        }
    })
// 第一栏点击事件
    $(`.tagStyle`).on(`click`, (e) => {
        window.location = e.currentTarget.childNodes[1].childNodes[0].src.replace(`https://favicon.cccyun.cc/`, ``)
    })
// localStorage
    window.onbeforeunload = () => {
        const local = JSON.stringify(hashMap)
        localStorage.setItem(`cache`, local)
    }
// 回车事件 搜索框搜索 提交栏提交
    $(document).on(`keypress`, (e) => {
        let searchValue = document.getElementById("searchInput").value
        if (e.keyCode === 13) {
            if ($.contains(document, document.getElementById(`msg`)) !== true) {
                if (searchValue.length > 0) {
                    window.location = `https://www.baidu.com/s?wd=` + searchValue
                }
            }else {
                console.log(`yep`)
                $(`#msg_confirm`).click()
            }
        }
    })

