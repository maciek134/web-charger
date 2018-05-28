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

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import IChargerInfo from '../types/ChargerInfo';

import './ChargerInfo.css';

interface IProps {
  info: IChargerInfo;
}

export default class ChargerInfo extends React.Component<IProps> {
  public render(): React.ReactNode {
    const { info } = this.props;
    return <Card className="charger-info">
      <CardContent>
        <Typography color="textSecondary">Charger info</Typography>
        <Typography variant="headline">Core type: <span className="core-type float-right">{ info.coreType }</span></Typography>
        <Typography>Hardware version: <span className="hw-version float-right">{ info.hwVersion.toFixed(2) }</span></Typography>
        <Typography>Firmware version: <span className="sw-version float-right">{ info.swVersion.toFixed(2) }</span></Typography>
        <Typography>Cell count: <span className="cell-count float-right">{ info.cellCount }</span></Typography>
      </CardContent>
    </Card>
  }
}