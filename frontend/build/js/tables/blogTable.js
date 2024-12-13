"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createBlogTable=void 0;var _dbconnect=_interopRequireDefault(require("../db/dbconnect"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}const createBlogTable=()=>{_dbconnect.default.query("\n        CREATE TABLE IF NOT EXISTS blog(\n            id SERIAL PRIMARY KEY,\n            blog_title TEXT NOT NULL,\n            blog_content TEXT NOT NULL,\n            blog_theme TEXT NOT NULL,\n            blog_author VARCHAR(255) NOT NULL,\n            cloudinary_ids TEXT[],\n            images Text[],\n            created_at DATE,\n            updated_at DATE\n        )",((e,t)=>{e?console.log(e.message):console.log("Table uebermich is successfully created")}))};exports.createBlogTable=createBlogTable;