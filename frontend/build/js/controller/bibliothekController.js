"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.updateBiblothek=exports.getBiblothek=exports.getAllBiblothek=exports.deleteBiblothek=exports.createBiblothek=void 0;var _dbconnect=_interopRequireDefault(require("../db/dbconnect"));function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}const createBiblothek=async(t,e)=>{const{bibliothek_title:o,bibliothek_ressort:i,bibliothek_url:s}=t.body;try{const t=await _dbconnect.default.query("INSERT INTO bibliothek (bibliothek_title, bibliothek_ressort, bibliothek_url, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",[o,i,s,new Date((new Date).toISOString()),new Date((new Date).toISOString())]);e.status(200).json(t.rows[0])}catch(t){e.status(403).json("Upload nicht möglich")}};exports.createBiblothek=createBiblothek;const updateBiblothek=async(t,e)=>{const{bibliothek_title:o,bibliothek_ressort:i,bibliothek_url:s}=t.body,l=t.params.id;try{const t=await _dbconnect.default.query("UPDATE bibliothek SET bibliothek_title = $1, bibliothek_ressort = $2, bibliothek_url = $3, updated_at = $4 WHERE id = $5",[o,i,s,new Date((new Date).toISOString()),l]);e.status(200).json(t.rows[0])}catch(t){console.log(t),e.status(404).json("Nicht gefunden")}};exports.updateBiblothek=updateBiblothek;const deleteBiblothek=async(t,e)=>{const o=t.params.id;try{await _dbconnect.default.query("DELETE FROM bibliothek WHERE id = $1",[o]),e.status(200).json(`Bibliothek mit der id ${o} wurde gelöscht`)}catch(t){e.status(404).json("Nicht gefunden")}};exports.deleteBiblothek=deleteBiblothek;const getBiblothek=async(t,e)=>{const o=t.params.id;try{const t=await _dbconnect.default.query("SELECT * FROM bibliothek WHERE id = $1",[o]);e.status(200).json(t.rows[0])}catch(t){e.status(404).json("Nicht gefunden")}};exports.getBiblothek=getBiblothek;const getAllBiblothek=async(t,e)=>{try{const t=await _dbconnect.default.query("SELECT * FROM bibliothek");e.status(200).json(t.rows)}catch(t){e.status(404).json("Nicht gefunden")}};exports.getAllBiblothek=getAllBiblothek;