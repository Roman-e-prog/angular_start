"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.updateUebermich=exports.getUebermich=exports.getAllUebermich=exports.deleteUebermich=exports.createUebermich=void 0;var _dbconnect=_interopRequireDefault(require("../db/dbconnect"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}const createUebermich=async(e,t)=>{const{my_person:c}=e.body;try{const e=await _dbconnect.default.query("INSERT INTO uebermich (my_person, created_at, updated_at) VALUES ($1, $2, $3) RETURNING *",[c,new Date((new Date).toISOString()),new Date((new Date).toISOString())]);t.status(200).json(e.rows[0])}catch(e){t.status(403).json("Upload nicht möglich")}};exports.createUebermich=createUebermich;const updateUebermich=async(e,t)=>{const{my_person:c}=e.body,r=e.params.id;try{const e=await _dbconnect.default.query("UPDATE uebermich SET my_person = $1, updated_at = $2 WHERE id = $3",[c,new Date((new Date).toISOString()),r]);t.status(200).json(e.rows[0])}catch(e){console.log(e),t.status(404).json("Nicht gefunden")}};exports.updateUebermich=updateUebermich;const deleteUebermich=async(e,t)=>{const c=e.params.id;try{await _dbconnect.default.query("DELETE FROM uebermich WHERE id = $1",[c]),t.status(200).json(`Uebermich mit der id ${c} wurde gelöscht`)}catch(e){t.status(404).json("Nicht gefunden")}};exports.deleteUebermich=deleteUebermich;const getUebermich=async(e,t)=>{const c=e.params.id;try{const e=await _dbconnect.default.query("SELECT * FROM uebermich WHERE id = $1",[c]);t.status(200).json(e.rows[0])}catch(e){t.status(404).json("Nicht gefunden")}};exports.getUebermich=getUebermich;const getAllUebermich=async(e,t)=>{try{const e=await _dbconnect.default.query("SELECT * FROM uebermich");t.status(200).json(e.rows)}catch(e){t.status(404).json("Nicht gefunden")}};exports.getAllUebermich=getAllUebermich;