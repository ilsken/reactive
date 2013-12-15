console.log(interpolate('Hello: { ({ foo: "bar" }).foo }!', transform));

function transform(chunk) {
    return eval(chunk);
}
 
function interpolate(source, callback) {
    var start = '{';
    var close = '}';
  
    var regexp = new RegExp(start + '|' + close, "gm")
    
    var token;

    var open = 0;
    var index = 0;

    var chunks = [];
  
    while((result = regexp.exec(source))) {
        var chunk, char = result[0];

        if (start === char) {
            if (!open) {
                chunk = source.substr(index, result.index - index);
                chunks.push(chunk);
                
                index = result.index + 1;

            }
            open++;
        }
        if (close === char && open > 0) {
            open--;
            
            if (!open) {
                chunk = source.substr(index, result.index - index);
                chunks.push(callback(chunk));

                index = result.index + 1;
            }
        }
    }
 
    chunks.push(source.substr(index));

    return chunks.join('');
}
