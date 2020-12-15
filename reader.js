fs = require('fs');
module.exports = function (path) {
    return new Promise((resolve,reject) => {
        fs.readFile(path, 'utf8', function (err,data) {
            if (err) {
              return reject(err);
            } else {
                fs.unlink(path, (err) => {
                    console.log(err);
                })
            }
            resolve(data);
          });
    })
} 