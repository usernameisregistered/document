```
const loader = (filename /*, options*/) => {
    /* node  */
    if (typeof window === 'undefined') {
        const fs = require('fs');
        return fs.readFileSync(filename, 'utf8');
    } else { // 浏览器
        const elem = document.getElementById(filename);
        return elem.value || elem.innerHTML;
    }
};

```