/*
 * @Author: Anooj Krishnan G 
 * @Date: 2019-05-05 15:33:42 
 * @Last Modified by: Anooj Krishnan G
 * @Last Modified time: 2019-05-28 00:46:21
 */
import React from 'react';
import {AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';

const bookplaceholders = [
    "http://books.google.com/books/content?id=yQ59JV_9AfIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "http://books.google.com/books/content?id=DJVzAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "http://books.google.com/books/content?id=urtYswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "http://books.google.com/books/content?id=x7PjWyVUoVAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "http://books.google.com/books/content?id=RHwLqVrnXgIC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72AH2QRsPwV5P9DcCa8ZNzs15VywuguvYFzvIY18Ty2HVMWUQpWnxpHQao4ahDt-wwwTKS59vaGg1KlpaGr9EIF9_pTWiCVo1H0RdG69LXSuS2Ioi6Vo3q9XVurPh4Aw_hr8Dc5&source=gbs_api",
    "http://books.google.com/books/content?id=x3IcNujwHxcC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73xEhefASIE1hawASHgg8viemzaY4ral1FDX948btr_IIQ8Z8S8lCSr5LFU0YtpVjXaUFy2QZV1-t0XOD88Bj_ONSzibxmpHTizqlcdDH48hoOjz63fBcUikjOQssn0K1ss_p9I&source=gbs_api"
];

export default class apputils {

    static async getasyncstorage(key){
        try {
            var value = await AsyncStorage.getItem(key);            
            return value;
        } catch (e) {
            return null;
        }
    }

    static async saveasyncstorage(key, value, cb){
        try {
            AsyncStorage.setItem(key,JSON.stringify(value),()=>{
                if(cb != undefined){
                    cb()
                }
            });                        
        } catch (e) {
            
        }
    }

    static async removeasyncstorage(key){
        try {
            AsyncStorage.removeItem(key);                        
        } catch (e) {
            
        }
    }

    static getTimeDifference(){
        
    }

    static isvalidemail(val){
        let regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        if(val != undefined && val != null && val != "" && regex.test(val)){            
            return true;
        }else{
            return false;
        }
    }

    static isvalidmobile(val){
        let regex = /^\d{10}$/;
        if(val != undefined && val != null && val != "" && regex.test(val)){
            return true;
        }else{
            return false;
        }
    }

    static isvalid(val,min){
        if(val != undefined && val != null && val != ""){
            if(min != undefined){                
                if(val.length >= min){
                    return true
                }else{
                    return false;
                }
            }
            return true;
        }else{
            return false;
        }
    }

    static clearcache(){
        try {
            AsyncStorage.clear();   
            AsyncStorage.removeItem('profile');                                 
        } catch (e) {            
        }
    }

    static logout(){
        try {
            AsyncStorage.clear(); 
            Actions.Login();
        } catch (e) {            
        }
    }

    static getbookplaceholder(){
        return "https://via.placeholder.com/300.png";//bookplaceholders[Math.floor(Math.random() * bookplaceholders.length)];

    }

    static getQualityGBookImage(image){
        let img = ""+image;
        if(image != null && image != undefined && image != ""){
            if(img.indexOf("zoom=1") != -1){
                img = img.replace("zoom=1","zoom=0");
                return img;
            }
        }
        return image;
    }

    static handleNotification(obj){
        let type = obj.type;
        switch(type){
            case 'Book Request':
                AsyncStorage.setItem("overriding",'true');
                Actions.BookRequested()
                break;
            case 'New Book Request':
                AsyncStorage.setItem("overriding",'true');
                Actions.BooksIncoming()
                break;
        }
    }

    // static setnavoverride(){
    //     AsyncStorage.setItem("overriding",true);
    // }
}