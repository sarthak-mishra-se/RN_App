/*
 * @Author: Anooj Krishnan G 
 * @Date: 2019-05-05 15:34:09 
 * @Last Modified by: Anooj Krishnan G
 * @Last Modified time: 2019-05-26 13:25:31
 */
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import {Dimensions, PixelRatio} from 'react-native';

const {height, width} = Dimensions.get('screen');
const scale = width / 320;

const dimens = {
    headerfont:PixelRatio.roundToNearestPixel(17*scale),
    subtitlefont:14,
    margindefault:8,
    margin16:16,
    margin24:24,
    margin32:32,
    buttonfont:12,
    statusbar:getStatusBarHeight(true),
    notchheight:getStatusBarHeight(true),
    headerheight:getStatusBarHeight(true)+(58),
    tabbarheight:getStatusBarHeight(true)+(44),
    screenheight:height,
    screenwidth:width,
    maintitle:36,
    imagelarge:PixelRatio.getPixelSizeForLayoutSize(42),
    cardheight:height/5,
    cardradius:8
}

export default dimens;