# parseTemplate

```
    function parseTemplate(template,tag){
        if (!template) return [];
         var lineHasNonSpace = false;
        var sections = [];    
        var tokens = [];     
        var spaces = [];      
        var hasTag = false;   
        var nonSpace = false; 
        var indentation = '';  
        var tagIndex = 0;
        // 移除空格
        function stripSpace () {
            if (hasTag && !nonSpace) {
                while (spaces.length)
                delete tokens[spaces.pop()];
            } else {
                spaces = [];
            }

            hasTag = false;
            nonSpace = false;
        }

        var openingTagRe, closingTagRe, closingCurlyRe;
        function compileTags (tagsToCompile) {
            if (typeof tagsToCompile === 'string')
                tagsToCompile = tagsToCompile.split(spaceRe, 2);

            if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
                throw new Error('Invalid tags: ' + tagsToCompile);

            openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
            closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
            closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
        }

        compileTags(tags || mustache.tags);
    }   

```