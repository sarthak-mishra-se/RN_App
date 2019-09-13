import React, { Component } from 'react'
import { StyleSheet,ScrollView, View, Text, Image,TouchableHighlight, Platform,FlatList,SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ElevatedView from 'react-native-elevated-view'
import base from '../../utils/base'
import { Thumbnail,Fab,Icon,Button } from 'native-base';
import { LinearTextGradient } from "react-native-text-gradient";
import LTextField from '../../components/LTextField'
import { FloatingAction } from 'react-native-floating-action';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Api from '../../api/Api';
import ImagePicker from 'react-native-image-picker';
import FAB from 'react-native-fab'
import HTMLView from 'react-native-htmlview';
import {CachedImage} from "react-native-img-cache";


const actions = [{
    text: 'Save',    
    name: 'save',
    position: 1
  }]

  const grid = 2;

export default class BookDetail extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            first_name:"",
            last_name:"",
            email:"",
            username:"",
            fav_book:"",
            phone:"",
            profile_image:"",
            books:[],
            book:{},
            totalcount:0,
            currentcount:0,
            page:0,
            isLoading:false,
            isfab:true,
    
        }

        
        this.getBookDetails = this.getBookDetails.bind(this);
        this.onWishListPress = this.onWishListPress.bind(this);
    }

    componentDidMount(){
        this.getBookDetails()
    }

    async getBookDetails(){
        this.setState({isLoading:true})
        const detailResp = await Api.getBookDetails({book:this.props.book});        
        this.setState({isLoading:false,book:detailResp.data})
    
    }

    
    onTextChange(val, key){
        let obj = {};
        obj[key] = val;
        this.setState(obj);
    }

    
    async onSave(){

    }

    onWishListPress(item, index){
        let book = this.state.book;
        let self = this;
        if(book.wishlist_status != undefined){
            book.wishlist_status?self.removeWishList(self.props.id):self.addWishList(self.props.book)
            book['wishlist_status'] = !book.wishlist_status
            console.log(book)
            this.setState({book:book})
        }
    }

    async addWishList(bookId){
        let obj={
            book:bookId
        }
        console.log(obj)
        const wishResp = await Api.saveWishList(obj);
    }

    async addBookLibrary(bookId){
        let obj={
            book:bookId
        }
        const blResp = await Api.saveBookLibrary(obj);
    }

    async removeWishList(bookId){     
        console.log(bookId)        
        const wishResp = await Api.removeWishList(bookId);        
    }

    async removeBookLibrary(bookId){    
        
        const blResp = await Api.removeBookLibrary(bookId);
    }
    onBack(){
        base.actions.pop({refresh:{refresh:true}})
    }


    renderBooks(item, index) {
        let bookTitle = item.title;
        let author = item.author;
        let wishIcon = item.wishlist_status?require('../../../assets/images/wish_filled.png'):require('../../../assets/images/wish_outline.png')
        let bookIcon = item.give_book_status?require('../../../assets/images/givebook_filled.png'):require('../../../assets/images/givebook_outline.png')
        return (
            <ElevatedView 
                elevation={5} 
                style={styles.bookitem}>
                <TouchableHighlight 
                    underlayColor={'transparent'} 
                    onPress={()=> this.getBookDetails(item, index)} 
                    style={{flex:1,overflow:'hidden'}}>
                        
                    <Image 
                        style={{flex:1,overflow:'hidden'}} 
                        resizeMode={"cover"}
                        source={{uri:item.image != null? item.image:base.apputils.getbookplaceholder()}} />
                </TouchableHighlight>
                <View
                    style={{
                        marginTop:4,
                        alignItems:'center',
                        paddingTop:4,
                        justifyContent:'space-between'}}
                    >
                    <Text style={styles.bookname} numberOfLines={1}>{bookTitle}</Text>
                    <Text style={styles.authorname} numberOfLines={1}>{author}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'stretch',height:40}}>

                    <View style={{flex:1}}>
                        <View  bordered style={{flex:1,alignItems:'center',justifyContent:'center', alignSelf:'stretch'}} light>                            
                            <Image style={{width:20,height:20}} source={bookIcon} />
                        </View>
                    </View>
                    <View style={{flex:1}}>
                        <View bordered style={{flex:1,alignItems:'center',justifyContent:'center', alignSelf:'stretch'}} light>                            
                            <Image style={{width:20,height:20}} source={wishIcon} />
                        </View>
                    </View>
                    </View>

                 </View>

            </ElevatedView>
                          
        )
    }

    render(){
        console.log(this.state.book)
        var wishIcon = require('../../../assets/images/heart_white_line.png')
        var bookIcon = require('../../../assets/images/givebook_outline.png')
        if(this.state.book.wishlist_status != undefined){
            wishIcon = this.state.book.wishlist_status?require('../../../assets/images/heart_white_fill.png'):require('../../../assets/images/heart_white_line.png')
            bookIcon = this.state.book.give_book_status?require('../../../assets/images/givebook_filled.png'):require('../../../assets/images/givebook_outline.png')
        }
        let img = base.apputils.getQualityGBookImage(this.state.book.image);
         return(            
            
            <View style={styles.scrollview}>
                <ScrollView style={styles.scrollview}>
                    {
                        this.state.book.title != undefined?
                    <View>
                    <View style={{
                                    width:base.dimens.screenwidth,
                                    height:base.dimens.screenheight/2.5
                                }}>
                        <CachedImage
                            style={{
                                    width:base.dimens.screenwidth,
                                    height:base.dimens.screenheight/2.5
                                }}
                            source={{uri:img}}
                        />
                        <View style={{position:'absolute', flexDirection:'row',justifyContent:'center', paddingHorizontal:8,
                                bottom:0, width:base.dimens.screenwidth, height:70, backgroundColor:"#00000090"}}>
                            <View style={{width:'85%', justifyContent:'center'}}>
                                <Text
                                    style={{fontSize:16, color:base.colors.white, fontFamily:'HelveticaNeue-Medium', }}
                                    numberOfLines={1}                            
                                >{this.state.book.title}</Text>

                                <Text
                                    style={{fontSize:12, color:base.colors.white, fontFamily:'HelveticaNeue-Light', }}
                                    numberOfLines={1}                            
                                >{this.state.book.author}</Text>
                            </View>
                            <View style={{width:'15%',flexDirection:'row',justifyContent:'center'}}>
                           
                            <View style={{flex:1,alignSelf:'center',justifyContent:'center'}} transparent>                                                       
                                <Image style={{width:18,height:18}} source={wishIcon} />
                            </View>
                            </View>
                        </View>                        
                        
                     </View>
                     
                     <View style={{paddingHorizontal:8,paddingVertical:8, marginTop:24}}>
                            <HTMLView
                                value={this.state.book.description}
                                
                            />
                        </View>
                     </View>:<View />
                    }
                </ScrollView>
                        {
                            
                            base.widgets.progressloader(this.state.isLoading)
                        }
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={()=> this.onBack()}
                            style={{
                                height:40,
                                backgroundColor:base.colors.white, 
                                width:40, borderRadius:20, position:'absolute',
                                top:base.dimens.statusbar+12, left:16, alignItems:'center',justifyContent:'center'}}
                            >
                            <ElevatedView 
                                elevation={6}
                                style={{
                                    height:40,
                                    backgroundColor:base.colors.white, 
                                    width:40, borderRadius:20,
                                    alignItems:'center',justifyContent:'center'}}>
                                        <Image style={{width:16,height:16}} source={require('../../../assets/images/back.png')} />
                            </ElevatedView>
                        </TouchableHighlight>
          </View>
            
            
        )
    }
    
}

