/*
 * @Author: Anooj Krishnan G 
 * @Date: 2019-05-05 15:33:52 
 * @Last Modified by: Anooj Krishnan G
 * @Last Modified time: 2019-05-28 00:51:49
 */
import strings from './strings';
import colors from './colors';
import images from './images';
import dimens from './dimens';
import apputils from './apputils';
import logger from './logger';
import widgets from './widgets'
import {Actions as actions, ActionConst as actionconst} from 'react-native-router-flux';

const base = {
    strings,
    colors,
    images,
    dimens,
    apputils,
    logger,
    widgets,
    actions,  
    actionconst  
}

export default base;