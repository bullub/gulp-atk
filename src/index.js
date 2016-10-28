/**
 * 作者: bullub
 * 日期: 16/10/28 15:37
 * 用途: 基于atk封装的gulp插件，
 */
"use strict";
const through2 = require("through2");
const atk = require("atk");

module.exports = function (options) {

    let atkDRInstance = new atk.DirectiveResolver(options);

    return through2.obj(function (file, encoding, next) {

        if(!file || file.isStream() || !file.contents) {
            next(null, file);
            return ;
        }

        file.contents = new Buffer(atkDRInstance.resolve(file, encoding));

        next(null, file);

    }, function(finish){
        let addedFiles = atkDRInstance.getFiles();

        addedFiles.forEach((file)=>{
            this.push(file);
        });

        finish();
    });
};




