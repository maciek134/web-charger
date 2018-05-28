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