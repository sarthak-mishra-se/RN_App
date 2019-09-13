import React from 'react';
import base from '../../utils/base';
import {View, Text,StyleSheet,KeyboardAvoidingView,Platform, Keyboard} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import LTextField from '../../components/LTextField';
import LButton from '../../components/LButton';
import Api from '../../api/Api'

export default class Login extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            isLoading:false
        }
        this.passwordField = null;
        this.onRegister = this.onRegister.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onForgetPress = this.onForgetPress.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        
    }

    componentDidMount(){

    }

    onRegister(){
        base.actions.Registration();
    }

    async onLogin(){
        let obj = {
            email:this.state.email,
            password:this.state.password
        }
        base.logger.log(obj)
        this.setState({isLoading:true})
        //base.actions.AllSet()
        const loginResponse = await Api.login((obj))
        this.setState({isLoading:false})
        
        if(loginResponse.status){
            if(loginResponse.data.message != undefined && loginResponse.data.message.indexOf("OTP") != -1){
                base.actions.Verification({token:loginResponse.data.token})
            }else if(loginResponse.data.message != undefined 
                && loginResponse.data.message.indexOf("Success") !=-1 
                && loginResponse.data.token != undefined){
                    await base.apputils.saveasyncstorage(base.strings.constants.isuserloggedin,true);
                    await base.apputils.saveasyncstorage(base.strings.constants.auth,JSON.stringify({token:loginResponse.data.token}));
                    if(loginResponse.data.complete){
                        await base.apputils.saveasyncstorage(base.strings.constants.completeprofile,true);
                        this.getProfile()
                    }else{                        
                        base.actions.AllSet()
                    }
                }else if(loginResponse.data.token != undefined){
                    base.actions.Verification({token:loginResponse.data.token})
                }
        }else{
            if(loginResponse.data.message != undefined && loginResponse.data.message.indexOf("OTP") != -1){
                base.actions.Verification({token:loginResponse.data.token})
            }
        }
        
    }

    async getProfile(){
        this.setState({isLoading:true});
        const profileResp = await Api.getProfile();
        this.setState({isLoading:false});    
        if(profileResp.status){
            let profile = profileResp.data;
            await base.apputils.saveasyncstorage("profile",JSON.stringify(profile), function(){
                base.actions.Trending();
            });
            
        }
    }

    onForgetPress(){
        base.actions.ValidateEmail();
    }

    onTextChange(val, key){
        let obj = {};
        obj[key] = val;
        this.setState(obj);
    }

    render(){
        return(
            <KeyboardAvoidingView                 
                behavior={Platform.OS === 'android' ? 'padding' : 'position'}                
                keyboardVerticalOffset={-200} style={{flex: 1, width: base.dimens.screenwidth}}>
                <LinearGradient
                    colors={base.colors.basegradient}
                    start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    style={styles.gradient} >
                        <Text style={[styles.title]}>Laaddu</Text>
                        <LTextField
                            style={styles.spacing}
                            placeholder={"Email"}
                            theme={"light"}
                            icon={"person"}
                            bordercolor={'white'}
                            value={this.state.email}
                            keyboardType={"email-address"}
                            returnKeyType={"next"}
                            onTextChange={(val)=>this.onTextChange(val,"email")}
                            onSubmitEditing={()=>{this.passwordField.refs.input._root.focus()}}
                        />
                        <LTextField
                            ref={input => {this.passwordField = input}}
                            style={styles.spacing}
                            placeholder={"Password"}
                            value={this.state.password}
                            theme={"light"}
                            icon={"lock"}
                            bordercolor={'white'}
                            secureTextEntry={true}
                            returnKeyType={"done"}
                            onTextChange={(val)=>this.onTextChange(val,"password")}
                        />
                        <View style={styles.buttoncontainer}>
                            <LButton
                                btnText={"Login"}
                                btnType={'normal'}
                                btnTextColor={base.colors.basegradient[0]}
                                btnBackground={base.colors.white}
                                style={styles.button}    
                                onBtnClick={this.onLogin}                                            
                            />
                            <LButton
                                testID="register"
                                btnText={"Register"}
                                btnType={'normal'}
                                btnTextColor={base.colors.basegradient[0]}
                                btnBackground={base.colors.white}
                                style={styles.button}
                                onBtnClick={this.onRegister}
                            />
                            
                        </View>
                        <Text onPress={this.onForgetPress} style={[styles.forgot]}>Forgot Password?</Text>
                        {
                            base.widgets.progressloader(this.state.isLoading)
                        }
                </LinearGradient>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    gradient:{
        height:base.dimens.screenheight,
        width:base.dimens.screenwidth,
        alignItems:'center',
        justifyContent:'center',
        padding:base.dimens.margin24
    },
    title:{
        color:base.colors.text,
        fontSize:base.dimens.maintitle,
        fontWeight:'800',
        margin:base.dimens.margin16
    },
    forgot:{
        color:base.colors.text,
        fontSize:base.dimens.subtitlefont,
        fontWeight:'400',
        margin:base.dimens.margin16
    },
    spacing:{
        marginVertical:base.dimens.margindefault
    },
    buttoncontainer:{
        flexDirection:'column',justifyContent:'center',
        marginVertical:base.dimens.margin16,     
    },
    button:{
        width: base.dimens.screenwidth-((base.dimens.margin24*2)+8), height: 42,
        borderRadius: 6, marginVertical:base.dimens.margindefault
    }
})