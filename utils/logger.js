/*
 * @Author: Anooj Krishnan G 
 * @Date: 2019-05-05 23:25:26 
 * @Last Modified by: Anooj Krishnan G
 * @Last Modified time: 2019-05-29 19:46:02
 */

const islogenabled = true;

export default class logger {

    static async log(info){
        islogenabled?console.log(info):null;
    }

    static async logargs(){
        islogenabled?console.log(arguments):null;
    }

    static async logtofile(info){

    }

    static async logtoserver(info){

    }
}