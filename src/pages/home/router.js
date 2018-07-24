import React, { Component } from 'react';
// import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import AllFiles from '../home/AllFiles';
import Recently from '../home/Recently';
import Trash from '../home/Trash'
import Search from '../home/Search'
import PersonalDetails from '../home/PersonalDetails'
import Broad from '../home/broad.js'
import Share from '../home/share.js'

import Audio from '../home/audio.js'
import Music from '../home/music.js'
import Word from '../home/word.js'
import Image from './image.js'

export default class Routers extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/home" render={() => <Redirect to="/home/allfiles" push />} />
                <Route exact path="/home/allfiles" component={AllFiles} />
                <Route exact path="/home/recently" component={Recently} />
                <Route exact path="/home/trash" component={Trash} />
                <Route exact path="/home/search" component={Search} />
                <Route exact path="/home/broad" component={Broad} />
                <Route exact path="/home/share" component={Share} />

                <Route exact path="/home/music" component={Music} />
                <Route exact path="/home/audio" component={Audio} />
                <Route exact path="/home/word" component={Word} />
                <Route exact path="/home/image" component={Image} />
                <Route path="/home/personalDetails" component={PersonalDetails} />
            </Switch>

        )
    }

}