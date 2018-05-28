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

import { all, put, select, takeEvery, takeLatest, throttle } from 'redux-saga/effects';
import { ChargerCommand, ChargerHelper } from '../../types/ChargerHelper';
import IChargerInfo from '../../types/ChargerInfo';
import { IStoreState } from '../store';

// region Interfaces

enum ActionType {
  FIND = 'charger/FIND',
  FOUND = 'charger/FOUND',
  CONNECT = 'charger/CONNECT',
  CONNECTED = 'charger/CONNECTED',
  READ_CHARGER_INFO = 'charger/READ_CHARGER_INFO',
  GOT_CHARGER_INFO = 'charger/GOT_CHARGER_INFO',
  USB_ERROR = 'charger/USB_ERROR',
}

export interface IChargerAction {
  type: ActionType;
  payload?: any;
}

export interface IChargerState {
  device?: USBDevice;
  devicePresent?: boolean;
  info?: IChargerInfo;
}

const defaultState: IChargerState = {};

// endregion Interfaces
// region Reducer

export function reducer(state: IChargerState = defaultState, action: IChargerAction): IChargerState {
  switch (action.type) {
    case ActionType.FOUND:
      return { ...state, devicePresent: action.payload.length > 0 };
    case ActionType.CONNECTED:
      return { ...state, device: action.payload };
    case ActionType.GOT_CHARGER_INFO:
      return { ...state, info: action.payload };
    case ActionType.USB_ERROR:
      console.error('error', action.payload);
      return state;
  }
  return state;
}

// endregion Reducer
// region Actions

export const find = (): IChargerAction => ({ type: ActionType.FIND });
export const connect = (): IChargerAction => ({ type: ActionType.CONNECT });
export const readChargerInfo = (): IChargerAction => ({ type: ActionType.READ_CHARGER_INFO });

// endregion Actions
// region Sagas

function* sagaFind() {
  try {
    const devices = yield navigator.usb.getDevices();
    const filtered = devices.filter((d: USBDevice) => d.vendorId === 0x0000 && d.productId === 0x0001);
    yield put({ type: ActionType.FOUND, payload: filtered });
  } catch (e) {
    yield put({ type: ActionType.USB_ERROR, payload: e });
  }
}

function* sagaConnect() {
  try {
    const state = yield select((s: IStoreState) => s.charger);
    if (state.device) {
      return;
    }
    const device = yield navigator.usb.requestDevice({ filters: [ { vendorId: 0x0000, productId: 0x0001 } ] });
    yield device.open();
    yield device.selectConfiguration(1);
    yield device.claimInterface(0);
    yield put({ type: ActionType.CONNECTED, payload: device });
  } catch (e) {
    yield put({ type: ActionType.USB_ERROR, payload: e });
  }
}

function* sagaReadChargerInfo() {
  try {
    const state = yield select((s: IStoreState) => s.charger);
    yield state.device.transferOut(0x01, ChargerHelper.perpareCommand(ChargerCommand.CHARGER_INFO));

    const result: USBInTransferResult = yield state.device.transferIn(0x01, 64);
    if (result.data) {
      yield put({ type: ActionType.GOT_CHARGER_INFO, payload: ChargerHelper.parseChargerInfo(result.data) });
    }
  } catch (e) {
    yield put({ type: ActionType.USB_ERROR, payload: e });
  }
}

export function* rootSaga() {
  yield all([
    (function* () { yield takeEvery(ActionType.FIND, sagaFind) })(),
    (function* () { yield throttle(1000, ActionType.CONNECT, sagaConnect) })(),
    (function* () { yield takeLatest(ActionType.CONNECTED, sagaReadChargerInfo) })(),
    (function* () { yield takeLatest(ActionType.READ_CHARGER_INFO, sagaReadChargerInfo) })(),
  ]);
}

// endregion Sagas
