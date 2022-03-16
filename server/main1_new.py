import requests
import bs4
import os
import _thread
import sys

# 获取响应 res -> response
def getRes(url1):
    headers = {
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36 QIHU 360SE'
    }
    res = requests.get(url1, headers=headers)
    return res

def getArticleUrls():
    # 获取首页的html和文章页面的地址
    homePageHTML = getRes("https://www.148w.cc/c49.aspx").text
    htmlbeautifulsoup = bs4.BeautifulSoup(homePageHTML, "html.parser")
    aList = htmlbeautifulsoup.find_all("a", target="_blank")
    articleUrls_aspx = []
    # 生成文章链接列表
    for eachHref in aList:
        eachHrefHref = eachHref.get("href")
        if eachHrefHref not in articleUrls_aspx and eachHrefHref[-5:] == ".aspx":
            articleUrls_aspx.append(eachHrefHref)
    print(articleUrls_aspx)
    return articleUrls_aspx

def getPictureAndNextPageUrl(eachArticleUrl_aspx):
    articleHTML = getRes("https://www.148w.cc/" + eachArticleUrl_aspx).text
    articleHTMLSoup = bs4.BeautifulSoup(articleHTML, "html.parser")
    # 下一页按钮
    nextPageUrl = articleHTMLSoup.find("a", title="下一页")
    if nextPageUrl is None:
        return
    nextPageUrl = nextPageUrl.get("href")
    #获取标题
    articleTitle = articleHTMLSoup.find("h1").text
    print(articleTitle)
    # 获取图片url
    pictureUrlsTemp = articleHTMLSoup.find_all("img", vspace="10")
    pictureUrls = []
    for pictureUrl in pictureUrlsTemp:
        pictureUrls.append("https://www.148w.cc/" + pictureUrl.get("src"))
    print(pictureUrls)
    if not os.path.exists(articleTitle):
        os.mkdir(articleTitle)
    for each in pictureUrls:
        _thread.start_new_thread(downloadPicture, (each, each[each.rfind("/") + 1:each.find(".jpg")+4], articleTitle))
    getPictureAndNextPageUrl(nextPageUrl)

def downloadPicture(pictureUrl, fileName, path):
    res = getRes(pictureUrl)
    with open (path + "\\" + fileName, 'wb') as f:
        f.write(res.content)

downloadFile = sys.path[0] + "\\downloads"
if not os.path.exists(downloadFile):
    os.mkdir(downloadFile)

os.chdir(downloadFile)

if input("是否从首页开始爬取？(y/n)") == "y":
    articleUrls_aspx = getArticleUrls()
else:
    articleUrls_aspx = [input("请输入网址后面那段带aspx的")]

# 分别进入每一篇文章
for eachArticleUrl_aspx in articleUrls_aspx:
    getPictureAndNextPageUrl(eachArticleUrl_aspx)


