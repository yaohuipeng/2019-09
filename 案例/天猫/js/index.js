//轮播图
//选项卡---1
function Content() {
    let content = document.querySelector('#content'),
        lefts = content.querySelectorAll('.button .left ul .left_1'),
        boxs = content.querySelectorAll('.button .leftT .box_1'),
        olis = content.querySelectorAll('.button .leftT .box_1-1 ul li'),
        banBox = content.querySelectorAll('.button .ban .banBox')
    // olis = [...olis]
    // banBox = [...banBox]
    // console.log(olis)
    // console.log(banBox)
    function contentFn() {
        lefts[0].onmouseenter = function () {
            lefts[0].classList.add('sing1')
            lefts[1].classList.remove('sing2')
            boxs[1].style.display = 'none'
            boxs[0].style.display = 'block'
        }
        lefts[1].onmouseenter = function () {
            lefts[0].classList.remove('sing1')
            lefts[1].classList.add('sing2')
            boxs[0].style.display = 'none'
            boxs[1].style.display = 'block'
        }
    }
    contentFn()
}
Content()