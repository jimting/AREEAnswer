var res = await fetch('https://raw.githubusercontent.com/jimting/AREEAnswer/master/answer.json');
var json = await res.json();
var QA = document.querySelector('table');
for (var row of QA.rows) {
    var Q = row.querySelector('p').textContent;
    var A = json.filter((a) => a.name == Q);
    var opts = row.querySelector('table').rows;
    if (!A.length) {
        row.newQ = { name: Q, options: [...opts].map(opt => opt.cells[1].textContent) }
        row.querySelector('p').style.background = 'yellow'
        continue;
    } else A = A[0];
    var Dels = A.options.filter((a) => a[0].toLowerCase() == 'x').map((a) => a.replace(/\(|\d|\)|\./g,'').slice(1));
    var Ans = A.options.filter((a) => a[0].toLowerCase() == 'v').map((a) => a.replace(/\(|\d|\)|\./g,'').slice(1));
    for (var opt of opts) {
        var radio = opt.cells[0].querySelector('input');
        var option = opt.cells[1].textContent.slice(3);
        if (Ans.includes(option)) opt.cells[1].style.background = 'lime';
        if (Dels.includes(option)) opt.cells[1].style.background = 'pink';
    }
}
var todo = [...QA.rows].map(row => row.newQ).filter(x => x)
var download = () => {
    let a = document.createElement('a')
    document.body.appendChild(a)
    a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(todo))
    a.download = '未登錄題目.json'
    a.click()
}
