    const express = require('express');
    const  db  = require('../db/db.config');
    const { QueryTypes } = require('sequelize');
    const { types } = require('pg');

    const   router =express.Router();

    router.post('/edit/content',async(req,res)=>{

        try {
            const { content } = req.body;
            if (!content) {
                return res.send({ statusCode: 400, message: "content is required"});
        }

    const query = `SELECT content FROM html_data where id = 1`;
    const result = await db.query(query,{
        type:QueryTypes.SELECT
    })
console.log('insert result',result.length == 0);
    if(result.length == 0){

        const query = `INSERT INTO html_data(content,id) VALUES (:content,:id)`;
            const result = await db.query(query, {
                replacements: { content,id:1 },
                type: QueryTypes.INSERT
            });
console.log('ins res',result);

            if (result.length !== 0) {
                console.log(' inserted result --- >>', result);
                res.send({ statusCode: 200, message: "content inserted successfully" });
            } else {
                res.send({ statusCode: 400, message: "Error in inserting content" });
            }

    }
    else{
        const query = `UPDATE html_data SET content = :content WHERE id = 1`;
        const result = await db.query(query, {
            replacements: { content },
            type: QueryTypes.UPDATE
        });

        console.log('updated result --- >>', result);

        if (result.length !== 0) {
            console.log('result --- >>', result);
            res.send({ statusCode: 200, message: "content updated successfully" });
        } else {
            res.send({ statusCode: 400, message: "Error in inserting content" });
        }


    }
        } catch (error) {
            console.log("error",error);
    res.send({statusCode:400,message:"error in inserting "});

    }
    });


    router.get('/content',async(req,res)=>{

                            const query = 'SELECT content FROM html_data';
                            const result = await db.query(query,{type:QueryTypes.SELECT});
                          
        if (result.length !== 0) {
            console.log('result --- >>', result);
            res.send({ statusCode: 200, message: "content recived successfully",data:result });
        } else {
            res.send({ statusCode: 400, message: "content not found" });
        }

    });

    module.exports = router;