const styles = StyleSheet.create({
    scrollview:{                
        backgroundColor:base.colors.body,  
        flex:1    
    },
    body:{
        flex:1,
        backgroundColor:base.colors.body,
        padding:base.dimens.margin32
    },
    bookname:{
        fontSize:18,color:base.colors.basegradient[0],
        fontWeight:'500',margin:4
    },
    authorname:{
        fontSize:12,color:base.colors.black,
        fontWeight:'300',marginBottom:8
    },
    profileimage:{
        marginTop:base.dimens.margin32,
        width:base.dimens.imagelarge,
        height:base.dimens.imagelarge,
        borderRadius:base.dimens.imagelarge/2,
    },
    spacing:{
        marginTop:base.dimens.margin16
    },
    bookitem:{flex:1/grid,
        height:260,margin:8,backgroundColor:base.colors.white,
    borderRadius:8},
    fab:{position:'absolute',backgroundColor:base.colors.basegradient[1],
    borderRadius:30,width:60,height:60, alignItems:'center',justifyContent:'center',alignContent:'center',
    right:0,marginTop:base.dimens.margin32+((base.dimens.imagelarge/2)-30)},
    fabicon:{alignSelf:'center',alignItems:'center',alignContent:'center', color:base.colors.white,fontSize: 45}
})