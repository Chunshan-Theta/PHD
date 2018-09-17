console.log("controller of Argument");

module.exports = function (){
    /*
    // controller of argument
    // 
    // using :
        ar controller = require('./Controller/argument.js');
        c = new controller();
        c.controller(connection,function(QuestionDoc,ActionDoc){});

    // coding: gavin
    */


    this.controller = function (CallbackFunc){
        var sql = require('../Model/MysqlSet.js');
        connection = new sql('argument');
        var re_QuestionDocList,re_ActionDocList;

        connection.query("SELECT * FROM `QuestionDoc`",function(returnValue) {      
            re_QuestionDocList = returnValue;
            console.log(re_QuestionDocList.lenght);
        });

        
        connection.query("SELECT * FROM `ActionDoc`",function(returnValue) {
            re_ActionDocList = returnValue;
            connection.close();
            CallbackFunc(re_QuestionDocList,re_ActionDocList);
        });

    
    } 


}


