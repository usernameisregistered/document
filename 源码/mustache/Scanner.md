## Scanner

```
function Scanner (string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
}
// 是否已经到结尾
Scanner.prototype.eos = function eos () {
    return this.tail === '';
}
// 根据指定正则匹配字符
Scanner.prototype.scan = function scan (re) {
    let match = this.tail.match(re);

    if (!match || match.index !== 0) return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
}
//根据指定正则匹配字符
Scanner.prototype.scanUntil = function scanUntil (re) {
    var index = this.tail.search(re), match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = '';
        break;
      case 0:
        match = '';
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
};

```