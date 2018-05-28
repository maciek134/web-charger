/*
 * Copyright © 2018, Maciej Sopyło <me@klh.io>
 *
 * This file is part of web-charger.
 *
 * web-charger is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * web-charger is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with web-charger.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import ChargerInfo from '../components/ChargerInfo';
import * as charger from '../redux/ducks/charger';
import { IStoreState } from '../redux/store';
import IChargerInfo from '../types/ChargerInfo';

import './Charger.css';

interface IProps {
  chargerInfo?: IChargerInfo;
  chargerPresent?: boolean;
}

interface IDispatch {
  findDevice?: () => void;
  onConnect?: () => void;
}

class Charger extends React.Component<IProps & IDispatch> {
  public componentDidMount(): void {
    if (this.props.findDevice) {
      this.props.findDevice();
    }
  }

  public render(): React.ReactNode {
    if (!this.props.chargerInfo) {
      return <Card className="charger-status">
        <CardContent>
          <Typography variant="headline">not connected</Typography>
          <Typography>{ this.props.chargerPresent ? 'charger available' : 'charger not available' }</Typography>
          <Button onClick={this.props.onConnect}>Connect</Button>
        </CardContent>
      </Card>;
    }

    return <Grid container>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ChargerInfo info={this.props.chargerInfo}/>
      </Grid>
    </Grid>;
  }
}

function mapStateToProps(state: IStoreState): IProps {
  return {
    chargerInfo: state.charger.info,
    chargerPresent: state.charger.devicePresent,
  };
}

function mapDispatchToProps(dispatch: Dispatch<charger.IChargerAction>): IDispatch {
  return {
    findDevice: () => dispatch(charger.find()),
    onConnect: () => dispatch(charger.connect()),
  }
}

export default connect<void, IDispatch, IProps & IDispatch>(mapStateToProps, mapDispatchToProps)(Charger);