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