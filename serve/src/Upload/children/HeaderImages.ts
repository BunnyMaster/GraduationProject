import ErrnoException = NodeJS.ErrnoException;
var Router = require("express").Router();
var fs = require("fs");
var formidable = require("formidable");
var bodyParser = require("body-parser");
var rootPath = require("app-root-path");
var multer = require("multer");
const path = require("path");
var dayjs = require("dayjs");
var uuid = require("uuid");
var Mock = require("mockjs");
var Random = Mock.Random;

Router.post("/UploadImages", multer({ dest: "upload" }).single("file"), (request: any, response: any) => {
  fs.readFile("upload", (err: any, res: Buffer) => {
    if (err) throw err;
    else {
      fs.readdir("upload", (error: ErrnoException | null, result: string[]) => {
        if (error) throw error;
        result.forEach((item: any, index: number) => {
          if (request.file) {
            fs.readFile(`upload/${item}`, (err: ErrnoException | null, buffer: Buffer) => {
              if (err) throw err;
              else {
                fs.writeFile(`src/images/${index}.jpg`, buffer, (error: ErrnoException | null) => {
                  if (error) throw error;
                });
              }
            });
          }
        });
      });
    }
  });

  response.send(request.file);
});

module.exports = Router;
